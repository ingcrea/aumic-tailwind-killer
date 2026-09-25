# ⚔️ [AUM-IC](https://github.com/ingcrea/aum-ic) Tailwind Killer

El motor destructivo definitivo para erradicar Tailwind CSS de cualquier proyecto o página web, transmutándolo matemáticamente a CSS puro o SCSS bajo la estricta **Doctrina [AUM-IC](https://github.com/ingcrea/aum-ic)** (Átomos -> Galaxias).

## 🚀 Características
* **Interceptor Híbrido AST + Regex**: Destripa de forma segura la lógica interna de React (JSX/TSX), Astro, Vue, Svelte, Python (Jinja), Rust (Tera), PHP (Blade) y Go.
* **Modo Parásito (Web Clone)**: Clona cualquier página web pública desde una URL, descarga sus assets, reescribe los enlaces a formato local estático, e intercepta su CSS para inyectar la doctrina [AUM-IC](https://github.com/ingcrea/aum-ic).
* **Inteligencia Artificial Semántica**: (Opcional) Renombra los hashes criptográficos por nombres de clase semánticos BEM legibles utilizando APIs unificadas de OpenAI, Claude, Gemini, DeepSeek, xAI o Alibaba.
* **Modo Interactivo y CLI Avanzado**: Apto para desarrolladores Noob (UI con Inquirer) o para DevSecOps avanzados (Flags CLI).
* **Protocolo de Erradicación**: Borra automáticamente dependencias, configuraciones y rastros de Tailwind en `package.json`.

## 💻 Uso

### Modo Interactivo (Recomendado)
Ejecuta el comando sin parámetros en tu terminal y sigue las instrucciones en pantalla:
```bash
npx aumic-tailwind-killer
```

### Modo CLI Avanzado (Manual)
Para entornos CI/CD o usuarios avanzados, puedes saltar la interfaz pasando flags:
```bash
# Modo Local: Transmutar proyecto en disco, sin IA, salida modular
npx aumic-tailwind-killer --mode local -t ./mi-proyecto -o modular

# Modo Parásito: Clonar toda una web, transmutar CSS
npx aumic-tailwind-killer --mode clone --url https://nexoremoto.com/rescue --depth site -t ./clon-nexoremoto

# Modo IA: Mapeo semántico usando OpenAI
npx aumic-tailwind-killer --mode local --ai openai --key "sk-..." -o global
```

### Opciones CLI:
* `-m, --mode <type>`: `local` o `clone`
* `-u, --url <url>`: URL de la víctima (solo Modo Parásito)
* `-d, --depth <depth>`: `page` (solo la URL) o `site` (toda la web recursiva)
* `-t, --target <dir>`: Directorio de destino.
* `-o, --output <type>`: `modular` (SCSS) o `global` (CSS único).
* `--ai <provider>`: `openai`, `claude`, `gemini`, `deepseek`, `xai`, `alibaba`.
* `--key <token>`: Llave de la API.
* `--no-eradicate`: Evita que el motor desinstale Tailwind del `package.json`.

## 🛡 Seguridad y Privacidad (Manifiesto)
Consulta el archivo `MANIFEST.md` para entender el modelo de seguridad determinista. La herramienta opera 100% offline a menos que actives explícitamente una llave de IA.
