# ⚔️ AUM-IC Tailwind Killer

**AUM-IC Tailwind Killer** es un orquestador CLI de alto rendimiento diseñado para **transmutar** proyectos basados en Tailwind CSS en ecosistemas de clases ofuscadas, deterministas y libres de dependencias (Zero-Bloat). 

Desarrollado por el equipo de **Ingeniería Creativa (IngCrea)**, esta herramienta audita, extrae, compila (vía JIT) y purga tu código fuente en segundos gracias a su nueva arquitectura **Multi-Level JIT Cache (DuckDB + TypeScript)** e interceptores AST universales.

---

## ⚡ ¿Por qué crear AUM-IC Tailwind Killer?

1. **Ofuscación y Seguridad Corporativa:** Transforma utilidades legibles (`flex items-center text-red-500`) en hashes seguros (`aumic-rs-1b3a4f`), dificultando el scraping y el robo de diseño (UI/UX).
2. **Independencia del Framework:** Erradica a Tailwind CSS de tu `package.json` y dependencias de build. Tu proyecto pasa a depender únicamente de un archivo `.css` nativo, estándar y ultra-optimizado.
3. **Rendimiento Extremo (Build Time):** Al purgar el motor de Tailwind de tu flujo de trabajo, los tiempos de compilación de tu framework (Astro, Next.js, Vite) se reducen drásticamente.
4. **Cero Riesgo de Corrupción:** Cuenta con escudos **Pre-Flight** que auditan los permisos antes de tocar un solo archivo, evitando estados corruptos.

---

## 🦖 Arquitectura v4.1.3: Multi-Level JIT Cache

Para alcanzar el pináculo del rendimiento "Zero-Bloat", el núcleo de AUM-IC fue rediseñado bajo una arquitectura de caché de doble nivel impulsada 100% por Node.js y bases de datos analíticas:

1. **L1 Cache (DuckDB - El Oráculo Estático):**
   - Utiliza una base de datos binaria súper comprimida (`aumic-lexicon.duckdb`) que resuelve más de 26,000 clases nativas de Tailwind CSS en tiempo O(1) de forma completamente offline (Zero-Execution).
2. **L2 Cache (Dynamic JIT - El Secuestrador):**
   - Si una clase dinámica compleja no está en la caché L1, el motor secuestra e invoca de forma dinámica el propio compilador `tailwindcss` instalado en la carpeta `node_modules` de tu proyecto. Esto garantiza que la compilación respete la versión exacta que usas (v2, v3 o v4 Oxide).
3. **Preflight Theme Extractor:**
   - Absorbe dinámicamente tu archivo `tailwind.config.*`, preservando tipografías nativas (ej. `Inter`) y variables de color personalizadas con fidelidad visual del 100%.

*(Nota Histórica: Versiones anteriores usaban un motor en Rust. A partir de la v4.1.3, se migró a Node.js puro para habilitar la inyección dinámica del entorno local del cliente).*

---

## 🚀 Instalación

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
* **Qué hace:** Ejecuta las Fases de AUM-IC. Reescribe físicamente todos los archivos soportados, inyecta el CSS nativo unificado, elimina dependencias en `package.json` y genera un mapa reverso (`aumic-lock.json`).

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

> Desarrollado bajo la doctrina tecnológica de Ingeniería Creativa. Excelencia, Determinismo y Zero-Trust.
