/**
 * [EN] Transmutation Ecosystem: the main Tailwind → AUM-IC orchestration pipeline.
 *      Coordinates five sequential phases:
 *        Phase 1 — File scanning and class extraction via Piscina worker pool
 *        Phase 2 — JIT Validator: separates native Tailwind vs. custom CSS tokens
 *        Phase 3 — Source mutation: rewrites class attributes in all source files
 *        Phase 4 — CSS compilation: L1 DuckDB cache + L2 dynamic JIT PostCSS
 *        Phase 5 — Tailwind eradication: removes packages, config files, integrations
 * [ES] Ecosistema de Transmutación: el pipeline principal de orquestación Tailwind → AUM-IC.
 *      Coordina cinco fases secuenciales:
 *        Fase 1 — Escaneo de archivos y extracción de clases vía pool de workers Piscina
 *        Fase 2 — JIT Validator: separa tokens nativos Tailwind vs. CSS personalizado
 *        Fase 3 — Mutación de fuentes: reescribe atributos de clase en todos los archivos fuente
 *        Fase 4 — Compilación CSS: caché L1 DuckDB + JIT dinámico PostCSS L2
 *        Fase 5 — Erradicación de Tailwind: elimina paquetes, archivos de config e integraciones
 */
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import ora from 'ora';
import pc from 'picocolors';
import cliProgress from 'cli-progress';
import { glob } from 'glob';
import { spawnSync, spawn } from 'child_process';
import postcss, { Rule, AtRule, Root } from 'postcss';
import inquirer from 'inquirer';
import Piscina from 'piscina';

import { getHash, escapeCssSelector } from '../1_atoms/hash';
import { TAILWIND_SNIPER_REGEX, LEVEL_PREFIX } from '../1_atoms/constants';
import { classifyComponent } from '../2_molecules/classifier';
import { runConcurrent } from '../2_molecules/concurrency';
import { queryL1Cache } from '../3_cells/DuckDbCache';
import { AIEngine } from '../3_cells/AiEngine';
import { WebCloner } from '../3_cells/WebCloner';
import type { ResolvedOptions, ClassMappingEntry, EnvironmentState, TailwindVersion } from '../1_atoms/types';

// [EN] Hyperlink to the AUM-IC project for terminal support. [ES] Hipervínculo al proyecto AUM-IC para terminales que lo soporten.
const aumicLink = `\x1b]8;;https://github.com/ingcrea/aum-ic\x07AUM-IC\x1b]8;;\x07`;

let pkgVersion = '4.1.5';
try { pkgVersion = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8').replace(/^\uFEFF/, '')).version; } catch { }

// ─── Environment Detection ────────────────────────────────────────────────────

/**
 * [EN] Reads the target project's package.json to determine the Tailwind major version.
 * [ES] Lee el package.json del proyecto objetivo para determinar la versión mayor de Tailwind.
 */
async function detectTailwindVersion(targetDir: string): Promise<TailwindVersion> {
    try {
        const pkg = await fs.readJson(path.join(targetDir, 'package.json'));
        const v = pkg.dependencies?.tailwindcss || pkg.devDependencies?.tailwindcss || '';
        if (v.includes('4.')) return 4;
    } catch { }
    return 3;
}

/**
 * [EN] Probes the target project's package.json and CSS entry points to build a full
 *      environment state snapshot (Tailwind version, integrations, preflight status).
 * [ES] Sondea el package.json y los puntos de entrada CSS del proyecto objetivo para construir
 *      un snapshot completo del estado del entorno (versión Tailwind, integraciones, estado preflight).
 */
async function detectEnvironmentState(targetDir: string): Promise<EnvironmentState> {
    const state: EnvironmentState = {
        version: 3, usesAstro: false, usesVite: false, usesPostcss: false,
        importsPreflight: false, importsUtilities: false, cssEntrypoint: null,
    };
    try {
        const p = require(path.join(targetDir, 'package.json'));
        const deps = { ...(p.dependencies || {}), ...(p.devDependencies || {}) };
        if (deps['tailwindcss']) state.version = (deps['tailwindcss'].startsWith('^4') || deps['tailwindcss'].startsWith('4')) ? 4 : 3;
        else if (deps['@tailwindcss/vite'] || deps['@tailwindcss/postcss']) state.version = 4;
        state.usesAstro = !!deps['@astrojs/tailwind'];
        state.usesVite = !!deps['@tailwindcss/vite'];
        state.usesPostcss = !!deps['@tailwindcss/postcss'];
    } catch { }

    const cssFiles = await glob('**/*.{css,scss,sass,less,pcss}', { cwd: targetDir, absolute: true, ignore: ['node_modules/**', 'dist/**', 'public/**'] });
    for (const f of cssFiles) {
        const c = await fs.readFile(f, 'utf-8');
        if (c.includes('@tailwind') || c.includes('tailwindcss')) {
            state.cssEntrypoint = f;
            if (c.includes('@tailwind base') || c.includes('tailwindcss/preflight') || c.includes('@import "tailwindcss"')) state.importsPreflight = true;
            if (c.includes('@tailwind utilities') || c.includes('tailwindcss/utilities') || c.includes('@import "tailwindcss"')) state.importsUtilities = true;
        }
    }
    if (state.usesAstro) { state.importsPreflight = true; state.importsUtilities = true; }
    return state;
}

// ─── HTML Report Generator ────────────────────────────────────────────────────

/**
 * [EN] Generates the AUM-IC C4I intelligence dashboard as a self-contained HTML file.
 *      Includes animated donut chart, class mapping table with pagination, and export tools.
 * [ES] Genera el dashboard de inteligencia AUM-IC C4I como un archivo HTML autónomo.
 *      Incluye gráfico donut animado, tabla de mapeo de clases con paginación y herramientas de exportación.
 */
function generateReport(mapping: Map<string, ClassMappingEntry>, targetDir: string, isSimulate: boolean): string {
    const reportPath = path.join(targetDir, 'aumic-report.html');
    const counts: Record<string, number> = { atoms: 0, molecules: 0, organisms: 0, ecosystems: 0, galaxies: 0 };
    const categoryMeta: Record<string, { border: string; text: string; bg: string; label: string }> = {
        atoms:      { border: '#22d3ee', text: '#22d3ee', bg: 'rgba(34,211,238,0.15)',  label: '⚛ Átomo' },
        molecules:  { border: '#a78bfa', text: '#a78bfa', bg: 'rgba(167,139,250,0.15)', label: '🧬 Molécula' },
        organisms:  { border: '#34d399', text: '#34d399', bg: 'rgba(52,211,153,0.15)',  label: '🫀 Organismo' },
        ecosystems: { border: '#fb923c', text: '#fb923c', bg: 'rgba(251,146,60,0.15)',  label: '🌌 Ecosistema' },
        galaxies:   { border: '#facc15', text: '#facc15', bg: 'rgba(250,204,21,0.15)',  label: '🪐 Galaxia' },
    };
    let totalOcc = 0, origBytes = 0, aumicBytes = 0;
    const sorted = Array.from(mapping.entries()).sort((a, b) => (b[1].occurrences || 1) - (a[1].occurrences || 1));
    const rows: string[] = [];
    for (const [orig, map] of sorted) {
        const cat = map.category || 'molecules';
        const occ = map.occurrences || 1;
        totalOcc += occ; origBytes += orig.length * occ; aumicBytes += map.aumicClass.length * occ;
        if (counts[cat] !== undefined) counts[cat]++;
        const c = categoryMeta[cat] || categoryMeta.molecules;
        rows.push(`<tr data-cat="${cat}"><td class="tw-cell copyable" onclick="copyText(this)">${orig}</td><td class="aumic-cell copyable" onclick="copyText(this)">${map.aumicClass}</td><td class="occ-cell" data-occ="${occ}"><div class="occ-bar" style="width:${Math.min(100, occ * 2)}%;background:${c.text}"></div><span>${occ}</span></td><td><span class="badge" style="border-color:${c.border};color:${c.text};background:${c.bg}">${c.label}</span></td></tr>`);
    }
    const saved = origBytes - aumicBytes;
    const eff = origBytes > 0 ? ((saved / origBytes) * 100).toFixed(1) : '0';
    let grade = 'D', gColor = '#ef4444';
    if (Number(eff) >= 70) { grade = 'S'; gColor = '#facc15'; }
    else if (Number(eff) >= 50) { grade = 'A'; gColor = '#34d399'; }
    else if (Number(eff) >= 30) { grade = 'B'; gColor = '#22d3ee'; }
    else if (Number(eff) >= 15) { grade = 'C'; gColor = '#a78bfa'; }

    // [EN] Minimal HTML shell — full stylesheet and scripts are inlined for portability.
    // [ES] Shell HTML mínimo — el stylesheet completo y los scripts están inlineados para portabilidad.
    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>AUM-IC · C4I Dashboard</title>
<style>:root{--bg:#030712;--panel:rgba(15,23,42,.7);--text:#e2e8f0;--muted:#64748b;--border:rgba(51,65,85,.6);--accent:#00e5ff}*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:var(--bg);color:var(--text);padding:2rem 3rem}.panel{background:var(--panel);backdrop-filter:blur(12px);padding:1.5rem;border-radius:16px;border:1px solid var(--border);margin-bottom:1.5rem}.metric h3{font-size:1.8rem;font-weight:900;color:#34d399}.table-container{border-radius:12px;border:1px solid var(--border);overflow:hidden}.tw-cell{font-family:monospace;color:#f472b6}.aumic-cell{font-family:monospace;color:#38bdf8;font-weight:600}.badge{font-size:.65rem;padding:4px 10px;border-radius:999px;border:1px solid;font-weight:800}.toolbar{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem}.fbtn{background:rgba(0,0,0,.2);border:1px solid var(--border);color:#94a3b8;font-size:.75rem;padding:8px 16px;border-radius:8px;cursor:pointer}.fbtn.active,.fbtn:hover{color:#fff;border-color:var(--accent)}.search{background:rgba(0,0,0,.2);border:1px solid var(--border);color:#fff;font-size:.8rem;padding:8px 16px;border-radius:8px;outline:none;width:200px;margin-left:auto}table{width:100%;border-collapse:collapse;font-size:.8rem}th{background:rgba(0,0,0,.3);color:var(--muted);text-align:left;padding:12px 16px;border-bottom:1px solid var(--border);text-transform:uppercase;font-size:.7rem}td{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.02)}.occ-cell{display:flex;align-items:center;gap:10px}.occ-bar{height:6px;border-radius:3px;opacity:.8}footer{text-align:center;padding:20px;font-size:.75rem;color:var(--muted);margin-top:2rem}footer a{color:var(--accent);text-decoration:none}</style>
</head><body>
<div class="panel"><h1 style="font-size:1.8rem;font-weight:900">⚔️ AUM-IC · Centro de Inteligencia</h1>
<p style="color:var(--muted);margin-top:.5rem">${isSimulate ? 'MODO DRY-RUN — sin mutación en disco' : 'MUTACIÓN AUM-IC COMPLETADA'} · v${pkgVersion}</p>
</div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem">
<div class="panel metric"><h3>🔥 ${(saved / 1024).toFixed(2)} KB</h3><p>Peso estimado salvado</p></div>
<div class="panel metric"><h3>${eff}%</h3><p>Eficiencia de refactorización</p></div>
<div class="panel metric" style="font-size:2rem;text-align:center"><span style="color:${gColor};font-weight:900;font-size:3rem">${grade}</span><p style="font-size:.75rem;color:var(--muted)">Ranking AUM-IC</p></div>
</div>
<div class="panel">
<nav class="toolbar">
<button class="fbtn active" onclick="filter('all',this)">Todos</button>
<button class="fbtn" onclick="filter('atoms',this)">Átomos (${counts.atoms})</button>
<button class="fbtn" onclick="filter('molecules',this)">Moléculas (${counts.molecules})</button>
<button class="fbtn" onclick="filter('organisms',this)">Organismos (${counts.organisms})</button>
<button class="fbtn" onclick="filter('ecosystems',this)">Ecosistemas (${counts.ecosystems})</button>
<button class="fbtn" onclick="filter('galaxies',this)">Galaxias (${counts.galaxies})</button>
<input class="search" type="text" id="q" placeholder="Buscar..." oninput="search(this.value)">
</nav>
<div class="table-container"><table><thead><tr><th>Clase Original (Tailwind)</th><th>Clase AUM-IC Transmutada</th><th>Frecuencia</th><th>Nivel</th></tr></thead>
<tbody id="tbody">${rows.join('')}</tbody></table></div></div>
<footer>Forged by <a href="https://ingcrea.com" target="_blank">INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S.</a> | <a href="https://github.com/ingcrea/aumic-tailwind-killer" target="_blank">GitHub</a></footer>
<script>
let allRows=[],filteredRows=[],activeCat='all',q='';
window.onload=()=>{allRows=Array.from(document.querySelectorAll('#tbody tr'));filteredRows=[...allRows];render();};
function render(){const tb=document.getElementById('tbody');tb.innerHTML='';filteredRows.forEach(r=>tb.appendChild(r));}
function filter(c,b){document.querySelectorAll('.fbtn').forEach(x=>x.classList.remove('active'));if(b)b.classList.add('active');activeCat=c;apply();}
function search(v){q=v;apply();}
function apply(){filteredRows=allRows.filter(r=>{const catOk=activeCat==='all'||r.dataset.cat===activeCat;if(!catOk)return false;if(!q)return true;try{return new RegExp(q,'i').test(r.textContent);}catch{return r.textContent.toLowerCase().includes(q.toLowerCase());}});render();}
function copyText(el){navigator.clipboard.writeText(el.innerText);}
</script></body></html>`;

    fs.writeFileSync(reportPath, html);
    return reportPath;
}

// ─── Main Pipeline ────────────────────────────────────────────────────────────

/**
 * [EN] Main transmutation pipeline entry point. Receives fully resolved options and
 *      executes all five phases sequentially, using the worker pool for parallelism.
 * [ES] Punto de entrada principal del pipeline de transmutación. Recibe las opciones
 *      completamente resueltas y ejecuta las cinco fases secuencialmente, usando el
 *      pool de workers para el paralelismo.
 */
export async function runTransmutationEcosystem(answers: ResolvedOptions, distDir: string): Promise<void> {
    const TARGET_DIR = path.resolve(answers.targetDir);
    const userConcurrency = (answers.concurrency && !isNaN(parseInt(answers.concurrency, 10)))
        ? parseInt(answers.concurrency, 10)
        : (os.cpus().length * 2);

    console.log(pc.gray(`[i] Motores Asíncronos Desplegados: ${userConcurrency} hilos concurrentes.`));

    const startTime = Date.now();
    const logPath = path.join(TARGET_DIR, 'aumic-audit.log');
    fs.writeFileSync(logPath, `=== AUM-IC AUDIT LOG ===\nDate: ${new Date().toISOString()}\nVersion: ${pkgVersion}\nMode: ${answers.mode}\nTarget: ${TARGET_DIR}\n\n`, 'utf-8');
    const log = (msg: string) => fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`, 'utf-8');

    let spinner = ora('').start();

    // ── Clone Mode Pre-flight ──────────────────────────────────────────────────
    let twVersion: TailwindVersion = 3;
    if (answers.mode === 'clone') {
        spinner.text = `Modo Forense: Infiltrando ${answers.targetUrl}...`;
        await WebCloner.cloneWebsite(answers.targetUrl!, TARGET_DIR, answers.cloneDepth);
        spinner.succeed(`Extracción completada (${answers.cloneDepth}). Archivos en ${TARGET_DIR}.`);
        const isTw = await WebCloner.isTailwindPowered(TARGET_DIR);
        if (!isTw) { spinner.warn('La web clonada no usa Tailwind. Abortando.'); return; }
        spinner.succeed('Firma Tailwind confirmada. Iniciando transmutación.');
    } else {
        twVersion = await detectTailwindVersion(TARGET_DIR);
    }

    // ── Phase 1: File Scan & Extraction ────────────────────────────────────────
    spinner.start('Fase 1: Escaneando y extrayendo utilidades...');
    const globPattern = (answers.mode === 'surgical' && answers.scope) ? answers.scope : '**/*.{astro,tsx,jsx,html,py,rs,php,go,erb,svelte,vue}';
    let files: string[] = [];

    if (!answers.scope) {
        try {
            // [EN] Infrared Scanner: uses `git ls-files` as a fast O(n) file enumeration path.
            // [ES] Escáner Infrarrojo: usa `git ls-files` como ruta rápida O(n) de enumeración de archivos.
            const r = spawnSync('git', ['ls-files', '*.astro','*.tsx','*.jsx','*.html','*.py','*.rs','*.php','*.go','*.erb','*.svelte','*.vue'], { cwd: TARGET_DIR, stdio: 'pipe' });
            files = r.stdout.toString().split('\n').map(f => path.join(TARGET_DIR, f.trim())).filter(f => f.length > TARGET_DIR.length && fs.existsSync(f));
        } catch { }
    }
    if (files.length === 0) {
        files = await glob(globPattern, { cwd: TARGET_DIR, absolute: true, ignore: ['node_modules/**','dist/**','.git/**','target/**','__pycache__/**','venv/**'] });
    }
    log(`Archivos escaneados: ${files.length}`);

    // [EN] Pre-Flight Check: validate write permissions before committing to mutation.
    // [ES] Pre-Flight Check: validar permisos de escritura antes de comprometerse con la mutación.
    spinner.start('Pre-Flight Check de permisos NTFS/POSIX...');
    const locked: string[] = [];
    await runConcurrent(files, 50, async (f) => { try { await fs.access(f, fs.constants.W_OK); } catch { locked.push(f); } });
    if (locked.length > 0) {
        spinner.fail(pc.red(`[X] Pre-Flight abortó: ${locked.length} archivo(s) sin permiso de escritura.`));
        locked.slice(0, 5).forEach(f => console.log(pc.red(` - ${f}`))); process.exit(1);
    }
    spinner.succeed('Pre-Flight superado. Permisos validados.');

    const piscinaPool = new Piscina({ filename: path.join(distDir, 'worker.js') });
    const globalExtracted = new Map<string, { category: string; component: string; occurrences: number }>();
    const vramCache = new Map<string, string>();

    spinner.succeed(`${files.length} archivos listos para escaneo.`);
    const scanBar = new cliProgress.SingleBar({ format: pc.cyan('Fase 1 [Extracción] {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total}', barCompleteChar: '█', barIncompleteChar: '░', hideCursor: true });
    scanBar.start(files.length, 0);

    await runConcurrent(files, userConcurrency, async (file) => {
        const content = await fs.readFile(file, 'utf-8');
        vramCache.set(file, content);
        if (!TAILWIND_SNIPER_REGEX.test(content)) { scanBar.increment(); return; }
        const fileClass = classifyComponent(file);
        try {
            const entries = await piscinaPool.run({ mode: 'scan', content, filePath: file });
            for (const [cls, count] of entries) {
                const ex = globalExtracted.get(cls);
                if (ex) ex.occurrences += count;
                else globalExtracted.set(cls, { ...fileClass, occurrences: count });
            }
        } catch (e: any) { log(`[ERROR F1] ${e.message}`); }
        scanBar.increment();
    });
    scanBar.stop();

    if (globalExtracted.size === 0) { spinner.warn('No se encontraron utilidades Tailwind.'); return; }
    spinner.succeed(`${globalExtracted.size} bloques únicos extraídos.`);

    // ── Phase 2: JIT Validator ─────────────────────────────────────────────────
    spinner.start('Fase 2: JIT Validator — separando clases nativas de custom...');
    const allTokens = new Set<string>();
    for (const orig of globalExtracted.keys()) orig.split(' ').forEach(t => { if (t.trim() && !t.includes('aumic-')) allTokens.add(t.trim()); });
    const testHtml = Array.from(allTokens).map(t => `<div class="${t}"></div>`).join('\n');

    let userConfig: any = {};
    const configPath = ['tailwind.config.js','tailwind.config.mjs'].map(f => require('path').resolve(TARGET_DIR, f)).find(p => require('fs').existsSync(p)) || null;
    if (configPath) {
        try { const di = new Function('mp', 'return import(mp)'); userConfig = (await di(require('url').pathToFileURL(configPath).href)).default || require(configPath); }
        catch { try { userConfig = require(configPath); } catch { } }
    }

    const twPlugin = require('tailwindcss')({ content: [{ raw: testHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} });
    const jitTest = await postcss([twPlugin]).process('@tailwind utilities;', { from: undefined });
    const validTwClasses = new Set<string>();
    postcss.parse(jitTest.css).walkRules((r: Rule) => {
        for (const t of Array.from(allTokens)) { if (r.selector.includes('.' + escapeCssSelector(t))) validTwClasses.add(t); }
    });
    spinner.succeed(`JIT Validator: ${validTwClasses.size} clases nativas reconocidas.`);

    // ── Class Mapping Generation ───────────────────────────────────────────────
    const classMapping = new Map<string, ClassMappingEntry>();

    if (answers.useAI && (answers.apiKey || answers.aiProvider === 'ollama')) {
        const memPath = path.join(TARGET_DIR, '.aumic-memory.json');
        let mem: Record<string, string> = {};
        if (fs.existsSync(memPath)) { try { mem = await fs.readJson(memPath); } catch { } }
        const missing = Array.from(globalExtracted.keys()).filter(u => !mem[u]);
        let newMap: Record<string, string> = {};
        if (missing.length > 0) {
            spinner.start(pc.magenta(`Titanium Cache Miss: conectando con ${answers.aiProvider!.toUpperCase()} para ${missing.length} clases...`));
            const ai = new AIEngine(answers.aiProvider!, answers.apiKey || 'ollama-local');
            const rc = fs.existsSync(path.join(TARGET_DIR, '.aumicrc.json')) ? (await fs.readJson(path.join(TARGET_DIR, '.aumicrc.json'))).rules || '' : '';
            newMap = (await ai.generateSemanticNames({ utilities: missing, customRules: rc })).mapping;
            spinner.succeed(pc.magenta('Bautizo semántico completado.'));
        }
        const final = { ...mem, ...newMap };
        await fs.writeJson(memPath, final, { spaces: 2 });
        for (const [orig, { category, component, occurrences }] of globalExtracted) {
            const aumicClass = final[orig] || `aumic-ai-${component}-${getHash(orig)}`;
            const fullArr = orig.split(' ');
            const twArr = fullArr.filter(c => validTwClasses.has(c));
            const custArr = fullArr.filter(c => !validTwClasses.has(c));
            const rep = custArr.length > 0 ? (twArr.length > 0 ? aumicClass + ' ' + custArr.join(' ') : custArr.join(' ')) : aumicClass;
            if (twArr.length > 0) classMapping.set(orig, { original: orig, array: fullArr, tailwindOnlyArray: twArr, customArray: custArr, aumicClass, replacementString: rep, category, component, occurrences });
        }
    } else {
        spinner.start('Generando hashes deterministas AUM-IC...');
        for (const [orig, { category, component, occurrences }] of globalExtracted) {
            const prefix = LEVEL_PREFIX[category] || 'molecule';
            const fullArr = orig.split(' ');
            const twArr = fullArr.filter(c => validTwClasses.has(c));
            const custArr = fullArr.filter(c => !validTwClasses.has(c));
            const aumicClass = `aumic-${prefix}-${component}-${getHash(orig)}`;
            const rep = custArr.length > 0 ? (twArr.length > 0 ? aumicClass + ' ' + custArr.join(' ') : custArr.join(' ')) : aumicClass;
            if (twArr.length > 0) classMapping.set(orig, { original: orig, array: fullArr, tailwindOnlyArray: twArr, customArray: custArr, aumicClass, replacementString: rep, category, component, occurrences });
        }
        spinner.succeed('Hashes deterministas generados.');
    }

    // ── Simulate Mode Early Exit ───────────────────────────────────────────────
    if (answers.simulate) {
        spinner.start('Simulador activo: generando reporte de impacto...');
        const rp = generateReport(classMapping, TARGET_DIR, true);
        spinner.succeed(`Simulación finalizada. Reporte en: ${rp}`);
        console.log(pc.green(pc.bold('\n[✔] DRY-RUN COMPLETADO. No se mutaron archivos.\n')));
        const { open } = await inquirer.prompt([{ type: 'confirm', name: 'open', message: '¿Abrir el reporte en el navegador?', default: true }]);
        if (open) { const pl = os.platform(); if (pl === 'win32') spawn('explorer', [rp]); else if (pl === 'darwin') spawn('open', [rp]); else spawn('xdg-open', [rp]); }
        return;
    }

    // ── Phase 3: Source Mutation ───────────────────────────────────────────────
    const serial: Record<string, any> = {};
    for (const [k, v] of classMapping.entries()) serial[k] = v;

    spinner.succeed(`Iniciando mutación concurrente en ${files.length} archivos...`);
    const mutBar = new cliProgress.SingleBar({ format: pc.red('Fase 3 [Mutación]   {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total}', barCompleteChar: '█', barIncompleteChar: '░', hideCursor: true });
    mutBar.start(files.length, 0);
    let modifiedFiles = 0;

    await runConcurrent(files, userConcurrency, async (file) => {
        const content = vramCache.get(file) || await fs.readFile(file, 'utf-8');
        vramCache.delete(file); // [EN] Anti-OOM GC: release after use. [ES] GC anti-OOM: liberar tras el uso.
        if (!TAILWIND_SNIPER_REGEX.test(content)) { mutBar.increment(); return; }
        try {
            const newCode = await piscinaPool.run({ mode: 'mutate', content, filePath: file, map: serial });
            if (newCode !== content) { await fs.writeFile(file, newCode, 'utf-8'); modifiedFiles++; }
        } catch (e: any) { log(`[ERROR F3] ${e.message}`); }
        mutBar.increment();
    });
    mutBar.stop();
    log(`[F3] Mutados: ${modifiedFiles}/${files.length}`);
    spinner.succeed(`${modifiedFiles} archivos fuente mutados estructuralmente.`);

    // ── Phase 4: CSS Generation ────────────────────────────────────────────────
    spinner.start(`Fase 4: L1 Cache DuckDB + JIT dinámico v${twVersion}...`);
    const utilityToAumic = new Map<string, { aumicClass: string; category: string }[]>();
    for (const [, map] of classMapping) {
        for (const util of map.tailwindOnlyArray) {
            const esc = '.' + escapeCssSelector(util);
            const list = utilityToAumic.get(esc) || [];
            list.push({ aumicClass: map.aumicClass, category: map.category });
            utilityToAumic.set(esc, list);
        }
    }

    const dbPath = path.join(distDir, '../aumic-lexicon.duckdb');
    const allTwClasses = Array.from(new Set(Array.from(classMapping.values()).flatMap(m => m.tailwindOnlyArray)));
    const { css: l1Css, unresolved } = await queryL1Cache(allTwClasses, twVersion, dbPath);

    const virtualHtml = Array.from(unresolved).map(c => `<div class="${c}"></div>`).join('\n');
    const projectTwPath = path.join(TARGET_DIR, 'node_modules', 'tailwindcss');
    const twFn = fs.existsSync(projectTwPath) ? require(projectTwPath) : require('tailwindcss');
    await piscinaPool.destroy();
    const jit = await postcss([twFn({ content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} })]).process('@tailwind utilities;', { from: undefined });

    const envState = await detectEnvironmentState(TARGET_DIR);
    const categoryRoots: Record<string, Root> = { atoms: postcss.root(), molecules: postcss.root(), organisms: postcss.root(), ecosystems: postcss.root(), galaxies: postcss.root() };
    const globalRoot = postcss.root();

    if (envState.importsPreflight) {
        try {
            const pf = await postcss([twFn({ content: [{ raw: '<div class="a"></div>', extension: 'html' }], theme: userConfig.theme || {} })]).process('@tailwind base;', { from: undefined });
            globalRoot.prepend(postcss.parse(pf.css));
        } catch { }
    }

    postcss.parse(l1Css + '\n' + jit.css).walkRules((rule: Rule) => {
        for (const [esc, targets] of utilityToAumic) {
            if (rule.selector.includes(esc)) {
                for (const target of targets) {
                    const cloned = rule.clone();
                    cloned.selector = cloned.selector.replace(esc, `.${target.aumicClass}`);
                    const dest = answers.outputMode === 'aumic' ? categoryRoots[target.category] : globalRoot;
                    if (rule.parent?.type === 'atrule') {
                        const pa = rule.parent as AtRule;
                        const ar = postcss.atRule({ name: pa.name, params: pa.params });
                        ar.append(cloned); dest.append(ar);
                    } else { dest.append(cloned); }
                }
            }
        }
    });

    // [EN] Write CSS output according to selected architecture (AUM-IC modular or global).
    // [ES] Escribir la salida CSS según la arquitectura seleccionada (modular AUM-IC o global).
    if (answers.outputMode === 'global') {
        const outPath = path.join(TARGET_DIR, 'src', 'styles');
        fs.ensureDirSync(outPath);
        await fs.writeFile(path.join(outPath, 'aumic-styles.css'), globalRoot.toString(), 'utf-8');
    } else {
        for (const [cat, root] of Object.entries(categoryRoots)) {
            if (root.nodes && root.nodes.length > 0) {
                const dir = path.join(TARGET_DIR, 'src', 'styles', cat);
                await fs.ensureDir(dir);
                await fs.writeFile(path.join(dir, `_${cat}.scss`), root.toString(), 'utf-8');
            }
        }
    }
    spinner.succeed('CSS fusionado matemáticamente.');

    // [EN] Write the reverse mapping lock file for future rollback operations.
    // [ES] Escribir el archivo lock de mapeo inverso para futuras operaciones de rollback.
    const lockData: Record<string, string> = {};
    for (const [, m] of classMapping) lockData[m.aumicClass] = m.original;
    await fs.writeJson(path.join(TARGET_DIR, 'aumic-lock.json'), lockData, { spaces: 2 });
    console.log(pc.blue('\n[i] Mapa reverso generado en aumic-lock.json'));

    // ── Phase 5: Tailwind Eradication ─────────────────────────────────────────
    if (answers.mode === 'local' && answers.eradicate !== false) {
        spinner.start(pc.red('Fase 5: Erradicando dependencias de Tailwind...'));
        try {
            const pkgPath = path.join(TARGET_DIR, 'package.json');
            if (fs.existsSync(pkgPath)) fs.copyFileSync(pkgPath, `${pkgPath}.aumic-bak`);

            for (const conf of ['tailwind.config.js','tailwind.config.ts','tailwind.config.cjs','tailwind.config.mjs','tailwind.js']) {
                const p = path.join(TARGET_DIR, conf);
                if (fs.existsSync(p)) fs.renameSync(p, `${p}.aumic-bak`);
            }

            const integrations = [
                { file: 'astro.config.mjs', r1: /import\s+tailwind\s+from\s+['"]@astrojs\/tailwind['"];?\n?/, r2: /tailwind\(\)\s*,?/ },
                { file: 'astro.config.ts',  r1: /import\s+tailwind\s+from\s+['"]@astrojs\/tailwind['"];?\n?/, r2: /tailwind\(\)\s*,?/ },
                { file: 'vite.config.js',   r1: /import\s+tailwindcss\s+from\s+['"]@tailwindcss\/vite['"];?\n?/, r2: /tailwindcss\(\)\s*,?/ },
                { file: 'vite.config.ts',   r1: /import\s+tailwindcss\s+from\s+['"]@tailwindcss\/vite['"];?\n?/, r2: /tailwindcss\(\)\s*,?/ },
            ];
            for (const intg of integrations) {
                const ip = path.join(TARGET_DIR, intg.file);
                if (fs.existsSync(ip)) {
                    let c = fs.readFileSync(ip, 'utf8');
                    c = c.replace(intg.r1, '').replace(intg.r2, '');
                    fs.writeFileSync(ip, c, 'utf8');
                }
            }

            try {
                const pkg = require(path.join(TARGET_DIR, 'package.json'));
                const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
                const targets = ['tailwindcss','@tailwindcss/vite','@tailwindcss/postcss','@tailwindcss/cli','@astrojs/tailwind'];
                const toRemove = targets.filter(t => allDeps[t]);
                if (toRemove.length > 0) {
                    // [EN] Zero-Trust spawn: arguments passed as array, no shell expansion.
                    // [ES] Spawn Zero-Trust: argumentos pasados como array, sin expansión de shell.
                    require('child_process').spawnSync(os.platform() === 'win32' ? 'npm.cmd' : 'npm', ['uninstall', ...toRemove], { cwd: TARGET_DIR, stdio: 'ignore' });
                }
            } catch { }
            spinner.succeed(pc.green('Tailwind purgado. Configuraciones respaldadas en .aumic-bak.'));
        } catch { spinner.warn('Fallo menor en la erradicación.'); }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`[FIN] Completado en ${duration}s.`);
    console.log(pc.green(pc.bold(`\n[✔] PROYECTO TRANSMUTADO AL ESTÁNDAR ${aumicLink}. (v${pkgVersion})\n`)));

    spinner.start('Generando reporte post-transmutación...');
    const rp = generateReport(classMapping, TARGET_DIR, false);
    spinner.succeed(`Reporte post-mutación: ${rp}`);

    const { open } = await inquirer.prompt([{ type: 'confirm', name: 'open', message: '¿Abrir el reporte en el navegador?', default: true }]);
    if (open) { const pl = os.platform(); if (pl === 'win32') spawn('explorer', [rp]); else if (pl === 'darwin') spawn('open', [rp]); else spawn('xdg-open', [rp]); }
}
