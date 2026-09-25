const fs = require('fs');
const path = require('path');
const pkgPath = path.join(__dirname, '../package.json');
const pkg = require(pkgPath);
let [major, minor, patch] = pkg.version.split('.').map(Number);
patch++;
pkg.version = `${major}.${minor}.${patch}`;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Bumped version to ' + pkg.version);

const idxPath = path.join(__dirname, '../src/index.ts');
let idx = fs.readFileSync(idxPath, 'utf8');
idx = idx.replace(/\.version\(['`"].*?['`"]\)/, `.version('${pkg.version}')`);
idx = idx.replace(/v\d+\.\d+\.\d+/g, 'v' + pkg.version);
fs.writeFileSync(idxPath, idx);
