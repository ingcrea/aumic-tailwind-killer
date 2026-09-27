const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

const oldLine = "userConfig = (await import(require('url').pathToFileURL(configPath).href)).default || require(configPath);";
const newLine = "const dynamicImport = new Function('modulePath', 'return import(modulePath)'); userConfig = (await dynamicImport(require('url').pathToFileURL(configPath).href)).default || require(configPath);";

content = content.replace(oldLine, newLine);
fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
