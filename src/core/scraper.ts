import fs from 'fs-extra';
import path from 'path';
// @ts-ignore
import scrape from 'website-scraper';
import pc from 'picocolors';

export class WebCloner {
    /**
     * Clona una página web completa (HTML, CSS, JS, Fuentes, Imágenes),
     * reescribe todas las rutas para que funcionen 100% en local.
     */
    public static async cloneWebsite(url: string, outputDir: string, cloneDepth: 'page' | 'site'): Promise<void> {
        // Limpiar el directorio si ya existe para evitar conflictos de clonación
        if (await fs.pathExists(outputDir)) {
            await fs.emptyDir(outputDir);
        }

        const options = {
            urls: [url],
            directory: outputDir,
            sources: [
                { selector: 'img', attr: 'src' },
                { selector: 'link[rel="stylesheet"]', attr: 'href' },
                { selector: 'script', attr: 'src' },
                { selector: 'source', attr: 'src' },
                { selector: 'source', attr: 'srcset' },
                { selector: 'img', attr: 'srcset' }
            ],
            // Si es 'site', escanea y descarga recursivamente toda la web. Si es 'page', solo la URL dada y sus assets.
            recursive: cloneDepth === 'site',
            maxDepth: cloneDepth === 'site' ? 5 : 1, // Límite táctico para no desbordar el disco
            ignoreErrors: true
        };

        try {
            await scrape(options);
        } catch (error) {
            console.error(pc.red(`\n[!] Error fatal durante la clonación cibernética: ${error}`));
            throw error;
        }
    }

    /**
     * Detecta si la web clonada utiliza Tailwind CSS escaneando sus archivos HTML.
     */
    public static async isTailwindPowered(outputDir: string): Promise<boolean> {
        const files = await fs.readdir(outputDir);
        const htmlFiles = files.filter(f => f.endsWith('.html'));

        let twScore = 0;
        const twSignatures = ['flex', 'grid', 'w-full', 'h-full', 'absolute', 'relative', 'bg-', 'text-', 'p-4', 'm-'];

        for (const file of htmlFiles) {
            const content = await fs.readFile(path.join(outputDir, file), 'utf-8');
            for (const sig of twSignatures) {
                if (content.includes(`"${sig}`)) twScore++;
                if (content.includes(` ${sig}`)) twScore++;
            }
        }

        // Si encontramos múltiples firmas atómicas, confirmamos que es Tailwind
        return twScore >= 5;
    }
}
