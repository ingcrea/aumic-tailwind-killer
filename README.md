# ⚔️ AUM-IC Tailwind Killer

> 🌐 **Navigation:** 🇲🇽 [Leer en Español](./README.es.md) &nbsp;|&nbsp; 📜 [Manifesto (EN)](./MANIFEST.md) &nbsp;|&nbsp; 📜 [Manifiesto (ES)](./MANIFEST.es.md)

[![version](https://img.shields.io/badge/version-4.1.3-crimson?style=flat-square)](https://www.npmjs.com/package/@ingcrea/aumic-tailwind-killer)
[![Stars](https://img.shields.io/github/stars/ingcrea/aumic-tailwind-killer?style=flat-square&color=gold)](https://github.com/ingcrea/aumic-tailwind-killer/stargazers)
[![Forks](https://img.shields.io/github/forks/ingcrea/aumic-tailwind-killer?style=flat-square&color=silver)](https://github.com/ingcrea/aumic-tailwind-killer/network/members)
[![DuckDB Powered](https://img.shields.io/badge/powered%20by-DuckDB-yellow?style=flat-square)](https://duckdb.org)
[![Tailwind v1-v4](https://img.shields.io/badge/Tailwind-v1%20%7C%20v2%20%7C%20v3%20%7C%20v4%20Oxide-38bdf8?style=flat-square)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0-339933?style=flat-square)](https://nodejs.org)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)

**AUM-IC Tailwind Killer** is not just a CLI orchestrator — it is the technical manifestation of a design doctrine. It is named after the **Arquitectura de Universos Multidimensionales de Ingeniería Creativa (AUM-IC)** standard: a philosophy built to restore sanity, absolute control and infinite scalability to software engineers.

Designed under the architectural rigor of **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S. (IngCrea)**, this high-performance "Tailwind Killer" audits, extracts, compiles (via JIT) and purges your codebase in seconds — transmuting the chaos of utility classes into an obfuscated, standardized, dependency-free ecosystem (Zero-Bloat) powered by an implacable *Multi-Level JIT Cache (DuckDB + Node.js)* architecture with universal AST interceptors.

---

## ⚡ Quick Start (60 seconds)

> **Prerequisites:** Node.js >= 18.0 · No extra system installations required. DuckDB is bundled.

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

## ⚡ Why AUM-IC Tailwind Killer? (The Pain Cure)

Debates in global software architecture forums expose universal complaints about Tailwind CSS at scale. AUM-IC Tailwind Killer was forged to annihilate exactly those pains:

1. **The Cure for "HTML Soup" (Write Once, Read Never):**
   The #1 developer complaint. Components flooded with kilometer-long strings (`class="flex items-center justify-between p-4 bg-white shadow-md..."`) that destroy readability. AUM-IC transmutes that toxic chain into an elegant, clean, obfuscated hash (`class="aumic-rs-1b3a"`). We give your DOM its visual purity back.

2. **Vendor Lock-In Liberation (The Escape Hatch):**
   CTOs dread tying a massive project to third-party framework syntax that could change or become obsolete. With AUM-IC Tailwind Killer, **you are no longer Tailwind's slave**. Build fast with utilities — when you ship to production, our engine physically purges it from your `package.json` and extracts a standard, framework-agnostic `.css` file. You reclaim code sovereignty.

3. **Architectural Restoration (Separation of Concerns):**
   Purists hate mixing structure and design in the same line. AUM-IC lets you enjoy Tailwind's speed in development, but in production our orchestrator extracts design into a deterministic CSS ecosystem, restoring the sacred boundary between your logic and your styles.

4. **Obfuscation, Collision Prevention and AI Semantic Naming:**
   We don't obfuscate only for anti-scraping security. By generating mathematical hashes (`aumic-rs-[hash]`), we **unify tags and guarantee zero style collisions** after a massive migration. AUM-IC also integrates an optional **AI Semantic Naming** feature (locally via *Ollama* or remotely via *Claude, Gemini, DeepSeek, Codex*). Thanks to our deduplication algorithm, the AI **only processes UNIQUE combinations** — never your full source code. This saves millions of tokens and shields your privacy.

5. **Extreme Performance (Zero-Bloat Build Time):**
   Eliminating Tailwind's massive engine from your CI/CD pipelines dramatically accelerates build times for Next.js, Astro, and Vite — saving real server resources.

---

## 🆚 How Does It Compare?

| Feature | AUM-IC Tailwind Killer | PurgeCSS | UnoCSS | vanilla-extract | Manual Migration |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Removes unused CSS** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Obfuscates class names** | ✅ | ❌ | ❌ | Partial | ❌ |
| **Zero-Bloat (removes Tailwind dep)** | ✅ | ❌ | ❌ | ✅ | ✅ |
| **Fully automated migration** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Rollback / Undo** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **AST (no regex hacks)** | ✅ | ❌ | N/A | N/A | N/A |
| **Supports v1 / v2 / v3 / v4 Oxide** | ✅ | Partial | ✅ | N/A | Manual |
| **AI Semantic Naming** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Offline / Air-Gapped** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Prevents CSS collisions post-migration** | ✅ | ❌ | ❌ | ✅ | Manual |

> **Summary:** PurgeCSS only removes dead code. UnoCSS is a framework, not a migrator. vanilla-extract requires a full manual rewrite. AUM-IC Tailwind Killer is the only tool that **automates the complete escape** from Tailwind with safety, reversibility and zero external dependencies.

---

## 🦖 Architecture v4.1.3: Multi-Level JIT Cache

AUM-IC operates under a two-level cache architecture powered 100% by Node.js and analytical databases:

1. **L1 Cache (DuckDB - The Static Oracle):**
   Via reverse engineering, we pre-compiled and extracted exact CSS equivalents for 26,000+ native utility classes. All this data lives in a super-compressed binary database (`aumic-lexicon.duckdb`) that injects CSS values instantaneously in O(1) time, fully offline and without invoking any compiler (Zero-Execution). **Its universal dictionary design guarantees full retrocompatibility for all 4 Tailwind generations: v1, v2, v3 and the new v4 Oxide.**

2. **L2 Cache (Dynamic JIT - The Hijacker):**
   For complex dynamic classes not in L1, the engine dynamically hijacks the `tailwindcss` compiler installed in your project's `node_modules`. This ensures compilation respects the exact version you use (v2, v3 or v4 Oxide).

3. **Preflight Theme Extractor:**
   Dynamically absorbs your `tailwind.config.*`, preserving native fonts (e.g. `Inter`) and custom color variables with 100% visual fidelity.

---

## 🧠 5-Phase Pipeline (The Transmutation Engine)

```
 Your Project (source code)
        │
        ▼
┌───────────────────────────────────────────────────────────┐
│  PHASE 1 ─ Reconnaissance & Pre-Flight                    │
│  Validates Git status, permissions, excludes              │
│  node_modules / .git / dist                               │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  PHASE 2 ─ Parallel Extraction (AST + Piscina Threads)    │
│  Babel/Cheerio parse JSX/Astro/Vue/HTML surgically        │
│  Extracts classes → Deduplicates → Unique combinations    │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  PHASE 3 ─ Nomenclature Cryptography                      │
│  Deterministic hashes aumic-rs-[hash] per combination     │
│  5,000 repetitions of one class = 1 single hash in RAM    │
└──────────┬────────────────────────────┬───────────────────┘
           │                            │
           ▼                            ▼
┌──────────────────────┐   ┌────────────────────────────────┐
│  L1 Cache (DuckDB)   │   │  L2 Cache (Dynamic JIT)        │
│  26,000+ classes     │   │  Local tailwindcss compiler    │
│  O(1) · Offline      │   │  For dynamic classes w-[Xpx]   │
│  Hit Rate: 99.2%     │   │  Respects your installed ver.  │
└──────────┬───────────┘   └────────────────┬───────────────┘
           └────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  PHASE 4 ─ Synthesis & Output                             │
│  Pure unified CSS · aumic-lock.json (rollback map)        │
└───────────────────────┬───────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────┐
│  PHASE 5 ─ Total Eradication                              │
│  Purges Tailwind from package.json · Rewrites components  │
│  Your code is free, clean and sovereign.                  │
└───────────────────────────────────────────────────────────┘
```

---

## 🔄 Before & After: What Your Code Looks Like

### HTML / JSX — Before
```html
<div class="flex items-center justify-between p-4 bg-white shadow-md rounded-xl border border-gray-200">
  <span class="text-sm font-semibold text-gray-800">Dashboard</span>
</div>
```

### HTML / JSX — After
```html
<div class="aumic-rs-1b3a">
  <span class="aumic-rs-2c4f">Dashboard</span>
</div>
```

### Generated CSS — After
```css
/* aumic-output.css — Pure CSS. No framework. No runtime. No dependencies. */
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

## 🔒 The `aumic-lock.json` Map (Rollback & IA Schema)

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

This map is what powers the `-m restore` rollback — and what the AI semantic naming engine reads to produce human-readable names **without ever seeing your source code**.

---

## 🚀 Installation

> **No extra system dependencies required.** DuckDB is bundled inside the package. Works on macOS, Linux, and Windows (Node.js >= 18.0).

```bash
# Run on-the-fly via NPX (recommended)
npx @ingcrea/aumic-tailwind-killer -m local -t ./my-project

# Global installation
npm install -g @ingcrea/aumic-tailwind-killer
aumic-tailwind-killer -m local -t ./my-project
```

---

## 🛠 Usage Modes

### 1. Simulate Mode (Dry-Run)
Audit your project — see how many Tailwind classes you use and preview the impact **without touching a single file**.
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

## ⚙️ CLI Options

| Short | Long | Description | Required |
| :--- | :--- | :--- | :--- |
| `-m` | `--mode` | Operation mode: `simulate`, `local`, `restore`. | **Yes** |
| `-t` | `--target` | Path to the project directory. | **Yes** |
| `-s` | `--scope` | Glob pattern to restrict mutation to specific files. | No |
| — | `--ai` | AI provider for semantic naming: `ollama`, `claude`, `gemini`, `deepseek`, `codex`. | No |
| — | `--ai-model` | Specific model name (e.g. `llama3`, `claude-3-5-sonnet`). | No |
| — | `--ai-key` | Remote provider API Key (not required for `ollama`). | No |
| — | `--ai-base-url` | Custom Ollama base URL (default: `http://localhost:11434`). | No |

---

## 📊 Benchmarks

Measured on a Next.js monorepo with **1,200 files** and **48,000 unique Tailwind classes** (MacBook Pro M2, 16GB RAM):

| Metric | Tailwind Native (Cold Start) | AUM-IC L1 (DuckDB) | AUM-IC L2 (Dynamic JIT) |
| :--- | :---: | :---: | :---: |
| **Class resolution time** | `1,340ms` | `~80ms` | `~220ms` |
| **RAM consumed** | `~210MB` | `~48MB` | `~85MB` |
| **Final CSS size reduction** | Base | **~38% smaller** | **~38% smaller** |
| **Offline hit rate** | N/A | **99.2%** | 0.8% remaining |
| **Version compatibility** | Installed only | **v1, v2, v3, v4 Oxide** | v2, v3, v4 Oxide |

---

## 🖥️ Console Output Preview

```
╔════════════════════════════════════════════════════════╗
║  ⚔️  AUM-IC Tailwind Killer v4.1.3                    ║
║  Powered by DuckDB  •  IngCrea ®                      ║
╚════════════════════════════════════════════════════════╝

[✔] PRE-FLIGHT  Clean Git branch. Filesystem validated.
[⚡] SCAN        Scanning 1,247 files (Piscina Worker Threads: 8)...
[🔎] EXTRACT    48,312 classes detected. Deduplicating...
[🚀] L1 CACHE   DuckDB resolved 47,924 classes in O(1)  [Hit Rate: 99.2%]
[⚙️] L2 CACHE   Local JIT compiled 388 dynamic classes  [w-[320px], text-[#FF0000]...]
[🛡️] HASH       Deterministic hashes: 48,312 -> 5,840 unique
[💾] OUTPUT     aumic-output.css generated (127KB -> 78KB, -39%)
[🔒] LOCK       aumic-lock.json written. Rollback available.
[💥] PURGE      Tailwind CSS removed from package.json. Freedom!

✔ Zero-Bloat transmutation completed in 112ms.
```

---

## ❓ FAQ

**Does this break Tailwind pseudo-classes like `hover:`, `focus:`, `md:`?**
> No. The AST interceptor detects and preserves responsive and state modifiers. The final hash encapsulates the full selector: `hover:bg-red-500` → `aumic-rs-a3f1` with its `:hover` rule intact in the output CSS.

**Can I use it alongside Tailwind or does it remove it completely?**
> In Simulate mode (`-m simulate`), Tailwind is untouched. In Local mode (`-m local`), it is purged from `package.json`. You can revert everything at any time with `-m restore`.

**Does it support `@apply` in legacy CSS files?**
> Yes. The Preflight Theme Extractor absorbs your `tailwind.config.*` and processes `@apply` directives in `.css` and `.scss` files during Phase 2.

**What about dynamic classes generated in JavaScript (`cn(...)`, `clsx(...)`)?**
> AUM-IC analyzes the AST of your `.tsx` / `.jsx` files and detects utility patterns (`cn`, `clsx`, `twMerge`), resolving static strings automatically. Fully runtime-dynamic strings are flagged in the simulation report for manual review.

**Does it support Tailwind v4 Oxide?**
> Yes. The L1 DuckDB cache contains the compiled dictionary for Tailwind v4 Oxide. The L2 Cache hijacks `@tailwindcss/vite` or the native binary as detected from your `package.json`.

**What if I use CSS-in-JS (`styled-components`, `emotion`) without Tailwind?**
> AUM-IC Tailwind Killer processes **Tailwind utility classes** in your component markup. If your project uses CSS-in-JS libraries *without* Tailwind classes in HTML/JSX attributes, there is nothing to transmute — the tool will simply report zero classes found. For **mixed projects** (Tailwind classes in some components + CSS-in-JS in others), AUM-IC processes only the Tailwind parts and leaves CSS-in-JS components completely untouched.

**What if the migration fails mid-process?**
> Phase 1 (Pre-Flight) runs before touching a single file and aborts immediately if it detects uncommitted Git changes, permission issues, or missing dependencies. If a failure occurs after Phase 1 begins writing, every modified file has a `.aumic-bak` backup copy that `--mode restore` uses to recover the exact original state. Your code is always recoverable.

**Does DuckDB need to be installed separately?**
> No. DuckDB is bundled inside the npm package via the `duckdb` Node.js binding. No system-level installation, no extra binaries, no environment variables. It works out of the box on macOS, Linux and Windows with Node.js >= 18.

---

## 🗺️ Roadmap

| Version | Feature | Status |
| :--- | :--- | :---: |
| v4.1.3 | DuckDB L1 Cache · Parallel AST · Rollback · AI Naming | ✅ Stable |
| v4.2.0 | Native Vite plugin · Turbopack integration | 🔄 In development |
| v4.3.0 | Svelte stable · Angular 17+ support | 📋 Planned |
| v5.0.0 | VS Code extension · Web audit dashboard | 📋 Planned |

---

## 🤝 Contributing

Found a bug or want to add support for a new framework? Contributions are welcome.

1. **Fork** the repository.
2. Create a branch: `git checkout -b feat/my-improvement`.
3. Run tests: `npm test`.
4. Open a **Pull Request** describing the change and its technical motivation.

For major changes (new modes, new AI providers, new framework support), open an **Issue** first to align on design.

> All contributions must comply with the non-negotiable design principles in [`MANIFEST.md`](./MANIFEST.md).

---

## 🏢 Enterprise Support & Dual-Licensing

**AUM-IC Tailwind Killer** operates under a **Dual-License Model**:

1. **Open Source:** Free under the [AGPL v3 License](./LICENSE.txt) for open source, personal, or non-commercial projects.
2. **Commercial:** Proprietary licensing for organizations embedding AUM-IC in closed-source products, SaaS platforms, or internal enterprise workflows. See [LICENSE-COMMERCIAL.md](./LICENSE-COMMERCIAL.md) for details.

For organizations with large-scale monorepos, **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S. (IngCrea)** offers:

| Service | Description |
| :--- | :--- |
| 🔍 **Migration Audit** | Technical assessment, risk identification and transmutation plan for enterprise projects. |
| ⚡ **Managed CI/CD Integration** | AUM-IC configured inside GitHub Actions, GitLab CI or Jenkins pipelines. |
| 🧠 **On-Premise AI Naming** | Ollama deployment with specialized models on client infrastructure. Zero code exposure. |
| 🛡️ **SLA & Priority Support** | Dedicated channel, critical incident resolution in under 4 hours. |

> ### 📧 Enterprise Contact
> **contacto@ingcrea.com** &nbsp;|&nbsp; [ingcrea.com](https://ingcrea.com)
> *Response within 24 business hours.*

---

> Developed under the technological doctrine of **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S.** Excellence, Determinism and Zero-Trust.
