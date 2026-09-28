# ⚔️ AUM-IC Tailwind Killer

**AUM-IC Tailwind Killer** no es solo un orquestador CLI; es la manifestación técnica de una doctrina de diseño. Se llama así porque está fundamentado estrictamente en la **Arquitectura de Universos Multidimensionales de Ingeniería Creativa (AUM-IC)**, una filosofía nacida para devolverle la cordura, el control absoluto y la escalabilidad a los ingenieros de software.

Como programador, conoces perfectamente la carga mental: Tailwind CSS es una maravilla para prototipar rápido, pero a medida que tu proyecto crece, el HTML se contamina con cadenas kilométricas (`flex items-center justify-center pt-4...`), el acoplamiento al framework se vuelve asfixiante y el código pierde su legibilidad semántica. **La filosofía AUM-IC corta esa cadena y reprograma este paradigma.** Creemos firmemente que tu código fuente no debe ser esclavo de una dependencia externa. Los estilos deben ser inmutables, deterministas y seguir una expansión fractal lógica: desde un simple Átomo hasta un Universo completo.

Diseñado bajo el rigor arquitectónico de **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S. (IngCrea)**, este "Tailwind Killer" de alto rendimiento audita, extrae, compila (vía JIT) y purga tu código fuente en segundos. Su misión es transmutar el caos de las clases utilitarias en un ecosistema ofuscado, estandarizado y libre de dependencias (Zero-Bloat) impulsado por una arquitectura implacable de *Multi-Level JIT Cache (DuckDB + Node.js)* e interceptores AST universales.

---

## ⚡ ¿Por qué crear AUM-IC Tailwind Killer? (La Cura al Dolor)

Si analizamos los debates de arquitectura de software a nivel global, existen quejas universales sobre el uso de Tailwind a gran escala. AUM-IC fue forjado para aniquilar exactamente esos dolores, sumando capas de seguridad corporativa:

1. **La Cura para la "Sopa de HTML" (Write Once, Read Never):**
   El dolor número uno de los desarrolladores. Componentes inundados con cadenas kilométricas (`class="flex items-center justify-between p-4 bg-white shadow-md..."`) que destruyen la legibilidad. AUM-IC aniquila esta sopa transmutando esa cadena tóxica en un hash elegante, limpio y ofuscado (`class="aumic-rs-1b3a"`). Le devolvemos la pureza visual a tu DOM.
2. **Liberación del Vendor Lock-In (El Escape Hatch):**
   El terror de los CTOs es atar un proyecto gigante a la sintaxis de un framework de terceros que podría cambiar o volverse obsoleto. Con AUM-IC, **no eres esclavo de Tailwind**. Construye rápido usando utilidades, y cuando pases a producción, nuestro motor lo purga físicamente de tu `package.json` extrayendo un archivo `.css` estándar y agnóstico. Recuperas la soberanía de tu código.
3. **Restauración Arquitectónica (Separation of Concerns):**
   Los puristas odian mezclar estructura y diseño en la misma línea. AUM-IC te permite disfrutar la velocidad de Tailwind en desarrollo, pero en producción, nuestro orquestador extrae el diseño a un ecosistema CSS determinista, restaurando la frontera sagrada entre tu lógica y tus estilos.
4. **Ofuscación, Prevención de Colisiones y Nombrado Semántico por IA:**
   No ofuscamos el código solo por seguridad anti-scraping. Al generar hashes matemáticos (umic-rs-[hash]), unificamos las etiquetas y **garantizamos cero colisiones de estilos** al terminar la migración masiva. Además, AUM-IC integra una opción de **Nombrado Semántico vía Inteligencia Artificial** (compatible local y remotamente con *Ollama, Claude, Gemini, DeepSeek y Codex*). Gracias a nuestro algoritmo de deduplicación, el sistema es ridículamente eficiente: la IA **solo procesa las combinaciones ÚNICAS**, no tu código fuente completo. Esto ahorra millones de tokens, acelera el procesamiento y blinda tu privacidad, ya que tu proyecto jamás se almacena ni se envía a ningún servidor de terceros.
5. **Rendimiento Extremo (Zero-Bloat Build Time):**
   Al erradicar el inmenso motor de Tailwind de tus procesos de CI/CD, los tiempos de compilación de frameworks modernos (Next.js, Astro, Vite) se aceleran drásticamente, ahorrando recursos de servidor.

---

## 🦖 Arquitectura v4.1.3: Multi-Level JIT Cache

Para alcanzar el pináculo del rendimiento "Zero-Bloat", el núcleo de AUM-IC fue rediseñado bajo una arquitectura de caché de doble nivel impulsada 100% por Node.js y bases de datos analíticas:

1. **L1 Cache (DuckDB - El Oráculo Estático):**
   Mediante ingeniería inversa, pre-compilamos y extrajimos las equivalencias exactas en CSS puro de más de 26,000 clases nativas. Toda esta data reside en una base de datos binaria súper comprimida (umic-lexicon.duckdb) que inyecta los valores CSS instantáneamente en tiempo O(1), de forma completamente offline y sin invocar compiladores (Zero-Execution). **Su diseño de diccionario universal garantiza retrocompatibilidad y soporte total para las 4 grandes generaciones del framework (Tailwind v1, v2, v3 y el nuevo v4 Oxide).**
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
2. **Extracción Paralela (Node Worker Threads + AST):** Usando ``piscina`` (hilos de trabajo en Node) escaneamos miles de archivos en paralelo. Utilizamos **Babel** y **Cheerio** para parsear el Árbol de Sintaxis Abstracta (AST) de tus componentes React/Astro, mutando el código de forma quirúrgica sin romper tu lógica de JavaScript.
3. **Criptografía de Nomenclatura:** Se ejecuta la deduplicación masiva asignando hashes deterministas (`aumic-rs-[hash]`). Si una utilidad se usa 5,000 veces, solo se genera un hash.
4. **Motor Multi-Level JIT Cache:** 
   - Consulta rápida a la L1 (DuckDB) para resolver utilidades estáticas.
   - Si existen variables dinámicas, se orquesta el L2 Cache inyectando el compilador local del cliente para generar el CSS faltante.
5. **Erradicación Total:** Generamos el archivo CSS puro final, creamos el mapa `aumic-lock.json` para futuros rollbacks, y ejecutamos un desinstalador agresivo que purga Tailwind CSS de tu `package.json`.

---
> Desarrollado bajo la doctrina tecnológica de Ingeniería Creativa. Excelencia, Determinismo y Zero-Trust.










