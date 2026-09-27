const fs = require('fs');

// Fix package.json BOM
let pkg = fs.readFileSync('package.json', 'utf8');
if (pkg.charCodeAt(0) === 0xFEFF) {
    pkg = pkg.slice(1);
    fs.writeFileSync('package.json', pkg, 'utf8');
}

// Fix index.ts JSON parsing robustness
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');
content = content.replace(/fs\.readFileSync\(path\.join\(__dirname, '\.\.\/package\.json'\), 'utf-8'\)/, "fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8').replace(/^\\uFEFF/, '')");
fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
