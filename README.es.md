# âš”ï¸ AUM-IC Tailwind Killer

> ðŸŒ **NavegaciÃ³n:** ðŸ‡ºðŸ‡¸ [Read in English](./README.md) &nbsp;|&nbsp; ðŸ“œ [Manifiesto (ES)](./MANIFEST.es.md) &nbsp;|&nbsp; ðŸ“œ [Manifesto (EN)](./MANIFEST.md)

[![version](https://img.shields.io/badge/version-4.1.3-crimson?style=flat-square)](https://www.npmjs.com/package/@ingcrea/aumic-tailwind-killer)
[![Stars](https://img.shields.io/github/stars/ingcrea/aumic-tailwind-killer?style=flat-square&color=gold)](https://github.com/ingcrea/aumic-tailwind-killer/stargazers)
[![Forks](https://img.shields.io/github/forks/ingcrea/aumic-tailwind-killer?style=flat-square&color=silver)](https://github.com/ingcrea/aumic-tailwind-killer/network/members)
[![DuckDB Powered](https://img.shields.io/badge/powered%20by-DuckDB-yellow?style=flat-square)](https://duckdb.org)
[![Tailwind v1-v4](https://img.shields.io/badge/Tailwind-v1%20%7C%20v2%20%7C%20v3%20%7C%20v4%20Oxide-38bdf8?style=flat-square)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0-339933?style=flat-square)](https://nodejs.org)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)

**AUM-IC Tailwind Killer** no es solo un orquestador CLI; es la manifestaciÃ³n tÃ©cnica de una estÃ¡ndar de diseÃ±o. Se llama asÃ­ porque estÃ¡ fundamentado estrictamente en el estÃ¡ndar **Arquitectura de Universos Multidimensionales de IngenierÃ­a Creativa (AUM-IC)**: una filosofÃ­a nacida para devolverle la cordura, el control absoluto y la escalabilidad infinita a los ingenieros de software.

DiseÃ±ado bajo el rigor arquitectÃ³nico de **INGENIERÃA CREATIVA Y DESARROLLOS TECNOLÃ“GICOS S.A.S. (IngCrea)**, este "Tailwind Killer" de alto rendimiento audita, extrae, compila (vÃ­a JIT) y purga tu cÃ³digo fuente en segundos â€” transmutando el caos de las clases utilitarias en un ecosistema ofuscado, estandarizado y libre de dependencias (Zero-Bloat) impulsado por una arquitectura implacable de *Multi-Level JIT Cache (DuckDB + Node.js)* e interceptores AST universales.

---

## âš¡ Quick Start (60 segundos)

> **Prerequisitos:** Node.js >= 18.0 Â· No se requieren instalaciones extra del sistema. DuckDB viene incluido.

```bash
# 1. Audita tu proyecto sin tocar ningÃºn archivo (primer paso recomendado)
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./mi-proyecto

# 2. Cuando estÃ©s listo: transmutaciÃ³n completa a CSS Zero-Bloat
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# 3. Â¿Algo saliÃ³ mal? Rollback completo en un solo comando
npx @ingcrea/aumic-tailwind-killer -m restore -t ./mi-proyecto
```

> **Antes de ejecutar `-m local`:** AsegÃºrate de que tu rama de Git estÃ© limpia (`git status`). AUM-IC lo valida automÃ¡ticamente y aborta si detecta cambios sin commitear.

---

## âš¡ Â¿Por quÃ© AUM-IC Tailwind Killer? (La Cura al Dolor)

Los debates globales de arquitectura de software exponen quejas universales sobre Tailwind CSS a gran escala. AUM-IC Tailwind Killer fue forjado para aniquilar exactamente esos dolores:

1. **La Cura para la "Sopa de HTML" (Write Once, Read Never):**
   El dolor nÃºmero uno de los desarrolladores. Componentes inundados con cadenas kilomÃ©tricas (`class="flex items-center justify-between p-4 bg-white shadow-md..."`) que destruyen la legibilidad. AUM-IC transmuta esa cadena tÃ³xica en un hash elegante, limpio y ofuscado (`class="aumic-rs-1b3a"`). Le devolvemos la pureza visual a tu DOM.

2. **LiberaciÃ³n del Vendor Lock-In (El Escape Hatch):**
   El terror de los CTOs es atar un proyecto gigante a la sintaxis de un framework de terceros que podrÃ­a cambiar o volverse obsoleto. Con AUM-IC Tailwind Killer, **no eres esclavo de Tailwind**. Construye rÃ¡pido usando utilidades â€” cuando pases a producciÃ³n, nuestro motor lo purga fÃ­sicamente de tu `package.json` extrayendo un archivo `.css` estÃ¡ndar y agnÃ³stico. Recuperas la soberanÃ­a de tu cÃ³digo.

3. **RestauraciÃ³n ArquitectÃ³nica (Separation of Concerns):**
   Los puristas odian mezclar estructura y diseÃ±o en la misma lÃ­nea. AUM-IC te permite disfrutar la velocidad de Tailwind en desarrollo, pero en producciÃ³n nuestro orquestador extrae el diseÃ±o a un ecosistema CSS determinista, restaurando la frontera sagrada entre tu lÃ³gica y tus estilos.

4. **OfuscaciÃ³n, PrevenciÃ³n de Colisiones y Nombrado SemÃ¡ntico por IA:**
   No ofuscamos solo por seguridad anti-scraping. Al generar hashes matemÃ¡ticos (`aumic-rs-[hash]`), unificamos etiquetas y **garantizamos cero colisiones de estilos** al terminar la migraciÃ³n masiva. AdemÃ¡s, la integraciÃ³n opcional de **IA para Nombrado SemÃ¡ntico** (*Ollama, Claude, Gemini, DeepSeek, Codex*) solo procesa **combinaciones ÃšNICAS** â€” jamÃ¡s tu cÃ³digo fuente completo. Ahorra millones de tokens y blinda tu privacidad.

5. **Rendimiento Extremo (Zero-Bloat Build Time):**
   Al erradicar el motor de Tailwind de tus procesos de CI/CD, los tiempos de compilaciÃ³n de Next.js, Astro y Vite se aceleran drÃ¡sticamente, ahorrando recursos reales de servidor.

---

## ðŸ†š Â¿CÃ³mo se Compara con las Alternativas?

| CaracterÃ­stica | AUM-IC Tailwind Killer | PurgeCSS | UnoCSS | vanilla-extract | MigraciÃ³n Manual |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Elimina CSS sin uso** | âœ… | âœ… | âœ… | âœ… | âœ… |
| **Ofusca los nombres de clases** | âœ… | âŒ | âŒ | Parcial | âŒ |
| **Zero-Bloat (elimina dependencia Tailwind)** | âœ… | âŒ | âŒ | âœ… | âœ… |
| **MigraciÃ³n 100% automatizada** | âœ… | âŒ | âŒ | âŒ | âŒ |
| **Rollback / Deshacer** | âœ… | âŒ | âŒ | âŒ | âŒ |
| **AST (sin hacks de regex)** | âœ… | âŒ | N/A | N/A | N/A |
| **Soporta v1 / v2 / v3 / v4 Oxide** | âœ… | Parcial | âœ… | N/A | Manual |
| **Nombrado semÃ¡ntico por IA** | âœ… | âŒ | âŒ | âŒ | âŒ |
| **Offline / Air-Gapped** | âœ… | âœ… | âœ… | âœ… | âœ… |
| **Previene colisiones CSS post-migraciÃ³n** | âœ… | âŒ | âŒ | âœ… | Manual |

> **Resumen:** PurgeCSS solo elimina cÃ³digo muerto. UnoCSS es un framework, no un migrador. vanilla-extract requiere reescribir estilos manualmente. AUM-IC Tailwind Killer es la Ãºnica herramienta que **automatiza el escape completo** de Tailwind con seguridad, reversibilidad y cero dependencias externas.

---

## ðŸ¦– Arquitectura v4.1.3: Multi-Level JIT Cache

1. **L1 Cache (DuckDB - El OrÃ¡culo EstÃ¡tico):**
   Mediante ingenierÃ­a inversa, pre-compilamos y extrajimos las equivalencias exactas en CSS puro de mÃ¡s de 26,000 clases nativas. Toda esta data reside en una base de datos binaria sÃºper comprimida (`aumic-lexicon.duckdb`) que inyecta valores CSS instantÃ¡neamente en tiempo O(1), completamente offline y sin invocar compiladores (Zero-Execution). **Soporte total para las 4 generaciones: Tailwind v1, v2, v3 y v4 Oxide.**
2. **L2 Cache (Dynamic JIT - El Secuestrador):**
   Para clases dinÃ¡micas complejas no presentes en L1, el motor secuestra dinÃ¡micamente el compilador `tailwindcss` instalado en los `node_modules` de tu proyecto. Esto garantiza que la compilaciÃ³n respete tu versiÃ³n exacta (v2, v3 o v4 Oxide).
3. **Preflight Theme Extractor:**
   Absorbe dinÃ¡micamente tu `tailwind.config.*`, preservando tipografÃ­as nativas (ej. `Inter`) y variables de color personalizadas con fidelidad visual del 100%.

---

## ðŸ§  Pipeline de 5 Fases (El Motor de TransmutaciÃ³n)

```
 Tu Proyecto (cÃ³digo fuente)
        â”‚
        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FASE 1 â”€ Reconocimiento & Pre-Flight                     â”‚
â”‚  Valida Git, permisos y excluye node_modules/.git/dist    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FASE 2 â”€ ExtracciÃ³n Paralela (AST + Piscina Threads)     â”‚
â”‚  Babel/Cheerio parsean JSX/Astro/Vue/HTML quirÃºrgicamente â”‚
â”‚  Extrae clases â†’ Deduplica â†’ Combinaciones Ãºnicas         â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FASE 3 â”€ CriptografÃ­a de Nomenclatura                    â”‚
â”‚  Hashes deterministas aumic-rs-[hash] por combinaciÃ³n     â”‚
â”‚  5,000 repeticiones de una clase = 1 solo hash en RAM     â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â”‚                            â”‚
           â–¼                            â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  L1 Cache (DuckDB)   â”‚   â”‚  L2 Cache (Dynamic JIT)        â”‚
â”‚  26,000+ clases      â”‚   â”‚  Compilador tailwindcss local  â”‚
â”‚  O(1) Â· Offline      â”‚   â”‚  Para clases dinÃ¡micas w-[Xpx] â”‚
â”‚  Hit Rate: 99.2%     â”‚   â”‚  Respeta tu versiÃ³n instalada  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FASE 4 â”€ SÃ­ntesis y Output                               â”‚
â”‚  CSS puro unificado Â· aumic-lock.json (mapa de rollback)  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  FASE 5 â”€ ErradicaciÃ³n Total                              â”‚
â”‚  Purga Tailwind de package.json Â· Reescribe componentes   â”‚
â”‚  Tu cÃ³digo queda libre, limpio y soberano.                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## ðŸ”„ Antes y DespuÃ©s: AsÃ­ Queda Tu CÃ³digo

### HTML / JSX â€” Antes
```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-xl border border-gray-200">
  <span class="text-sm font-semibold text-gray-800">Dashboard</span>
</div>
```

### HTML / JSX â€” DespuÃ©s
```html
<div class="aumic-rs-1b3a">
  <span class="aumic-rs-2c4f">Dashboard</span>
</div>
```

### CSS Generado â€” DespuÃ©s
```css
/* aumic-output.css â€” CSS puro. Sin framework. Sin runtime. Sin dependencias. */
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

**Resultado:** Tu HTML es limpio. Tu CSS es estÃ¡ndar puro. Tailwind desapareciÃ³. Cero runtime. Cero build step. Para siempre.

---

## ðŸ”’ El Mapa `aumic-lock.json` (Rollback y Schema de IA)

Cada transmutaciÃ³n genera un `aumic-lock.json` en la raÃ­z de tu proyecto. Este archivo es tu **red de seguridad y el puente para el nombrado semÃ¡ntico por IA**. Su estructura:

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

Este mapa es lo que impulsa el rollback con `-m restore` â€” y lo que lee el motor de IA para producir nombres legibles **sin ver jamÃ¡s tu cÃ³digo fuente**.

---

## ðŸš€ InstalaciÃ³n

> **No se requieren dependencias adicionales del sistema.** DuckDB viene empaquetado dentro del mÃ³dulo npm. Funciona en macOS, Linux y Windows (Node.js >= 18.0).

```bash
# Uso al vuelo mediante NPX (recomendado)
npx @ingcrea/aumic-tailwind-killer -m local -t ./mi-proyecto

# InstalaciÃ³n global
npm install -g @ingcrea/aumic-tailwind-killer
aumic-tailwind-killer -m local -t ./mi-proyecto
```

---

## ðŸ›  Modos de Uso

### 1. Modo SimulaciÃ³n (Dry-Run)
```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./
```

### 2. Modo Local (TransmutaciÃ³n Destructiva)
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./
```

### 3. Modo QuirÃºrgico (Scope)
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ -s "src/frontend/**/*.{tsx,astro}"
```

### 4. Modo RestauraciÃ³n (Rollback)
```bash
npx @ingcrea/aumic-tailwind-killer -m restore -t ./
```

### 5. Nombrado SemÃ¡ntico por IA (Opcional)
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai ollama --ai-model llama3
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai claude --ai-key sk-ant-...
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai gemini --ai-key AIza...
```

---

## âš™ï¸ Opciones CLI

| Corta | Larga | DescripciÃ³n | Obligatorio |
| :--- | :--- | :--- | :--- |
| `-m` | `--mode` | Modo: `simulate`, `local`, `restore`. | **SÃ­** |
| `-t` | `--target` | Ruta al directorio del proyecto. | **SÃ­** |
| `-s` | `--scope` | PatrÃ³n Glob para restringir la mutaciÃ³n. | No |
| â€” | `--ai` | Proveedor IA: `ollama`, `claude`, `gemini`, `deepseek`, `codex`. | No |
| â€” | `--ai-model` | Modelo especÃ­fico (ej. `llama3`, `claude-3-5-sonnet`). | No |
| â€” | `--ai-key` | API Key del proveedor remoto. | No |
| â€” | `--ai-base-url` | URL base de Ollama (default: `http://localhost:11434`). | No |

---

## ðŸ“Š Benchmarks

| MÃ©trica | Tailwind Nativo | AUM-IC L1 (DuckDB) | AUM-IC L2 (JIT) |
| :--- | :---: | :---: | :---: |
| **Tiempo de resoluciÃ³n** | `1,340ms` | `~80ms` | `~220ms` |
| **RAM consumida** | `~210MB` | `~48MB` | `~85MB` |
| **ReducciÃ³n CSS final** | Base | **~38% menor** | **~38% menor** |
| **Hit Rate offline** | N/A | **99.2%** | 0.8% restante |
| **Compatibilidad** | Solo la instalada | **v1, v2, v3, v4 Oxide** | v2, v3, v4 Oxide |

---

## ðŸ–¥ï¸ Vista Previa de la Consola

```
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘  âš”ï¸  AUM-IC Tailwind Killer v4.1.3                    â•‘
â•‘  Powered by DuckDB  â€¢  IngCrea Â®                      â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

[âœ”] PRE-FLIGHT  Rama de Git limpia. Sistema de archivos validado.
[âš¡] SCAN        Escaneando 1,247 archivos (Piscina Worker Threads: 8)...
[ðŸ”Ž] EXTRACCION  48,312 clases detectadas. Deduplicando...
[ðŸš€] L1 CACHE    DuckDB resolviÃ³ 47,924 clases en O(1)  [Hit Rate: 99.2%]
[âš™ï¸] L2 CACHE    JIT local compilÃ³ 388 clases dinÃ¡micas  [w-[320px], text-[#FF0000]...]
[ðŸ›¡ï¸] HASH        Hashes deterministas: 48,312 -> 5,840 Ãºnicos
[ðŸ’¾] OUTPUT      aumic-output.css generado (127KB -> 78KB, -39%)
[ðŸ”’] LOCK        aumic-lock.json escrito. Rollback disponible.
[ðŸ’¥] PURGE       Tailwind CSS eliminado de package.json. Â¡Libertad!

âœ” TransmutaciÃ³n Zero-Bloat completada en 112ms.
```

---

## â“ Preguntas Frecuentes

**Â¿Esto rompe pseudo-clases como `hover:`, `focus:`, `md:`?**
> No. El interceptor AST preserva modificadores responsivos y de estado. El hash encapsula el selector completo con su regla `:hover` intacta en el CSS de salida.

**Â¿Puedo usarlo junto con Tailwind o lo elimina por completo?**
> En Modo SimulaciÃ³n, Tailwind no se toca. En Modo Local, sÃ­ se purga. Puedes revertir todo con `-m restore`.

**Â¿Soporta `@apply` en archivos CSS heredados?**
> SÃ­. El Preflight Theme Extractor procesa directivas `@apply` en `.css` y `.scss` durante la Fase 2.

**Â¿QuÃ© pasa con clases dinÃ¡micas en JavaScript (`cn(...)`, `clsx(...)`)?**
> AUM-IC detecta patrones `cn`, `clsx` y `twMerge` en el AST y resuelve cadenas estÃ¡ticas automÃ¡ticamente. Las cadenas completamente dinÃ¡micas se marcan en el reporte de simulaciÃ³n para revisiÃ³n manual.

**Â¿Soporta Tailwind v4 Oxide?**
> SÃ­. El L1 Cache (DuckDB) contiene el diccionario compilado de v4 Oxide y el L2 Cache secuestra el compilador nativo segÃºn tu `package.json`.

**Â¿QuÃ© pasa si uso CSS-in-JS (`styled-components`, `emotion`) sin Tailwind?**
> AUM-IC Tailwind Killer procesa **clases utilitarias de Tailwind** en el markup de tus componentes. Si tu proyecto usa CSS-in-JS *sin* clases Tailwind en atributos HTML/JSX, no hay nada que transmutar â€” la herramienta reportarÃ¡ cero clases encontradas. En **proyectos mixtos** (Tailwind en algunos componentes + CSS-in-JS en otros), AUM-IC procesa solo las partes con Tailwind y deja los componentes CSS-in-JS completamente intactos.

**Â¿QuÃ© pasa si la migraciÃ³n falla a la mitad?**
> La Fase 1 (Pre-Flight) corre antes de tocar cualquier archivo y aborta si detecta cambios Git sin commitear, problemas de permisos o dependencias faltantes. Si ocurre un fallo despuÃ©s de que la Fase 1 comienza a escribir, cada archivo modificado tiene una copia de respaldo `.aumic-bak` que el modo `-m restore` usa para recuperar el estado original exacto. Tu cÃ³digo siempre es recuperable.

**Â¿Necesito instalar DuckDB por separado?**
> No. DuckDB viene empaquetado dentro del mÃ³dulo npm vÃ­a el binding Node.js de `duckdb`. Sin instalaciones del sistema, sin binarios extra, sin variables de entorno. Funciona de inmediato en macOS, Linux y Windows con Node.js >= 18.

---

## ðŸ—ºï¸ Roadmap

| VersiÃ³n | Feature | Estado |
| :--- | :--- | :---: |
| v4.1.3 | DuckDB L1 Â· AST Paralelo Â· Rollback Â· IA | âœ… Estable |
| v4.2.0 | Plugin Vite nativo Â· Turbopack | ðŸ”„ En desarrollo |
| v4.3.0 | Svelte estable Â· Angular 17+ | ðŸ“‹ Planificado |
| v5.0.0 | Plugin VS Code Â· Dashboard web | ðŸ“‹ Planificado |

---

## ðŸ¤ Contribuciones

1. Haz un **fork** del repositorio.
2. Crea una rama: `git checkout -b feat/mi-mejora`.
3. Ejecuta las pruebas: `npm test`.
4. Abre un **Pull Request** describiendo el cambio y su motivaciÃ³n tÃ©cnica.

> Todas las contribuciones deben cumplir con los principios de diseÃ±o no negociables en [`MANIFEST.es.md`](./MANIFEST.es.md).

---

## ðŸ¢ Soporte Corporativo y Licenciamiento Dual

**AUM-IC Tailwind Killer** opera bajo un **Modelo de Licencia Dual**:

1. **Open Source:** Gratis bajo la licencia [AGPL v3](./LICENSE) para proyectos open source, personales o educativos.
2. **Comercial:** Licencia propietaria para organizaciones que embeben AUM-IC en productos cerrados, plataformas SaaS o flujos de trabajo enterprise internos. Ver [LICENSE-COMMERCIAL.es.md](./LICENSE-COMMERCIAL.es.md) para detalles.

Para organizaciones con monorepos de gran escala, **INGENIERÃA CREATIVA Y DESARROLLOS TECNOLÃ“GICOS S.A.S. (IngCrea)** ofrece:

| Servicio | DescripciÃ³n |
| :--- | :--- |
| ðŸ” **AuditorÃ­a de MigraciÃ³n** | EvaluaciÃ³n tÃ©cnica, identificaciÃ³n de riesgos y plan de transmutaciÃ³n enterprise. |
| âš¡ **IntegraciÃ³n CI/CD Gestionada** | AUM-IC configurado en GitHub Actions, GitLab CI o Jenkins. |
| ðŸ§  **IA On-Premise** | Despliegue de Ollama con modelos especializados en infraestructura del cliente. Cero exposiciÃ³n de cÃ³digo. |
| ðŸ›¡ï¸ **SLA y Soporte Prioritario** | Canal dedicado, resoluciÃ³n de incidencias crÃ­ticas en menos de 4 horas. |

> ### ðŸ“§ Contacto Enterprise
> **contacto@ingcrea.com** &nbsp;|&nbsp; [ingcrea.com](https://ingcrea.com)
> *Respuesta en menos de 24 horas hÃ¡biles.*

---

> Desarrollado bajo la estÃ¡ndar tecnolÃ³gica de **INGENIERÃA CREATIVA Y DESARROLLOS TECNOLÃ“GICOS S.A.S.** Excelencia, Determinismo y Zero-Trust.

### ðŸ›¡ï¸ Seguridad Zero-Trust y Arquitectura AUM-IC (v4.1.5)
A partir de la versiÃ³n 4.1.5, el compilador AUM-IC Tailwind Killer ha sido reescrito desde cero utilizando nuestra propia **Arquitectura CÃ³smica AUM-IC (Ãtomos a Galaxias)**. 
- **DesintegraciÃ³n del Monolito:** El nÃºcleo ha sido purificado en 6 capas de abstracciÃ³n (Ãtomos, MolÃ©culas, CÃ©lulas, Organismos, Ecosistemas y Galaxias), promoviendo mantenibilidad y separaciÃ³n de responsabilidades a niveles fractales.
- **Modelo de EjecuciÃ³n Zero-Trust:** Hemos detectado y exterminado TODAS las instancias de  y . Ahora, toda ejecuciÃ³n nativa opera estrictamente bajo / puro, pasando los argumentos como arreglos inmutables y deshabilitando intÃ©rpretes de shell. Esto cierra definitivamente cualquier vector de *Command Injection* (OWASP A03:2021) en la herramienta. AUM-IC es intrÃ­nsecamente seguro por diseÃ±o.

### ðŸ›¡ï¸ Seguridad Zero-Trust y Arquitectura AUM-IC (v4.1.5)
A partir de la versiÃ³n 4.1.5, el compilador AUM-IC Tailwind Killer ha sido reescrito desde cero utilizando nuestra propia **Arquitectura CÃ³smica AUM-IC (Ãtomos a Galaxias)**. 
- **DesintegraciÃ³n del Monolito:** El nÃºcleo ha sido purificado en 6 capas de abstracciÃ³n (Ãtomos, MolÃ©culas, CÃ©lulas, Organismos, Ecosistemas y Galaxias), promoviendo mantenibilidad y separaciÃ³n de responsabilidades a niveles fractales.
- **Modelo de EjecuciÃ³n Zero-Trust:** Hemos erradicado TODAS las instancias de child_process.exec y execSync. Ahora, toda ejecuciÃ³n nativa opera estrictamente bajo spawn/spawnSync puro, pasando los argumentos como arreglos inmutables y deshabilitando intÃ©rpretes de shell. Esto cierra definitivamente cualquier vector de Command Injection (OWASP A03:2021) en la herramienta. AUM-IC es intrÃ­nsecamente seguro por diseÃ±o.
