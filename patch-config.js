const fs = require('fs');

let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

// Modificamos JIT Validator para que cargue la config si existe
const jitConfigInject = `
    let userConfig = {};
    const configPath = require('fs').existsSync(require('path').join(TARGET_DIR, 'tailwind.config.js')) ? require('path').join(TARGET_DIR, 'tailwind.config.js') : (require('fs').existsSync(require('path').join(TARGET_DIR, 'tailwind.config.mjs')) ? require('path').join(TARGET_DIR, 'tailwind.config.mjs') : null);
    if (configPath) {
        try { userConfig = require(configPath); } catch(e) {}
    }
    const testJitConfig = { presets: [userConfig], content: [{ raw: testHtml, extension: 'html' }], corePlugins: { preflight: false } };
`;
content = content.replace(/try\s*\{\s*testPlugin\s*=\s*require\('tailwindcss'\)\(\{\s*content[^}]+\}\);\s*\}\s*catch\(e\)\s*\{\s*testPlugin\s*=\s*require\('tailwindcss'\);\s*\}/, jitConfigInject + "\n    try { testPlugin = require('tailwindcss')(testJitConfig); } catch(e) { testPlugin = require('tailwindcss'); }");

// Modificamos JIT Final (Fase 4)
const phase4ConfigInject = `
    const finalJitConfig = { presets: [userConfig], content: [{ raw: virtualHtml, extension: 'html' }], corePlugins: { preflight: false } };
    twPlugin = require('tailwindcss')(finalJitConfig);
`;
content = content.replace(/twPlugin\s*=\s*require\('tailwindcss'\)\(\{ content: \[\{ raw: virtualHtml, extension: 'html' \}\], corePlugins: \{ preflight: false \} \}\);/, phase4ConfigInject);

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
console.log("JIT Config Patched!");
