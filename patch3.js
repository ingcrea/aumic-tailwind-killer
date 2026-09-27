const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const eradicateFix = `
            ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs'].forEach(conf => {
                const confPath = path.join(TARGET_DIR, conf);
                if (fs.existsSync(confPath)) {
                    fs.renameSync(confPath, confPath + '.aumic-bak');
                }
            });

            // Astro-specific cleanup
            const astroConfigPath = path.join(TARGET_DIR, 'astro.config.mjs');
            if (fs.existsSync(astroConfigPath)) {
                let ac = fs.readFileSync(astroConfigPath, 'utf8');
                ac = ac.replace(/import\\s+tailwind\\s+from\\s+['"]@astrojs\\/tailwind['"];?\\n?/, '');
                ac = ac.replace(/tailwind\\(\\)\\s*,?/, '');
                fs.writeFileSync(astroConfigPath, ac, 'utf8');
            }

            try { require('child_process').execSync('npm uninstall tailwindcss postcss @tailwindcss/postcss @astrojs/tailwind', { cwd: TARGET_DIR, stdio: 'ignore' }); } catch(e) {}
`;

// Direct string replacement for precise matching
const targetBlock = `            ['tailwind.config.js', 'tailwind.config.ts', 'tailwind.config.cjs', 'tailwind.config.mjs'].forEach(conf => {
                const confPath = path.join(TARGET_DIR, conf);
                if (fs.existsSync(confPath)) {
                    fs.renameSync(confPath, \`\${confPath}.aumic-bak\`);
                }
            });
            execSync('npm uninstall tailwindcss postcss @tailwindcss/postcss', { cwd: TARGET_DIR, stdio: 'ignore' });`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, eradicateFix.trim());
    console.log("Eradicate patch applied successfully!");
} else {
    console.log("Eradicate patch NOT applied. Target block not found.");
}

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
