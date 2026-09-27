const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

content = content.replace(/require\('path'\)\.join\(TARGET_DIR, 'tailwind\.config\.js'\)/g, "require('path').resolve(TARGET_DIR, 'tailwind.config.js')");
content = content.replace(/require\('path'\)\.join\(TARGET_DIR, 'tailwind\.config\.mjs'\)/g, "require('path').resolve(TARGET_DIR, 'tailwind.config.mjs')");

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
console.log("Path resolve patched!");
