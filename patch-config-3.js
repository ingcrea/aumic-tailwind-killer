const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

// Declaramos userConfig al inicio
content = content.replace('let customRules = \'\';', 'let customRules = \'\';\nlet userConfig: any = {};');

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
