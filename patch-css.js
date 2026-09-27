const fs = require('fs');
let content = fs.readFileSync('src-typescript/index.ts', 'utf8');

// Cambiar la salida del archivo a CSS puro
content = content.replace(/_aumic-styles\.scss/g, 'aumic-styles.css');

// Cambiar la inyección en global.scss para importar el archivo CSS puramente
content = content.replace(/@use "aumic-styles";/g, '@import "./aumic-styles.css";');
content = content.replace(/@import "aumic-styles";/g, '@import "./aumic-styles.css";');

fs.writeFileSync('src-typescript/index.ts', content, 'utf8');
