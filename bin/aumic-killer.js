#!/usr/bin/env node

const os = require('os');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { spawnSync } = require('child_process');

// ==========================================
// AUM-IC NATIVE WRAPPER
// ==========================================
const VERSION = require('../package.json').version;
const GITHUB_REPO = 'ingcrea/aumic-tailwind-killer'; // <-- AJUSTA EL REPOSITORIO AQUÍ SI ES NECESARIO

const PLATFORM_MAP = {
    win32: 'win',
    linux: 'linux',
    darwin: 'macos'
};

const ARCH_MAP = {
    x64: 'x64',
    arm64: 'arm64'
};

const osName = PLATFORM_MAP[os.platform()];
const osArch = ARCH_MAP[os.arch()];

if (!osName || !osArch) {
    console.error(`❌ [AUM-IC] Arquitectura no soportada: ${os.platform()}-${os.arch()}`);
    process.exit(1);
}

const ext = osName === 'win' ? '.exe' : '';
const binName = `aumic-tailwind-killer-v${VERSION}-${osName}-${osArch}${ext}`;
const binDir = path.join(__dirname, '..', 'vendor');
const binPath = path.join(binDir, binName);

const downloadUrl = `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/${binName}`;

function downloadBinary(url, dest) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadBinary(res.headers.location, dest).then(resolve).catch(reject);
            }
            
            if (res.statusCode !== 200) {
                return reject(new Error(`Error HTTP ${res.statusCode} al descargar el binario nativo.`));
            }

            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
            file.on('error', (err) => {
                fs.unlink(dest, () => reject(err));
            });
        }).on('error', reject);
    });
}

async function main() {
    if (!fs.existsSync(binPath)) {
        if (!fs.existsSync(binDir)) {
            fs.mkdirSync(binDir, { recursive: true });
        }
        
        console.log(`\x1b[36m[AUM-IC]\x1b[0m Descargando motor nativo (v${VERSION}) para ${osName}-${osArch}...`);
        console.log(`\x1b[90mDescargando desde: ${downloadUrl}\x1b[0m`);
        
        try {
            await downloadBinary(downloadUrl, binPath);
            if (osName !== 'win') {
                fs.chmodSync(binPath, 0o755); // Hacer ejecutable en Linux/Mac
            }
            console.log(`\x1b[32m✔ Motor nativo instalado con éxito.\x1b[0m\n`);
        } catch (err) {
            console.error(`\x1b[33m⚠️ No se pudo descargar el binario nativo: ${err.message}\x1b[0m`);
            console.log(`\x1b[36m[AUM-IC]\x1b[0m Iniciando modo Fallback (Ejecutando motor de Node/TypeScript)...\n`);
            require('../dist/index.js');
            return;
        }
    }

    // Ejecutar el binario y pasar todos los argumentos del CLI
    const args = process.argv.slice(2);
    const result = spawnSync(binPath, args, { stdio: 'inherit' });
    
    if (result.error) {
        console.error(`\x1b[33m⚠️ Falló la ejecución nativa. Iniciando modo Fallback...\x1b[0m\n`);
        require('../dist/index.js');
        return;
    }
    
    process.exit(result.status || 0);
}

main();
