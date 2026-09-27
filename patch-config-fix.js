const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const replacement1 = `
        let userConfig = {};
        const configPath = require('fs').existsSync(require('path').resolve(TARGET_DIR, 'tailwind.config.js')) ? require('path').resolve(TARGET_DIR, 'tailwind.config.js') : (require('fs').existsSync(require('path').resolve(TARGET_DIR, 'tailwind.config.mjs')) ? require('path').resolve(TARGET_DIR, 'tailwind.config.mjs') : null);
        if (configPath) {
            try {
                userConfig = (await import(require('url').pathToFileURL(configPath).href)).default || require(configPath);
            } catch(e) {
                try { userConfig = require(configPath); } catch(err) {}
            }
        }
        const testJitConfig = { presets: [userConfig], content: [{ raw: testHtml, extension: 'html' }], corePlugins: { preflight: false } };
        try { testPlugin = require('tailwindcss')(testJitConfig); } catch(e) { testPlugin = require('tailwindcss'); }
`;
content = content.replace(/try\s*\{\s*testPlugin\s*=\s*require\('tailwindcss'\)\(\{\s*content[\s\S]*?catch\(e\)\s*\{\s*testPlugin\s*=\s*require\('tailwindcss'\);\s*\}/, replacement1.trim());


const replacement2 = `
    const finalJitConfig = { presets: [typeof userConfig !== "undefined" ? userConfig : {}], content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false } };
    twPlugin = require('tailwindcss')(finalJitConfig);
`;
content = content.replace(/twPlugin\s*=\s*require\('tailwindcss'\)\(\{ content: \[\{ raw: virtualHtml, extension: 'html' \}\], corePlugins: \{ preflight: false \} \}\);/, replacement2.trim());

// Also declare userConfig globally if we haven't
if (!content.includes('let userConfig: any = {};')) {
    content = content.replace('let customRules = \'\';', 'let customRules = \'\';\nlet userConfig: any = {};');
}

// In phase 4, we need userConfig. But in Phase 1 we loaded it LOCALLY.
// We should load it globally before everything!
// Let's replace the global declaration to actually load it BEFORE Phase 1.
const globalLoad = `
let customRules = '';
let userConfig: any = {};
try {
    const cp = require('fs').existsSync(require('path').resolve(TARGET_DIR || '.', 'tailwind.config.js')) ? require('path').resolve(TARGET_DIR || '.', 'tailwind.config.js') : (require('fs').existsSync(require('path').resolve(TARGET_DIR || '.', 'tailwind.config.mjs')) ? require('path').resolve(TARGET_DIR || '.', 'tailwind.config.mjs') : null);
    if (cp) {
        userConfig = require(cp); // We'll do a sync require here, or wait...
    }
} catch(e) {}
`;
// Let's actually NOT do globalLoad since TARGET_DIR isn't available at the top.
// Instead, just assign global userConfig in Phase 1.
content = content.replace('let userConfig = {};', 'userConfig = {};');

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
console.log("Patched correctly!");
