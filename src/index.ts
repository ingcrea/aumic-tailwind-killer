#!/usr/bin/env node
import fs from 'fs-extra';
import { glob } from 'glob';
import postcss, { Rule, AtRule, Root } from 'postcss';
import crypto from 'crypto';
import path from 'path';
import inquirer from 'inquirer';
import pc from 'picocolors';
import ora from 'ora';
import { execSync, exec } from 'child_process';
import { Command } from 'commander';
import os from 'os';
import cliProgress from 'cli-progress';
import Piscina from 'piscina';
import { AstInterceptor } from './ast/parser';
import { AIEngine, AIProvider } from './ai/provider';
import { WebCloner } from './core/scraper';

// Versión dinámica
let userConfig: any = {};
let pkgVersion = '4.1.3';
try { pkgVersion = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8').replace(/^\uFEFF/, '')).version; } catch(e) {}


async function runConcurrent<T, R>(items: T[], concurrency: number, task: (item: T) => Promise<R>): Promise<R[]> {
    const results: R[] = [];
    const iterator = items.entries();
    const workers = Array(concurrency).fill(iterator).map(async (iterator) => {
        for (let [index, item] of iterator) {
            results[index] = await task(item);
        }
    });
    await Promise.all(workers);
    return results;
}

function getHash(str: string): string {
    return crypto.createHash('shake256', { outputLength: 3 }).update(str).digest('hex');
}

function escapeCssSelector(className: string): string {
    return className.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}

async function detectTailwindVersion(targetDir: string): Promise<3 | 4> {
    try {
        const pkgPath = path.join(targetDir, 'package.json');
        if (await fs.pathExists(pkgPath)) {
            const pkg = await fs.readJson(pkgPath);
            const twVersion = pkg.dependencies?.tailwindcss || pkg.devDependencies?.tailwindcss || '';
            if (twVersion.includes('4.')) return 4;
        }
    } catch (e) {}
    return 3;
}

// Abreviaciones de componentes para el naming AUM-IC
const COMPONENT_ALIASES: Record<string, string> = {
    button: 'btn', icon: 'icon', input: 'input', badge: 'badge', link: 'link', label: 'lbl',
    card: 'card', form: 'form', dropdown: 'drop', menu: 'menu', list: 'list', modal: 'modal',
    header: 'header', footer: 'footer', sidebar: 'sidebar', hero: 'hero', table: 'table', nav: 'nav',
    main: 'main', section: 'section', article: 'article', page: 'page', layout: 'layout', index: 'page',
    pricing: 'pricing', trust: 'trust', features: 'features', ecosystem: 'eco', teaser: 'teaser',
    banner: 'banner', toast: 'toast', chip: 'chip', avatar: 'avatar', tag: 'tag',
};

function classifyComponent(fileName: string): { category: string; component: string } {
    const name = path.basename(fileName, path.extname(fileName)).toLowerCase();
    // Buscar alias exacto primero
    if (COMPONENT_ALIASES[name]) {
        const comp = COMPONENT_ALIASES[name];
        if (/(button|icon|input|badge|link|label)/.test(name)) return { category: 'atoms', component: comp };
        if (/(card|form|dropdown|menu|list|modal)/.test(name)) return { category: 'molecules', component: comp };
        if (/(header|footer|sidebar|hero|table|nav)/.test(name)) return { category: 'organisms', component: comp };
        return { category: 'ecosystems', component: comp };
    }
    // Clasificación por patrón + nombre limpio (máx 8 chars)
    const comp = name.replace(/[^a-z0-9]/g, '').slice(0, 8) || 'comp';
    if (/(button|btn|icon|input|badge|link|label|chip|tag|avatar)/.test(name)) return { category: 'atoms', component: comp };
    if (/(card|form|dropdown|drop|menu|list|modal|toast|banner)/.test(name)) return { category: 'molecules', component: comp };
    if (/(header|footer|sidebar|hero|table|nav|pricing|trust|features|teaser|rmm|cta)/.test(name)) return { category: 'organisms', component: comp };
    if (/(main|section|article|page|layout|index)/.test(name)) return { category: 'ecosystems', component: comp };
    if (/(app|root|core|galaxy|global|provider)/.test(name)) return { category: 'galaxies', component: comp };
    return { category: 'molecules', component: comp };
}

function generateReport(mapping: Map<string, any>, targetDir: string, isSimulate: boolean = true): string {
    const reportPath = path.join(targetDir, 'aumic-report.html');

    const counts: Record<string, number> = { atoms: 0, molecules: 0, organisms: 0, ecosystems: 0, galaxies: 0 };
    const categoryMeta: Record<string, { border: string; text: string; bg: string; label: string }> = {
        atoms:      { border: '#22d3ee', text: '#22d3ee', bg: 'rgba(34,211,238,0.15)',  label: '⚛ Átomo' },
        molecules:  { border: '#a78bfa', text: '#a78bfa', bg: 'rgba(167,139,250,0.15)', label: '🧬 Molécula' },
        organisms:  { border: '#34d399', text: '#34d399', bg: 'rgba(52,211,153,0.15)',  label: '🫀 Organismo' },
        ecosystems: { border: '#fb923c', text: '#fb923c', bg: 'rgba(251,146,60,0.15)',  label: '🌌 Ecosistema' },
        galaxies:   { border: '#facc15', text: '#facc15', bg: 'rgba(250,204,21,0.15)',  label: '🪐 Galaxia' },
    };

    let totalOccurrences = 0;
    let originalBytes = 0;
    let aumicBytes = 0;
    
    // Sort mapping by occurrences to find top offenders
    const sortedMappings = Array.from(mapping.entries()).sort((a, b) => (b[1].occurrences || 1) - (a[1].occurrences || 1));

    const rows: string[] = [];
    
    for (const [orig, map] of sortedMappings) {
        const cat: string = map.category || 'molecules';
        const occ = map.occurrences || 1;
        totalOccurrences += occ;
        originalBytes += orig.length * occ;
        aumicBytes += map.aumicClass.length * occ;
        
        if (counts[cat] !== undefined) counts[cat]++;
        const c = categoryMeta[cat] || categoryMeta.molecules;
        
        rows.push(`<tr data-cat="${cat}">
            <td class="tw-cell copyable" onclick="copyText(this)">${orig}</td>
            <td class="aumic-cell copyable" onclick="copyText(this)">${map.aumicClass}</td>
            <td class="occ-cell" data-occ="${occ}"><div class="occ-bar" style="width: ${Math.min(100, occ * 2)}%; background: ${c.text}"></div><span>${occ}</span></td>
            <td><span class="badge" style="border-color:${c.border};color:${c.text};background:${c.bg}">${c.label}</span></td>
        </tr>`);
    }

    const savedBytes = originalBytes - aumicBytes;
    const savedKB = (savedBytes / 1024).toFixed(2);
    const efficiency = originalBytes > 0 ? ((savedBytes / originalBytes) * 100).toFixed(1) : '0';
    const psiImpact = Math.min(15, savedBytes / 8192).toFixed(1); // Rough estimate: 8KB = 1 point
    
    let grade = 'D'; let gradeColor = '#ef4444';
    if (Number(efficiency) >= 70) { grade = 'S'; gradeColor = '#facc15'; }
    else if (Number(efficiency) >= 50) { grade = 'A'; gradeColor = '#34d399'; }
    else if (Number(efficiency) >= 30) { grade = 'B'; gradeColor = '#22d3ee'; }
    else if (Number(efficiency) >= 15) { grade = 'C'; gradeColor = '#a78bfa'; }

    // Chart Data for Canvas
    const chartData = [
        { label: 'Átomos', value: counts.atoms, color: '#22d3ee' },
        { label: 'Moléculas', value: counts.molecules, color: '#a78bfa' },
        { label: 'Organismos', value: counts.organisms, color: '#34d399' },
        { label: 'Ecosistemas', value: counts.ecosystems, color: '#fb923c' },
        { label: 'Galaxias', value: counts.galaxies, color: '#facc15' }
    ];

    // Top 5 Criminals
    const top5 = sortedMappings.slice(0, 5).map((m, i) => `
        <div class="criminal">
            <div class="c-rank">#${i+1}</div>
            <div class="c-info">
                <div class="c-class">${m[0]}</div>
                <div class="c-stats">Repeticiones: <strong>${m[1].occurrences || 1}</strong> | Categoría: ${m[1].category}</div>
            </div>
        </div>
    `).join('');

    const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"><title>AUM-IC · Dashboard C4I</title><style>
:root { --bg: #030712; --panel: rgba(15, 23, 42, 0.7); --panel-hover: #1e293b; --text: #e2e8f0; --muted: #64748b; --border: rgba(51, 65, 85, 0.6); --accent: #00e5ff; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;padding:2rem 3rem;position:relative;overflow-x:hidden;}
#bgCanvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
.content-wrapper { position: relative; z-index: 10; }
header{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:1px solid var(--border)}
header h1{font-size:1.8rem;font-weight:900;color:#fff;letter-spacing:-0.5px}header h1 span{color:var(--accent);text-shadow:0 0 10px rgba(0,229,255,0.4)}
.subtitle{font-size:0.85rem;color:var(--muted);margin-top:6px}.safe-tag{background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.3);color:var(--accent);font-size:0.75rem;padding:6px 16px;border-radius:999px;font-weight:700;box-shadow:0 0 15px rgba(0,229,255,0.1)}
.dashboard-grid { display: grid; grid-template-columns: 320px 1fr; gap: 2rem; }
.sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
.main-view { display: flex; flex-direction: column; gap: 1.5rem; }

/* Panels */
.panel { background: var(--panel); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.panel h2 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 1rem; }

/* Canvas Chart */
.chart-container { display: flex; justify-content: center; align-items: center; margin-bottom: 1rem; position: relative; height: 200px; }
.chart-center-overlay { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; pointer-events: none; }
.chart-center-overlay .score { font-size: 2.5rem; font-weight: 900; color: ${gradeColor}; line-height: 1; text-shadow: 0 0 15px ${gradeColor}44; }
.chart-center-overlay .score-lbl { font-size: 0.6rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
.legend { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.75rem; }
.leg-item { display: flex; align-items: center; gap: 6px; }
.leg-color { width: 10px; height: 10px; border-radius: 50%; }

/* Hero Metrics */
.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.metric { background: rgba(0,0,0,0.3); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(5px); }
.metric h3 { font-size: 1.8rem; font-weight: 900; color: #fff; line-height: 1; margin-bottom: 4px; }
.metric p { font-size: 0.7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.5px; }
.highlight { color: #34d399 !important; text-shadow: 0 0 10px rgba(52,211,153,0.4); }
.highlight-psi { color: #facc15 !important; }

/* Criminals */
.criminal { display: flex; gap: 1rem; align-items: center; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px; margin-bottom: 8px; }
.c-rank { font-size: 1.2rem; font-weight: 900; color: #ef4444; width: 30px; text-align: center; }
.c-info { flex: 1; min-width: 0; }
.c-class { font-family: 'Fira Code', monospace; font-size: 0.75rem; color: #f472b6; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
.c-stats { font-size: 0.65rem; color: var(--muted); }

/* Table Controls */
.toolbar{display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap; margin-bottom: 1.5rem;}
.fbtn{background:rgba(0,0,0,0.2);border:1px solid var(--border);color:#94a3b8;font-size:0.75rem;padding:8px 16px;border-radius:8px;cursor:pointer;transition:all 0.2s;font-weight:500}
.fbtn:hover,.fbtn.active{color:#fff;border-color:var(--accent);background:rgba(0,229,255,0.1);box-shadow:0 0 10px rgba(0,229,255,0.2)}
.search{margin-left:auto;background:rgba(0,0,0,0.2);border:1px solid var(--border);color:#fff;font-size:0.8rem;padding:8px 16px;border-radius:8px;outline:none;width:220px;transition:all 0.2s}
.search:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(0,229,255,0.2)}
.page-size-sel { background: rgba(15, 23, 42, 0.9); color: #fff;  background:rgba(0,0,0,0.2);border:1px solid var(--border);color:#fff;font-size:0.75rem;padding:8px;border-radius:8px;outline:none; cursor:pointer;}

/* Table */
.table-container{border-radius:12px;border:1px solid var(--border);overflow:hidden;background:rgba(0,0,0,0.2);}
table{width:100%;border-collapse:collapse;font-size:0.8rem}
th{background:rgba(0,0,0,0.3);color:var(--muted);text-align:left;padding:12px 16px;border-bottom:1px solid var(--border);font-weight:600;text-transform:uppercase;letter-spacing:1px;font-size:0.7rem;cursor:pointer;user-select:none}
th:hover{color:#fff}
td{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.02);vertical-align:middle;transition:background 0.15s}
tr:hover td{background:rgba(255,255,255,0.05)}
.tw-cell{font-family:'Fira Code',Consolas,monospace;color:#f472b6;font-size:0.75rem;max-width:300px;word-break:break-all}
.aumic-cell{font-family:'Fira Code',Consolas,monospace;color:#38bdf8;font-size:0.75rem;white-space:nowrap;font-weight:600}
.occ-cell{display:flex;align-items:center;gap:10px;font-family:'Fira Code',monospace;font-weight:bold;color:#fff}
.occ-bar{height:6px;border-radius:3px;opacity:0.8}
.badge{font-size:0.65rem;padding:4px 10px;border-radius:999px;border:1px solid;font-weight:800;white-space:nowrap;text-transform:uppercase;letter-spacing:0.5px}

/* Pagination */
.pagination { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgba(0,0,0,0.3); border-top: 1px solid var(--border); }
.pag-controls { display: flex; gap: 6px; align-items: center; background: rgba(15,23,42,0.6); padding: 4px; border-radius: 8px; border: 1px solid var(--border); }
.pag-btn { background: transparent; border: none; color: var(--muted); padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 0.75rem; transition: 0.2s; min-width: 32px; text-align: center; font-weight: 600; }
.pag-btn:hover:not(:disabled) { background: rgba(255,255,255,0.05); color: #fff; }
.pag-btn.active { background: rgba(0,229,255,0.15); color: var(--accent); box-shadow: inset 0 0 0 1px rgba(0,229,255,0.3); }
.pag-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.pag-info { font-size: 0.75rem; color: var(--muted); }
.pag-dots { color: var(--muted); font-size: 0.75rem; font-weight: bold; padding: 0 4px; }

/* Footer */
.footer { position: relative; bottom: 0; left: 0; width: 100%; text-align: center; padding: 20px; font-size: 0.75rem; color: var(--muted); border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.3); backdrop-filter: blur(5px); margin-top: auto; }
.footer a { color: var(--accent); text-decoration: none; font-weight: 600; transition: color 0.2s; }
.footer a:hover { color: #fff; text-shadow: 0 0 10px var(--accent); }
.page-size-sel option { background: #0f172a; color: #fff; }
/* Export & Toast */
.export-group-top { display: flex; gap: 8px; margin-left: auto; align-items: center; } .export-group-top .fbtn { background: rgba(0,229,255,0.05); }
.toast { position: fixed; bottom: 20px; right: 20px; background: rgba(0, 229, 255, 0.15); border: 1px solid var(--accent); color: #fff; padding: 10px 20px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; box-shadow: 0 5px 15px rgba(0,229,255,0.2); backdrop-filter: blur(5px); transform: translateY(100px); opacity: 0; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); z-index: 9999; }
.toast.show { transform: translateY(0); opacity: 1; }
.copyable { cursor: pointer; transition: color 0.2s; position: relative; }
.copyable:hover { color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.5); }
.copyable::after { content: 'Copiar'; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: #fff; font-size: 0.6rem; padding: 2px 6px; border-radius: 4px; opacity: 0; pointer-events: none; transition: opacity 0.2s; }
.copyable:hover::after { opacity: 1; }

/* Sticky Header */
.table-container { overflow-x: auto; }


/* Print PDF (Mesa Directiva) */
@media print {
  body { background: #fff !important; color: #000 !important; padding: 0 !important; font-size: 10pt; }
  #bgCanvas, .toolbar, .pagination, .safe-tag, .export-group-top, .footer, .toast { display: none !important; }
  .content-wrapper { padding: 0 !important; max-width: 100% !important; }
  header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; flex-direction: column !important; align-items: flex-start !important; }
  header h1 { color: #000 !important; text-shadow: none !important; margin: 0; }
  header h1 span { color: #000 !important; }
  
  .dashboard-grid { display: block !important; }
  .sidebar { display: flex !important; flex-direction: row !important; gap: 20px !important; margin-bottom: 20px !important; page-break-inside: avoid; }
  .sidebar .panel { flex: 1; border: 1px solid #cbd5e1 !important; padding: 15px !important; border-radius: 8px !important; }
  
  .panel { background: none !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
  
  .metrics-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; margin-bottom: 20px !important; page-break-inside: avoid; }
  .metric { background: #f8fafc !important; border: 1px solid #cbd5e1 !important; padding: 10px !important; border-radius: 8px !important; }
  .metric h3 { color: #000 !important; text-shadow: none !important; font-size: 1.2rem; margin-bottom: 5px; }
  .metric p { color: #333 !important; font-size: 0.8rem; }
  
  .criteria-box { background: #f8fafc !important; border: 1px solid #cbd5e1 !important; color: #000 !important; }
  .criteria-box strong { color: #000 !important; }
  .criteria-box span { color: #000 !important; font-weight: bold; }
  
  .chart-center-overlay .score { color: #000 !important; text-shadow: none !important; }
  .chart-center-overlay .score-lbl { color: #333 !important; }
  
  .leg-item { color: #000 !important; }
  
  .table-container { max-height: none !important; border: none !important; overflow: visible !important; }
  table { border-collapse: collapse !important; width: 100% !important; page-break-inside: auto; }
  tr { page-break-inside: avoid; page-break-after: auto; }
  th, td { border: 1px solid #cbd5e1 !important; color: #000 !important; padding: 6px !important; font-size: 9pt !important; }
  th { background: #f1f5f9 !important; color: #000 !important; font-weight: bold; }
  .tw-cell, .aumic-cell { color: #000 !important; font-weight: normal; }
  .occ-bar { background: #94a3b8 !important; }
  
  @page { margin: 1cm; size: auto; }
}
}
</style></head><body style="display: flex; flex-direction: column;">

<canvas id="bgCanvas"></canvas>

<div class="content-wrapper">
    <header>
      <div><h1>⚔️ <span>AUM-IC</span> · Centro de Inteligencia</h1>
      <p class="subtitle">Análisis Forense completado exitosamente sin mutación en disco.</p></div>
      <div class="export-group-top" style="display:flex; gap:8px; margin-left: 20px;">
        <button class="fbtn" onclick="exportCSV()">⬇️ CSV</button><button class="fbtn" onclick="exportMD()">⬇️ MD</button><button class="fbtn" onclick="window.print()">🖨️ PDF</button>
      </div>
      <div class="safe-tag" style="align-items: flex-end; display: flex; flex-direction: column;">
        <span>${isSimulate ? 'MODO DRY-RUN ACTIVO' : 'MUTACIÓN AUM-IC COMPLETADA'}</span>
        <span style="font-size: 0.65rem; opacity: 0.8; margin-top: 2px;">v${pkgVersion}</span>
      </div>
    </header>

    <main class="dashboard-grid">
      <aside class="sidebar">
        <article class="panel">
          <h2>Mapeo Estructural</h2>
          <div class="chart-container">
            <canvas id="donutCanvas" width="220" height="220"></canvas>
            <div class="chart-center-overlay">
                <div class="score">${grade}</div>
                <div class="score-lbl">Rank</div>
            </div>
          </div>
          <div class="legend">
            <div class="leg-item"><div class="leg-color" style="background:#22d3ee"></div>Átomos (${counts.atoms})</div>
            <div class="leg-item"><div class="leg-color" style="background:#a78bfa"></div>Moléculas (${counts.molecules})</div>
            <div class="leg-item"><div class="leg-color" style="background:#34d399"></div>Organismos (${counts.organisms})</div>
            <div class="leg-item"><div class="leg-color" style="background:#fb923c"></div>Ecosistemas (${counts.ecosystems})</div>
            <div class="leg-item"><div class="leg-color" style="background:#facc15"></div>Galaxias (${counts.galaxies})</div>
          </div>
          <div class="criteria-box" style="margin-top: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid var(--border); font-size: 0.75rem; color: var(--muted); line-height: 1.5;">
            <strong style="color: #fff; margin-bottom: 0.5rem; display: block;">Criterio de Evaluación AUM-IC</strong>
            <ul style="margin: 0; padding-left: 1rem; list-style: square;">
              <li><span style="color:#22d3ee">Átomos:</span> Utilidades base simples (p-4, m-2, flex).</li>
              <li><span style="color:#a78bfa">Moléculas:</span> Estilos condicionales y variantes (hover:, focus:).</li>
              <li><span style="color:#34d399">Organismos:</span> Cadenas largas y componentes estructurales.</li>
              <li><span style="color:#fb923c">Ecosistemas:</span> Combinaciones de Layouts complejos (Grid/Flex).</li>
              <li><span style="color:#facc15">Galaxias:</span> Declaraciones globales masivas o de alta densidad.</li>
            </ul>
            <div style="margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid rgba(255,255,255,0.1);">
              <strong style="color: #fff; display:block; margin-bottom: 0.3rem;">🏆 Rank (Score) & Eficiencia</strong>
              <div style="margin-bottom: 0.6rem; color: #94a3b8;">La <b>Eficiencia de Refactorización</b> mide el porcentaje exacto de peso (bytes) que AUM-IC logró purgar del DOM frente al HTML inflado original.</div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; font-size: 0.7rem;">
                <span style="background: rgba(250,204,21,0.15); color:#facc15; padding: 3px 6px; border-radius: 4px; border: 1px solid #facc1544;"><b>S</b> ≥ 70%</span>
                <span style="background: rgba(52,211,153,0.15); color:#34d399; padding: 3px 6px; border-radius: 4px; border: 1px solid #34d39944;"><b>A</b> ≥ 50%</span>
                <span style="background: rgba(34,211,238,0.15); color:#22d3ee; padding: 3px 6px; border-radius: 4px; border: 1px solid #22d3ee44;"><b>B</b> ≥ 30%</span>
                <span style="background: rgba(167,139,250,0.15); color:#a78bfa; padding: 3px 6px; border-radius: 4px; border: 1px solid #a78bfa44;"><b>C</b> ≥ 15%</span>
                <span style="background: rgba(239,68,68,0.15); color:#ef4444; padding: 3px 6px; border-radius: 4px; border: 1px solid #ef444444;"><b>D</b> < 15%</span>
              </div>
            </div>
          </div>
        </article>
        
        <article class="panel">
          <h2>☠️ Top 5 Ofensores del DOM</h2>
          ${top5}
        </article>
      </aside>

      <section class="main-view">
        <div class="metrics-grid">
          <div class="metric">
            <h3 class="highlight">🔥 ${savedKB} KB</h3>
            <p>Peso/Tamaño Estimado Salvado</p>
          </div>
          <div class="metric">
            <h3 class="highlight-psi">🚀 +${psiImpact} pts</h3>
            <p>Impacto Estimado Google PSI</p>
          </div>
          <div class="metric">
            <h3>${efficiency}%</h3>
            <p>Eficiencia de Refactorización</p>
          </div>
          <div class="metric">
            <h3>${mapping.size}</h3>
            <p>Clases Únicas Tailwind</p>
          </div>
          <div class="metric">
            <h3>${totalOccurrences}</h3>
            <p>Instancias Totales Detectadas</p>
          </div>
          <div class="metric">
            <h3>${totalOccurrences - mapping.size}</h3>
            <p>Redundancia Estructural (Repetidas)</p>
          </div>
        </div>

        <article class="panel">
          <nav class="toolbar">
            <button class="fbtn active" onclick="filter('all',this)">Todos</button>
            <button class="fbtn" onclick="filter('atoms',this)">Átomos</button>
            <button class="fbtn" onclick="filter('molecules',this)">Moléculas</button>
            <button class="fbtn" onclick="filter('organisms',this)">Organismos</button>
            <button class="fbtn" onclick="filter('ecosystems',this)">Ecosistemas</button>
            <button class="fbtn" onclick="filter('galaxies',this)">Galaxias</button>
            
            <input class="search" type="text" id="searchInput" placeholder="Buscar clase (Regex)..." oninput="search(this.value)">
            <select class="page-size-sel" id="pageSizeSelect" onchange="changePageSize(this.value)">
                <option value="20">20 por pág</option>
                <option value="50">50 por pág</option>
                <option value="100">100 por pág</option>
                <option value="all">TODOS</option>
            </select>
          </nav>
          <section class="table-container">
            <table id="table">
              <thead><tr>
                <th onclick="sortTable(0, 'str')">Clase Original (Tailwind) ↕</th>
                <th onclick="sortTable(1, 'str')">Clase AUM-IC Transmutada ↕</th>
                <th onclick="sortTable(2, 'num')">Frecuencia ↕</th>
                <th onclick="sortTable(3, 'str')">Nivel ↕</th>
              </tr></thead>
              <tbody id="tbody">${rows.join('')}</tbody>
            </table>
            <div class="pagination">
              <span class="pag-info" id="page-info"></span>
              <div class="pag-controls" id="pag-controls"></div>
            </div>
          </section>
          </article>
        </section>
      </main>
  </div>

<div id="toast" class="toast">✔ Copiado al portapapeles</div>
<footer class="footer">
    Forged by <a href="https://ingcrea.com" target="_blank">INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S.</a> | 
    <a href="https://github.com/ingcrea/aumic-tailwind-killer" target="_blank">View on GitHub</a>
</footer>

<script>
// --- MOTOR CANVAS: DONUT CHART ANIMADO ---
const chartData = ${JSON.stringify(chartData)};
const ctxChart = document.getElementById('donutCanvas').getContext('2d');
let totalVal = chartData.reduce((acc, d) => acc + d.value, 0);
if(totalVal === 0) totalVal = 1;
let animationProgress = 0;
let hoveredIndex = -1;
let mousePos = {x: 0, y: 0};

function drawDonut() {
    ctxChart.clearRect(0, 0, 220, 220);
    const cx = 110, cy = 110;
    const baseRadius = 80;
    const innerRadius = 55;
    let currentAngle = -Math.PI / 2;

    for (let i = 0; i < chartData.length; i++) {
        const d = chartData[i];
        if(d.value === 0) continue;
        const sliceAngle = (d.value / totalVal) * (Math.PI * 2) * animationProgress;
        const isHovered = (i === hoveredIndex);
        const outerRadius = isHovered ? baseRadius + 10 : baseRadius;

        ctxChart.beginPath();
        ctxChart.arc(cx, cy, outerRadius, currentAngle, currentAngle + sliceAngle);
        ctxChart.arc(cx, cy, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctxChart.closePath();

        ctxChart.fillStyle = d.color;
        // Hover glow effect
        if (isHovered) {
            ctxChart.shadowBlur = 15;
            ctxChart.shadowColor = d.color;
        } else {
            ctxChart.shadowBlur = 0;
        }
        ctxChart.fill();
        ctxChart.shadowBlur = 0; // reset

        // Store angles for hit detection
        d.startAngle = currentAngle;
        d.endAngle = currentAngle + sliceAngle;
        currentAngle += sliceAngle;
    }

    // Draw tooltip
    if (hoveredIndex > -1 && animationProgress > 0.9) {
        const d = chartData[hoveredIndex];
        const pct = ((d.value / totalVal) * 100).toFixed(1) + '%';
        
        ctxChart.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctxChart.strokeStyle = d.color;
        ctxChart.lineWidth = 1;
        ctxChart.beginPath();
        ctxChart.roundRect(mousePos.x + 15, mousePos.y - 30, 90, 45, 6);
        ctxChart.fill();
        ctxChart.stroke();

        ctxChart.fillStyle = '#fff';
        ctxChart.font = 'bold 12px Inter';
        ctxChart.fillText(pct, mousePos.x + 25, mousePos.y - 10);
        ctxChart.fillStyle = '#cbd5e1';
        ctxChart.font = '10px Inter';
        ctxChart.fillText(d.value + ' items', mousePos.x + 25, mousePos.y + 5);
    }
}

function animateDonut() {
    if (animationProgress < 1) {
        animationProgress += 0.04;
        drawDonut();
        requestAnimationFrame(animateDonut);
    } else {
        drawDonut();
    }
}
animateDonut();

document.getElementById('donutCanvas').addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePos = {x, y};

    const cx = 110, cy = 110;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    let angle = Math.atan2(dy, dx);
    if (angle < -Math.PI / 2) angle += Math.PI * 2;

    let found = -1;
    if (dist >= 55 && dist <= 90) {
        for (let i = 0; i < chartData.length; i++) {
            if (chartData[i].value === 0) continue;
            let start = chartData[i].startAngle;
            let end = chartData[i].endAngle;
            // Normalize angles relative to -PI/2
            let nAngle = angle;
            if (start > Math.PI && nAngle < 0) nAngle += Math.PI * 2;
            if (nAngle >= start && nAngle <= end) {
                found = i; break;
            }
        }
    }
    
    if (found !== hoveredIndex) {
        hoveredIndex = found;
        document.getElementById('donutCanvas').style.cursor = found > -1 ? 'pointer' : 'default';
        drawDonut();
    } else if (found > -1) {
        drawDonut(); // redraw tooltip position
    }
});
document.getElementById('donutCanvas').addEventListener('mouseout', () => {
    hoveredIndex = -1;
    drawDonut();
});


// --- MOTOR CANVAS: FONDO DE NODOS AUM-IC ---
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
const mouse = { x: null, y: null };

function initBackground() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    const numParticles = Math.min(100, Math.floor((width * height) / 15000));
    
    const colors = ['#22d3ee', '#a78bfa', '#34d399'];
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            radius: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}
window.addEventListener('resize', initBackground);
window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

function animateBackground() {
    ctx.clearRect(0, 0, width, height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
    
    // Connect particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i], p2 = particles[j];
            const dx = p1.x - p2.x, dy = p1.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = \`rgba(0, 229, 255, \${0.15 - dist/120 * 0.15})\`;
                ctx.lineWidth = 1.2;
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
        
        // Connect to mouse
        if (mouse.x != null) {
            const dx = particles[i].x - mouse.x, dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.strokeStyle = \`rgba(167, 139, 250, \${0.2 - dist/150 * 0.2})\`;
                ctx.lineWidth = 2.0;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateBackground);
}
initBackground();
animateBackground();


// --- LOGICA DE TABLA (PAGINADOR & ORDEN) ---
let sortAsc = false;
let currentPage = 1;
let pageSize = 20;
let filteredRows = [];
let allRows = [];

window.onload = () => { 
    allRows = Array.from(document.querySelectorAll('#tbody tr'));
    filteredRows = [...allRows];
    sortAsc = true; 
    sortTable(2, 'num'); 
};

function changePageSize(val) {
    if (val === 'all') {
        pageSize = filteredRows.length > 0 ? filteredRows.length : 10000;
    } else {
        pageSize = parseInt(val);
    }
    currentPage = 1;
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageRows = filteredRows.slice(start, end);
    pageRows.forEach(r => tbody.appendChild(r));
    
    const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
    document.getElementById('page-info').textContent = \`Mostrando \${start+1} - \${Math.min(end, filteredRows.length)} de \${filteredRows.length} registros\`;
    
    renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
    const cont = document.getElementById('pag-controls');
    cont.innerHTML = '';
    if (totalPages <= 1) return;

    // Prev Button
    const btnPrev = document.createElement('button');
    btnPrev.className = 'pag-btn';
    btnPrev.textContent = '«';
    btnPrev.disabled = currentPage === 1;
    btnPrev.onclick = () => { currentPage--; renderTable(); };
    cont.appendChild(btnPrev);

    // Page Numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        cont.appendChild(createPageBtn(1));
        if (startPage > 2) { const d = document.createElement('span'); d.className='pag-dots'; d.textContent='...'; cont.appendChild(d); }
    }

    for (let i = startPage; i <= endPage; i++) {
        cont.appendChild(createPageBtn(i));
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) { const d = document.createElement('span'); d.className='pag-dots'; d.textContent='...'; cont.appendChild(d); }
        cont.appendChild(createPageBtn(totalPages));
    }

    // Next Button
    const btnNext = document.createElement('button');
    btnNext.className = 'pag-btn';
    btnNext.textContent = '»';
    btnNext.disabled = currentPage === totalPages;
    btnNext.onclick = () => { currentPage++; renderTable(); };
    cont.appendChild(btnNext);
}

function createPageBtn(num) {
    const btn = document.createElement('button');
    btn.className = 'pag-btn' + (num === currentPage ? ' active' : '');
    btn.textContent = num;
    btn.onclick = () => { currentPage = num; renderTable(); };
    return btn;
}

function sortTable(colIdx, type) {
  sortAsc = !sortAsc;
  filteredRows.sort((a, b) => {
    let valA, valB;
    if (type === 'num') {
      valA = parseInt(a.children[colIdx].getAttribute('data-occ') || '0');
      valB = parseInt(b.children[colIdx].getAttribute('data-occ') || '0');
    } else {
      valA = a.children[colIdx].textContent.trim();
      valB = b.children[colIdx].textContent.trim();
    }
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });
  currentPage = 1;
  renderTable();
}

let activeCat = 'all';
let searchQuery = '';

function filter(cat, btn) {
    document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    activeCat = cat;
    applyFilters();
}

function search(q) {
    searchQuery = q;
    applyFilters();
}

function applyFilters() {
    let regex = null;
    let lq = searchQuery.toLowerCase();
    try { if (searchQuery) regex = new RegExp(searchQuery, 'i'); } catch(e) {}
    
    filteredRows = allRows.filter(r => {
        const catMatch = (activeCat === 'all' || r.getAttribute('data-cat') === activeCat);
        if (!catMatch) return false;
        
        const txt = r.textContent;
        if (!searchQuery) return true;
        if (regex && regex.test(txt)) return true;
        return txt.toLowerCase().includes(lq);
    });
    
    currentPage = 1;
    renderTable();
}

function copyText(el) {
    const text = el.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    });
}

function exportCSV() {
    let csv = "Tailwind Original,AUM-IC Transmutada,Frecuencia,Nivel\\n";
    filteredRows.forEach(r => {
        const cols = r.querySelectorAll('td');
        const orig = cols[0].innerText;
        const aumic = cols[1].innerText;
        const occ = cols[2].querySelector('span').innerText;
        const lvl = cols[3].innerText;
        csv += String.fromCharCode(34) + orig + String.fromCharCode(34) + "," + String.fromCharCode(34) + aumic + String.fromCharCode(34) + "," + occ + "," + String.fromCharCode(34) + lvl + String.fromCharCode(34) + "\\n";
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aumic-report.csv';
    a.click();
}

function exportMD() {
    let md = "| Tailwind Original | AUM-IC Transmutada | Frecuencia | Nivel |\\n|---|---|---|---|\\n";
    filteredRows.forEach(r => {
        const cols = r.querySelectorAll('td');
        const orig = cols[0].innerText.replace(/\|/g, '&#124;');
        const aumic = cols[1].innerText.replace(/\|/g, '&#124;');
        const occ = cols[2].querySelector('span').innerText;
        const lvl = cols[3].innerText;
        md += "| " + orig + " | " + aumic + " | " + occ + " | " + lvl + " |\\n";
    });
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aumic-report.md';
    a.click();
}

document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.id !== 'searchInput') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

</script></body></html>`;

    fs.writeFileSync(reportPath, html);
    return reportPath;
}
const aumicLink = `\x1b]8;;https://github.com/ingcrea/aum-ic\x07AUM-IC\x1b]8;;\x07`;


const TAILWIND_SNIPER_REGEX = /(class(Name)?=|className:|\b(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|disabled:|dark:|flex\b|grid\b|block\b|hidden\b|absolute\b|relative\b|bg-[a-z]+-\d{1,3}|text-[a-z]+-\d{1,3}|p[xytrbl]?-\d|m[xytrbl]?-\d|w-\d|h-\d|gap-\d|border|rounded|shadow|z-\d0|opacity-\d{2}|leading-|tracking-)|@apply|@tailwind)/;

const piscinaPool = new Piscina({ filename: path.join(__dirname, 'worker.js') });
const astEngine = new AstInterceptor(); // Necesario para 'restore' mode

async function run(): Promise<void> {
    const program = new Command();

    program
        .name('aumic-tailwind-killer')
        .description(pc.cyan(`Motor destructivo para transmutar Tailwind a CSS puro (${aumicLink})`))
        .version(pkgVersion)
        .option('-m, --mode <type>', 'Vector de ataque: "local", "clone", o "restore"')
        .option('-u, --url <url>', 'URL objetivo (solo Modo Forense)')
        .option('-d, --depth <depth>', 'Profundidad de clonación: "page" o "site" (solo Modo Forense)')
        .option('-t, --target <dir>', 'Directorio objetivo (por defecto: actual)')
        .option('-s, --scope <path>', 'Ruta de Ataque Quirúrgico (ej. src/components/**/*.tsx)')
        .option('-o, --output <type>', 'Arquitectura de salida: "aumic", "global", "css-modules", "styled-components"')
        .option('--ai <provider>', 'Proveedor IA (openai, claude, gemini, deepseek, xai, alibaba)')
        .option('--key <token>', 'API Key para la IA (requerido si se usa --ai)')
        .option('-c, --concurrency <number>', 'Hilos concurrentes para procesar archivos simultáneamente (Ej. 50)')
        .option('--simulate', 'Simulador de daños (Dry-Run Profiler sin mutar archivos)')
        .option('--no-eradicate', 'Omitir el protocolo de erradicación (desinstalación de Tailwind)')
        .option('--interactive', 'Fuerza el modo interactivo (menú UI)')
        .parse(process.argv);

    const opts = program.opts();
    const hasManualArgs = Object.keys(opts).some(k => k !== 'interactive' && k !== 'eradicate');
    
    // Imprimir siempre la cabecera
    console.log(pc.cyan(pc.bold(`\n⚔️  ${aumicLink} TAILWIND KILLER v${pkgVersion}`)));
    
    let answers: any = {};

    if (!hasManualArgs || opts.interactive) {
        console.log(pc.gray(`Iniciando consola de mando interactiva...\n`));

        answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'mode',
                message: '¿Vector de Ataque?',
                choices: [
                    { name: 'Modo Local (Proyecto en disco completo)', value: 'local' },
                    { name: 'Ataque Quirúrgico (Migración Incremental)', value: 'surgical' },
                    { name: 'Modo Forense (Clonar Web por URL)', value: 'clone' },
                    { name: 'Modo Restauración (Rollback vía aumic-lock.json)', value: 'restore' }
                ]
            },
            {
                type: 'input',
                name: 'scope',
                message: 'Define el glob quirúrgico (ej. src/components/**/*.tsx):',
                when: (ans: any) => ans.mode === 'surgical'
            },
            {
                type: 'input',
                name: 'targetUrl',
                message: 'Ingresa la URL objetivo (ej. https://nexoremoto.com/rescue):',
                when: (ans: any) => ans.mode === 'clone'
            },
            {
                type: 'list',
                name: 'cloneDepth',
                message: '¿Alcance de la clonación?',
                when: (ans: any) => ans.mode === 'clone',
                choices: [
                    { name: 'Solo la página específica (1 Page)', value: 'page' },
                    { name: 'Toda la web recursivamente (Whole Site)', value: 'site' }
                ]
            },
            {
                type: 'input',
                name: 'targetDir',
                message: (ans: any) => ans.mode === 'clone' ? 'Directorio para el clon (ej. ./clone):' : 'Directorio raíz del proyecto (Enter = Actual):',
                default: (ans: any) => ans.mode === 'clone' ? path.join(process.cwd(), 'aumic-clone') : process.cwd()
            },
            {
                type: 'list',
                name: 'outputMode',
                message: '¿Arquitectura de Salida para el CSS?',
                when: (ans: any) => ans.mode !== 'restore',
                choices: [
                    { name: `SCSS Modular AUM-IC (Método Atómico recomendado)`, value: 'aumic' },
                    { name: 'CSS Global (Todo en 1 solo archivo para inyección rápida)', value: 'global' },
                    { name: 'CSS Modules (.module.css) [Fase Beta - Prox. Actualización]', value: 'css-modules' },
                    { name: 'CSS-in-JS (Styled Components) [Fase Beta - Prox. Actualización]', value: 'styled-components' }
                ]
            },
            {
                type: 'input',
                name: 'concurrency',
                message: pc.cyan('Hilos asíncronos concurrentes (Defecto: Auto según Cores CPU):'),
                when: (ans: any) => ans.mode !== 'restore',
                default: ''
            },
            {
                type: 'confirm',
                name: 'simulate',
                message: pc.yellow('¿Activar Simulador de Daños? (Solo genera reporte, no muta archivos)'),
                when: (ans: any) => ans.mode !== 'restore',
                default: false
            },
            {
                type: 'confirm',
                name: 'useAI',
                message: pc.magenta(`¿Deseas Renombramiento Semántico ${aumicLink} usando IA por API? (Sí/No)`),
                when: (ans: any) => ans.mode !== 'restore',
                default: false
            },
            {
                type: 'list',
                name: 'aiProvider',
                message: 'Selecciona el proveedor de IA:',
                when: (ans: any) => ans.useAI,
                choices: [
                    { name: 'OpenAI (Codex / GPT)', value: 'openai' },
                    { name: 'Anthropic (Claude)', value: 'claude' },
                    { name: 'Google (Gemini)', value: 'gemini' },
                    { name: 'DeepSeek', value: 'deepseek' },
                    { name: 'xAI (Grok)', value: 'xai' },
                    { name: 'Alibaba (Qwen)', value: 'alibaba' },
                    { name: 'Ollama (Local / Gratis)', value: 'ollama' }
                ]
            },
            {
                type: 'password',
                name: 'apiKey',
                message: 'Introduce tu API Key (No se guardará):',
                when: (ans: any) => ans.useAI && ans.aiProvider !== 'ollama'
            },
            {
                type: 'confirm',
                name: 'eradicate',
                message: pc.red('¿Ejecutar Protocolo de Erradicación de Tailwind al finalizar?'),
                when: (ans: any) => ans.mode === 'local' && !ans.simulate,
                default: true
            }
        ]);
    } else {
        answers = {
            mode: opts.scope ? 'surgical' : (opts.mode || 'local'),
            scope: opts.scope,
            targetUrl: opts.url,
            cloneDepth: opts.depth || 'page',
            targetDir: opts.target || process.cwd(),
            outputMode: opts.output || 'aumic',
            simulate: !!opts.simulate,
            useAI: !!opts.ai,
            aiProvider: opts.ai,
            apiKey: opts.key,
            eradicate: opts.eradicate,
            concurrency: opts.concurrency
        };
    }

    const TARGET_DIR = path.resolve(answers.targetDir);
    const userConcurrency = (answers.concurrency && !isNaN(parseInt(answers.concurrency, 10))) ? parseInt(answers.concurrency, 10) : (os.cpus().length * 2);
    console.log(pc.gray(`[i] Motores Asíncronos Desplegados: ${userConcurrency} hilos concurrentes.`));

    const startTime = Date.now();
    const logPath = path.join(TARGET_DIR, 'aumic-audit.log');
    fs.writeFileSync(logPath, `=== AUM-IC TAILWIND KILLER AUDIT LOG ===\nDate: ${new Date().toISOString()}\nVersion: ${pkgVersion}\nMode: ${answers.mode}\nTarget: ${TARGET_DIR}\n\n`, 'utf-8');
    const logAudit = (msg: string) => fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`, 'utf-8');
    logAudit('Iniciando orquestador AUM-IC...');


    let twVersion: 3 | 4 = 3;

    if (answers.outputMode === 'css-modules' || answers.outputMode === 'styled-components') {
        console.log(pc.yellow(`\n[!] La arquitectura de salida "${answers.outputMode}" está actualmente en fase Beta y será liberada en el próximo parche.`));
        console.log(pc.cyan(`-> Por favor selecciona "aumic" (SCSS Modular) o "global" temporalmente.\n`));
        process.exit(0);
    }

    if (answers.mode === 'restore') {
        const lockPath = path.join(TARGET_DIR, 'aumic-lock.json');
        if (!fs.existsSync(lockPath)) {
            console.log(pc.red('\n[X] Error: No se encontró aumic-lock.json en el directorio objetivo. Imposible restaurar.\n'));
            return;
        }
        
        let spinner = ora('Modo Restauración: Leyendo aumic-lock.json...').start();
        const lockData = await fs.readJson(lockPath);
        
        spinner.start('Restaurando clases en archivos fuente...');
        const files = await glob('**/*.{astro,tsx,jsx,html,py,rs,php,go,erb,svelte,vue}', { 
            cwd: TARGET_DIR, 
            absolute: true, 
            ignore: ['node_modules/**', 'dist/**', '.git/**', 'target/**', '__pycache__/**', 'venv/**'] 
        });

        
        let restoredCount = 0;
        
        for (const file of files) {
            const content = await fs.readFile(file, 'utf-8');
            try {
                const { newCode } = astEngine.processFrameworkFile(content, file, (twClass) => {
                    return lockData[twClass] || twClass;
                });
                if (newCode !== content) {
                    await fs.writeFile(file, newCode, 'utf-8');
                    restoredCount++;
                }
            } catch (e) {}
        }
        spinner.succeed(`Se restauraron las clases originales en ${restoredCount} archivos.`);
        
        spinner.start('Restaurando dependencias y configuraciones...');
        try {
            const pkgBakPath = path.join(TARGET_DIR, 'package.json.aumic-bak');
            if (fs.existsSync(pkgBakPath)) {
                fs.copyFileSync(pkgBakPath, path.join(TARGET_DIR, 'package.json'));
                fs.removeSync(pkgBakPath);
            }

            ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs'].forEach(conf => {
                const bakPath = path.join(TARGET_DIR, `${conf}.aumic-bak`);
                if (fs.existsSync(bakPath)) {
                    fs.renameSync(bakPath, path.join(TARGET_DIR, conf));
                }
            });
            execSync('npm install', { cwd: TARGET_DIR, stdio: 'ignore' });
            spinner.succeed('Entorno restaurado: Tailwind y dependencias rehidratadas exactamente como estaban.');
        } catch (e) {
            spinner.warn('Hubo un problema reinstalando dependencias desde el package.json restaurado.');
        }
        
        console.log(pc.green(pc.bold(`\n[✔] PROYECTO RESTAURADO CON ÉXITO A SU ESTADO ORIGINAL.\n`)));
        return;
    }

    if (answers.mode === 'clone') {
        let spinner = ora(`Modo Forense: Infiltrando ${answers.targetUrl}...`).start();
        await WebCloner.cloneWebsite(answers.targetUrl, TARGET_DIR, answers.cloneDepth);
        spinner.succeed(`Extracción completada (${answers.cloneDepth}). Archivos anclados en ${TARGET_DIR}.`);
        
        spinner.start('Analizando firma de Tailwind...');
        const isTw = await WebCloner.isTailwindPowered(TARGET_DIR);
        if (!isTw) {
            spinner.warn('La web clonada no parece utilizar Tailwind CSS. Se aborta la mutación.');
            return;
        }
        spinner.succeed('Firma de Tailwind confirmada. Iniciando transmutación.');
    } else {
        twVersion = await detectTailwindVersion(TARGET_DIR);
    }
    
    let spinner = ora('Fase 1: Escaneando y extrayendo utilidades...').start();

    const globPattern = answers.mode === 'surgical' && answers.scope ? answers.scope : '**/*.{astro,tsx,jsx,html,py,rs,php,go,erb,svelte,vue}';
    let files: string[] = [];

    // [Mejora] Escáner Infrarrojo (Git LS-Files Fast Path)
    if (!answers.scope) {
        try {
            const gitOut = execSync('git ls-files "*.astro" "*.tsx" "*.jsx" "*.html" "*.py" "*.rs" "*.php" "*.go" "*.erb" "*.svelte" "*.vue"', { cwd: TARGET_DIR, stdio: 'pipe' }).toString();
            files = gitOut.split('\n').map(file => path.join(TARGET_DIR, file.trim())).filter(file => file.length > TARGET_DIR.length && fs.existsSync(file));
        } catch (e) {
            // No es un repo Git o Git no está instalado. Caerá al glob abajo.
        }
    }

    logAudit(`Motor Infrarrojo (Git) devolvió ${files.length} archivos.`);
    if (files.length === 0) {
        files = await glob(globPattern, { 
            cwd: TARGET_DIR, 
            absolute: true, 
            ignore: ['node_modules/**', 'dist/**', '.git/**', 'target/**', '__pycache__/**', 'venv/**'] 
        });
        logAudit(`Glob Scanner devolvió ${files.length} archivos.\nARCHIVOS:\n${files.join('\n')}`);
    }

    // [Mejora] Pre-Flight Check (Auditoría Anti-Zombie)
    if (answers.mode !== 'restore' && answers.mode !== 'clone') {
        spinner.start('Auditoría de seguridad (Pre-Flight Check) sobre permisos POSIX/NTFS...');
        const lockedFiles: string[] = [];
        await runConcurrent(files, 50, async (file) => {
            try { await fs.access(file, fs.constants.W_OK); } catch (e) { lockedFiles.push(file); }
        });

        if (lockedFiles.length > 0) {
            logAudit(`[ERROR] Pre-Flight Check falló. Archivos bloqueados: ${lockedFiles.join(', ')}`);
            spinner.fail(pc.red(`\u2716 ERROR CRÍTICO: Pre-Flight Check abortó la misión.`));
            console.log(pc.yellow(`El sistema operativo deniega permisos de escritura en ${lockedFiles.length} archivo(s).`));
            console.log(pc.gray(`Si el motor ignorara esto, tu proyecto podría quedar en un estado corrupto (mitad Tailwind, mitad AUM-IC) durante la Fase 3.`));
            console.log(pc.red(`\nArchivos bloqueados detectados:`));
            lockedFiles.slice(0, 5).forEach(file => console.log(pc.red(` - ${file}`)));
            if (lockedFiles.length > 5) console.log(pc.red(`   ... y ${lockedFiles.length - 5} más.`));
            console.log(pc.cyan(`\n[SOLUCIÓN REQUERIDA]:`));
            console.log(pc.cyan(` 1. Windows: Ejecuta tu terminal o editor como Administrador.`));
            console.log(pc.cyan(` 2. Linux/Mac: Verifica los permisos con 'chmod +w' en las carpetas, o usa 'sudo'.`));
            console.log(pc.cyan(` 3. Servidores: Asegúrate de que ningún proceso de desarrollo en vivo (Next.js/Vite) tenga los archivos bloqueados.`));
            process.exit(1);
        }
        spinner.succeed('Auditoría Pre-Flight superada. Permisos NTFS/POSIX validados para reescritura masiva.');
        logAudit('[PRE-FLIGHT] Superado con éxito. Permisos W_OK validados en todos los archivos.');
    }



    
    const globalExtracted = new Map<string, { category: string; component: string; occurrences: number }>();
    const vramCache = new Map<string, string>(); // Level 1: RAM Cache


    spinner.succeed(`Listos ${files.length} archivos para escanear.`);
    const scanBar = new cliProgress.SingleBar({
        format: pc.cyan('Fase 1 [Extracción] {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total} Archivos',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    scanBar.start(files.length, 0);
    let p1Skipped = 0;

    const scanConcurrency = userConcurrency;
    await runConcurrent(files, scanConcurrency, async (file) => {
        const content = await fs.readFile(file, 'utf-8');
        vramCache.set(file, content); 
        
        if (!TAILWIND_SNIPER_REGEX.test(content)) {
            p1Skipped++;
            scanBar.increment();
            return;
        }

        const fileClass = classifyComponent(file);
        try {
            const extractedEntries = await piscinaPool.run({ mode: 'scan', content, filePath: file });
            for (const [twClass, count] of extractedEntries) {
                const existing = globalExtracted.get(twClass);
                if (existing) {
                    existing.occurrences += count;
                } else {
                    globalExtracted.set(twClass, { ...fileClass, occurrences: count });
                }
            }
        } catch (e: any) { logAudit(`[ERROR PISCINA F1] ${e.message}`); }
        scanBar.increment();
    });
    scanBar.stop();
    logAudit(`[FASE 1] Escaneo finalizado. Archivos extraídos por Babel: ${files.length - p1Skipped}. Ignorados por Francotirador Regex: ${p1Skipped}`);

    if (globalExtracted.size === 0) {
        spinner.warn('No se encontraron utilidades de Tailwind.');
        return;
    }
    spinner.succeed(`Se extrajeron ${globalExtracted.size} bloques únicos de Tailwind.`);

      // --- NUEVO: JIT VALIDATOR PASS (Zero-Bloat Seguro) ---
      spinner.start('Verificando clases nativas de Tailwind vs Custom CSS (JIT Validator)...');
      const allUniqueTokens = new Set<string>();
      for (const orig of globalExtracted.keys()) {
          orig.split(' ').forEach(t => { if (t.trim() && !t.includes('aumic-')) allUniqueTokens.add(t.trim()); });
      }
      const testHtml = Array.from(allUniqueTokens).map(t => `<div class="${t}"></div>`).join('\n');
      
        const configPath = require('fs').existsSync(require('path').resolve(TARGET_DIR, 'tailwind.config.js')) ? require('path').resolve(TARGET_DIR, 'tailwind.config.js') : (require('fs').existsSync(require('path').resolve(TARGET_DIR, 'tailwind.config.mjs')) ? require('path').resolve(TARGET_DIR, 'tailwind.config.mjs') : null);
        if (configPath) {
            try {
                const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                userConfig = (await dynamicImport(require('url').pathToFileURL(configPath).href)).default || require(configPath);
            } catch(e) {
                try { 
                    userConfig = require(configPath); 
                } catch(err) {
                    try {
                        const fsExt = require('fs');
                        const tempPath = configPath + '.mjs';
                        let raw = fsExt.readFileSync(configPath, 'utf8');
                        raw = raw.replace(/module\.exports\s*=\s*/, 'export default ');
                        fsExt.writeFileSync(tempPath, raw, 'utf8');
                        const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                        userConfig = (await dynamicImport(require('url').pathToFileURL(tempPath).href)).default;
                        fsExt.unlinkSync(tempPath);
                    } catch (fatal) {
                        console.log('[AUM-IC] Fallo al cargar Tailwind Config:', (fatal as any).message);
                    }
                }
            }
        }
        
        let mergedConfig = { content: [{ raw: testHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} };

        let testPlugin;
        try {
            testPlugin = require('tailwindcss')(mergedConfig);
        } catch(e) {
            testPlugin = require('tailwindcss');
        }
      const testJit = await postcss([testPlugin]).process(`@tailwind utilities;`, { from: undefined });
      const testRoot = postcss.parse(testJit.css);
      const validTwClasses = new Set<string>();
      testRoot.walkRules((rule) => {
          const allTokensArr = Array.from(allUniqueTokens);
          for (const token of allTokensArr) {
              const escaped = '.' + escapeCssSelector(token);
              if (rule.selector.includes(escaped)) {
                  validTwClasses.add(token);
              }
          }
      });
      spinner.succeed(`Filtro JIT completado: ${validTwClasses.size} utilidades nativas reconocidas.`);



    
    spinner.start('Analizando entorno y dependencias de Tailwind...');
    const envStatus = { version: 3, usesAstro: false, usesVite: false, usesPostcss: false, importsPreflight: false, importsUtilities: false, cssEntrypoint: '' as string | null };
    
    try {
        const p = require(path.join(TARGET_DIR, 'package.json'));
        const deps = { ...(p.dependencies || {}), ...(p.devDependencies || {}) };
        if (deps['tailwindcss']) envStatus.version = deps['tailwindcss'].startsWith('^4') || deps['tailwindcss'].startsWith('4') ? 4 : 3;
        else if (deps['@tailwindcss/vite'] || deps['@tailwindcss/postcss']) envStatus.version = 4;
        
        envStatus.usesAstro = !!deps['@astrojs/tailwind'];
        envStatus.usesVite = !!deps['@tailwindcss/vite'];
        envStatus.usesPostcss = !!deps['@tailwindcss/postcss'];
    } catch(e) {}

    const rootCssFiles = await glob('**/*.{css,scss,sass,less,pcss}', { cwd: TARGET_DIR, absolute: true, ignore: ['node_modules/**', 'dist/**', 'public/**'] });
    for (const file of rootCssFiles) {
        const c = await fs.readFile(file, 'utf-8');
        if (c.includes('@tailwind') || c.includes('tailwindcss')) {
            envStatus.cssEntrypoint = file;
            if (c.includes('@tailwind base') || c.includes('tailwindcss/preflight') || c.includes('@import "tailwindcss"')) envStatus.importsPreflight = true;
            if (c.includes('@tailwind utilities') || c.includes('tailwindcss/utilities') || c.includes('@import "tailwindcss"')) envStatus.importsUtilities = true;
        }
    }

    if (envStatus.usesAstro) {
        envStatus.importsPreflight = true;
        envStatus.importsUtilities = true;
    }
    
    spinner.succeed(pc.cyan(`Entorno JIT DinÃ¡mico: Tailwind v${envStatus.version} | Preflight: ${envStatus.importsPreflight ? 'Activo' : 'Inactivo'} | IntegraciÃ³n: ${envStatus.usesVite ? 'Vite' : envStatus.usesAstro ? 'Astro' : 'PostCSS'}`));

    const classMapping = new Map<string, { original: string, array: string[], tailwindOnlyArray: string[], customArray: string[], aumicClass: string, replacementString: string, category: string, component: string, occurrences: number }>();
    
    let customRules = '';
    const rcPath = path.join(TARGET_DIR, '.aumicrc.json');
    if (fs.existsSync(rcPath)) {
        try {
            const rc = await fs.readJson(rcPath);
            if (rc.rules) customRules = rc.rules;
            console.log(pc.yellow(`[i] Reglas personalizadas cargadas desde .aumicrc.json`));
        } catch(e) {}
    }

    if (answers.useAI && (answers.apiKey || answers.aiProvider === 'ollama')) {
        const memoryPath = path.join(TARGET_DIR, '.aumic-memory.json');
        let memoryCache: Record<string, string> = {};
        if (fs.existsSync(memoryPath)) {
            try { memoryCache = await fs.readJson(memoryPath); } catch(e) {}
        }

        const utilitiesArray = Array.from(globalExtracted.keys());
        const missingUtilities = utilitiesArray.filter(u => !memoryCache[u]);

        let newMapping: Record<string, string> = {};
        if (missingUtilities.length > 0) {
            spinner.start(pc.magenta(`Titanium Cache Miss: Conectando con ${answers.aiProvider.toUpperCase()} para bautizar ${missingUtilities.length} clases nuevas...`));
            const aiEngine = new AIEngine(answers.aiProvider as AIProvider, answers.apiKey || 'ollama-local');
            const res = await aiEngine.generateSemanticNames({ utilities: missingUtilities, customRules });
            newMapping = res.mapping;
            spinner.succeed(pc.magenta(`Bautizo semántico ${aumicLink} completado.`));
        } else {
            spinner.succeed(pc.cyan(`Titanium Cache Hit: 100% de las clases resueltas desde memoria local (.aumic-memory.json)`));
        }

        // Fusionar memoria y nuevo mapeo
        const finalMapping = { ...memoryCache, ...newMapping };
        await fs.writeJson(memoryPath, finalMapping, { spaces: 2 });
        
        for (const [orig, { category, component, occurrences }] of globalExtracted) {
            const cleanAumic = finalMapping[orig] || `aumic-ai-${component}-${getHash(orig)}`;
            
            const fullArray = orig.split(' ');
            const twArray = fullArray.filter(c => validTwClasses.has(c));
            const customArray = fullArray.filter(c => !validTwClasses.has(c));
            const repString = customArray.length > 0 ? (twArray.length > 0 ? cleanAumic + ' ' + customArray.join(' ') : customArray.join(' ')) : cleanAumic;
            if (twArray.length > 0) {
                classMapping.set(orig, { original: orig, array: fullArray, tailwindOnlyArray: twArray, customArray, aumicClass: cleanAumic, replacementString: repString, category, component, occurrences });
            }

        }
    } else {
        spinner.start('Generando hashes deterministas...');
        const levelPrefix: Record<string, string> = {
            atoms: 'atom',
            molecules: 'molecule',
            organisms: 'organism',
            ecosystems: 'ecosystem',
            galaxies: 'galaxy'
        };
        for (const [orig, { category, component, occurrences }] of globalExtracted) {
            const prefix = levelPrefix[category] || 'molecule';
            
            const fullArray = orig.split(' ');
            const twArray = fullArray.filter(c => validTwClasses.has(c));
            const customArray = fullArray.filter(c => !validTwClasses.has(c));
            const hashAumic = `aumic-${prefix}-${component}-${getHash(orig)}`;
            const repString = customArray.length > 0 ? (twArray.length > 0 ? hashAumic + ' ' + customArray.join(' ') : customArray.join(' ')) : hashAumic;
            if (twArray.length > 0) {
                classMapping.set(orig, { original: orig, array: fullArray, tailwindOnlyArray: twArray, customArray, aumicClass: hashAumic, replacementString: repString, category, component, occurrences });
            }

        }
        spinner.succeed('Hashes generados.');
    }

    if (answers.simulate) {
        spinner.start('Simulador activo: Generando reporte de impacto...');
        const reportPath = generateReport(classMapping, TARGET_DIR, true);
        spinner.succeed(`Simulación finalizada. Reporte generado en: ${reportPath}`);
        console.log(pc.green(pc.bold(`\n[✔] DRY-RUN COMPLETADO. No se mutaron archivos.\n`)));
        
        const openReport = await inquirer.prompt([{
            type: 'confirm',
            name: 'open',
            message: '¿Deseas abrir el reporte en tu navegador predeterminado?',
            default: true
        }]);

        if (openReport.open) {
            const platform = os.platform();
            if (platform === 'win32') exec(`start "" "${reportPath}"`);
            else if (platform === 'darwin') exec(`open "${reportPath}"`);
            else exec(`xdg-open "${reportPath}"`);
        }
        
        return; // Salimos antes de mutar
    }

    spinner.start('Fase 3: Mutando archivos fuente...');
    let modifiedFiles = 0;

    spinner.succeed(`Iniciando mutación concurrente en ${files.length} archivos...`);
    const mutBar = new cliProgress.SingleBar({
        format: pc.red('Fase 3 [Mutación]   {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total} Archivos',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    mutBar.start(files.length, 0);
    let p3Skipped = 0;

    const mutConcurrency = userConcurrency;
    // Serializar el mapa para enviarlo a los hilos trabajadores
    const serializableMap: Record<string, any> = {};
    for (const [key, val] of classMapping.entries()) {
        serializableMap[key] = val;
    }

    await runConcurrent(files, mutConcurrency, async (file) => {
        const content = vramCache.get(file) || await fs.readFile(file, 'utf-8');
        vramCache.delete(file); // Anti-OOM GC: Purgar de memoria RAM post-lectura
        
        if (!TAILWIND_SNIPER_REGEX.test(content)) {
            p3Skipped++;
            mutBar.increment();
            return;
        }

        try {
            const newCode = await piscinaPool.run({ mode: 'mutate', content, filePath: file, map: serializableMap });

            if (newCode !== content) {
                await fs.writeFile(file, newCode, 'utf-8');
                modifiedFiles++;
            }
        } catch (e: any) {
            logAudit(`[ERROR PISCINA F3] ${e.message}`);
        }
        mutBar.increment();
    });
    mutBar.stop();
    logAudit(`[FASE 3] Mutación finalizada. Archivos ignorados por carecer de CSS: ${p3Skipped}. Archivos físicamente mutados: ${modifiedFiles}`);
    spinner.succeed(`${modifiedFiles} archivos fuente mutados estructuralmente.`);

    const categoryRoots: Record<string, Root> = {
        atoms: postcss.root(), molecules: postcss.root(), organisms: postcss.root(), ecosystems: postcss.root(), galaxies: postcss.root()
    };
    const globalRoot = postcss.root();

    const utilityToAumic = new Map<string, { aumicClass: string, category: string }[]>();
    for (const [_, mapping] of classMapping) {
        const cat = mapping.category || 'molecules';
        for (const util of mapping.tailwindOnlyArray) {
            const escaped = '.' + escapeCssSelector(util);
            const list = utilityToAumic.get(escaped) || [];
            list.push({ aumicClass: mapping.aumicClass, category: cat });
            utilityToAumic.set(escaped, list);
        }
    }

    // Theme Harvester (Extractor de Variables Nativas)
    let themeVars = '';
    if (answers.mode === 'local') {
        try {
            const twConfigPath = path.join(TARGET_DIR, 'tailwind.config.js');
            if (fs.existsSync(twConfigPath)) {
                spinner.start('Theme Harvester: Extrayendo configuración nativa de Tailwind...');
                const content = fs.readFileSync(twConfigPath, 'utf8');
                // Regex básico para cazar colores hexadecimales (extractor seguro sin require completo)
                const colorMatches = [...content.matchAll(/['"]([a-zA-Z0-9-]+)['"]\s*:\s*['"](#[0-9a-fA-F]{3,8})['"]/g)];
                if (colorMatches.length > 0) {
                    themeVars = ':root {\n';
                    colorMatches.forEach(match => {
                        themeVars += `  --color-${match[1]}: ${match[2]};\n`;
                    });
                    themeVars += '}\n\n';
                }
                spinner.succeed('Theme Harvester: Colores extraídos a variables CSS nativas.');
            }
        } catch(e) {}
    }

    if (answers.mode === 'clone') {
        spinner.start(`Fase 4: Mutando hojas de estilo CSS extranjeras (Modo Forense)...`);
        const cssFiles = await glob('**/*.css', { cwd: TARGET_DIR, absolute: true });
        for (const cssFile of cssFiles) {
            const cssContent = await fs.readFile(cssFile, 'utf-8');
            const cssAst = postcss.parse(cssContent);
            
            cssAst.walkRules((rule: Rule) => {
                for (const [escapedUtil, targets] of utilityToAumic) {
                    if (rule.selector.includes(escapedUtil)) {
                        rule.selector = rule.selector.replace(escapedUtil, `.${targets[0].aumicClass}`);
                    }
                }
            });
            await fs.writeFile(cssFile, cssAst.toString(), 'utf-8');
        }
        spinner.succeed(`CSS extranjero hackeado y reescrito a la doctrina ${aumicLink}.`);
    } else {
        spinner.start(`Fase 4: Ejecutando L1 Cache (DuckDB) y delegando L2 (JIT v${twVersion})...`);
        
        // --- L1 DUCKDB CACHE ---
        const duckdb = require('duckdb');
        const dbPath = path.join(__dirname, '../aumic-lexicon.duckdb');
        const db = new duckdb.Database(dbPath);
        
        let l1Css = '';
        let unresolvedClasses = new Set<string>();
        
        const allTwClasses = new Set<string>();
        for (const map of classMapping.values()) {
            map.tailwindOnlyArray.forEach(cls => allTwClasses.add(cls));
        }

        const classArray = Array.from(allTwClasses);
        const l1Promises = classArray.map(cls => {
            return new Promise<void>((resolve) => {
                db.all("SELECT css FROM tw_lexicon WHERE version = ? AND class = ?", [twVersion, cls], (err: any, rows: any[]) => {
                    if (err || rows.length === 0) {
                        unresolvedClasses.add(cls);
                    } else {
                        l1Css += `\n/* tw: ${cls} (L1) */\n.${escapeCssSelector(cls)} { ${rows[0].css} }\n`;
                    }
                    resolve();
                });
            });
        });
        await Promise.all(l1Promises);
        db.close();

        // --- L2 DYNAMIC JIT ---
        const virtualHtml = Array.from(unresolvedClasses).map(cls => `<div class="${cls}"></div>`).join('\n');
        
        const projectTwPath = path.join(TARGET_DIR, 'node_modules', 'tailwindcss');
        let twPlugin;
        if (fs.existsSync(projectTwPath)) {
            twPlugin = require(projectTwPath)({ content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} });
        } else {
            twPlugin = require('tailwindcss')({ content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} });
        }

        await piscinaPool.destroy();
        const jitResult = await postcss([twPlugin]).process(`@tailwind utilities;`, { from: undefined });
        const root = postcss.parse(l1Css + '\n' + jitResult.css);
        
            // =======================================
            // AUM-IC PREFLIGHT INJECTOR
            // =======================================
            let preflightCss = '';
            if (envStatus.importsPreflight) {
            try {
                let pfPlugin;
                if (fs.existsSync(projectTwPath)) {
                    pfPlugin = require(projectTwPath)({ content: [{raw: '<div class="a"></div>', extension: 'html'}], theme: userConfig.theme || {} });
                } else {
                    pfPlugin = require('tailwindcss')({ content: [{raw: '<div class="a"></div>', extension: 'html'}], theme: userConfig.theme || {} });
                }
                const pfRes = await postcss([pfPlugin]).process('@tailwind base;', { from: undefined });
                preflightCss = pfRes.css;
            } catch(e) {
                console.warn("No se pudo extraer Preflight.");
            }
            } // end if importsPreflight
            if (preflightCss) {
                const pfAst = postcss.parse(preflightCss);
                globalRoot.prepend(pfAst);
            }

          root.walkRules((rule: Rule) => {
            for (const [escapedUtil, targets] of utilityToAumic) {
                if (rule.selector.includes(escapedUtil)) {
                    for (const target of targets) {
                        const clonedRule = rule.clone();
                        clonedRule.selector = clonedRule.selector.replace(escapedUtil, `.${target.aumicClass}`);
                        const targetRoot = answers.outputMode === 'aumic' ? categoryRoots[target.category] : globalRoot;
                        if (rule.parent && rule.parent.type === 'atrule') {
                            const parentAtRule = rule.parent as AtRule;
                            const clonedAtRule = postcss.atRule({ name: parentAtRule.name, params: parentAtRule.params });
                            clonedAtRule.append(clonedRule);
                            targetRoot.append(clonedAtRule);
                        } else {
                            targetRoot.append(clonedRule);
                        }
                    }
                }
            }
        });

        
        if (answers.outputMode === 'global') {
            const outPath = path.join(TARGET_DIR, 'src', 'styles');
            require('fs-extra').ensureDirSync(outPath);
            await fs.writeFile(path.join(outPath, 'aumic-styles.css'), themeVars + globalRoot.toString(), 'utf-8');
            
            const globalScss = path.join(outPath, 'global.scss');
            if (fs.existsSync(globalScss)) {
                let scss = fs.readFileSync(globalScss, 'utf8');
                if (!scss.includes('aumic-styles')) {
                    fs.writeFileSync(globalScss, scss + '\n@import "./aumic-styles.css";\n', 'utf8');
                }
            }
        } else {

            for (const [cat, cssRoot] of Object.entries(categoryRoots)) {
                if (cssRoot.nodes && cssRoot.nodes.length > 0) {
                    const dir = path.join(TARGET_DIR, 'src', 'styles', cat);
                    await fs.ensureDir(dir);
                    let fileContent = cssRoot.toString();
                    if (cat === 'atoms' && themeVars) fileContent = themeVars + fileContent; // Inyectar themeVars en atoms
                    await fs.writeFile(path.join(dir, `_${cat}.scss`), fileContent, 'utf-8');
                }
            }
        }
        spinner.succeed('JIT finalizado y CSS fusionado matemáticamente.');
    }

    const lockfileData: Record<string, string> = {};
    for (const [_, map] of classMapping) lockfileData[map.aumicClass] = map.original;
    await fs.writeJson(path.join(TARGET_DIR, 'aumic-lock.json'), lockfileData, { spaces: 2 });
    console.log(pc.blue(`\n[i] Mapa reverso generado en aumic-lock.json`));

    if (answers.mode === 'local' && answers.eradicate !== false) {
        spinner.start(pc.red('Fase 5: Erradicando dependencias de Tailwind...'));
        try {
            const pkgPath = path.join(TARGET_DIR, 'package.json');
            if (fs.existsSync(pkgPath)) {
                fs.copyFileSync(pkgPath, `${pkgPath}.aumic-bak`);
            }

            ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs'].forEach(conf => {
                const confPath = path.join(TARGET_DIR, conf);
                if (fs.existsSync(confPath)) {
                    fs.renameSync(confPath, `${confPath}.aumic-bak`);
                }
            });
            // ==========================================
            // UNIVERSAL TAILWIND ERADICATOR (v1 - v4)
            // ==========================================
            
            // 1. Respaldar y neutralizar archivos de configuraciÃ³n (v1, v2, v3)
            const twConfigFiles = ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs', 'tailwind.js'];
            twConfigFiles.forEach(conf => {
                const confPath = require('path').join(TARGET_DIR, conf);
                if (fs.existsSync(confPath)) fs.renameSync(confPath, `${confPath}.aumic-bak`);
            });

            // 2. Limpieza de Integradores (v4 Vite, Astro, PostCSS)
            const integrations = [
                { file: 'astro.config.mjs', regex: /import\s+tailwind\s+from\s+['"]@astrojs\/tailwind['"];?\n?/, regex2: /tailwind\(\)\s*,?/ },
                { file: 'astro.config.ts', regex: /import\s+tailwind\s+from\s+['"]@astrojs\/tailwind['"];?\n?/, regex2: /tailwind\(\)\s*,?/ },
                { file: 'vite.config.js', regex: /import\s+tailwindcss\s+from\s+['"]@tailwindcss\/vite['"];?\n?/, regex2: /tailwindcss\(\)\s*,?/ },
                { file: 'vite.config.ts', regex: /import\s+tailwindcss\s+from\s+['"]@tailwindcss\/vite['"];?\n?/, regex2: /tailwindcss\(\)\s*,?/ }
            ];
            
            integrations.forEach(intg => {
                const intgPath = require('path').join(TARGET_DIR, intg.file);
                if (fs.existsSync(intgPath)) {
                    let c = fs.readFileSync(intgPath, 'utf8');
                    c = c.replace(intg.regex, '');
                    c = c.replace(intg.regex2, '');
                    fs.writeFileSync(intgPath, c, 'utf8');
                }
            });

            // 3. DesinstalaciÃ³n DinÃ¡mica Universal (Identifica dependencias exactas en package.json)
            try {
                const pkg = require(require('path').join(TARGET_DIR, 'package.json'));
                const allDeps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
                const targets = ['tailwindcss', '@tailwindcss/vite', '@tailwindcss/postcss', '@tailwindcss/cli', '@astrojs/tailwind'];
                
                // Si encontramos tailwind v1 o v2, muchas veces se usaba autoprefixer a la par estrictamente.
                if (allDeps['tailwindcss'] && (allDeps['tailwindcss'].startsWith('^1') || allDeps['tailwindcss'].startsWith('^2'))) {
                    // Solo como heurÃ­stica
                }
                
                const toUninstall = targets.filter(t => allDeps[t]);
                if (toUninstall.length > 0) {
                    require('child_process').execSync(`npm uninstall ${toUninstall.join(' ')}`, { cwd: TARGET_DIR, stdio: 'ignore' });
                }
            } catch(e) {}
            spinner.succeed(pc.green('Tailwind ha sido purgado completamente. (Configuraciones y package.json respaldados en .aumic-bak)'));
        } catch (e) {
            spinner.warn('Fallo menor en desinstalación (probablemente ya no existía en el package.json).');
        }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logAudit(`[EJECUCIÓN] Operación completada exitosamente en ${duration} segundos.`);
    console.log(pc.green(pc.bold(`\n[✔] PROYECTO TRANSMUTADO A LA DOCTRINA ${aumicLink}. (v${pkgVersion})\n`)));

    // Generate Final Report
    spinner.start('Generando reporte post-mortem...');
    const postReportPath = generateReport(classMapping, TARGET_DIR, false);
    spinner.succeed(`Reporte post-mutación generado en: ${postReportPath}`);

    const openReport = await inquirer.prompt([{
        type: 'confirm',
        name: 'open',
        message: '¿Deseas abrir el reporte de la mutación en tu navegador?',
        default: true
    }]);

    if (openReport.open) {
        const platform = os.platform();
        if (platform === 'win32') exec(`start "" "${postReportPath}"`);
        else if (platform === 'darwin') exec(`open "${postReportPath}"`);
        else exec(`xdg-open "${postReportPath}"`);
    }
}

run().catch(console.error);
