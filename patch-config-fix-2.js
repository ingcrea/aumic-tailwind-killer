const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

content = content.replace('let userConfig: any = {};', '');
content = content.replace('let pkgVersion =', 'let userConfig: any = {};\nlet pkgVersion =');

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
