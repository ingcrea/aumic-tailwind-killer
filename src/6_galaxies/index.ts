#!/usr/bin/env node
/**
 * @file 6_galaxies/index.ts
 *
 * [EN] Galaxy Layer — the outermost shell of the AUM-IC Tailwind Killer.
 *      Responsibilities:
 *        1. Parse CLI flags via Commander.js
 *        2. If no flags provided, launch the interactive Inquirer prompt sequence
 *        3. Validate and normalize all user options into a ResolvedOptions object
 *        4. Dispatch to the correct Ecosystem (Transmutation or Restore)
 *      This file contains ZERO business logic. It is a pure coordinator.
 *
 * [ES] Capa Galaxia — la capa más externa del AUM-IC Tailwind Killer.
 *      Responsabilidades:
 *        1. Parsear flags CLI vía Commander.js
 *        2. Si no hay flags, lanzar la secuencia interactiva de prompts Inquirer
 *        3. Validar y normalizar todas las opciones del usuario en un objeto ResolvedOptions
 *        4. Despachar al Ecosistema correcto (Transmutación o Restauración)
 *      Este archivo contiene CERO lógica de negocio. Es un coordinador puro.
 */
import pc from 'picocolors';
import inquirer from 'inquirer';
import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';

import { runTransmutationEcosystem } from '../5_ecosystems/TransmutationEcosystem';
import { runRestoreEcosystem } from '../5_ecosystems/RestoreEcosystem';
import type { ResolvedOptions, AIProvider, OutputMode } from '../1_atoms/types';

// [EN] Dynamic version read from package.json at startup. [ES] Versión dinámica leída del package.json al arrancar.
let pkgVersion = '4.1.5';
try { pkgVersion = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8').replace(/^\uFEFF/, '')).version; } catch { }

const aumicLink = `\x1b]8;;https://github.com/ingcrea/aum-ic\x07AUM-IC\x1b]8;;\x07`;

/**
 * [EN] CLI entry point. Parses args, resolves options interactively or from flags,
 *      validates output mode, and dispatches to the appropriate ecosystem.
 * [ES] Punto de entrada del CLI. Parsea args, resuelve opciones interactivamente o desde flags,
 *      valida el modo de salida, y despacha al ecosistema apropiado.
 */
async function run(): Promise<void> {
    const program = new Command();
    program
        .name('aumic-tailwind-killer')
        .description(pc.cyan(`Motor de transmutación Tailwind → CSS puro (${aumicLink})`))
        .version(pkgVersion)
        .option('-m, --mode <type>',       'Vector de ataque: "local", "clone" o "restore"')
        .option('-u, --url <url>',         'URL objetivo (Modo Forense)')
        .option('-d, --depth <depth>',     'Profundidad de clonación: "page" o "site"')
        .option('-t, --target <dir>',      'Directorio objetivo (por defecto: cwd)')
        .option('-s, --scope <path>',      'Ataque Quirúrgico (ej. src/components/**/*.tsx)')
        .option('-o, --output <type>',     'Arquitectura de salida: "aumic" o "global"')
        .option('--ai <provider>',         'Proveedor IA para nombrado semántico')
        .option('--key <token>',           'API Key del proveedor IA')
        .option('-c, --concurrency <n>',   'Hilos concurrentes (Defecto: 2× núcleos CPU)')
        .option('--simulate',              'Dry-Run: genera reporte sin mutar archivos')
        .option('--no-eradicate',          'Omitir la erradicación de Tailwind al finalizar')
        .option('--interactive',           'Forzar el modo interactivo (menú UI)')
        .parse(process.argv);

    const opts = program.opts();
    const hasFlags = Object.keys(opts).some(k => !['interactive', 'eradicate'].includes(k));

    // [EN] Print the banner on every invocation. [ES] Imprimir el banner en cada invocación.
    console.log(pc.cyan(pc.bold(`\n⚔️  ${aumicLink} TAILWIND KILLER v${pkgVersion}`)));

    let answers: ResolvedOptions;

    if (!hasFlags || opts.interactive) {
        // ── Interactive Mode ────────────────────────────────────────────────────
        console.log(pc.gray('Iniciando consola de mando interactiva...\n'));
        const raw = await inquirer.prompt([
            { type: 'list',    name: 'mode',        message: '¿Vector de Ataque?', choices: [
                { name: 'Modo Local (proyecto en disco)',          value: 'local' },
                { name: 'Ataque Quirúrgico (migración incremental)', value: 'surgical' },
                { name: 'Modo Forense (clonar web por URL)',       value: 'clone' },
                { name: 'Modo Restauración (rollback aumic-lock)', value: 'restore' },
            ]},
            { type: 'input',   name: 'scope',       message: 'Glob quirúrgico (ej. src/**/*.tsx):', when: (a: any) => a.mode === 'surgical' },
            { type: 'input',   name: 'targetUrl',   message: 'URL objetivo:', when: (a: any) => a.mode === 'clone' },
            { type: 'list',    name: 'cloneDepth',  message: '¿Alcance de clonación?', when: (a: any) => a.mode === 'clone', choices: [{ name: 'Solo esta página', value: 'page' }, { name: 'Sitio completo', value: 'site' }] },
            { type: 'input',   name: 'targetDir',   message: (a: any) => a.mode === 'clone' ? 'Directorio para el clon:' : 'Directorio raíz del proyecto (Enter = actual):', default: (a: any) => a.mode === 'clone' ? path.join(process.cwd(), 'aumic-clone') : process.cwd() },
            { type: 'list',    name: 'outputMode',  message: '¿Arquitectura de salida CSS?', when: (a: any) => a.mode !== 'restore', choices: [
                { name: 'SCSS Modular AUM-IC (recomendado)', value: 'aumic' },
                { name: 'CSS Global (1 solo archivo)',       value: 'global' },
            ]},
            { type: 'input',   name: 'concurrency', message: pc.cyan('Hilos asíncronos (Enter = Auto):'), when: (a: any) => a.mode !== 'restore', default: '' },
            { type: 'confirm', name: 'simulate',    message: pc.yellow('¿Activar Simulador de Daños (Dry-Run)?'), when: (a: any) => a.mode !== 'restore', default: false },
            { type: 'confirm', name: 'useAI',       message: pc.magenta(`¿Activar Nombrado Semántico ${aumicLink} (IA)?`), when: (a: any) => a.mode !== 'restore', default: false },
            { type: 'list',    name: 'aiProvider',  message: 'Proveedor de IA:', when: (a: any) => a.useAI, choices: ['openai','claude','gemini','deepseek','xai','alibaba','ollama'] },
            { type: 'password',name: 'apiKey',      message: 'API Key (no se guardará):', when: (a: any) => a.useAI && a.aiProvider !== 'ollama' },
            { type: 'confirm', name: 'eradicate',   message: pc.red('¿Ejecutar Protocolo de Erradicación de Tailwind?'), when: (a: any) => a.mode === 'local' && !a.simulate, default: true },
        ]);
        answers = {
            mode: raw.mode, scope: raw.scope, targetUrl: raw.targetUrl,
            cloneDepth: raw.cloneDepth || 'page', targetDir: raw.targetDir,
            outputMode: (raw.outputMode as OutputMode) || 'aumic',
            simulate: !!raw.simulate, useAI: !!raw.useAI,
            aiProvider: raw.aiProvider as AIProvider, apiKey: raw.apiKey,
            eradicate: raw.eradicate !== false, concurrency: raw.concurrency,
        };
    } else {
        // ── Flag Mode (CI / scripted) ───────────────────────────────────────────
        answers = {
            mode: opts.scope ? 'surgical' : (opts.mode || 'local'),
            scope: opts.scope, targetUrl: opts.url, cloneDepth: opts.depth || 'page',
            targetDir: opts.target || process.cwd(),
            outputMode: (opts.output as OutputMode) || 'aumic',
            simulate: !!opts.simulate, useAI: !!opts.ai,
            aiProvider: opts.ai as AIProvider, apiKey: opts.key,
            eradicate: opts.eradicate, concurrency: opts.concurrency,
        };
    }

    // ── Beta Mode Guard ─────────────────────────────────────────────────────────
    if (['css-modules', 'styled-components'].includes(answers.outputMode)) {
        console.log(pc.yellow(`\n[!] El modo "${answers.outputMode}" está en fase Beta. Usa "aumic" o "global" por ahora.\n`));
        process.exit(0);
    }

    // ── Dispatch ────────────────────────────────────────────────────────────────
    if (answers.mode === 'restore') {
        await runRestoreEcosystem(path.resolve(answers.targetDir));
    } else {
        // [EN] Pass dist/ dir so ecosystems can locate worker.js and lexicon.
        // [ES] Pasar directorio dist/ para que los ecosistemas localicen worker.js y el léxico.
        await runTransmutationEcosystem(answers, path.join(__dirname, '..'));
    }
}

run().catch(console.error);
