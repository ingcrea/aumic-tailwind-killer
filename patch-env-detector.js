const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const detectorCode = `
    spinner.start('Analizando entorno y dependencias de Tailwind...');
    const envStatus = { version: 3, usesAstro: false, usesVite: false, usesPostcss: false, importsPreflight: false, importsUtilities: false, cssEntrypoint: null };
    
    try {
        const p = require(path.join(TARGET_DIR, 'package.json'));
        const deps = { ...(p.dependencies || {}), ...(p.devDependencies || {}) };
        if (deps['tailwindcss']) envStatus.version = deps['tailwindcss'].startsWith('^4') || deps['tailwindcss'].startsWith('4') ? 4 : 3;
        else if (deps['@tailwindcss/vite'] || deps['@tailwindcss/postcss']) envStatus.version = 4;
        
        envStatus.usesAstro = !!deps['@astrojs/tailwind'];
        envStatus.usesVite = !!deps['@tailwindcss/vite'];
        envStatus.usesPostcss = !!deps['@tailwindcss/postcss'];
    } catch(e) {}

    const rootCssFiles = await glob('**/*.{css,scss,sass,less,pcss}', { cwd: TARGET_DIR, absolute: true, ignore: ['node_modules/**', 'dist/**', 'public/**'] });
    for (const file of rootCssFiles) {
        const c = await fs.readFile(file, 'utf-8');
        if (c.includes('@tailwind') || c.includes('tailwindcss')) {
            envStatus.cssEntrypoint = file;
            if (c.includes('@tailwind base') || c.includes('tailwindcss/preflight') || c.includes('@import "tailwindcss"')) envStatus.importsPreflight = true;
            if (c.includes('@tailwind utilities') || c.includes('tailwindcss/utilities') || c.includes('@import "tailwindcss"')) envStatus.importsUtilities = true;
        }
    }

    if (envStatus.usesAstro) {
        envStatus.importsPreflight = true;
        envStatus.importsUtilities = true;
    }
    
    spinner.succeed(pc.cyan(\`Entorno JIT DinÃ¡mico: Tailwind v\${envStatus.version} | Preflight: \${envStatus.importsPreflight ? 'Activo' : 'Inactivo'} | IntegraciÃ³n: \${envStatus.usesVite ? 'Vite' : envStatus.usesAstro ? 'Astro' : 'PostCSS'}\`));
`;

if (!content.includes('Analizando entorno y dependencias de Tailwind')) {
    content = content.replace(/const classMapping = new Map<string, {/, detectorCode + '\n    const classMapping = new Map<string, {');
}

content = content.replace(/let preflightCss = '';/g, `let preflightCss = '';
            if (envStatus.importsPreflight) {`);
content = content.replace(/if \(preflightCss\) \{/g, `} // end if importsPreflight
            if (preflightCss) {`);

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
