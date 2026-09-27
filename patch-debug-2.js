const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

content = content.replace(
  "console.log('[DEBUG] Failed BOTH imports:', e.message, err.message);",
  "console.log('[DEBUG] Failed BOTH imports:', (e as any).message, (err as any).message);"
);

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
