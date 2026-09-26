# ⚔️ AUM-IC Tailwind Killer

**AUM-IC Tailwind Killer** es un orquestador CLI de alto rendimiento diseñado para **transmutar** proyectos basados en Tailwind CSS en ecosistemas de clases ofuscadas, deterministas y libres de dependencias (Zero-Bloat). 

Desarrollado por el equipo de **Ingeniería Creativa (IngCrea)**, esta herramienta audita, extrae, compila (vía JIT) y purga tu código fuente en segundos gracias a su nueva arquitectura de **Doble Núcleo (Rust + TypeScript)** e interceptores AST universales.

---

## ⚡ ¿Por qué crear AUM-IC Tailwind Killer?

1. **Ofuscación y Seguridad Corporativa:** Transforma utilidades legibles (`flex items-center text-red-500`) en hashes seguros (`aumic-rs-1b3a4f`), dificultando el scraping y el robo de diseño (UI/UX).
2. **Independencia del Framework:** Erradica a Tailwind CSS de tu `package.json` y dependencias de build. Tu proyecto pasa a depender únicamente de un archivo `.css` nativo, estándar y ultra-optimizado.
3. **Rendimiento Extremo (Build Time):** Al purgar el motor de Tailwind de tu flujo de trabajo, los tiempos de compilación de tu framework (Astro, Next.js, Vite) se reducen drásticamente.
4. **Cero Riesgo de Corrupción:** Cuenta con escudos **Pre-Flight** que auditan los permisos antes de tocar un solo archivo, evitando estados corruptos.

---

## 🦀 Arquitectura de Doble Núcleo: ¿Por qué Rust?

Procesar miles de archivos, parsear el DOM y orquestar el compilador JIT en un entorno mono-hilo como Node.js generaba un cuello de botella inaceptable para proyectos masivos. Para alcanzar el pináculo del rendimiento "Zero-Bloat", rediseñamos el núcleo bajo una **arquitectura híbrida infalible**:

1. **Motor Nativo en Rust (El Estándar):**
   - Un ejecutable de apenas 2.5 MB.
   - **Concurrencia Multi-Núcleo:** Utiliza la librería `rayon` para procesar archivos en paralelo utilizando el 100% de los hilos de tu CPU.
   - Analiza y muta todo un proyecto en escasos milisegundos usando criptografía segura (`sha2`).

2. **Motor de TypeScript (El Fallback Inteligente):**
   - Sirve como red de seguridad. Si el binario de Rust es bloqueado por políticas corporativas, antivirus o usas una arquitectura de hardware exótica, el Wrapper de NPM detecta el fallo y **ejecuta instantáneamente nuestro motor fuertemente tipado en Node.js**.
   - Posee una precisión inigualable mediante el análisis profundo de AST (Babel) para componentes complejos de React/Next.js.

---

## 🚀 Instalación

El Wrapper interceptor distribuirá dinámicamente el ejecutable correspondiente a tu Sistema Operativo (Windows, Linux, macOS).

Puedes ejecutarlo al vuelo usando `npx` (recomendado) o instalarlo globalmente:

```bash
# Uso al vuelo mediante NPX
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# Instalación global
npm install -g @ingcrea/aumic-tailwind-killer
aumic-tailwind-killer -m local -t ./mi-proyecto
```

---

## 🛠 Casos de Uso y Ejemplos de Ejecución

La herramienta opera bajo distintos **modos** de destrucción y auditoría. Asegúrate de estar en una rama de Git limpia antes de realizar mutaciones destructivas.

### 1. Modo Simulación (Dry-Run)
**Caso de uso:** Quieres auditar tu proyecto, ver cuántas clases de Tailwind usas y visualizar el impacto sin modificar tu código fuente.

```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./
```
* **Qué hace:** Escanea el código mediante el Motor Infrarrojo, extrae las utilidades, genera los hashes en memoria y emite el CSS de prueba, pero **no altera** tus archivos.

### 2. Modo Local (Transmutación Destructiva)
**Caso de uso:** Estás listo para preparar tu código para producción. Deseas reemplazar todo Tailwind por CSS puro, reescribir tus componentes (`.astro`, `.tsx`, `.vue`, `.py`) y eliminar el framework.

```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./
```
* **Qué hace:** Ejecuta las 5 Fases de AUM-IC. Reescribe físicamente todos los archivos soportados usando los motores paralelos de Rust, inyecta el CSS nativo unificado, elimina dependencias en `package.json` y genera un mapa reverso (`aumic-lock.json`).

### 3. Modo Quirúrgico (Surgical Scope)
**Caso de uso:** Tienes un monorepo gigante y solo quieres ofuscar una carpeta específica (ej. solo el frontend de marketing).

```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ -s "src/frontend/**/*.{tsx,astro}"
```
* **Qué hace:** Restringe la mutación **estrictamente** al patrón Glob (Regex) definido en el argumento `-s` (Scope).

### 4. Modo Restauración (Rollback)
**Caso de uso:** Algo falló durante el QA post-mutación o necesitas volver a trabajar con Tailwind en tu entorno local.

```bash
npx @ingcrea/aumic-tailwind-killer -m restore -t ./
```
* **Qué hace:** Lee el mapa criptográfico `aumic-lock.json`, revierte los hashes en tus archivos a sus clases Tailwind originales y restaura las configuraciones de `.aumic-bak`.

---

## ⚙️ Banderas y Variables (CLI Options)

| Bandera Corta | Bandera Larga | Descripción | Obligatorio |
| :--- | :--- | :--- | :--- |
| `-m` | `--mode` | Define el comportamiento del orquestador (`simulate`, `local`, `restore`). | **Sí** |
| `-t` | `--target` | Ruta absoluta o relativa al directorio del proyecto a procesar. | **Sí** |
| `-s` | `--scope` | Patrón de búsqueda para restringir la mutación a archivos específicos. | No |

---

## 🧠 Arquitectura de 5 Fases

1. **Reconocimiento & Pre-Flight:** Validación exhaustiva del sistema de archivos ignorando estrictamente agujeros negros como `node_modules`, `.git` y `dist`.
2. **Extracción Paralela (Rust Rayon + Babel TS):** Intercepta atributos de clase (`class`, `className`, `class:list`) dividiendo la carga de trabajo entre todos los hilos del procesador.
3. **Criptografía de Nomenclatura:** Asignación de Hashes Deterministas (`aumic-rs-[hash]`) optimizando la reusabilidad (deduplicación del 100%).
4. **Motor JIT Embebido:** Generación virtual en memoria y renderizado de CSS de Tailwind usando compilación "Just In Time" invocada como un subproceso nativo del sistema.
5. **Erradicación Total:** Renombramiento de configuraciones a `.aumic-bak`, inyección del archivo CSS puro resultante y desinstalación forzada del framework original.

---

> Desarrollado bajo la doctrina tecnológica de Ingeniería Creativa. Excelencia, Determinismo y Zero-Trust.
