const cheerio = require('cheerio');
const duckdb = require('duckdb');

const db = new duckdb.Database('aumic-lexicon.duckdb');
const con = db.connect();

async function extractUrls(baseUrl, version) {
    try {
        const res = await fetch(baseUrl);
        const html = await res.text();
        const $ = cheerio.load(html);
        let urls = [];
        
        $('nav a').each((_, el) => {
            let href = $(el).attr('href');
            if (href && !href.startsWith('http')) {
                // Para v4 los links pueden ser relativos puros
                if (href.startsWith('/docs/')) {
                    const domain = baseUrl.match(/https?:\/\/[^\/]+/)[0];
                    urls.push(domain + href);
                }
            }
        });
        // Filtrar duplicados y quedarse solo con endpoints de utilidad (no instalaciÃ³n o release notes)
        return [...new Set(urls)].filter(u => !u.includes('installation') && !u.includes('release-notes'));
    } catch(e) {
        return [];
    }
}

async function runFullScraper() {
    console.log("Iniciando MisiÃ³n ETL: LexicÃ³n Universal AUM-IC");
    const docs = [
        { v: 4, url: 'https://tailwindcss.com/docs/display' },
        { v: 3, url: 'https://v3.tailwindcss.com/docs/display' },
        { v: 2, url: 'https://v2.tailwindcss.com/docs/display' }
    ];

    for (const doc of docs) {
        console.log(`\n[*] Mapeando sitemap para Tailwind v${doc.v}...`);
        const urls = await extractUrls(doc.url, doc.v);
        console.log(`    -> Encontradas ${urls.length} pÃ¡ginas de documentaciÃ³n.`);
        
        // Solo para no saturar el servidor en esta demostraciÃ³n y probar velocidad, extraeremos las primeras 5
        let totalClasses = 0;
        for (let i = 0; i < Math.min(urls.length, 5); i++) {
            try {
                const res = await fetch(urls[i]);
                const html = await res.text();
                const $ = cheerio.load(html);

                $('table tbody tr').each((_, row) => {
                    const td1 = $(row).find('td').eq(0);
                    const td2 = $(row).find('td').eq(1);
                    if (td1.length && td2.length) {
                        let cls = td1.text().trim();
                        let css = td2.text().trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
                        if (cls && css && !cls.includes('...') && !cls.includes(' ')) {
                            con.run(`INSERT OR IGNORE INTO tw_lexicon VALUES (?, ?, ?, ?)`, [doc.v, cls, css, 'utilities']);
                            totalClasses++;
                        }
                    }
                });
            } catch(e) {}
        }
        console.log(`[+] Total clases extraÃ­das y almacenadas para v${doc.v} (Muestra 5 pÃ¡ginas): ${totalClasses}`);
    }
    console.log("\n[âœ”] Base de Datos L1 DuckDB construida exitosamente.");
}

runFullScraper();
