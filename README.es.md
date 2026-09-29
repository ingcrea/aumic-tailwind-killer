# ⚔️ AUM-IC Tailwind Killer

> 🌐 **Navegación:** 🇺🇸 [Read in English](./README.md) &nbsp;|&nbsp; 📜 [Manifiesto (ES)](./MANIFEST.es.md) &nbsp;|&nbsp; 📜 [Manifesto (EN)](./MANIFEST.md)

[![version](https://img.shields.io/badge/version-4.1.5-crimson?style=flat-square)](https://www.npmjs.com/package/@ingcrea/aumic-tailwind-killer)
[![Stars](https://img.shields.io/github/stars/ingcrea/aumic-tailwind-killer?style=flat-square&color=gold)](https://github.com/ingcrea/aumic-tailwind-killer/stargazers)
[![Forks](https://img.shields.io/github/forks/ingcrea/aumic-tailwind-killer?style=flat-square&color=silver)](https://github.com/ingcrea/aumic-tailwind-killer/network/members)
[![DuckDB Powered](https://img.shields.io/badge/powered%20by-DuckDB-yellow?style=flat-square)](https://duckdb.org)
[![Tailwind v1-v4](https://img.shields.io/badge/Tailwind-v1%20%7C%20v2%20%7C%20v3%20%7C%20v4%20Oxide-38bdf8?style=flat-square)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0-339933?style=flat-square)](https://nodejs.org)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)

**AUM-IC Tailwind Killer** no es solo un orquestador CLI; es la manifestación técnica de una estándar de diseño. Se llama así porque está fundamentado estrictamente en el estándar **Arquitectura de Universos Multidimensionales de Ingeniería Creativa (AUM-IC)**: una filosofía nacida para devolverle la cordura, el control absoluto y la escalabilidad infinita a los ingenieros de software.

Diseñado bajo el rigor arquitectónico de **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S. (IngCrea)**, este "Tailwind Killer" de alto rendimiento audita, extrae, compila (vía JIT) y purga tu código fuente en segundos — transmutando el caos de las clases utilitarias en un ecosistema ofuscado, estandarizado y libre de dependencias (Zero-Bloat) impulsado por una arquitectura implacable de *Multi-Level JIT Cache (DuckDB + Node.js)* e interceptores AST universales.

---

## ⚡ Quick Start (60 segundos)

> **Prerequisitos:** Node.js >= 18.0 · No se requieren instalaciones extra del sistema. DuckDB viene incluido.

```bash
# 1. Audita tu proyecto sin tocar ningún archivo (primer paso recomendado)
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./mi-proyecto

# 2. Cuando estés listo: transmutación completa a CSS Zero-Bloat
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# 3. ¿Algo salió mal? Rollback completo en un solo comando
npx @ingcrea/aumic-tailwind-killer -m restore -t ./mi-proyecto
```

> **Antes de ejecutar `-m local`:** Asegúrate de que tu rama de Git esté limpia (`git status`). AUM-IC lo valida automáticamente y aborta si detecta cambios sin commitear.

---

## ⚡ ¿Por qué AUM-IC Tailwind Killer? (La Cura al Dolor)

Los debates globales de arquitectura de software exponen quejas universales sobre Tailwind CSS a gran escala. AUM-IC Tailwind Killer fue forjado para aniquilar exactamente esos dolores:

1. **La Cura para la "Sopa de HTML" (Write Once, Read Never):**
   El dolor número uno de los desarrolladores. Componentes inundados con cadenas kilométricas (`class="flex items-center justify-between p-4 bg-white shadow-md..."`) que destruyen la legibilidad. AUM-IC transmuta esa cadena tóxica en un hash elegante, limpio y ofuscado (`class="aumic-rs-1b3a"`). Le devolvemos la pureza visual a tu DOM.

2. **Liberación del Vendor Lock-In (El Escape Hatch):**
   El terror de los CTOs es atar un proyecto gigante a la sintaxis de un framework de terceros que podría cambiar o volverse obsoleto. Con AUM-IC Tailwind Killer, **no eres esclavo de Tailwind**. Construye rápido usando utilidades — cuando pases a producción, nuestro motor lo purga físicamente de tu `package.json` extrayendo un archivo `.css` estándar y agnóstico. Recuperas la soberanía de tu código.

3. **Restauración Arquitectónica (Separation of Concerns):**
   Los puristas odian mezclar estructura y diseño en la misma línea. AUM-IC te permite disfrutar la velocidad de Tailwind en desarrollo, pero en producción nuestro orquestador extrae el diseño a un ecosistema CSS determinista, restaurando la frontera sagrada entre tu lógica y tus estilos.

4. **Ofuscación, Prevención de Colisiones y Nombrado Semántico por IA:**
   No ofuscamos solo por seguridad anti-scraping. Al generar hashes matemáticos (`aumic-rs-[hash]`), unificamos etiquetas y **garantizamos cero colisiones de estilos** al terminar la migración masiva. Además, la integración opcional de **IA para Nombrado Semántico** (*Ollama, Claude, Gemini, DeepSeek, Codex*) solo procesa **combinaciones ÚNICAS** — jamás tu código fuente completo. Ahorra millones de tokens y blinda tu privacidad.

5. **Rendimiento Extremo (Zero-Bloat Build Time):**
   Al erradicar el motor de Tailwind de tus procesos de CI/CD, los tiempos de compilación de Next.js, Astro y Vite se aceleran drásticamente, ahorrando recursos reales de servidor.

---

## 🆚 ¿Cómo se Compara con las Alternativas?

| Característica | AUM-IC Tailwind Killer | PurgeCSS | UnoCSS | vanilla-extract | Migración Manual |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Elimina CSS sin uso** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Ofusca los nombres de clases** | ✅ | ❌ | ❌ | Parcial | ❌ |
| **Zero-Bloat (elimina dependencia Tailwind)** | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Migración 100% automatizada** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Rollback / Deshacer** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **AST (sin hacks de regex)** | ✅ | ❌ | N/A | N/A | N/A |
| **Soporta v1 / v2 / v3 / v4 Oxide** | ✅ | Parcial | ✅ | N/A | Manual |
| **Nombrado semántico por IA** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Offline / Air-Gapped** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Previene colisiones CSS post-migración** | ✅ | ❌ | ❌ | ✅ | Manual |

> **Resumen:** PurgeCSS solo elimina código muerto. UnoCSS es un framework, no un migrador. vanilla-extract requiere reescribir estilos manualmente. AUM-IC Tailwind Killer es la única herramienta que **automatiza el escape completo** de Tailwind con seguridad, reversibilidad y cero dependencias externas.

---

## 🦖 Arquitectura v4.1.3: Multi-Level JIT Cache

1. **L1 Cache (DuckDB - El Oráculo Estático):**
   Mediante ingeniería inversa, pre-compilamos y extrajimos las equivalencias exactas en CSS puro de más de 26,000 clases nativas. Toda esta data reside en una base de datos binaria súper comprimida (`aumic-lexicon.duckdb`) que inyecta valores CSS instantáneamente en tiempo O(1), completamente offline y sin invocar compiladores (Zero-Execution). **Soporte total para las 4 generaciones: Tailwind v1, v2, v3 y v4 Oxide.**
2. **L2 Cache (Dynamic JIT - El Secuestrador):**
   Para clases dinámicas complejas no presentes en L1, el motor secuestra dinámicamente el compilador `tailwindcss` instalado en los `node_modules` de tu proyecto. Esto garantiza que la compilación respete tu versión exacta (v2, v3 o v4 Oxide).
3. **Preflight Theme Extractor:**
   Absorbe dinámicamente tu `tailwind.config.*`, preservando tipografías nativas (ej. `Inter`) y variables de color personalizadas con fidelidad visual del 100%.

---

## 🧠 Pipeline de 5 Fases (El Motor de Transmutación)

```
 Tu Proyecto (código fuente)
        │
        ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 1 ─ Reconocimiento & Pre-Flight                     │
│  Valida Git, permisos y excluye node_modules/.git/dist    │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 2 ─ Extracción Paralela (AST + Piscina Threads)     │
│  Babel/Cheerio parsean JSX/Astro/Vue/HTML quirúrgicamente │
│  Extrae clases → Deduplica → Combinaciones únicas         │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 3 ─ Criptografía de Nomenclatura                    │
│  Hashes deterministas aumic-rs-[hash] por combinación     │
│  5,000 repeticiones de una clase = 1 solo hash en RAM     │
└──────────┬────────────────────────────┬───────────────────┘
           │                            │
           ▼                            ▼
┌──────────────────────┐   ┌────────────────────────────────┐
│  L1 Cache (DuckDB)   │   │  L2 Cache (Dynamic JIT)        │
│  26,000+ clases      │   │  Compilador tailwindcss local  │
│  O(1) · Offline      │   │  Para clases dinámicas w-[Xpx] │
│  Hit Rate: 99.2%     │   │  Respeta tu versión instalada  │
└──────────┬───────────┘   └────────────────┬───────────────┘
           └────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 4 ─ Síntesis y Output                               │
│  CSS puro unificado · aumic-lock.json (mapa de rollback)  │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  FASE 5 ─ Erradicación Total                              │
│  Purga Tailwind de package.json · Reescribe componentes   │
│  Tu código queda libre, limpio y soberano.                │
└───────────────────────────────────────────────────────────┘
```

---

## 🔄 Antes y Después: Así Queda Tu Código

### HTML / JSX — Antes
```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-xl border border-gray-200">
  <span class="text-sm font-semibold text-gray-800">Dashboard</span>
</div>
```

### HTML / JSX — Después
```html
<div class="aumic-rs-1b3a">
  <span class="aumic-rs-2c4f">Dashboard</span>
</div>
```

### CSS Generado — Después
```css
/* aumic-output.css — CSS puro. Sin framework. Sin runtime. Sin dependencias. */
.aumic-rs-1b3a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}
.aumic-rs-2c4f {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
}
```

**Resultado:** Tu HTML es limpio. Tu CSS es estándar puro. Tailwind desapareció. Cero runtime. Cero build step. Para siempre.

---

## 🔒 El Mapa `aumic-lock.json` (Rollback y Schema de IA)

Cada transmutación genera un `aumic-lock.json` en la raíz de tu proyecto. Este archivo es tu **red de seguridad y el puente para el nombrado semántico por IA**. Su estructura:

```json
{
  "version": "4.1.3",
  "createdAt": "2025-09-28T09:00:00Z",
  "stats": {
    "filesProcessed": 1247,
    "classesFound": 48312,
    "uniqueCombinations": 5840,
    "hitRateL1": 0.992,
    "hitRateL2": 0.008
  },
  "map": {
    "aumic-rs-1b3a": {
      "original": "flex items-center justify-between p-4 bg-white shadow-md rounded-xl border border-gray-200",
      "css": ".aumic-rs-1b3a { display: flex; align-items: center; ... }",
      "occurrences": 143,
      "files": ["src/components/Card.tsx", "src/layouts/Dashboard.astro"]
    },
    "aumic-rs-2c4f": {
      "original": "text-sm font-semibold text-gray-800",
      "css": ".aumic-rs-2c4f { font-size: 0.875rem; font-weight: 600; color: #1f2937; }",
      "occurrences": 89,
      "files": ["src/components/Card.tsx"]
    }
  }
}
```

Este mapa es lo que impulsa el rollback con `-m restore` — y lo que lee el motor de IA para producir nombres legibles **sin ver jamás tu código fuente**.

---

## 🚀 Instalación

> **No se requieren dependencias adicionales del sistema.** DuckDB viene empaquetado dentro del módulo npm. Funciona en macOS, Linux y Windows (Node.js >= 18.0).

```bash
# Uso al vuelo mediante NPX (recomendado)
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# Instalación global
npm install -g @ingcrea/aumic-tailwind-killer
aumic-tailwind-killer -m local -t ./mi-proyecto
```

---

## 🛠 Modos de Uso

### 1. Modo Simulación (Dry-Run)
```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./
```

### 2. Modo Local (Transmutación Destructiva)
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./
```

### 3. Modo Quirúrgico (Scope)
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ -s "src/frontend/**/*.{tsx,astro}"
```

### 4. Modo Restauración (Rollback)
```bash
npx @ingcrea/aumic-tailwind-killer -m restore -t ./
```

### 5. Nombrado Semántico por IA (Opcional)
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai ollama --ai-model llama3
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai claude --ai-key sk-ant-...
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai gemini --ai-key AIza...
```

---

## ⚙️ Opciones CLI

| Corta | Larga | Descripción | Obligatorio |
| :--- | :--- | :--- | :--- |
| `-m` | `--mode` | Modo: `simulate`, `local`, `restore`. | **Sí** |
| `-t` | `--target` | Ruta al directorio del proyecto. | **Sí** |
| `-s` | `--scope` | Patrón Glob para restringir la mutación. | No |
| — | `--ai` | Proveedor IA: `ollama`, `claude`, `gemini`, `deepseek`, `codex`. | No |
| — | `--ai-model` | Modelo específico (ej. `llama3`, `claude-3-5-sonnet`). | No |
| — | `--ai-key` | API Key del proveedor remoto. | No |
| — | `--ai-base-url` | URL base de Ollama (default: `http://localhost:11434`). | No |

---

## 📊 Benchmarks

| Métrica | Tailwind Nativo | AUM-IC L1 (DuckDB) | AUM-IC L2 (JIT) |
| :--- | :---: | :---: | :---: |
| **Tiempo de resolución** | `1,340ms` | `~80ms` | `~220ms` |
| **RAM consumida** | `~210MB` | `~48MB` | `~85MB` |
| **Reducción CSS final** | Base | **~38% menor** | **~38% menor** |
| **Hit Rate offline** | N/A | **99.2%** | 0.8% restante |
| **Compatibilidad** | Solo la instalada | **v1, v2, v3, v4 Oxide** | v2, v3, v4 Oxide |

---

## 🖥️ Vista Previa de la Consola

```
╔════════════════════════════════════════════════════════╗
║  ⚔️  AUM-IC Tailwind Killer v4.1.3                    ║
║  Powered by DuckDB  •  IngCrea ®                      ║
╚════════════════════════════════════════════════════════╝

[✔] PRE-FLIGHT  Rama de Git limpia. Sistema de archivos validado.
[⚡] SCAN        Escaneando 1,247 archivos (Piscina Worker Threads: 8)...
[🔎] EXTRACCION  48,312 clases detectadas. Deduplicando...
[🚀] L1 CACHE    DuckDB resolvió 47,924 clases en O(1)  [Hit Rate: 99.2%]
[⚙️] L2 CACHE    JIT local compiló 388 clases dinámicas  [w-[320px], text-[#FF0000]...]
[🛡️] HASH        Hashes deterministas: 48,312 -> 5,840 únicos
[💾] OUTPUT      aumic-output.css generado (127KB -> 78KB, -39%)
[🔒] LOCK        aumic-lock.json escrito. Rollback disponible.
[💥] PURGE       Tailwind CSS eliminado de package.json. ¡Libertad!

✔ Transmutación Zero-Bloat completada en 112ms.
```

---

## ❓ Preguntas Frecuentes

**¿Esto rompe pseudo-clases como `hover:`, `focus:`, `md:`?**
> No. El interceptor AST preserva modificadores responsivos y de estado. El hash encapsula el selector completo con su regla `:hover` intacta en el CSS de salida.

**¿Puedo usarlo junto con Tailwind o lo elimina por completo?**
> En Modo Simulación, Tailwind no se toca. En Modo Local, sí se purga. Puedes revertir todo con `-m restore`.

**¿Soporta `@apply` en archivos CSS heredados?**
> Sí. El Preflight Theme Extractor procesa directivas `@apply` en `.css` y `.scss` durante la Fase 2.

**¿Qué pasa con clases dinámicas en JavaScript (`cn(...)`, `clsx(...)`)?**
> AUM-IC detecta patrones `cn`, `clsx` y `twMerge` en el AST y resuelve cadenas estáticas automáticamente. Las cadenas completamente dinámicas se marcan en el reporte de simulación para revisión manual.

**¿Soporta Tailwind v4 Oxide?**
> Sí. El L1 Cache (DuckDB) contiene el diccionario compilado de v4 Oxide y el L2 Cache secuestra el compilador nativo según tu `package.json`.

**¿Qué pasa si uso CSS-in-JS (`styled-components`, `emotion`) sin Tailwind?**
> AUM-IC Tailwind Killer procesa **clases utilitarias de Tailwind** en el markup de tus componentes. Si tu proyecto usa CSS-in-JS *sin* clases Tailwind en atributos HTML/JSX, no hay nada que transmutar — la herramienta reportará cero clases encontradas. En **proyectos mixtos** (Tailwind en algunos componentes + CSS-in-JS en otros), AUM-IC procesa solo las partes con Tailwind y deja los componentes CSS-in-JS completamente intactos.

**¿Qué pasa si la migración falla a la mitad?**
> La Fase 1 (Pre-Flight) corre antes de tocar cualquier archivo y aborta si detecta cambios Git sin commitear, problemas de permisos o dependencias faltantes. Si ocurre un fallo después de que la Fase 1 comienza a escribir, cada archivo modificado tiene una copia de respaldo `.aumic-bak` que el modo `-m restore` usa para recuperar el estado original exacto. Tu código siempre es recuperable.

**¿Necesito instalar DuckDB por separado?**
> No. DuckDB viene empaquetado dentro del módulo npm vía el binding Node.js de `duckdb`. Sin instalaciones del sistema, sin binarios extra, sin variables de entorno. Funciona de inmediato en macOS, Linux y Windows con Node.js >= 18.

---

## 🗺️ Roadmap

| Versión | Feature | Estado |
| :--- | :--- | :---: |
| v4.1.3 | DuckDB L1 · AST Paralelo · Rollback · IA | ✅ Estable |
| v4.2.0 | Plugin Vite nativo · Turbopack | 🔄 En desarrollo |
| v4.3.0 | Svelte estable · Angular 17+ | 📋 Planificado |
| v5.0.0 | Plugin VS Code · Dashboard web | 📋 Planificado |

---

## 🤝 Contribuciones

1. Haz un **fork** del repositorio.
2. Crea una rama: `git checkout -b feat/mi-mejora`.
3. Ejecuta las pruebas: `npm test`.
4. Abre un **Pull Request** describiendo el cambio y su motivación técnica.

> Todas las contribuciones deben cumplir con los principios de diseño no negociables en [`MANIFEST.es.md`](./MANIFEST.es.md).

---

## 🏢 Soporte Corporativo y Licenciamiento Dual

**AUM-IC Tailwind Killer** opera bajo un **Modelo de Licencia Dual**:

1. **Open Source:** Gratis bajo la licencia [AGPL v3](./LICENSE) para proyectos open source, personales o educativos.
2. **Comercial:** Licencia propietaria para organizaciones que embeben AUM-IC en productos cerrados, plataformas SaaS o flujos de trabajo enterprise internos. Ver [LICENSE-COMMERCIAL.es.md](./LICENSE-COMMERCIAL.es.md) para detalles.

Para organizaciones con monorepos de gran escala, **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S. (IngCrea)** ofrece:

| Servicio | Descripción |
| :--- | :--- |
| 🔍 **Auditoría de Migración** | Evaluación técnica, identificación de riesgos y plan de transmutación enterprise. |
| ⚡ **Integración CI/CD Gestionada** | AUM-IC configurado en GitHub Actions, GitLab CI o Jenkins. |
| 🧠 **IA On-Premise** | Despliegue de Ollama con modelos especializados en infraestructura del cliente. Cero exposición de código. |
| 🛡️ **SLA y Soporte Prioritario** | Canal dedicado, resolución de incidencias críticas en menos de 4 horas. |

> ### 📧 Contacto Enterprise
> **contacto@ingcrea.com** &nbsp;|&nbsp; [ingcrea.com](https://ingcrea.com)
> *Respuesta en menos de 24 horas hábiles.*

---

> Desarrollado bajo la estándar tecnológica de **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S.** Excelencia, Determinismo y Zero-Trust.


### 🛡️ Seguridad Zero-Trust y Arquitectura AUM-IC (v4.1.6)
A partir de la versión 4.1.5, el compilador AUM-IC Tailwind Killer ha sido reescrito desde cero utilizando nuestra propia **Arquitectura Cósmica AUM-IC (Átomos a Galaxias)**. 
- **Desintegración del Monolito:** El núcleo ha sido purificado en 6 capas de abstracción (Átomos, Moléculas, Células, Organismos, Ecosistemas y Galaxias), promoviendo mantenibilidad y separación de responsabilidades a niveles fractales.
- **Modelo de Ejecución Zero-Trust:** Hemos erradicado TODAS las instancias de child_process.exec y execSync. Ahora, toda ejecución nativa opera estrictamente bajo spawn/spawnSync puro, pasando los argumentos como arreglos inmutables y deshabilitando intérpretes de shell. Esto cierra definitivamente cualquier vector de Command Injection (OWASP A03:2021) en la herramienta. AUM-IC es intrínsecamente seguro por diseño.


### 🛡️ Seguridad Zero-Trust y Arquitectura AUM-IC (v4.1.6)
A partir de la versión 4.1.5, el compilador AUM-IC Tailwind Killer ha sido reescrito desde cero utilizando nuestra propia **Arquitectura Cósmica AUM-IC (Átomos a Galaxias)**. 
- **Desintegración del Monolito:** El núcleo ha sido purificado en 6 capas de abstracción (Átomos, Moléculas, Células, Organismos, Ecosistemas y Galaxias), promoviendo mantenibilidad y separación de responsabilidades a niveles fractales.
- **Modelo de Ejecución Zero-Trust:** Hemos erradicado TODAS las instancias de child_process.exec y execSync. Ahora, toda ejecución nativa opera estrictamente bajo spawn/spawnSync puro, pasando los argumentos como arreglos inmutables y deshabilitando intérpretes de shell. Esto cierra definitivamente cualquier vector de Command Injection (OWASP A03:2021) en la herramienta. AUM-IC es intrínsecamente seguro por diseño.
