# âš”ï¸ AUM-IC Tailwind Killer

> ðŸŒ **Navigation:** ðŸ‡²ðŸ‡½ [Leer en EspaÃ±ol](./README.es.md) &nbsp;|&nbsp; ðŸ“œ [Manifesto (EN)](./MANIFEST.md) &nbsp;|&nbsp; ðŸ“œ [Manifiesto (ES)](./MANIFEST.es.md)

[![version](https://img.shields.io/badge/version-4.1.3-crimson?style=flat-square)](https://www.npmjs.com/package/@ingcrea/aumic-tailwind-killer)
[![Stars](https://img.shields.io/github/stars/ingcrea/aumic-tailwind-killer?style=flat-square&color=gold)](https://github.com/ingcrea/aumic-tailwind-killer/stargazers)
[![Forks](https://img.shields.io/github/forks/ingcrea/aumic-tailwind-killer?style=flat-square&color=silver)](https://github.com/ingcrea/aumic-tailwind-killer/network/members)
[![DuckDB Powered](https://img.shields.io/badge/powered%20by-DuckDB-yellow?style=flat-square)](https://duckdb.org)
[![Tailwind v1-v4](https://img.shields.io/badge/Tailwind-v1%20%7C%20v2%20%7C%20v3%20%7C%20v4%20Oxide-38bdf8?style=flat-square)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0-339933?style=flat-square)](https://nodejs.org)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)

**AUM-IC Tailwind Killer** is not just a CLI orchestrator â€” it is the technical manifestation of a design standard. It is named after the **Arquitectura de Universos Multidimensionales de IngenierÃ­a Creativa (AUM-IC)** standard: a philosophy built to restore sanity, absolute control and infinite scalability to software engineers.

Designed under the architectural rigor of **INGENIERÃA CREATIVA Y DESARROLLOS TECNOLÃ“GICOS S.A.S. (IngCrea)**, this high-performance "Tailwind Killer" audits, extracts, compiles (via JIT) and purges your codebase in seconds â€” transmuting the chaos of utility classes into an obfuscated, standardized, dependency-free ecosystem (Zero-Bloat) powered by an implacable *Multi-Level JIT Cache (DuckDB + Node.js)* architecture with universal AST interceptors.

---

## âš¡ Quick Start (60 seconds)

> **Prerequisites:** Node.js >= 18.0 Â· No extra system installations required. DuckDB is bundled.

```bash
# 1. Audit your project without touching any file (recommended first step)
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./my-project

# 2. When ready: full transmutation to Zero-Bloat CSS
npx @ingcrea/aumic-tailwind-killer -m local -t ./my-project

# 3. Something went wrong? Full rollback in one command
npx @ingcrea/aumic-tailwind-killer -m restore -t ./my-project
```

> **Before running `-m local`:** Make sure your Git branch is clean (`git status`). AUM-IC validates this automatically and aborts if uncommitted changes are detected.

---

## âš¡ Why AUM-IC Tailwind Killer? (The Pain Cure)

Debates in global software architecture forums expose universal complaints about Tailwind CSS at scale. AUM-IC Tailwind Killer was forged to annihilate exactly those pains:

1. **The Cure for "HTML Soup" (Write Once, Read Never):**
   The #1 developer complaint. Components flooded with kilometer-long strings (`class="flex items-center justify-between p-4 bg-white shadow-md..."`) that destroy readability. AUM-IC transmutes that toxic chain into an elegant, clean, obfuscated hash (`class="aumic-rs-1b3a"`). We give your DOM its visual purity back.

2. **Vendor Lock-In Liberation (The Escape Hatch):**
   CTOs dread tying a massive project to third-party framework syntax that could change or become obsolete. With AUM-IC Tailwind Killer, **you are no longer Tailwind's slave**. Build fast with utilities â€” when you ship to production, our engine physically purges it from your `package.json` and extracts a standard, framework-agnostic `.css` file. You reclaim code sovereignty.

3. **Architectural Restoration (Separation of Concerns):**
   Purists hate mixing structure and design in the same line. AUM-IC lets you enjoy Tailwind's speed in development, but in production our orchestrator extracts design into a deterministic CSS ecosystem, restoring the sacred boundary between your logic and your styles.

4. **Obfuscation, Collision Prevention and AI Semantic Naming:**
   We don't obfuscate only for anti-scraping security. By generating mathematical hashes (`aumic-rs-[hash]`), we **unify tags and guarantee zero style collisions** after a massive migration. AUM-IC also integrates an optional **AI Semantic Naming** feature (locally via *Ollama* or remotely via *Claude, Gemini, DeepSeek, Codex*). Thanks to our deduplication algorithm, the AI **only processes UNIQUE combinations** â€” never your full source code. This saves millions of tokens and shields your privacy.

5. **Extreme Performance (Zero-Bloat Build Time):**
   Eliminating Tailwind's massive engine from your CI/CD pipelines dramatically accelerates build times for Next.js, Astro, and Vite â€” saving real server resources.

---

## ðŸ†š How Does It Compare?

| Feature | AUM-IC Tailwind Killer | PurgeCSS | UnoCSS | vanilla-extract | Manual Migration |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Removes unused CSS** | âœ… | âœ… | âœ… | âœ… | âœ… |
| **Obfuscates class names** | âœ… | âŒ | âŒ | Partial | âŒ |
| **Zero-Bloat (removes Tailwind dep)** | âœ… | âŒ | âŒ | âœ… | âœ… |
| **Fully automated migration** | âœ… | âŒ | âŒ | âŒ | âŒ |
| **Rollback / Undo** | âœ… | âŒ | âŒ | âŒ | âŒ |
| **AST (no regex hacks)** | âœ… | âŒ | N/A | N/A | N/A |
| **Supports v1 / v2 / v3 / v4 Oxide** | âœ… | Partial | âœ… | N/A | Manual |
| **AI Semantic Naming** | âœ… | âŒ | âŒ | âŒ | âŒ |
| **Offline / Air-Gapped** | âœ… | âœ… | âœ… | âœ… | âœ… |
| **Prevents CSS collisions post-migration** | âœ… | âŒ | âŒ | âœ… | Manual |

> **Summary:** PurgeCSS only removes dead code. UnoCSS is a framework, not a migrator. vanilla-extract requires a full manual rewrite. AUM-IC Tailwind Killer is the only tool that **automates the complete escape** from Tailwind with safety, reversibility and zero external dependencies.

---

## ðŸ¦– Architecture v4.1.3: Multi-Level JIT Cache

AUM-IC operates under a two-level cache architecture powered 100% by Node.js and analytical databases:

1. **L1 Cache (DuckDB - The Static Oracle):**
   Via reverse engineering, we pre-compiled and extracted exact CSS equivalents for 26,000+ native utility classes. All this data lives in a super-compressed binary database (`aumic-lexicon.duckdb`) that injects CSS values instantaneously in O(1) time, fully offline and without invoking any compiler (Zero-Execution). **Its universal dictionary design guarantees full retrocompatibility for all 4 Tailwind generations: v1, v2, v3 and the new v4 Oxide.**

2. **L2 Cache (Dynamic JIT - The Hijacker):**
   For complex dynamic classes not in L1, the engine dynamically hijacks the `tailwindcss` compiler installed in your project's `node_modules`. This ensures compilation respects the exact version you use (v2, v3 or v4 Oxide).

3. **Preflight Theme Extractor:**
   Dynamically absorbs your `tailwind.config.*`, preserving native fonts (e.g. `Inter`) and custom color variables with 100% visual fidelity.

---

## ðŸ§  5-Phase Pipeline (The Transmutation Engine)

```
 Your Project (source code)
        â”‚
        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  PHASE 1 â”€ Reconnaissance & Pre-Flight                    â”‚
â”‚  Validates Git status, permissions, excludes              â”‚
â”‚  node_modules / .git / dist                               â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  PHASE 2 â”€ Parallel Extraction (AST + Piscina Threads)    â”‚
â”‚  Babel/Cheerio parse JSX/Astro/Vue/HTML surgically        â”‚
â”‚  Extracts classes â†’ Deduplicates â†’ Unique combinations    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  PHASE 3 â”€ Nomenclature Cryptography                      â”‚
â”‚  Deterministic hashes aumic-rs-[hash] per combination     â”‚
â”‚  5,000 repetitions of one class = 1 single hash in RAM    â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â”‚                            â”‚
           â–¼                            â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  L1 Cache (DuckDB)   â”‚   â”‚  L2 Cache (Dynamic JIT)        â”‚
â”‚  26,000+ classes     â”‚   â”‚  Local tailwindcss compiler    â”‚
â”‚  O(1) Â· Offline      â”‚   â”‚  For dynamic classes w-[Xpx]   â”‚
â”‚  Hit Rate: 99.2%     â”‚   â”‚  Respects your installed ver.  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  PHASE 4 â”€ Synthesis & Output                             â”‚
â”‚  Pure unified CSS Â· aumic-lock.json (rollback map)        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                        â”‚
                        â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  PHASE 5 â”€ Total Eradication                              â”‚
â”‚  Purges Tailwind from package.json Â· Rewrites components  â”‚
â”‚  Your code is free, clean and sovereign.                  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## ðŸ”„ Before & After: What Your Code Looks Like

### HTML / JSX â€” Before
```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-xl border border-gray-200">
  <span class="text-sm font-semibold text-gray-800">Dashboard</span>
</div>
```

### HTML / JSX â€” After
```html
<div class="aumic-rs-1b3a">
  <span class="aumic-rs-2c4f">Dashboard</span>
</div>
```

### Generated CSS â€” After
```css
/* aumic-output.css â€” Pure CSS. No framework. No runtime. No dependencies. */
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

**Result:** Your HTML is clean. Your CSS is pure standard. Tailwind is gone. Zero runtime. Zero build step. Forever.

---

## ðŸ”’ The `aumic-lock.json` Map (Rollback & IA Schema)

Every transmutation generates an `aumic-lock.json` in your project root. This file is your **safety net and the bridge for AI semantic naming**. Its structure:

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

This map is what powers the `-m restore` rollback â€” and what the AI semantic naming engine reads to produce human-readable names **without ever seeing your source code**.

---

## ðŸš€ Installation

> **No extra system dependencies required.** DuckDB is bundled inside the package. Works on macOS, Linux, and Windows (Node.js >= 18.0).

```bash
# Run on-the-fly via NPX (recommended)
npx @ingcrea/aumic-tailwind-killer -m local -t ./my-project

# Global installation
npm install -g @ingcrea/aumic-tailwind-killer
aumic-tailwind-killer -m local -t ./my-project
```

---

## ðŸ›  Usage Modes

### 1. Simulate Mode (Dry-Run)
Audit your project â€” see how many Tailwind classes you use and preview the impact **without touching a single file**.
```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./
```

### 2. Local Mode (Destructive Transmutation)
Replace all Tailwind with pure CSS, rewrite your components (`.astro`, `.tsx`, `.vue`, `.py`) and eliminate the framework.
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./
```

### 3. Surgical Mode (Scoped Mutation)
Process only a specific folder or file pattern in a giant monorepo.
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ -s "src/frontend/**/*.{tsx,astro}"
```

### 4. Restore Mode (Rollback)
Fully revert to original Tailwind classes using the `aumic-lock.json` map.
```bash
npx @ingcrea/aumic-tailwind-killer -m restore -t ./
```

### 5. AI Semantic Naming (Optional)
Replace cryptic hashes with human-readable semantic names post-transmutation.
```bash
# Ollama local (total privacy, zero cost)
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai ollama --ai-model llama3

# Claude API (highest semantic precision)
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai claude --ai-key sk-ant-...

# Gemini / DeepSeek / Codex
npx @ingcrea/aumic-tailwind-killer -m local -t ./ --ai gemini --ai-key AIza...
```

---

## âš™ï¸ CLI Options

| Short | Long | Description | Required |
| :--- | :--- | :--- | :--- |
| `-m` | `--mode` | Operation mode: `simulate`, `local`, `restore`. | **Yes** |
| `-t` | `--target` | Path to the project directory. | **Yes** |
| `-s` | `--scope` | Glob pattern to restrict mutation to specific files. | No |
| â€” | `--ai` | AI provider for semantic naming: `ollama`, `claude`, `gemini`, `deepseek`, `codex`. | No |
| â€” | `--ai-model` | Specific model name (e.g. `llama3`, `claude-3-5-sonnet`). | No |
| â€” | `--ai-key` | Remote provider API Key (not required for `ollama`). | No |
| â€” | `--ai-base-url` | Custom Ollama base URL (default: `http://localhost:11434`). | No |

---

## ðŸ“Š Benchmarks

Measured on a Next.js monorepo with **1,200 files** and **48,000 unique Tailwind classes** (MacBook Pro M2, 16GB RAM):

| Metric | Tailwind Native (Cold Start) | AUM-IC L1 (DuckDB) | AUM-IC L2 (Dynamic JIT) |
| :--- | :---: | :---: | :---: |
| **Class resolution time** | `1,340ms` | `~80ms` | `~220ms` |
| **RAM consumed** | `~210MB` | `~48MB` | `~85MB` |
| **Final CSS size reduction** | Base | **~38% smaller** | **~38% smaller** |
| **Offline hit rate** | N/A | **99.2%** | 0.8% remaining |
| **Version compatibility** | Installed only | **v1, v2, v3, v4 Oxide** | v2, v3, v4 Oxide |

---

## ðŸ–¥ï¸ Console Output Preview

```
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘  âš”ï¸  AUM-IC Tailwind Killer v4.1.3                    â•‘
â•‘  Powered by DuckDB  â€¢  IngCrea Â®                      â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

[âœ”] PRE-FLIGHT  Clean Git branch. Filesystem validated.
[âš¡] SCAN        Scanning 1,247 files (Piscina Worker Threads: 8)...
[ðŸ”Ž] EXTRACT    48,312 classes detected. Deduplicating...
[ðŸš€] L1 CACHE   DuckDB resolved 47,924 classes in O(1)  [Hit Rate: 99.2%]
[âš™ï¸] L2 CACHE   Local JIT compiled 388 dynamic classes  [w-[320px], text-[#FF0000]...]
[ðŸ›¡ï¸] HASH       Deterministic hashes: 48,312 -> 5,840 unique
[ðŸ’¾] OUTPUT     aumic-output.css generated (127KB -> 78KB, -39%)
[ðŸ”’] LOCK       aumic-lock.json written. Rollback available.
[ðŸ’¥] PURGE      Tailwind CSS removed from package.json. Freedom!

âœ” Zero-Bloat transmutation completed in 112ms.
```

---


## ðŸ§  Under the Hood: The Engineering

### ðŸ›¡ï¸ Zero-Trust Execution (Enterprise Security)
AUM-IC Tailwind Killer is built under a Zero-Trust security model. All system operations, file manipulation, and background processes are executed isolated from the system shell (strict prohibition of `exec`). This eradicates command injection vectors in SaaS and CI/CD environments, guaranteeing that code analysis is 100% secure even on untrusted repositories.

AUM-IC Tailwind Killer is not a simple Regex script. It is a **Safe Static Analysis** tool designed for enterprise-grade monorepos:

*   **AST Interceptors (Abstract Syntax Tree):** We utilize Babel (for JSX/TSX/Vue) and Cheerio (for Astro/HTML) to structurally read your components. This guarantees zero code corruption on conditional interpolations.
*   **Intermediate Bytecode for Semantic Naming:** The hashes you see injected into your code (e.g., `class="aumic-rs-1b3a"`) **are NOT the final output**. They act as an intermediate *bytecode*. AUM-IC offers an **AI Semantic Naming** engine (via Ollama or Claude) that reads your `aumic-lock.json` and automatically translates these hashes into pure, maintainable semantic CSS (e.g., `.dashboard-card`). It is an automated bridge back to traditional CSS.
*   **Dynamic Classes Management (clsx, twMerge):** If a class cannot be deterministically resolved at compile time (e.g., `<div class={\`bg-${color}-500\`}>`), the static analyzer safely ignores it and flags it in the simulation report for developer review.

## ðŸ¥Š AUM-IC vs Tailwind v4

Tailwind v4 introduced monumental improvements in compilation speed (Oxide engine) and CSS-first configuration. So why use AUM-IC?

Tailwind v4 solves performance, but it **DOES NOT solve Vendor Lock-in or HTML Soup**.
If you use v4, your HTML code remains strictly coupled to a proprietary Domain-Specific Language (DSL). AUM-IC Tailwind Killer does not compete on compilation speed; its sole objective is **Architectural Independence (Zero Vendor Lock-in)**. It returns full control to you via clean, semantic HTML and standard CSS that will outlive any frontend framework trend.

## âš ï¸ Limitations and Ideal Use Cases

*   **Not recommended for:** Projects highly dependent on fully dynamic classes constructed at runtime (string interpolation) without exhaustive manual auditing. If your project has thousands of runtime logic branches for styles, you will need a gradual migration approach.
*   **Highly recommended for:** Freezing technical debt, standardizing monorepos, protecting UI Intellectual Property for commercial licensing, and preparing architectures for 10+ year maintenance lifecycles.

## â“ FAQ

**Does this break Tailwind pseudo-classes like `hover:`, `focus:`, `md:`?**
> No. The AST interceptor detects and preserves responsive and state modifiers. The final hash encapsulates the full selector: `hover:bg-red-500` â†’ `aumic-rs-a3f1` with its `:hover` rule intact in the output CSS.

**Can I use it alongside Tailwind or does it remove it completely?**
> In Simulate mode (`-m simulate`), Tailwind is untouched. In Local mode (`-m local`), it is purged from `package.json`. You can revert everything at any time with `-m restore`.

**Does it support `@apply` in legacy CSS files?**
> Yes. The Preflight Theme Extractor absorbs your `tailwind.config.*` and processes `@apply` directives in `.css` and `.scss` files during Phase 2.

**What about dynamic classes generated in JavaScript (`cn(...)`, `clsx(...)`)?**
> AUM-IC analyzes the AST of your `.tsx` / `.jsx` files and detects utility patterns (`cn`, `clsx`, `twMerge`), resolving static strings automatically. Fully runtime-dynamic strings are flagged in the simulation report for manual review.

**Does it support Tailwind v4 Oxide?**
> Yes. The L1 DuckDB cache contains the compiled dictionary for Tailwind v4 Oxide. The L2 Cache hijacks `@tailwindcss/vite` or the native binary as detected from your `package.json`.

**What if I use CSS-in-JS (`styled-components`, `emotion`) without Tailwind?**
> AUM-IC Tailwind Killer processes **Tailwind utility classes** in your component markup. If your project uses CSS-in-JS libraries *without* Tailwind classes in HTML/JSX attributes, there is nothing to transmute â€” the tool will simply report zero classes found. For **mixed projects** (Tailwind classes in some components + CSS-in-JS in others), AUM-IC processes only the Tailwind parts and leaves CSS-in-JS components completely untouched.

**What if the migration fails mid-process?**
> Phase 1 (Pre-Flight) runs before touching a single file and aborts immediately if it detects uncommitted Git changes, permission issues, or missing dependencies. If a failure occurs after Phase 1 begins writing, every modified file has a `.aumic-bak` backup copy that `--mode restore` uses to recover the exact original state. Your code is always recoverable.

**Does DuckDB need to be installed separately?**
> No. DuckDB is bundled inside the npm package via the `duckdb` Node.js binding. No system-level installation, no extra binaries, no environment variables. It works out of the box on macOS, Linux and Windows with Node.js >= 18.

---

## ðŸ—ºï¸ Roadmap

| Version | Feature | Status |
| :--- | :--- | :---: |
| v4.1.3 | DuckDB L1 Cache Â· Parallel AST Â· Rollback Â· AI Naming | âœ… Stable |
| v4.2.0 | Native Vite plugin Â· Turbopack integration | ðŸ”„ In development |
| v4.3.0 | Svelte stable Â· Angular 17+ support | ðŸ“‹ Planned |
| v5.0.0 | VS Code extension Â· Web audit dashboard | ðŸ“‹ Planned |

---

## ðŸ¤ Contributing

Found a bug or want to add support for a new framework? Contributions are welcome.

1. **Fork** the repository.
2. Create a branch: `git checkout -b feat/my-improvement`.
3. Run tests: `npm test`.
4. Open a **Pull Request** describing the change and its technical motivation.

For major changes (new modes, new AI providers, new framework support), open an **Issue** first to align on design.

> All contributions must comply with the non-negotiable design principles in [`MANIFEST.md`](./MANIFEST.md).

---

## ðŸ¢ Enterprise Support & Dual-Licensing

**AUM-IC Tailwind Killer** operates under a **Dual-License Model**:

1. **Open Source:** Free under the [AGPL v3 License](./LICENSE) for open source, personal, or non-commercial projects.
2. **Commercial:** Proprietary licensing for organizations embedding AUM-IC in closed-source products, SaaS platforms, or internal enterprise workflows. See [LICENSE-COMMERCIAL.md](./LICENSE-COMMERCIAL.md) for details.

For organizations with large-scale monorepos, **INGENIERÃA CREATIVA Y DESARROLLOS TECNOLÃ“GICOS S.A.S. (IngCrea)** offers:

| Service | Description |
| :--- | :--- |
| ðŸ” **Migration Audit** | Technical assessment, risk identification and transmutation plan for enterprise projects. |
| âš¡ **Managed CI/CD Integration** | AUM-IC configured inside GitHub Actions, GitLab CI or Jenkins pipelines. |
| ðŸ§  **On-Premise AI Naming** | Ollama deployment with specialized models on client infrastructure. Zero code exposure. |
| ðŸ›¡ï¸ **SLA & Priority Support** | Dedicated channel, critical incident resolution in under 4 hours. |

> ### ðŸ“§ Enterprise Contact
> **contacto@ingcrea.com** &nbsp;|&nbsp; [ingcrea.com](https://ingcrea.com)
> *Response within 24 business hours.*

---

> Developed under the technological standard of **INGENIERÃA CREATIVA Y DESARROLLOS TECNOLÃ“GICOS S.A.S.** Excellence, Determinism and Zero-Trust.

### ðŸ›¡ï¸ Seguridad Zero-Trust y Arquitectura AUM-IC (v4.1.5)
A partir de la versiÃ³n 4.1.5, el compilador AUM-IC Tailwind Killer ha sido reescrito desde cero utilizando nuestra propia **Arquitectura CÃ³smica AUM-IC (Ãtomos a Galaxias)**. 
- **DesintegraciÃ³n del Monolito:** El nÃºcleo ha sido purificado en 6 capas de abstracciÃ³n (Ãtomos, MolÃ©culas, CÃ©lulas, Organismos, Ecosistemas y Galaxias), promoviendo mantenibilidad y separaciÃ³n de responsabilidades a niveles fractales.
- **Modelo de EjecuciÃ³n Zero-Trust:** Hemos erradicado TODAS las instancias de child_process.exec y execSync. Ahora, toda ejecuciÃ³n nativa opera estrictamente bajo spawn/spawnSync puro, pasando los argumentos como arreglos inmutables y deshabilitando intÃ©rpretes de shell. Esto cierra definitivamente cualquier vector de Command Injection (OWASP A03:2021) en la herramienta. AUM-IC es intrÃ­nsecamente seguro por diseÃ±o.
