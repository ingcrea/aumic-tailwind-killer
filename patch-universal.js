const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const universalEradicator = `
            // ==========================================
            // UNIVERSAL TAILWIND ERADICATOR (v1 - v4)
            // ==========================================
            
            // 1. Respaldar y neutralizar archivos de configuraciÃ³n (v1, v2, v3)
            const twConfigFiles = ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs', 'tailwind.js'];
            twConfigFiles.forEach(conf => {
                const confPath = require('path').join(TARGET_DIR, conf);
                if (fs.existsSync(confPath)) fs.renameSync(confPath, \`\${confPath}.aumic-bak\`);
            });

            // 2. Limpieza de Integradores (v4 Vite, Astro, PostCSS)
            const integrations = [
                { file: 'astro.config.mjs', regex: /import\\s+tailwind\\s+from\\s+['"]@astrojs\\/tailwind['"];?\\n?/, regex2: /tailwind\\(\\)\\s*,?/ },
                { file: 'astro.config.ts', regex: /import\\s+tailwind\\s+from\\s+['"]@astrojs\\/tailwind['"];?\\n?/, regex2: /tailwind\\(\\)\\s*,?/ },
                { file: 'vite.config.js', regex: /import\\s+tailwindcss\\s+from\\s+['"]@tailwindcss\\/vite['"];?\\n?/, regex2: /tailwindcss\\(\\)\\s*,?/ },
                { file: 'vite.config.ts', regex: /import\\s+tailwindcss\\s+from\\s+['"]@tailwindcss\\/vite['"];?\\n?/, regex2: /tailwindcss\\(\\)\\s*,?/ }
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
                    require('child_process').execSync(\`npm uninstall \${toUninstall.join(' ')}\`, { cwd: TARGET_DIR, stdio: 'ignore' });
                }
            } catch(e) {}
`;

// Replace the old eradicate block
const eradicateStartRegex = /\/\/ Astro-specific cleanup[\s\S]*?try \{ require\('child_process'\)\.execSync\('npm uninstall.*?; \} catch\(e\) \{\}/;
if (eradicateStartRegex.test(content)) {
    content = content.replace(eradicateStartRegex, universalEradicator.trim());
    fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
} else {
    console.log("No se encontrÃ³ el bloque de erradicaciÃ³n anterior.");
}
