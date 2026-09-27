const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

// Fix 1: Make version dynamic
content = content.replace(/⚔️  AUM-IC TAILWIND KILLER v2\.0\.x/g, '⚔️  AUM-IC TAILWIND KILLER v${pkgVersion}');
content = content.replace(/\(v2\.0\.24\)/g, '(v${pkgVersion})');

// Fix 2: Change @import to @use for aumic-styles to prevent Sass warnings
content = content.replace(/@import "aumic-styles";/g, '@use "aumic-styles";');

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
