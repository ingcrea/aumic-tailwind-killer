/**
 * [EN] Restore Ecosystem: orchestrates a full rollback of an AUM-IC transmutation.
 *      Reads the aumic-lock.json manifest, restores original class strings via AST,
 *      reinstates original package.json and Tailwind config files, and re-runs npm install.
 * [ES] Ecosistema de Restauración: orquesta el rollback completo de una transmutación AUM-IC.
 *      Lee el manifiesto aumic-lock.json, restaura los strings de clase originales vía AST,
 *      restablece el package.json y los archivos de config de Tailwind originales, y re-ejecuta npm install.
 */
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import ora from 'ora';
import pc from 'picocolors';
import { glob } from 'glob';
import { spawnSync } from 'child_process';
import { AstInterceptor } from '../4_organisms/AstParser';

const astEngine = new AstInterceptor();

/**
 * [EN] Entry point for the restore pipeline. Validates lock file existence,
 *      runs the AST reverse pass on all source files, and restores project dependencies.
 * [ES] Punto de entrada del pipeline de restauración. Valida la existencia del lock file,
 *      ejecuta el pase inverso AST en todos los archivos fuente, y restaura las dependencias del proyecto.
 */
export async function runRestoreEcosystem(targetDir: string): Promise<void> {
    const lockPath = path.join(targetDir, 'aumic-lock.json');
    if (!fs.existsSync(lockPath)) {
        console.log(pc.red('\n[X] Error: No se encontró aumic-lock.json. Imposible restaurar.\n'));
        return;
    }

    const spinner = ora('Modo Restauración: Leyendo aumic-lock.json...').start();
    const lockData: Record<string, string> = await fs.readJson(lockPath);

    spinner.start('Restaurando clases en archivos fuente...');
    const files = await glob('**/*.{astro,tsx,jsx,html,py,rs,php,go,erb,svelte,vue}', {
        cwd: targetDir, absolute: true,
        ignore: ['node_modules/**', 'dist/**', '.git/**', 'target/**', '__pycache__/**', 'venv/**'],
    });

    let restoredCount = 0;
    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        try {
            // [EN] Split multi-hash strings before lookup to handle concatenated hashes.
            // [ES] Dividir strings con múltiples hashes antes de la búsqueda para manejar hashes concatenados.
            const { newCode } = astEngine.processFrameworkFile(content, file, (twClass) => {
                return twClass.split(' ').map(c => lockData[c] || c).join(' ');
            }, true);
            if (newCode !== content) { await fs.writeFile(file, newCode, 'utf-8'); restoredCount++; }
        } catch { /* [EN] Skip unreadable or binary files silently. [ES] Ignorar silenciosamente archivos ilegibles o binarios. */ }
    }
    spinner.succeed(`Clases originales restauradas en ${restoredCount} archivos.`);

    spinner.start('Restaurando dependencias y configuraciones...');
    try {
        // [EN] Restore package.json backup if it exists.
        // [ES] Restaurar el respaldo de package.json si existe.
        const pkgBak = path.join(targetDir, 'package.json.aumic-bak');
        if (fs.existsSync(pkgBak)) { fs.copyFileSync(pkgBak, path.join(targetDir, 'package.json')); fs.removeSync(pkgBak); }

        // [EN] Restore Tailwind config file backups.
        // [ES] Restaurar los respaldos de archivos de configuración de Tailwind.
        for (const conf of ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs']) {
            const bak = path.join(targetDir, `${conf}.aumic-bak`);
            if (fs.existsSync(bak)) fs.renameSync(bak, path.join(targetDir, conf));
        }

        // [EN] Spawn npm install as a direct binary — no shell interpolation (Zero-Trust execution).
        // [ES] Levantar npm install como binario directo — sin interpolación de shell (ejecución Zero-Trust).
        spawnSync(os.platform() === 'win32' ? 'npm.cmd' : 'npm', ['install'], { cwd: targetDir, stdio: 'ignore' });
        spinner.succeed('Tailwind rehidratado. Dependencias y configuraciones restauradas.');
    } catch {
        spinner.warn('Problema reinstalando dependencias desde el package.json restaurado.');
    }

    console.log(pc.green(pc.bold('\n[✔] PROYECTO RESTAURADO CON ÉXITO A SU ESTADO ORIGINAL.\n')));
}
