const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

content = content.replace('const finalJitConfig = { presets: [userConfig],', 'const finalJitConfig = { presets: [typeof userConfig !== "undefined" ? userConfig : {}],');

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
