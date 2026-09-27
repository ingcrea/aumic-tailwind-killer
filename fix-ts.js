const fs = require('fs');
let code = fs.readFileSync('src-typescript/index.ts', 'utf8');

code = code.replace(
    /let unresolvedClasses = new Set\(\);/,
    'let unresolvedClasses = new Set<string>();'
);
code = code.replace(
    /const allTwClasses = new Set\(\);/,
    'const allTwClasses = new Set<string>();'
);
code = code.replace(
    /\(err, rows\)/,
    '(err: any, rows: any[])'
);
code = code.replace(
    /new Promise\(\(resolve\)/,
    'new Promise<void>((resolve)'
);

fs.writeFileSync('src-typescript/index.ts', code, 'utf8');
