const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const loaderReplacement = `
          if (configPath) {
              try {
                  const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                  userConfig = (await dynamicImport(require('url').pathToFileURL(configPath).href)).default || require(configPath);
              } catch (e: any) {
                  try { userConfig = require(configPath); } catch (err: any) {
                      // Micro-transpilador forense para CJS en ESM
                      try {
                          const fsExt = require('fs');
                          const tempPath = configPath + '.mjs';
                          let raw = fsExt.readFileSync(configPath, 'utf8');
                          raw = raw.replace(/module\\.exports\\s*=\\s*/, 'export default ');
                          fsExt.writeFileSync(tempPath, raw, 'utf8');
                          const dynamicImport = new Function('modulePath', 'return import(modulePath)');
                          userConfig = (await dynamicImport(require('url').pathToFileURL(tempPath).href)).default;
                          fsExt.unlinkSync(tempPath);
                      } catch (fatal) {
                          console.log('[AUM-IC] Fallo extremo al cargar Tailwind Config:', (fatal as any).message);
                      }
                  }
              }
          }
`;

// Buscar dónde inyecté esto la vez anterior:
content = content.replace(/if \(configPath\) \{[\s\S]*?console\.log\('\[DEBUG\] loaded colors:'[\s\S]*?\}\s*\}/, loaderReplacement.trim());

// Eliminar el console.log debug
content = content.replace(/console\.log\('\[DEBUG\] loaded colors:.*?\n/, '');

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
