# ⚔️ [AUM-IC](https://github.com/ingcrea/aum-ic) Tailwind Killer

El motor destructivo definitivo para erradicar Tailwind CSS de cualquier proyecto o página web, transmutándolo matemáticamente a CSS puro o SCSS bajo la estricta **Doctrina [AUM-IC](https://github.com/ingcrea/aum-ic)** (Átomos -> Galaxias).

## 🚀 Las 8 Armas Letales (Características)

1. **Interceptor Híbrido AST + Regex**: Destripa de forma segura la lógica interna de React, Astro, Vue, Svelte, Python, Rust, PHP y Go.
2. **Ataque Quirúrgico (Migración Incremental)**: Usa el flag `--scope` para aislar el ataque a componentes específicos (ej. `src/components/**/*.tsx`) sin desinstalar Tailwind del repo. Ideal para refactorización de repositorios monolíticos legacy.
3. **Modo Parásito (Web Clone)**: Clona cualquier página web pública **(exclusivo para sitios Tailwind)**, descarga sus assets, reescribe los enlaces a formato local estático, e intercepta su CSS para inyectar la doctrina [AUM-IC](https://github.com/ingcrea/aum-ic).
4. **Theme Harvester (Extractor de Variables Nativas)**: Antes de erradicar Tailwind, el motor lee matemáticamente tu paleta de colores de `tailwind.config.js` y genera variables puras en `:root` (`--color-primary`, etc.) para preservar tu identidad corporativa intacta.
5. **Inteligencia Artificial Semántica**: Bautiza las clases criptográficas a nombres BEM legibles conectando con OpenAI, Claude, Gemini, DeepSeek, xAI o Alibaba.
6. **Inyección de Reglas Personalizadas (.aumicrc.json)**: Control absoluto sobre la IA. Coloca este archivo en tu raíz para obligar al LLM a seguir directivas de nombrado BEM personalizadas de tu equipo o empresa.
7. **Simulador de Impacto (Dry-Run Profiler)**: Usa el flag `--simulate` para ejecutar un escaneo táctico en frío. No altera archivos, sino que genera un Dashboard HTML (`aumic-report.html`) mostrándote el impacto exacto de las clases detectadas y cómo serán erradicadas.
8. **Rollback Absoluto (Modo Restauración)**: ¿Te arrepentiste o algo falló? El motor usa el mapa criptográfico generado (`aumic-lock.json`) para restaurar todo el código, resucitar tu `package.json` exacto (con todos sus scripts) y reinstalar la versión exacta de Tailwind que estabas usando.

## 💻 Uso

### Modo Interactivo (Recomendado)
Interfaz de control dual. Ejecuta el comando en tu terminal para activar el menú DevSecOps:
```bash
npx aumic-tailwind-killer
```

### Modo CLI Avanzado (Operaciones Desatendidas)
Para integraciones directas en pipelines de CI/CD, puedes saltar la interfaz pasando flags:
```bash
# Modo Local: Transmutar proyecto en disco, sin IA, salida modular
npx aumic-tailwind-killer --mode local -t ./mi-proyecto -o modular

# Ataque Quirúrgico: Migrar solo componentes de UI (Sin desinstalar Tailwind)
npx aumic-tailwind-killer --mode surgical --scope "src/components/ui/**/*.tsx" --no-eradicate

# Simulador de Impacto: Ver el reporte sin dañar archivos
npx aumic-tailwind-killer --mode local --simulate

# Modo Parásito: Clonar toda una web y transmutar su CSS
npx aumic-tailwind-killer --mode clone --url https://nexoremoto.com/rescue --depth site -t ./clon-nexoremoto

# Modo Restauración: Aplicar el Rollback Absoluto
npx aumic-tailwind-killer --mode restore
```

### Opciones CLI Completas:
* `-m, --mode <type>`: Vector de ataque (`local`, `surgical`, `clone`, `restore`).
* `-u, --url <url>`: URL de la víctima (solo Modo Parásito).
* `-d, --depth <depth>`: `page` (solo la URL) o `site` (toda la web recursiva).
* `-s, --scope <path>`: Glob path para ataques quirúrgicos incrementales (ej. `src/**/*.tsx`).
* `-t, --target <dir>`: Directorio raíz de destino.
* `-o, --output <type>`: `modular` (SCSS separado por átomos/moléculas) o `global` (CSS único).
* `--simulate`: Activa el simulador Dry-Run y emite el `aumic-report.html`.
* `--ai <provider>`: Motor IA: `openai`, `claude`, `gemini`, `deepseek`, `xai`, `alibaba`.
* `--key <token>`: Llave de la API (solo existe en RAM durante la ejecución).
* `--no-eradicate`: Evita que el motor desinstale Tailwind del `package.json`.
* `--interactive`: Fuerza la interfaz de usuario en entornos CI.

## 🛡 Seguridad y Privacidad (Manifiesto)
Consulta el archivo `MANIFEST.md` para entender el modelo de seguridad determinista. La herramienta opera 100% offline a menos que actives explícitamente una llave de IA. Ningún dato sensible de tus proyectos sale de tu red local.
