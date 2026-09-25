"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob_1 = require("glob");
const postcss_1 = __importStar(require("postcss"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const picocolors_1 = __importDefault(require("picocolors"));
const ora_1 = __importDefault(require("ora"));
const child_process_1 = require("child_process");
function getHash(str) {
    return crypto_1.default.createHash('shake256', { outputLength: 3 }).update(str).digest('hex');
}
function escapeCssSelector(className) {
    return className.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}
async function detectTailwindVersion(targetDir) {
    try {
        const pkgPath = path_1.default.join(targetDir, 'package.json');
        if (await fs_extra_1.default.pathExists(pkgPath)) {
            const pkg = await fs_extra_1.default.readJson(pkgPath);
            const twVersion = pkg.dependencies?.tailwindcss || pkg.devDependencies?.tailwindcss || '';
            if (twVersion.includes('4.'))
                return 4;
        }
    }
    catch (e) { }
    return 3;
}
async function run() {
    console.log(picocolors_1.default.cyan(picocolors_1.default.bold(`\n⚔️  AUM-IC TAILWIND KILLER v1.0`)));
    console.log(picocolors_1.default.gray(`El transpilador determinista hacia el estándar AUM-IC.\n`));
    const answers = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'targetDir',
            message: 'Directorio objetivo (presiona Enter para usar el directorio actual):',
            default: process.cwd()
        },
        {
            type: 'list',
            name: 'outputMode',
            message: '¿Cómo deseas la arquitectura de salida de estilos?',
            choices: [
                { name: 'Global (Un solo archivo aumic-styles.css)', value: 'global' },
                { name: 'Modular (Archivos SCSS separados por componente - Doctrina AUM-IC)', value: 'modular' }
            ]
        },
        {
            type: 'confirm',
            name: 'eradicate',
            message: picocolors_1.default.red('¿Ejecutar Protocolo de Erradicación? (Desinstalará Tailwind y borrará sus configs)'),
            default: true
        }
    ]);
    const TARGET_DIR = path_1.default.resolve(answers.targetDir);
    const twVersion = await detectTailwindVersion(TARGET_DIR);
    const spinner = (0, ora_1.default)('Escaneando archivos y extrayendo utilidades...').start();
    const files = await (0, glob_1.glob)('**/*.{html,astro,tsx,jsx,vue,svelte}', {
        cwd: TARGET_DIR,
        absolute: true,
        ignore: ['node_modules/**', 'dist/**', '.git/**']
    });
    const classCache = new Map();
    let modifiedFiles = 0;
    for (const file of files) {
        let content = await fs_extra_1.default.readFile(file, 'utf-8');
        const classRegex = /class(?:Name)?=(["'])(.*?)\1/g;
        let fileChanged = false;
        const newContent = content.replace(classRegex, (match, quote, classString) => {
            const cleanClasses = classString.replace(/\s+/g, ' ').trim();
            if (!cleanClasses || cleanClasses.includes('aumic-'))
                return match;
            const baseName = path_1.default.basename(file, path_1.default.extname(file)).toLowerCase().replace(/[^a-z0-9]/g, '');
            const hash = getHash(cleanClasses);
            const aumicClass = `aumic-${baseName}-${hash}`;
            if (!classCache.has(cleanClasses)) {
                classCache.set(cleanClasses, {
                    originalClasses: cleanClasses,
                    originalArray: cleanClasses.split(' '),
                    aumicClass: aumicClass
                });
            }
            fileChanged = true;
            return `class=${quote}${aumicClass}${quote}`;
        });
        if (fileChanged) {
            await fs_extra_1.default.writeFile(file, newContent, 'utf-8');
            modifiedFiles++;
        }
    }
    if (classCache.size === 0) {
        spinner.warn('No se encontraron utilidades de Tailwind.');
        return;
    }
    spinner.succeed(`Se escanearon ${files.length} archivos. ${modifiedFiles} mutados.`);
    spinner.start(`Forzando JIT (v${twVersion}) para resolver ${classCache.size} bloques CSS...`);
    // Virtual HTML
    const virtualHtml = Array.from(classCache.values())
        .map(map => `<div class="${map.originalClasses}"></div>`)
        .join('\n');
    let twPlugin;
    if (twVersion === 4) {
        twPlugin = require('@tailwindcss/postcss')();
    }
    else {
        twPlugin = require('tailwindcss')({
            content: [{ raw: virtualHtml, extension: 'html' }],
            corePlugins: { preflight: false }
        });
    }
    const rawTwCss = `@tailwind utilities;`;
    const jitResult = await (0, postcss_1.default)([twPlugin]).process(rawTwCss, { from: undefined });
    spinner.succeed('JIT finalizado con éxito.');
    spinner.start('Ejecutando AST Merger para fusionar utilidades...');
    const root = postcss_1.default.parse(jitResult.css);
    const finalRoot = postcss_1.default.root();
    const utilityToAumic = new Map();
    for (const [_, mapping] of classCache) {
        for (const util of mapping.originalArray) {
            const escaped = '.' + escapeCssSelector(util);
            const list = utilityToAumic.get(escaped) || [];
            list.push(mapping.aumicClass);
            utilityToAumic.set(escaped, list);
        }
    }
    root.walkRules((rule) => {
        for (const [escapedUtil, aumicClasses] of utilityToAumic) {
            if (rule.selector.includes(escapedUtil)) {
                for (const aumicClass of aumicClasses) {
                    const clonedRule = rule.clone();
                    clonedRule.selector = clonedRule.selector.replace(escapedUtil, `.${aumicClass}`);
                    if (rule.parent && rule.parent.type === 'atrule') {
                        const parentAtRule = rule.parent;
                        const clonedAtRule = postcss_1.default.atRule({ name: parentAtRule.name, params: parentAtRule.params });
                        clonedAtRule.append(clonedRule);
                        finalRoot.append(clonedAtRule);
                    }
                    else {
                        finalRoot.append(clonedRule);
                    }
                }
            }
        }
    });
    if (answers.outputMode === 'global') {
        const outPath = path_1.default.join(TARGET_DIR, 'aumic-styles.css');
        await fs_extra_1.default.writeFile(outPath, finalRoot.toString(), 'utf-8');
    }
    else {
        // Lógica simplificada modular para MVP
        const stylesDir = path_1.default.join(TARGET_DIR, 'src', 'styles', 'components');
        await fs_extra_1.default.ensureDir(stylesDir);
        const outPath = path_1.default.join(stylesDir, '_aumic-components.scss');
        await fs_extra_1.default.writeFile(outPath, finalRoot.toString(), 'utf-8');
        spinner.info(`(Prototipo Modular) SCSS exportado a: src/styles/components`);
    }
    spinner.succeed('Transmutación CSS completada.');
    // Escribir Lockfile
    spinner.start('Generando aumic-lock.json (Mapa Reverso)...');
    const lockfileData = {};
    for (const [original, mapping] of classCache) {
        lockfileData[mapping.aumicClass] = original;
    }
    await fs_extra_1.default.writeJson(path_1.default.join(TARGET_DIR, 'aumic-lock.json'), lockfileData, { spaces: 2 });
    spinner.succeed('Mapa reverso (aumic-lock.json) forjado.');
    // Protocolo de Erradicación
    if (answers.eradicate) {
        spinner.start(picocolors_1.default.red('Iniciando Protocolo de Erradicación...'));
        try {
            const configs = ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs'];
            for (const conf of configs) {
                const confPath = path_1.default.join(TARGET_DIR, conf);
                if (await fs_extra_1.default.pathExists(confPath)) {
                    await fs_extra_1.default.remove(confPath);
                    spinner.info(picocolors_1.default.yellow(`Eliminado: ${conf}`));
                }
            }
            // Ejecutar NPM uninstall de forma síncrona
            (0, child_process_1.execSync)('npm uninstall tailwindcss postcss @tailwindcss/postcss', { cwd: TARGET_DIR, stdio: 'ignore' });
            spinner.succeed(picocolors_1.default.green('Tailwind ha sido erradicado del ecosistema.'));
        }
        catch (e) {
            spinner.warn('Protocolo de erradicación finalizado con advertencias (quizás no había dependencias instaladas localmente).');
        }
    }
    console.log(picocolors_1.default.green(picocolors_1.default.bold(`\n[✔] OPERACIÓN COMPLETADA CON ÉXITO.`)));
}
run().catch(console.error);
//# sourceMappingURL=index.js.map