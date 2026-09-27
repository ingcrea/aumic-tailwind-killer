# ⚔️ AUM-IC Tailwind Killer (v4.1.3)

**AUM-IC Tailwind Killer** es un orquestador CLI de alto rendimiento diseñado para **transmutar** proyectos basados en Tailwind CSS en ecosistemas de clases ofuscadas, deterministas y libres de dependencias (Zero-Bloat). 

Desarrollado por el equipo de **Ingeniería Creativa (IngCrea)**, esta herramienta audita, extrae, compila y purga tu código fuente en segundos gracias a su nueva arquitectura **Multi-Level JIT Cache (DuckDB L1 + Dynamic JIT L2)** e interceptores AST universales.

---

## ⚡ ¿Por qué crear AUM-IC Tailwind Killer?

1. **Ofuscación y Seguridad Corporativa:** Transforma utilidades legibles (lex items-center text-red-500) en hashes seguros (umic-rs-1b3a4f), dificultando el scraping y el robo de diseño (UI/UX).
2. **Independencia del Framework:** Erradica a Tailwind CSS de tu package.json y dependencias de build. Tu proyecto pasa a depender únicamente de un archivo .css nativo, estándar y ultra-optimizado.
3. **Fidelidad Visual Absoluta (Preflight Theme Extractor):** Preserva la configuración de tu 	ailwind.config original (tipografías nativas como 'Inter' y colores de marca) para inyectarlos matemáticamente en el reseteo base de CSS.
4. **Cero Riesgo de Corrupción:** Cuenta con escudos **Pre-Flight** que auditan los permisos antes de tocar un solo archivo, evitando estados corruptos.

---

## 🦖 Arquitectura Multi-Level JIT Cache (v4.1.3)

Para alcanzar el pináculo del rendimiento "Zero-Bloat" y la máxima compatibilidad, rediseñamos el núcleo bajo una **arquitectura híbrida de cachés infalible**:

1. **L1 Cache (DuckDB - El Oráculo Estático):**
   - Una base de datos binaria súper comprimida (umic-lexicon.duckdb) que contiene más de 26,000 reglas nativas de Tailwind CSS extraídas desde la v1 hasta la v4.
   - **Complejidad O(1):** Resuelve el 85% de las clases de un proyecto instantáneamente sin siquiera arrancar un motor de compilación.

2. **L2 Cache (Dynamic JIT - El Secuestrador de Versiones):**
   - Si tu proyecto utiliza una clase altamente dinámica (ej. hover:bg-primary/50 o md:w-[200px]), AUM-IC intercepta tu propio entorno.
   - En lugar de forzar una única versión de Tailwind, **clona dinámicamente el propio compilador JIT que tienes instalado en tu 
ode_modules local** (ya sea v2, v3 o el nuevo motor Oxide de v4) garantizando CSS 100% nativo a tu entorno original.

*(Nota: A partir de la v4.1.3, el antiguo motor secundario en Rust ha sido archivado/deprecado. TypeScript y Node demostraron ser arquitectónicamente superiores al permitir la invocación dinámica en memoria de módulos locales del cliente, algo imposible en lenguajes compilados estáticos sin una enorme sobrecarga de subprocesos).*

---

## 🚀 Instalación

Puedes ejecutarlo al vuelo usando 
px (recomendado) o instalarlo globalmente:

`ash
# Uso al vuelo mediante NPX (Transmuta tu proyecto actual)
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# Modo Web Clone (Scrapea una URL pública y ofusca Tailwind al vuelo)
npx @ingcrea/aumic-tailwind-killer -m public -t https://pagina-objetivo.com
`

---

## 🛠 Casos de Uso y Ejemplos de Ejecución

Consulta el repositorio principal para conocer los comandos extendidos y los parámetros avanzados.
