# ⚔️ AUM-IC Tailwind Killer (Arquitectura Híbrida)

**AUM-IC Tailwind Killer** es un orquestador CLI de altísimo rendimiento diseñado para **transmutar** proyectos basados en Tailwind CSS en ecosistemas de clases ofuscadas, deterministas y libres de dependencias (Zero-Bloat).

Desarrollado por **Ingeniería Creativa (IngCrea)**, esta herramienta audita, extrae, compila (vía JIT) y purga tu código fuente en segundos.

> [!IMPORTANT]
> **Arquitectura Híbrida (Rust + TypeScript)**
> Este repositorio alberga **dos motores independientes** que trabajan en simbiosis para garantizar que la herramienta jamás falle en ningún sistema operativo:
> 1. **Motor Nativo (Rust):** Escrito en Rust estricto con concurrencia masiva vía `rayon`. Se compila a código máquina para Windows, Linux y macOS. Ejecuta la transmutación en microsegundos y consume cero memoria residual.
> 2. **Motor de Respaldo (TypeScript):** Código fuertemente tipado que utiliza AST (Babel) para análisis profundo de componentes. Actúa como red de seguridad (Fallback).

---

## 🚀 ¿Cómo funciona el Wrapper NPM?

Cuando instalas o ejecutas este paquete desde NPM, nuestro Wrapper inteligente evalúa tu sistema (Windows, Linux, macOS - x64 o ARM) y **descarga dinámicamente el ejecutable de Rust** pre-compilado desde nuestros GitHub Releases. 

Si por alguna razón (Firewall corporativo, OS no soportado, red caída) el binario falla, el Wrapper intercepta el error e **inicia silenciosamente el motor de TypeScript** que ya viene empaquetado. Obtienes velocidad extrema si es posible, e infalibilidad garantizada si hay problemas.

---

## ⚡ Fortalezas de cada Motor

### 🦀 Motor Nativo (Rust) - `src-rust/`
- **Concurrencia Extrema:** Utiliza `rayon` para escalar el escaneo a todos los hilos de tu CPU.
- **Zero-Bloat Absoluto:** Binario autónomo de ~2.5 MB.
- **RegEx Multilínea:** Análisis determinista ultra-rápido en archivos HTML, Vue, Svelte y Astro.
- **Criptografía Segura:** Generación de hashes AUM-IC vía `sha2`.

### 🟦 Motor de Fallback (TypeScript) - `src-typescript/`
- **Análisis Profundo (AST):** Usa Babel para interpretar sintaxis compleja de JSX, TSX y React puro.
- **Tipado Fuerte:** Arquitectura modular orientada a objetos (OOP) y tipado estricto.
- **Ejecución Universal:** Mientras tengas Node.js instalado, correrá donde sea.

---

## 📦 Instalación y Uso Automático

No necesitas clonar el repositorio ni compilar código (a menos que quieras hacerlo). Simplemente utiliza `npx`:

```bash
npx @ingcrea/aumic-tailwind-killer -m <modo> -t <ruta>
```

### Ejemplos de Uso

**1. Modo de Simulación (Dry-Run)**
Recomendado para la primera auditoría. Extrae las clases, genera los hashes criptográficos y compila el CSS de prueba, pero **no modifica** tus archivos originales de código fuente.
```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./ruta-a-tu-proyecto
```

**2. Modo de Operación Local (Destructivo)**
Reemplaza todas las clases de Tailwind en tu código fuente, genera el CSS nativo final y ejecuta la **Fase 5** (Desinstala las librerías de Tailwind del `package.json`).
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./ruta-a-tu-proyecto
```

---

## 🛠️ Compilación Manual (Para Desarrolladores)

Si deseas modificar el código o auditar los motores, puedes descargar los ZIPs de código fuente independientes desde nuestra página de Releases:

**Para compilar el Motor en Rust:**
```bash
cd src-rust
cargo build --release
# Tu binario estará en target/release/aumic-tailwind-killer.exe
```

**Para compilar el Motor en TypeScript:**
```bash
npm install
npm run build
# Tu código compilado estará en /dist
```
