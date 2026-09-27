const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const targetStr = "execSync('npm uninstall tailwindcss postcss @tailwindcss/postcss', { cwd: TARGET_DIR, stdio: 'ignore' });";

const replacementStr = `
            // Astro-specific cleanup
            const astroConfigPath = require('path').join(TARGET_DIR, 'astro.config.mjs');
            if (fs.existsSync(astroConfigPath)) {
                let ac = fs.readFileSync(astroConfigPath, 'utf8');
                ac = ac.replace(/import\\s+tailwind\\s+from\\s+['"]@astrojs\\/tailwind['"];?\\n?/, '');
                ac = ac.replace(/tailwind\\(\\)\\s*,?/, '');
                fs.writeFileSync(astroConfigPath, ac, 'utf8');
            }

            try { require('child_process').execSync('npm uninstall tailwindcss postcss @tailwindcss/postcss @astrojs/tailwind', { cwd: TARGET_DIR, stdio: 'ignore' }); } catch(e) {}
`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr.trim());
    console.log("Eradicate patch applied successfully!");
} else {
    console.log("Not found.");
}

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
