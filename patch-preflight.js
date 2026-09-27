const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const injectionCode = `
            // =======================================
            // AUM-IC PREFLIGHT INJECTOR
            // =======================================
            let preflightCss = '';
            try {
                const pfPlugin = require('tailwindcss')({ content: [{raw: '<div class="a"></div>', extension: 'html'}] });
                const pfRes = await postcss([pfPlugin]).process('@tailwind base;', { from: undefined });
                preflightCss = pfRes.css;
            } catch(e) {
                console.warn("No se pudo extraer Preflight.");
            }
            if (preflightCss) {
                const pfAst = postcss.parse(preflightCss);
                globalRoot.prepend(pfAst);
            }
`;

if (!content.includes('AUM-IC PREFLIGHT INJECTOR')) {
    content = content.replace(/root\.walkRules\(\(rule: Rule\)/, injectionCode + '\n          root.walkRules((rule: Rule)');
    fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
}
console.log("Preflight injector patched.");
