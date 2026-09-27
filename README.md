# âš”ï¸ AUM-IC Tailwind Killer

**AUM-IC Tailwind Killer** es un orquestador CLI de alto rendimiento diseÃ±ado para **transmutar** proyectos basados en Tailwind CSS en ecosistemas de clases ofuscadas, deterministas y libres de dependencias (Zero-Bloat). 

Desarrollado por el equipo de **IngenierÃ­a Creativa (IngCrea)**, esta herramienta audita, extrae, compila (vÃ­a JIT) y purga tu cÃ³digo fuente en segundos gracias a su nueva arquitectura de **Doble NÃºcleo (Rust + TypeScript)** e interceptores AST universales.

---

## âš¡ Â¿Por quÃ© crear AUM-IC Tailwind Killer?

1. **OfuscaciÃ³n y Seguridad Corporativa:** Transforma utilidades legibles (`flex items-center text-red-500`) en hashes seguros (`aumic-rs-1b3a4f`), dificultando el scraping y el robo de diseÃ±o (UI/UX).
2. **Independencia del Framework:** Erradica a Tailwind CSS de tu `package.json` y dependencias de build. Tu proyecto pasa a depender Ãºnicamente de un archivo `.css` nativo, estÃ¡ndar y ultra-optimizado.
3. **Rendimiento Extremo (Build Time):** Al purgar el motor de Tailwind de tu flujo de trabajo, los tiempos de compilaciÃ³n de tu framework (Astro, Next.js, Vite) se reducen drÃ¡sticamente.
4. **Cero Riesgo de CorrupciÃ³n:** Cuenta con escudos **Pre-Flight** que auditan los permisos antes de tocar un solo archivo, evitando estados corruptos.

---

## ðŸ¦€ Arquitectura de Doble NÃºcleo: Â¿Por quÃ© Rust?

Procesar miles de archivos, parsear el DOM y orquestar el compilador JIT en un entorno mono-hilo como Node.js generaba un cuello de botella inaceptable para proyectos masivos. Para alcanzar el pinÃ¡culo del rendimiento "Zero-Bloat", rediseÃ±amos el nÃºcleo bajo una **arquitectura hÃ­brida infalible**:

1. **Motor Nativo en Rust (El EstÃ¡ndar):**
   - Un ejecutable de apenas 2.5 MB.
   - **Concurrencia Multi-NÃºcleo:** Utiliza la librerÃ­a `rayon` para procesar archivos en paralelo utilizando el 100% de los hilos de tu CPU.
   - Analiza y muta todo un proyecto en escasos milisegundos usando criptografÃ­a segura (`sha2`).

2. **Motor de TypeScript (El Fallback Inteligente):**
   - Sirve como red de seguridad. Si el binario de Rust es bloqueado por polÃ­ticas corporativas, antivirus o usas una arquitectura de hardware exÃ³tica, el Wrapper de NPM detecta el fallo y **ejecuta instantÃ¡neamente nuestro motor fuertemente tipado en Node.js**.
   - Posee una precisiÃ³n inigualable mediante el anÃ¡lisis profundo de AST (Babel) para componentes complejos de React/Next.js.

---

## ðŸš€ InstalaciÃ³n

El Wrapper interceptor distribuirÃ¡ dinÃ¡micamente el ejecutable correspondiente a tu Sistema Operativo (Windows, Linux, macOS).

Puedes ejecutarlo al vuelo usando `npx` (recomendado) o instalarlo globalmente:

```bash
# Uso al vuelo mediante NPX
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# InstalaciÃ³n global
npm install -g @ingcrea/aumic-tailwind-killer
aumic-tailwind-killer -m local -t ./mi-proyecto
```

---

## ðŸ›  Casos de Uso y Ejemplos de EjecuciÃ³n

La herramienta opera bajo distintos **modos** de destrucciÃ³n y auditorÃ­a. AsegÃºrate de estar en una rama de Git limpia antes de realizar mutaciones destructivas.

### 1. Modo SimulaciÃ³n (Dry-Run)
**Caso de uso:** Quieres auditar tu proyecto, ver cuÃ¡ntas clases de Tailwind usas y visualizar el impacto sin modificar tu cÃ³digo fuente.

```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./
```
* **QuÃ© hace:** Escanea el cÃ³digo mediante el Motor Infrarrojo, extrae las utilidades, genera los hashes en memoria y emite el CSS de prueba, pero **no altera** tus archivos.

### 2. Modo Local (TransmutaciÃ³n Destructiva)
**Caso de uso:** EstÃ¡s listo para preparar tu cÃ³digo para producciÃ³n. Deseas reemplazar todo Tailwind por CSS puro, reescribir tus componentes (`.astro`, `.tsx`, `.vue`, `.py`) y eliminar el framework.

```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./
```
* **QuÃ© hace:** Ejecuta las 5 Fases de AUM-IC. Reescribe fÃ­sicamente todos los archivos soportados usando los motores paralelos de Rust, inyecta el CSS nativo unificado, elimina dependencias en `package.json` y genera un mapa reverso (`aumic-lock.json`).

### 3. Modo QuirÃºrgico (Surgical Scope)
**Caso de uso:** Tienes un monorepo gigante y solo quieres ofuscar una carpeta especÃ­fica (ej. solo el frontend de marketing).

```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ -s "src/frontend/**/*.{tsx,astro}"
```
* **QuÃ© hace:** Restringe la mutaciÃ³n **estrictamente** al patrÃ³n Glob (Regex) definido en el argumento `-s` (Scope).

### 4. Modo RestauraciÃ³n (Rollback)
**Caso de uso:** Algo fallÃ³ durante el QA post-mutaciÃ³n o necesitas volver a trabajar con Tailwind en tu entorno local.

```bash
npx @ingcrea/aumic-tailwind-killer -m restore -t ./
```
* **QuÃ© hace:** Lee el mapa criptogrÃ¡fico `aumic-lock.json`, revierte los hashes en tus archivos a sus clases Tailwind originales y restaura las configuraciones de `.aumic-bak`.

---

## âš™ï¸ Banderas y Variables (CLI Options)

| Bandera Corta | Bandera Larga | DescripciÃ³n | Obligatorio |
| :--- | :--- | :--- | :--- |
| `-m` | `--mode` | Define el comportamiento del orquestador (`simulate`, `local`, `restore`). | **SÃ­** |
| `-t` | `--target` | Ruta absoluta o relativa al directorio del proyecto a procesar. | **SÃ­** |
| `-s` | `--scope` | PatrÃ³n de bÃºsqueda para restringir la mutaciÃ³n a archivos especÃ­ficos. | No |

---

## ðŸ§  Arquitectura de 5 Fases

1. **Reconocimiento & Pre-Flight:** ValidaciÃ³n exhaustiva del sistema de archivos ignorando estrictamente agujeros negros como `node_modules`, `.git` y `dist`.
2. **ExtracciÃ³n Paralela (Rust Rayon + Babel TS):** Intercepta atributos de clase (`class`, `className`, `class:list`) dividiendo la carga de trabajo entre todos los hilos del procesador.
3. **CriptografÃ­a de Nomenclatura:** AsignaciÃ³n de Hashes Deterministas (`aumic-rs-[hash]`) optimizando la reusabilidad (deduplicaciÃ³n del 100%).
4. **Motor JIT Embebido:** GeneraciÃ³n virtual en memoria y renderizado de CSS de Tailwind usando compilaciÃ³n "Just In Time" invocada como un subproceso nativo del sistema.
5. **ErradicaciÃ³n Total:** Renombramiento de configuraciones a `.aumic-bak`, inyecciÃ³n del archivo CSS puro resultante y desinstalaciÃ³n forzada del framework original.

---

> Desarrollado bajo la doctrina tecnolÃ³gica de IngenierÃ­a Creativa. Excelencia, Determinismo y Zero-Trust.


---

## ðŸ¦– Novedades en v4.1.3 (Multi-Level JIT Cache)

A partir de la versiÃ³n 4.1.3, el motor de TypeScript se convirtiÃ³ en el orquestador principal gracias a la inyecciÃ³n de una arquitectura de cachÃ© de doble nivel:

1. **L1 Cache (DuckDB - El OrÃ¡culo EstÃ¡tico):**
   - Una base de datos binaria sÃºper comprimida (`aumic-lexicon.duckdb`) que resuelve >26,000 clases de Tailwind CSS en tiempo O(1) de forma completamente offline.
2. **L2 Cache (Dynamic JIT):**
   - El motor ahora secuestra e invoca de forma dinÃ¡mica el propio compilador `tailwindcss` instalado en la carpeta `node_modules` del proyecto destino. Esto garantiza que la compilaciÃ³n de clases complejas respete la versiÃ³n exacta del cliente (v2, v3 o v4).
3. **Preflight Theme Extractor:**
   - La inyecciÃ³n del CSS Reset ahora absorbe dinÃ¡micamente el archivo `tailwind.config.*` del cliente, preservando tipografÃ­as nativas (ej. `Inter`) y variables de color personalizadas con fidelidad visual del 100%.


