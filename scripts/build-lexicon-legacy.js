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
                if (href.startsWith('/docs/')) {
                    const domain = baseUrl.match(/https?:\/\/[^\/]+/)[0];
                    urls.push(domain + href);
                }
            }
        });
        return [...new Set(urls)].filter(u => !u.includes('installation') && !u.includes('release-notes'));
    } catch(e) { return []; }
}

async function scrapeVersion(version, baseUrl) {
    console.log(`\n[*] Mapeando sitemap para Tailwind v${version}...`);
    const urls = await extractUrls(baseUrl, version);
    console.log(`    -> Descubiertas ${urls.length} pÃ¡ginas. Iniciando extracciÃ³n...`);
    
    let totalClasses = 0;
    
    for (let i = 0; i < urls.length; i += 10) {
        const batch = urls.slice(i, i + 10);
        process.stdout.write(`\r    Progreso v${version}: ${i}/${urls.length} pÃ¡ginas...`);
        
        await Promise.all(batch.map(async (url) => {
            try {
                const res = await fetch(url);
                const html = await res.text();
                const $ = cheerio.load(html);

                $('table tbody tr').each((_, row) => {
                    const td1 = $(row).find('td').eq(0);
                    const td2 = $(row).find('td').eq(1);
                    if (td1.length && td2.length) {
                        let cls = td1.text().trim();
                        let css = td2.text().trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
                        if (cls && css && !cls.includes('...') && !cls.includes(' ')) {
                            con.run(`INSERT OR IGNORE INTO tw_lexicon VALUES (?, ?, ?, ?)`, [version, cls, css, 'utilities']);
                            totalClasses++;
                        }
                    }
                });
            } catch (e) {}
        }));
    }
    console.log(`\n[âœ”] v${version} completada. Total clases guardadas: ${totalClasses}`);
}

async function run() {
    await scrapeVersion(3, 'https://v3.tailwindcss.com/docs/display');
    await scrapeVersion(2, 'https://v2.tailwindcss.com/docs/display');
    await scrapeVersion(1, 'https://v1.tailwindcss.com/docs/display');
}

run();
