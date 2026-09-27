const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

// Añadir un log justo después de la carga
content = content.replace(
  'const testJitConfig = { presets: [userConfig], content: [{ raw: testHtml, extension: \'html\' }], corePlugins: { preflight: false } };',
  'console.log("[DEBUG] loaded colors:", userConfig?.theme?.extend?.colors ? Object.keys(userConfig.theme.extend.colors) : "None");\nconst testJitConfig = { presets: [userConfig], content: [{ raw: testHtml, extension: \'html\' }], corePlugins: { preflight: false } };'
);

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
