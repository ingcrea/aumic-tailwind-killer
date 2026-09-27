const fs = require('fs');

// 1. Actualizar package.json
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8').replace(/^\uFEFF/, ''));
pkg.version = '4.1.3';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8');

// 2. Actualizar referencias en index.ts
let tsCode = fs.readFileSync('src-typescript/index.ts', 'utf8');
tsCode = tsCode.replace(/let pkgVersion = '.*';/, "let pkgVersion = '4.1.3';");
// Desactivar la descarga del binario de Rust (ahora TS es el amo absoluto)
tsCode = tsCode.replace(/const RUST_BIN_URL = .*/, "const RUST_BIN_URL = null;");
tsCode = tsCode.replace(/if \(RUST_BIN_URL/g, "if (false");
fs.writeFileSync('src-typescript/index.ts', tsCode, 'utf8');

console.log("Version bumped to 4.1.3 and Rust binary download deprecated.");
