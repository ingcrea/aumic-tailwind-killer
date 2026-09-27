const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const eradicateFix = `
            ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs'].forEach(conf => {
                const confPath = path.join(TARGET_DIR, conf);
                if (fs.existsSync(confPath)) {
                    fs.renameSync(confPath, confPath + '.aumic-bak');
                }
            });

            // Erradicación nativa de Astro
            const astroConfigPath = path.join(TARGET_DIR, 'astro.config.mjs');
            if (fs.existsSync(astroConfigPath)) {
                let ac = fs.readFileSync(astroConfigPath, 'utf8');
                ac = ac.replace(/import\s+tailwind\s+from\s+['"]@astrojs\/tailwind['"];?\n?/, '');
                ac = ac.replace(/tailwind\(\)\s*,?/, '');
                fs.writeFileSync(astroConfigPath, ac, 'utf8');
            }

            try { execSync('npm uninstall tailwindcss postcss @tailwindcss/postcss @astrojs/tailwind', { cwd: TARGET_DIR, stdio: 'ignore' }); } catch(e) {}
`;

content = content.replace(/\[\'tailwind\.config\.js\'[\s\S]*?execSync\(\'npm uninstall tailwindcss postcss \@tailwindcss\/postcss\'.*?\n/, eradicateFix);

const globalOutputFix = `
        if (answers.outputMode === 'global') {
            const outPath = path.join(TARGET_DIR, 'src', 'styles');
            require('fs-extra').ensureDirSync(outPath);
            await fs.writeFile(path.join(outPath, 'aumic-styles.css'), themeVars + globalRoot.toString(), 'utf-8');
            
            // Auto-inyección en global.scss si existe
            const globalScss = path.join(outPath, 'global.scss');
            if (fs.existsSync(globalScss)) {
                let scss = fs.readFileSync(globalScss, 'utf8');
                if (!scss.includes('aumic-styles.css')) {
                    fs.writeFileSync(globalScss, scss + '\n@import "aumic-styles.css";\n', 'utf8');
                }
            }
        } else {
`;

content = content.replace(/if\s*\(answers\.outputMode\s*===\s*'global'\)\s*\{\s*await fs\.writeFile\(path\.join\(TARGET_DIR,\s*'aumic-styles\.css'\),\s*themeVars\s*\+\s*globalRoot\.toString\(\),\s*'utf-8'\);\s*\}\s*else\s*\{/, globalOutputFix);

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
