import fs from 'fs-extra';
import { glob } from 'glob';
import postcss, { Rule, AtRule, Root } from 'postcss';
import crypto from 'crypto';
import path from 'path';
import inquirer from 'inquirer';
import pc from 'picocolors';
import ora from 'ora';
import { execSync } from 'child_process';
import { Command } from 'commander';
import { AstInterceptor } from './ast/parser';
import { AIEngine, AIProvider } from './ai/provider';
import { WebCloner } from './core/scraper';

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

function classifyComponent(fileName: string): string {
    const name = path.basename(fileName, path.extname(fileName)).toLowerCase();
    if (/(button|icon|input|badge|link|label)/.test(name)) return 'atoms';
    if (/(card|form|dropdown|menu|list|modal)/.test(name)) return 'molecules';
    if (/(header|footer|sidebar|hero|table|nav)/.test(name)) return 'organisms';
    if (/(main|section|article|page|layout|index)/.test(name)) return 'ecosystems';
    return 'molecules';
}

const aumicLink = `\x1b]8;;https://github.com/ingcrea/aum-ic\x07AUM-IC\x1b]8;;\x07`;

async function run(): Promise<void> {
    const program = new Command();

    program
        .name('aumic-tailwind-killer')
        .description(pc.cyan(`Motor destructivo para transmutar Tailwind a CSS puro (${aumicLink})`))
        .version('2.0.6')
        .option('-m, --mode <type>', 'Vector de ataque: "local" o "clone"')
        .option('-u, --url <url>', 'URL objetivo (solo Modo Parásito)')
        .option('-d, --depth <depth>', 'Profundidad de clonación: "page" o "site" (solo Modo Parásito)')
        .option('-t, --target <dir>', 'Directorio objetivo (por defecto: actual)')
        .option('-o, --output <type>', 'Arquitectura de salida: "modular" o "global"')
        .option('--ai <provider>', 'Proveedor IA (openai, claude, gemini, deepseek, xai, alibaba)')
        .option('--key <token>', 'API Key para la IA (requerido si se usa --ai)')
        .option('--no-eradicate', 'Omitir el protocolo de erradicación (desinstalación de Tailwind)')
        .option('--interactive', 'Fuerza el modo interactivo (menú UI)')
        .parse(process.argv);

    const opts = program.opts();
    const hasManualArgs = Object.keys(opts).some(k => k !== 'interactive' && k !== 'eradicate');
    
    let answers: any = {};

    if (!hasManualArgs || opts.interactive) {
        console.log(pc.cyan(pc.bold(`\n⚔️  ${aumicLink} TAILWIND KILLER v2.0.6`)));
        console.log(pc.gray(`Iniciando consola de mando...\n`));

        answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'mode',
                message: '¿Vector de Ataque?',
                choices: [
                    { name: 'Modo Local (Proyecto en disco)', value: 'local' },
                    { name: 'Modo Parásito (Clonar Web por URL)', value: 'clone' },
                    { name: 'Modo Restauración (Rollback vía aumic-lock.json)', value: 'restore' }
                ]
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
                message: (ans: any) => ans.mode === 'clone' ? 'Directorio para el clon (ej. ./clone):' : 'Directorio objetivo (Enter = Actual):',
                default: (ans: any) => ans.mode === 'clone' ? path.join(process.cwd(), 'aumic-clone') : process.cwd()
            },
            {
                type: 'list',
                name: 'outputMode',
                message: '¿Arquitectura de Salida para el CSS?',
                choices: [
                    { name: `Modular (Clasificación ${aumicLink} automática)`, value: 'modular' },
                    { name: 'Global (Un solo archivo aumic-styles.css)', value: 'global' }
                ]
            },
            {
                type: 'confirm',
                name: 'useAI',
                message: pc.magenta(`¿Deseas Renombramiento Semántico ${aumicLink} usando IA por API? (Sí/No)`),
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
                    { name: 'Alibaba (Qwen)', value: 'alibaba' }
                ]
            },
            {
                type: 'password',
                name: 'apiKey',
                message: 'Introduce tu API Key (No se guardará):',
                when: (ans: any) => ans.useAI
            },
            {
                type: 'confirm',
                name: 'eradicate',
                message: pc.red('¿Ejecutar Protocolo de Erradicación de Tailwind al finalizar?'),
                when: (ans: any) => ans.mode === 'local',
                default: true
            }
        ]);
    } else {
        answers = {
            mode: opts.mode || 'local',
            targetUrl: opts.url,
            cloneDepth: opts.depth || 'page',
            targetDir: opts.target || process.cwd(),
            outputMode: opts.output || 'modular',
            useAI: !!opts.ai,
            aiProvider: opts.ai,
            apiKey: opts.key,
            eradicate: opts.eradicate
        };
    }

    const TARGET_DIR = path.resolve(answers.targetDir);
    let twVersion: 3 | 4 = 3;

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

        const astEngine = new AstInterceptor();
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
            // Restaurar package.json para recuperar scripts y versiones exactas
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
            // Al usar install genérico, npm leerá el package.json restaurado que contiene la versión exacta
            execSync('npm install', { cwd: TARGET_DIR, stdio: 'ignore' });
            spinner.succeed('Entorno restaurado: Tailwind y dependencias rehidratadas exactamente como estaban.');
        } catch (e) {
            spinner.warn('Hubo un problema reinstalando dependencias desde el package.json restaurado.');
        }
        
        console.log(pc.green(pc.bold(`\n[✔] PROYECTO RESTAURADO CON ÉXITO A SU ESTADO ORIGINAL.\n`)));
        return;
    }

    if (answers.mode === 'clone') {
        let spinner = ora(`Modo Parásito: Infiltrando ${answers.targetUrl}...`).start();
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
    
    let spinner = ora('Fase 1: Escaneando y extrayendo utilidades (Dry-Run)...').start();

    const files = await glob('**/*.{astro,tsx,jsx,html,py,rs,php,go,erb,svelte,vue}', { 
        cwd: TARGET_DIR, 
        absolute: true, 
        ignore: ['node_modules/**', 'dist/**', '.git/**', 'target/**', '__pycache__/**', 'venv/**'] 
    });

    const astEngine = new AstInterceptor();
    const globalExtracted = new Set<string>();

    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        try {
            astEngine.processFrameworkFile(content, file, (twClass) => {
                globalExtracted.add(twClass);
                return twClass; 
            });
        } catch (e) {}
    }

    if (globalExtracted.size === 0) {
        spinner.warn('No se encontraron utilidades de Tailwind.');
        return;
    }
    spinner.succeed(`Se extrajeron ${globalExtracted.size} bloques únicos de Tailwind.`);

    const classMapping = new Map<string, { original: string, array: string[], aumicClass: string }>();
    
    if (answers.useAI && answers.apiKey) {
        spinner.start(pc.magenta(`Conectando con ${answers.aiProvider.toUpperCase()} para bautizo semántico...`));
        const aiEngine = new AIEngine(answers.aiProvider as AIProvider, answers.apiKey);
        const { mapping } = await aiEngine.generateSemanticNames({ utilities: Array.from(globalExtracted) });
        
        for (const orig of globalExtracted) {
            const cleanAumic = mapping[orig] || `aumic-ai-${getHash(orig)}`;
            classMapping.set(orig, { original: orig, array: orig.split(' '), aumicClass: cleanAumic });
        }
        spinner.succeed(pc.magenta(`Bautizo semántico ${aumicLink} completado.`));
    } else {
        spinner.start('Generando hashes deterministas...');
        for (const orig of globalExtracted) {
            classMapping.set(orig, { original: orig, array: orig.split(' '), aumicClass: `aumic-core-${getHash(orig)}` });
        }
        spinner.succeed('Hashes generados.');
    }

    spinner.start('Fase 3: Mutando archivos fuente...');
    let modifiedFiles = 0;
    const categoryMapping = new Map<string, string>();

    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        const category = classifyComponent(file);
        
        try {
            const { newCode } = astEngine.processFrameworkFile(content, file, (twClass) => {
                const map = classMapping.get(twClass);
                if (map) {
                    categoryMapping.set(map.aumicClass, category);
                    return map.aumicClass;
                }
                return twClass;
            });

            if (newCode !== content) {
                await fs.writeFile(file, newCode, 'utf-8');
                modifiedFiles++;
            }
        } catch (e) {}
    }
    spinner.succeed(`${modifiedFiles} archivos fuente mutados estructuralmente.`);

    const categoryRoots: Record<string, Root> = {
        atoms: postcss.root(), molecules: postcss.root(), organisms: postcss.root(), ecosystems: postcss.root()
    };
    const globalRoot = postcss.root();

    const utilityToAumic = new Map<string, { aumicClass: string, category: string }[]>();
    for (const [_, mapping] of classMapping) {
        const cat = categoryMapping.get(mapping.aumicClass) || 'molecules';
        for (const util of mapping.array) {
            const escaped = '.' + escapeCssSelector(util);
            const list = utilityToAumic.get(escaped) || [];
            list.push({ aumicClass: mapping.aumicClass, category: cat });
            utilityToAumic.set(escaped, list);
        }
    }

    if (answers.mode === 'clone') {
        spinner.start(`Fase 4: Mutando hojas de estilo CSS extranjeras (Modo Parásito)...`);
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
        spinner.start(`Fase 4: Forzando JIT de Tailwind (v${twVersion})...`);
        const virtualHtml = Array.from(classMapping.values()).map(map => `<div class="${map.original}"></div>`).join('\n');

        let twPlugin;
        if (twVersion === 4) {
            twPlugin = require('@tailwindcss/postcss')();
        } else {
            twPlugin = require('tailwindcss')({ content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false } });
        }

        const jitResult = await postcss([twPlugin]).process(`@tailwind utilities;`, { from: undefined });
        const root = postcss.parse(jitResult.css);
        
        root.walkRules((rule: Rule) => {
            for (const [escapedUtil, targets] of utilityToAumic) {
                if (rule.selector.includes(escapedUtil)) {
                    for (const target of targets) {
                        const clonedRule = rule.clone();
                        clonedRule.selector = clonedRule.selector.replace(escapedUtil, `.${target.aumicClass}`);
                        const targetRoot = answers.outputMode === 'modular' ? categoryRoots[target.category] : globalRoot;
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
            await fs.writeFile(path.join(TARGET_DIR, 'aumic-styles.css'), globalRoot.toString(), 'utf-8');
        } else {
            for (const [cat, cssRoot] of Object.entries(categoryRoots)) {
                if (cssRoot.nodes && cssRoot.nodes.length > 0) {
                    const dir = path.join(TARGET_DIR, 'src', 'styles', cat);
                    await fs.ensureDir(dir);
                    await fs.writeFile(path.join(dir, `_${cat}.scss`), cssRoot.toString(), 'utf-8');
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
            // Backup total de package.json para poder restaurar exactamente las mismas versiones y scripts
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
            execSync('npm uninstall tailwindcss postcss @tailwindcss/postcss', { cwd: TARGET_DIR, stdio: 'ignore' });
            spinner.succeed(pc.green('Tailwind ha sido purgado completamente. (Configuraciones y package.json respaldados en .aumic-bak)'));
        } catch (e) {
            spinner.warn('Fallo menor en desinstalación (probablemente ya no existía en el package.json).');
        }
    }

    console.log(pc.green(pc.bold(`\n[✔] PROYECTO TRANSMUTADO A LA DOCTRINA ${aumicLink}. (v2.0.6)\n`)));
}

run().catch(console.error);
