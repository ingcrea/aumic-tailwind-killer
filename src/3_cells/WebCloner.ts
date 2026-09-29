/**
 * [EN] Web Cloner cell: network I/O handler for Forensic Mode.
 * [ES] Célula Clonador Web: manejador I/O de red para el Modo Forense.
 */
import fs from 'fs-extra';
import path from 'path';
// @ts-ignore
import scrape from 'website-scraper';
import pc from 'picocolors';

export class WebCloner {
    /**
     * [EN] Downloads and mirrors a URL. Rewrites all asset paths for offline use.
     * [ES] Descarga y espeja una URL. Reescribe rutas de assets para uso offline.
     */
    public static async cloneWebsite(url: string, outputDir: string, cloneDepth: 'page' | 'site'): Promise<void> {
        if (await fs.pathExists(outputDir)) await fs.emptyDir(outputDir);
        const options = {
            urls: [url], directory: outputDir,
            sources: [
                {selector:'img',attr:'src'},{selector:'link[rel="stylesheet"]',attr:'href'},
                {selector:'script',attr:'src'},{selector:'source',attr:'src'},
                {selector:'source',attr:'srcset'},{selector:'img',attr:'srcset'}
            ],
            recursive: cloneDepth === 'site', maxDepth: cloneDepth === 'site' ? 5 : 1, ignoreErrors: true
        };
        try { await scrape(options); }
        catch (error) { console.error(pc.red(`\n[!] Error durante la clonación: ${error}`)); throw error; }
    }

    /**
     * [EN] Scans HTML files for Tailwind atomic signatures. Returns true on confirmation.
     * [ES] Escanea archivos HTML en busca de firmas atómicas Tailwind. Devuelve true al confirmar.
     */
    public static async isTailwindPowered(outputDir: string): Promise<boolean> {
        const files = (await fs.readdir(outputDir)).filter(f => f.endsWith('.html'));
        const sigs = ['flex','grid','w-full','h-full','absolute','relative','bg-','text-','p-4','m-'];
        let score = 0;
        for (const file of files) {
            const c = await fs.readFile(path.join(outputDir, file), 'utf-8');
            for (const sig of sigs) { if (c.includes(`"${sig}`)) score++; if (c.includes(` ${sig}`)) score++; }
        }
        return score >= 5;
    }
}
