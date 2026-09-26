# ⚔️ AUM-IC Tailwind Killer

**AUM-IC Tailwind Killer** es un orquestador CLI de alto rendimiento diseñado para **transmutar** proyectos basados en Tailwind CSS en ecosistemas de clases ofuscadas, deterministas y libres de dependencias (Zero-Bloat). 

Desarrollado por el equipo de **Ingeniería Creativa (IngCrea)**, esta herramienta audita, extrae, compila (vía JIT) y purga tu código fuente en segundos gracias a su arquitectura multi-hilos (Piscina) e interceptores AST universales.

---

## ⚡ ¿Por qué usar AUM-IC Tailwind Killer?

1. **Ofuscación y Seguridad Corporativa:** Transforma utilidades legibles (`flex items-center text-red-500`) en hashes seguros (`aumic-component-1b3a4f`), dificultando el scraping y el robo de diseño (UI/UX).
2. **Independencia del Framework:** Erradica a Tailwind CSS de tu `package.json` y dependencias de build. Tu proyecto pasa a depender únicamente de un archivo `.css` nativo, estándar y ultra-optimizado.
3. **Rendimiento Extremo (Build Time):** Al purgar el motor de Tailwind de tu flujo de trabajo, los tiempos de compilación de tu framework (Astro, Next.js, Vite) se reducen drásticamente.
4. **Cero Riesgo de Corrupción:** Cuenta con escudos **Pre-Flight** que auditan los permisos NTFS/POSIX antes de tocar un solo archivo, evitando estados corruptos.

---

## 🚀 Instalación

Puedes ejecutarlo al vuelo usando `npx` (recomendado) o instalarlo globalmente:

```bash
# Uso al vuelo mediante NPX
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# Instalación global
npm install -g @ingcrea/aumic-tailwind-killer
```

---

## 🛠 Casos de Uso y Ejemplos de Ejecución

La herramienta opera bajo distintos **modos** de destrucción y auditoría. Asegúrate de estar en una rama de Git limpia (ej. `git checkout -b build-aumic`) antes de realizar mutaciones destructivas.

### 1. Modo Simulación (Dry-Run)
**Caso de uso:** Quieres auditar tu proyecto, ver cuántas clases de Tailwind usas y visualizar el impacto sin modificar tu código fuente. Ideal para auditorías previas.

```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./
```
* **Qué hace:** Escanea el código mediante el Motor Infrarrojo, extrae las utilidades, genera los hashes en RAM y emite un reporte visual detallado (`aumic-report.html`), pero **no altera** tus archivos.

### 2. Modo Local (Transmutación Destructiva)
**Caso de uso:** Estás listo para preparar tu código para producción. Deseas reemplazar todo Tailwind por CSS puro, reescribir tus componentes (`.astro`, `.tsx`, `.vue`, `.py`) y eliminar el framework.

```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./
```
* **Qué hace:** Ejecuta las 5 Fases de AUM-IC. Reescribe físicamente todos los archivos soportados, inyecta el CSS nativo unificado, elimina dependencias en `package.json` y genera un mapa reverso (`aumic-lock.json`).

### 3. Modo Quirúrgico (Surgical Scope)
**Caso de uso:** Tienes un monorepo gigante y solo quieres ofuscar una carpeta específica (ej. solo el frontend de marketing) ignorando el panel de administración.

```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ -s "src/frontend/**/*.{tsx,astro}"
```
* **Qué hace:** Ignora el escáner global de Git y restringe la mutación **estrictamente** al patrón Glob (Regex) definido en el argumento `-s` (Scope).

### 4. Modo Restauración (Rollback)
**Caso de uso:** Algo falló durante el QA post-mutación o necesitas volver a trabajar con Tailwind en tu entorno local.

```bash
npx @ingcrea/aumic-tailwind-killer -m restore -t ./
```
* **Qué hace:** Lee el mapa criptográfico `aumic-lock.json`, revierte los hashes en tus archivos a sus clases Tailwind originales y restaura el `package.json.aumic-bak`.

---

## ⚙️ Banderas y Variables (CLI Options)

| Bandera Corta | Bandera Larga | Descripción | Obligatorio |
| :--- | :--- | :--- | :--- |
| `-m` | `--mode` | Define el comportamiento del orquestador (`simulate`, `local`, `restore`, `clone`). | **Sí** |
| `-t` | `--target` | Ruta absoluta o relativa al directorio del proyecto a procesar. | **Sí** |
| `-s` | `--scope` | Patrón de búsqueda Glob para restringir la mutación a archivos específicos. | No |

---

## 🧠 Arquitectura de 5 Fases

1. **Reconocimiento & Pre-Flight:** Validación exhaustiva de permisos W_OK (Anti-Zombie) y escaneo de árbol de dependencias mediante LS-Files de Git (Fast-Path).
2. **Extracción Paralela (Babel + Regex):** Pool de workers en Node (Piscina) que analizan sintaxis de JSX, TSX y lenguajes agnósticos (Astro, Python, PHP) interceptando atributos de clase (`class`, `className`, `class:list`).
3. **Criptografía de Nomenclatura:** Asignación de Hashes Deterministas (`aumic-component-[hash]`) optimizando la reusabilidad (deduplicación del 100%).
4. **Motor JIT Embebido:** Generación virtual en memoria y renderizado de CSS de Tailwind usando compilación "Just In Time", fusionando todo en la base nativa.
5. **Erradicación Total:** Purga de scripts, inyección del archivo CSS puro resultante y limpieza de configuraciones del framework original.

---

## 🛡 Consideraciones de Seguridad

* **Backup Automático:** Siempre que la herramienta interviene archivos de configuración (`package.json`, `tailwind.config.js`), genera respaldos con la extensión `.aumic-bak`.
* **Archivos Protegidos:** Por defecto, el motor ignora estrictamente agujeros negros como `node_modules`, `.git`, `dist`, y `.venv`.

---

> Desarrollado bajo la doctrina tecnológica de Ingeniería Creativa. Excelencia, Determinismo y Zero-Trust.
