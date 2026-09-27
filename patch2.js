const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

// The transpiler insertion
const transpiler = `
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
        
        let mergedConfig = { content: [{ raw: testHtml, extension: 'html' }], corePlugins: { preflight: false }, theme: userConfig.theme || {} };
`;

// Replace `let testPlugin; try { testPlugin = require... }`
content = content.replace(/let testPlugin;[\s\S]*?testPlugin = require\('tailwindcss'\)\(\{ content: \[\{ raw: testHtml, extension: 'html' \}\], corePlugins: \{ preflight: false \} \}\);[\s\S]*?\} catch\(e\) \{[\s\S]*?testPlugin = require\('tailwindcss'\);[\s\S]*?\}/, transpiler + "\n        let testPlugin;\n        try {\n            testPlugin = require('tailwindcss')(mergedConfig);\n        } catch(e) {\n            testPlugin = require('tailwindcss');\n        }");

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
