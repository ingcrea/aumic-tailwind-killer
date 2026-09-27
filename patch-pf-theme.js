const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

content = content.replace(
    /const pfPlugin = require\('tailwindcss'\)\(\{ content: \[\{raw: '<div class="a"><\/div>', extension: 'html'\}\] \}\);/g,
    "const pfPlugin = require('tailwindcss')({ content: [{raw: '<div class=\"a\"></div>', extension: 'html'}], theme: userConfig.theme || {} });"
);

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
