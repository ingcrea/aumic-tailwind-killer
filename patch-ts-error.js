const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

content = content.replace(/cssEntrypoint: null/g, "cssEntrypoint: '' as string | null");

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
