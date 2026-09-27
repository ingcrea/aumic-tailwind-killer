# ⚔️ AUM-IC Tailwind Killer

**AUM-IC Tailwind Killer** no es solo un orquestador CLI; es la manifestación técnica de una doctrina de diseño. Se llama así porque está fundamentado estrictamente en la **Arquitectura de Universos Multidimensionales de Ingeniería Creativa (AUM-IC)**, una filosofía nacida para devolverle la cordura, el control absoluto y la escalabilidad a los ingenieros de software.

Como programador, conoces perfectamente la carga mental: Tailwind CSS es una maravilla para prototipar rápido, pero a medida que tu proyecto crece, el HTML se contamina con cadenas kilométricas (`flex items-center justify-center pt-4...`), el acoplamiento al framework se vuelve asfixiante y el código pierde su legibilidad semántica. **La filosofía AUM-IC corta esa cadena y reprograma este paradigma.** Creemos firmemente que tu código fuente no debe ser esclavo de una dependencia externa. Los estilos deben ser inmutables, deterministas y seguir una expansión fractal lógica: desde un simple Átomo hasta un Universo completo.

Desarrollado corporativamente por **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S. (IngCrea)**, este "Tailwind Killer" de alto rendimiento audita, extrae, compila (vía JIT) y purga tu código fuente en segundos. Su misión es transmutar el caos de las clases utilitarias en un ecosistema ofuscado, estandarizado y libre de dependencias (Zero-Bloat) impulsado por una arquitectura implacable de *Multi-Level JIT Cache (DuckDB + Node.js)* e interceptores AST universales.

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

---

## 🧠 Arquitectura de 5 Fases (El Pipeline de Transmutación)

Para garantizar la seguridad de tu código fuente, AUM-IC no usa simples reemplazos de texto (Regex). Utiliza un pipeline de compilación avanzado:

1. **Reconocimiento & Pre-Flight:** Validamos exhaustivamente el sistema de archivos, ignorando estrictamente agujeros negros (`node_modules`, `.git`, `dist`) y asegurando que tu rama de Git esté limpia.
2. **Extracción Paralela (Node Worker Threads + AST):** Usando `piscina` (hilos de trabajo en Node) escaneamos miles de archivos en paralelo. Utilizamos **Babel** y **Cheerio** para parsear el Árbol de Sintaxis Abstracta (AST) de tus componentes React/Astro, mutando el código de forma quirúrgica sin romper tu lógica de JavaScript.
3. **Criptografía de Nomenclatura:** Se ejecuta la deduplicación masiva asignando hashes deterministas (`aumic-rs-[hash]`). Si una utilidad se usa 5,000 veces, solo se genera un hash.
4. **Motor Multi-Level JIT Cache:** 
   - Consulta rápida a la L1 (DuckDB) para resolver utilidades estáticas.
   - Si existen variables dinámicas, se orquesta el L2 Cache inyectando el compilador local del cliente para generar el CSS faltante.
5. **Erradicación Total:** Generamos el archivo CSS puro final, creamos el mapa `aumic-lock.json` para futuros rollbacks, y ejecutamos un desinstalador agresivo que purga Tailwind CSS de tu `package.json`.

---
> Desarrollado bajo la doctrina tecnológica de Ingeniería Creativa. Excelencia, Determinismo y Zero-Trust.




