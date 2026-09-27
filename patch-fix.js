const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const loaderReplacement = `
        if (configPath) {
            try {
                const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                userConfig = (await dynamicImport(require('url').pathToFileURL(configPath).href)).default || require(configPath);
            } catch(e: any) {
                try { 
                    userConfig = require(configPath); 
                } catch(err: any) {
                    try {
                        const fsExt = require('fs');
                        const tempPath = configPath + '.mjs';
                        let raw = fsExt.readFileSync(configPath, 'utf8');
                        raw = raw.replace(/module\\.exports\\s*=\\s*/, 'export default ');
                        fsExt.writeFileSync(tempPath, raw, 'utf8');
                        const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                        userConfig = (await dynamicImport(require('url').pathToFileURL(tempPath).href)).default;
                        fsExt.unlinkSync(tempPath);
                    } catch (fatal: any) {
                        console.log('[AUM-IC] Fallo extremo al cargar Tailwind Config:', fatal.message);
                    }
                }
            }
        }
`;

content = content.replace(/if\s*\(configPath\)\s*\{[\s\S]*?\}\s*\n\s*console\.log\("\[DEBUG\] loaded colors:".*?\n/, loaderReplacement.trim() + "\n");

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
console.log("Patched!");
