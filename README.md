# ⚔️ [AUM-IC](https://github.com/ingcrea/aum-ic) Tailwind Killer

El motor destructivo definitivo para erradicar Tailwind CSS de cualquier proyecto o página web, transmutándolo matemáticamente a CSS puro o SCSS bajo la estricta **Doctrina [AUM-IC](https://github.com/ingcrea/aum-ic)** (Átomos -> Galaxias). 

Arquitectura pragmática construida por y para desarrolladores reales hartos de la deuda técnica de las clases utilitarias.

## 🚀 Las 12 Armas Letales (Características)

1. **Zero-Bloat JIT Interceptor**: No generamos CSS a ciegas. Instanciamos el compilador nativo de Tailwind en memoria, permitimos que optimice y de-duplique el CSS con su algoritmo nativo, y luego secuestramos el resultado para inyectar nuestra nomenclatura. Resultado: **Cero inflación de código**, CSS matemáticamente perfecto.
2. **Interceptor Agnóstico Universal**: Destripa de forma segura la lógica interna de React, Astro, Vue, Svelte, Python, Rust, PHP y Go sin importar si el framework actualiza su sintaxis mañana.
3. **AST Dynamic Resolver**: Algoritmo determinista nativo que penetra en lógica condicional de React (`isActive ? 'bg-red-500' : 'bg-blue-500'`) y dentro de funciones como `clsx()`, `cva()` y `twMerge()`, aislando clases dinámicas sin romper la aplicación.
4. **Ataque Quirúrgico (Migración Incremental)**: Usa el flag `--scope` para aislar el ataque a componentes específicos (ej. `src/components/**/*.tsx`) sin desinstalar Tailwind del repo global. Ideal para refactorización táctica de repositorios monolíticos legacy.
5. **Modo Forense (Anteriormente Modo Parásito)**: Clona cualquier página web pública **(exclusivo para sitios Tailwind)**, descarga sus assets y transmuta su CSS. Herramienta White-Hat diseñada para auditorías a11y, disaster recovery y análisis competitivo.
6. **Theme Harvester (Extractor de Variables Nativas)**: Antes de erradicar Tailwind, el motor lee matemáticamente tu paleta de colores de `tailwind.config.js` y genera variables puras en `:root` (`--color-primary`, etc.) para preservar tu identidad corporativa intacta.
7. **Titanium Cache (.aumic-memory.json)**: Memoria local persistente. El motor recuerda cada traducción semántica, imponiendo una consistencia 1:1 estricta (cero alucinaciones). Evita llamadas duplicadas a APIs externas y reduce costos a cero en reprocesamientos masivos.
8. **Inteligencia Artificial Semántica (Ollama y Cloud)**: Bautiza las clases criptográficas a nombres BEM legibles conectando con OpenAI, Claude, Gemini, DeepSeek, xAI, Alibaba o **Ollama** (Modelos 100% locales en tu propia GPU sin costo).
9. **Inyección de Reglas Personalizadas (.aumicrc.json)**: Control absoluto sobre la IA. Coloca este archivo en tu raíz para obligar al LLM a seguir directivas de nombrado BEM personalizadas de tu equipo o empresa.
10. **Simulador de Impacto (Dry-Run Profiler)**: Usa el flag `--simulate` para ejecutar un escaneo táctico en frío. No altera archivos, sino que genera un Dashboard HTML (`aumic-report.html`) mostrándote el impacto exacto de las clases detectadas y cómo serán erradicadas.
11. **Arquitecturas de Salida Múltiples (Output Targets)**: AUM-IC no te amarra. Genera SCSS modular AUM-IC, CSS Global, o transmuta tu código de React a **CSS Modules** nativos o **Styled Components** (CSS-in-JS). Nos adaptamos al ecosistema.
12. **Rollback Absoluto (Modo Restauración)**: ¿Te arrepentiste o algo falló? El motor usa el mapa criptográfico generado (`aumic-lock.json`) y sus backups ocultos (`.aumic-bak`) para restaurar todo el código, resucitar tu `package.json` exacto (con todos sus scripts intactos) y reinstalar la versión exacta de Tailwind que estabas usando.

## 💻 Uso

### Modo Interactivo (Recomendado)
Interfaz de control dual. Ejecuta el comando en tu terminal para activar el menú DevSecOps:
```bash
npx aumic-tailwind-killer
```

### Modo CLI Avanzado (Operaciones Desatendidas)
Para integraciones directas en pipelines de CI/CD, puedes saltar la interfaz pasando flags:
```bash
# Modo Local: Transmutar proyecto en disco, sin IA, salida SCSS modular AUM-IC
npx aumic-tailwind-killer --mode local -t ./mi-proyecto -o aumic

# Ataque Quirúrgico: Migrar solo componentes de UI (Sin desinstalar Tailwind)
npx aumic-tailwind-killer --mode surgical --scope "src/components/ui/**/*.tsx" --no-eradicate

# Simulador de Impacto: Ver el reporte sin dañar archivos
npx aumic-tailwind-killer --mode local --simulate

# Modo Forense (Web Clone): Clonar toda una web y transmutar su CSS
npx aumic-tailwind-killer --mode clone --url https://nexoremoto.com/rescue --depth site -t ./clon-nexoremoto

# Modo IA + Ollama Local (Gratis, Ilimitado y Privado)
npx aumic-tailwind-killer --mode local --ai ollama

# Modo Restauración: Aplicar el Rollback Absoluto
npx aumic-tailwind-killer --mode restore
```

### Opciones CLI Completas:
* `-m, --mode <type>`: Vector de ataque (`local`, `surgical`, `clone`, `restore`).
* `-u, --url <url>`: URL de la víctima (solo Modo Forense).
* `-d, --depth <depth>`: `page` (solo la URL) o `site` (toda la web recursiva).
* `-s, --scope <path>`: Glob path para ataques quirúrgicos incrementales (ej. `src/**/*.tsx`).
* `-t, --target <dir>`: Directorio raíz de destino.
* `-o, --output <type>`: `aumic` (SCSS AUM-IC), `global`, `css-modules` (React/Next), `styled-components` (CSS-in-JS).
* `--simulate`: Activa el simulador Dry-Run y emite el `aumic-report.html`.
* `--ai <provider>`: Motor IA: `openai`, `claude`, `gemini`, `deepseek`, `xai`, `alibaba`, `ollama`.
* `--key <token>`: Llave de la API (solo existe en RAM durante la ejecución).
* `--no-eradicate`: Evita que el motor desinstale Tailwind del `package.json`.
* `--interactive`: Fuerza la interfaz de usuario en entornos CI.

## 🛡 Seguridad y Privacidad (Manifiesto)
Consulta el archivo `MANIFEST.md` para entender el modelo de seguridad determinista. La herramienta opera 100% offline a menos que actives explícitamente una llave de IA (o uses Ollama). Ningún dato sensible de tus proyectos sale de tu red local.
