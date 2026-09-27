const fs = require('fs');
let code = fs.readFileSync('src-typescript/index.ts', 'utf8');

const regex = /spinner\.start\(`Fase 4: Forzando JIT de Tailwind \(v\$\{twVersion\}\)\.\.\.`\);([\s\S]*?)let preflightCss = '';/m;

const replacement = `spinner.start(\`Fase 4: Ejecutando L1 Cache (DuckDB) y delegando L2 (JIT v\${twVersion})...\`);
        
        // --- L1 DUCKDB CACHE ---
        const duckdb = require('duckdb');
        const dbPath = path.join(__dirname, '../aumic-lexicon.duckdb');
        const db = new duckdb.Database(dbPath);
        
        let l1Css = '';
        let unresolvedClasses = new Set();
        
        const allTwClasses = new Set();
        for (const map of classMapping.values()) {
            map.tailwindOnlyArray.forEach(cls => allTwClasses.add(cls));
        }

        const classArray = Array.from(allTwClasses);
        const l1Promises = classArray.map(cls => {
            return new Promise((resolve) => {
                db.all("SELECT css FROM tw_lexicon WHERE version = ? AND class = ?", [twVersion, cls], (err, rows) => {
                    if (err || rows.length === 0) {
                        unresolvedClasses.add(cls);
                    } else {
                        l1Css += \`\\n/* tw: \${cls} (L1) */\\n.\${escapeCssSelector(cls)} { \${rows[0].css} }\\n\`;
                    }
                    resolve();
                });
            });
        });
        await Promise.all(l1Promises);
        db.close();

        // --- L2 DYNAMIC JIT ---
        const virtualHtml = Array.from(unresolvedClasses).map(cls => \`<div class="\${cls}"></div>\`).join('\\n');
        
        const projectTwPath = path.join(TARGET_DIR, 'node_modules', 'tailwindcss');
        let twPlugin;
        if (fs.existsSync(projectTwPath)) {
            twPlugin = require(projectTwPath)({ content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} });
        } else {
            twPlugin = require('tailwindcss')({ content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} });
        }

        await piscinaPool.destroy();
        const jitResult = await postcss([twPlugin]).process(\`@tailwind utilities;\`, { from: undefined });
        const root = postcss.parse(l1Css + '\\n' + jitResult.css);
        
            // =======================================
            // AUM-IC PREFLIGHT INJECTOR
            // =======================================
            let preflightCss = '';`;

code = code.replace(regex, replacement);

const preflightRegex = /const pfPlugin = require\('tailwindcss'\)\(\{ content: \[\{raw: '<div class="a"><\/div>', extension: 'html'\}\], theme: userConfig\.theme \|\| \{\} \}\);/g;
const preflightReplacement = `let pfPlugin;
                if (fs.existsSync(projectTwPath)) {
                    pfPlugin = require(projectTwPath)({ content: [{raw: '<div class="a"></div>', extension: 'html'}], theme: userConfig.theme || {} });
                } else {
                    pfPlugin = require('tailwindcss')({ content: [{raw: '<div class="a"></div>', extension: 'html'}], theme: userConfig.theme || {} });
                }`;

code = code.replace(preflightRegex, preflightReplacement);

fs.writeFileSync('src-typescript/index.ts', code, 'utf8');
