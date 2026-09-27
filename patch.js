const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

// 1. Hoist userConfig
content = content.replace('let userConfig: any = {};', '');
content = content.replace('let pkgVersion =', 'let userConfig: any = {};\nlet pkgVersion =');

// 2. Transpiler
const loaderReplacement = `
        const configPath = require('fs').existsSync(require('path').resolve(TARGET_DIR, 'tailwind.config.js')) ? require('path').resolve(TARGET_DIR, 'tailwind.config.js') : (require('fs').existsSync(require('path').resolve(TARGET_DIR, 'tailwind.config.mjs')) ? require('path').resolve(TARGET_DIR, 'tailwind.config.mjs') : null);
        if (configPath) {
            try {
                const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                userConfig = (await dynamicImport(require('url').pathToFileURL(configPath).href)).default || require(configPath);
            } catch(e) {
                try { 
                    userConfig = require(configPath); 
                } catch(err) {
                    try {
                        const fsExt = require('fs');
                        const tempPath = configPath + '.mjs';
                        let raw = fsExt.readFileSync(configPath, 'utf8');
                        raw = raw.replace(/module\\.exports\\s*=\\s*/, 'export default ');
                        fsExt.writeFileSync(tempPath, raw, 'utf8');
                        const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                        userConfig = (await dynamicImport(require('url').pathToFileURL(tempPath).href)).default;
                        fsExt.unlinkSync(tempPath);
                    } catch (fatal) {
                        console.log('[AUM-IC] Fallo al cargar Tailwind Config:', (fatal as any).message);
                    }
                }
            }
        }
`;
content = content.replace(/const configPath = require\('fs'\)[\s\S]*?try\s*\{\s*testPlugin\s*=\s*require\('tailwindcss'\)/, loaderReplacement.trim() + "\n        try { testPlugin = require('tailwindcss')");


// 3. Astro Eradication
const eradicateFix = `
            ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs'].forEach(conf => {
                const confPath = path.join(TARGET_DIR, conf);
                if (fs.existsSync(confPath)) {
                    fs.renameSync(confPath, confPath + '.aumic-bak');
                }
            });

            const astroConfigPath = path.join(TARGET_DIR, 'astro.config.mjs');
            if (fs.existsSync(astroConfigPath)) {
                let ac = fs.readFileSync(astroConfigPath, 'utf8');
                ac = ac.replace(/import\\s+tailwind\\s+from\\s+['"]@astrojs\\/tailwind['"];?\\n?/, '');
                ac = ac.replace(/tailwind\\(\\)\\s*,?/, '');
                fs.writeFileSync(astroConfigPath, ac, 'utf8');
            }

            try { execSync('npm uninstall tailwindcss postcss @tailwindcss/postcss @astrojs/tailwind', { cwd: TARGET_DIR, stdio: 'ignore' }); } catch(e) {}
`;
content = content.replace(/\['tailwind\.config\.js'[\s\S]*?execSync\('npm uninstall tailwindcss postcss @tailwindcss\/postcss'.*?\n/, eradicateFix);


// 4. Global Output Path + Injection
const globalOutputFix = `
        if (answers.outputMode === 'global') {
            const outPath = path.join(TARGET_DIR, 'src', 'styles');
            require('fs-extra').ensureDirSync(outPath);
            await fs.writeFile(path.join(outPath, '_aumic-styles.scss'), themeVars + globalRoot.toString(), 'utf-8');
            
            const globalScss = path.join(outPath, 'global.scss');
            if (fs.existsSync(globalScss)) {
                let scss = fs.readFileSync(globalScss, 'utf8');
                if (!scss.includes('aumic-styles')) {
                    fs.writeFileSync(globalScss, scss + '\\n@import "aumic-styles";\\n', 'utf8');
                }
            }
        } else {
`;
content = content.replace(/if\s*\(answers\.outputMode\s*===\s*'global'\)\s*\{[\s\S]*?\}\s*else\s*\{/, globalOutputFix);

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
