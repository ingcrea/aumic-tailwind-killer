# ⚔️ AUM-IC Tailwind Killer (Native & Hybrid Core)

> **Transmutador de Tailwind CSS a Arquitectura Zero-Bloat, potenciado por Rust y TypeScript.**

**AUM-IC Tailwind Killer** es un orquestador CLI de grado corporativo, diseñado por **Ingeniería Creativa (IngCrea)**. Su función principal es **erradicar** el framework de Tailwind CSS de tu código fuente y transformarlo en un ecosistema de clases ofuscadas, deterministas y 100% nativas (AUM-IC).

---

## ⚡ La Arquitectura de Doble Núcleo: ¿Por qué Rust?

Procesar miles de archivos, parsear el DOM y orquestar el compilador JIT en un entorno mono-hilo como Node.js genera un cuello de botella. Para alcanzar el pináculo del rendimiento, diseñamos una **arquitectura híbrida infalible**:

1. 🦀 **Motor Nativo en Rust (El Estándar):**
   - **Zero-Bloat Absoluto:** Un ejecutable de 2.5 MB sin dependencias de Node.
   - **Concurrencia Multi-Núcleo:** Utiliza la librería `rayon` para procesar archivos en paralelo utilizando el 100% de los hilos de tu CPU.
   - **Velocidad Extrema:** Expresiones regulares nativas y rutinas de criptografía (`sha2`) que mutan proyectos enteros en milisegundos.

2. 🟦 **Motor de TypeScript (El Fallback Inteligente):**
   - Sirve como red de seguridad. Si el binario de Rust es bloqueado por políticas corporativas de OS o firewalls estrictos, el Wrapper de NPM detecta el fallo y **ejecuta instantáneamente el motor en TypeScript** (Babel AST), asegurando que tu flujo de trabajo CI/CD jamás se rompa.

---

## 📦 Instalación

El Wrapper interceptor distribuirá dinámicamente el ejecutable correspondiente a tu Sistema Operativo (Windows, Linux, macOS).

**Uso al vuelo (Recomendado):**
```bash
npx @ingcrea/aumic-tailwind-killer -m <modo> -t <ruta>
```

**Instalación Global:**
```bash
npm install -g @ingcrea/aumic-tailwind-killer
aumic-tailwind-killer -m <modo> -t <ruta>
```

---

## 🛠️ Modos de Operación y Banderas

El CLI funciona a través de banderas estrictas para evitar mutaciones accidentales.

| Bandera | Argumento | Descripción |
| :--- | :--- | :--- |
| **`-m` / `--mode`** | `simulate`, `local`, `restore` | **(Requerido)** Define el modo de operación del motor. |
| **`-t` / `--target`**| `./mi-proyecto` | **(Requerido)** La ruta absoluta o relativa del proyecto a procesar. |
| **`-s` / `--scope`** | `components`, `pages`, etc. | *(Opcional)* Limita el escaneo a un subdirectorio específico. |

---

## 🚀 Ejemplos de Uso en Entornos Reales

### 1. Modo Simulación (Dry-Run)
*Recomendado para la primera auditoría. Extrae clases, calcula hashes y simula la compilación sin alterar un solo byte de tu código fuente original.*
```bash
npx @ingcrea/aumic-tailwind-killer -m simulate -t ./mi-landing-page
```
**Resultado:** Se generará el archivo `aumic-lock.json` con el mapa criptográfico y el `aumic-ecosystem.css` de prueba. Tus archivos `.ts`, `.astro` o `.html` quedan intactos.

### 2. Modo Operación Local (Destructivo / Producción)
*El corazón del motor. Escanea, muta todas las clases legibles a Hashes AUM-IC, inyecta el CSS purgado y **desinstala Tailwind CSS** de tu `package.json` automáticamente.*
```bash
npx @ingcrea/aumic-tailwind-killer -m local -t ./frontend-app
```
**Resultado:** Tu HTML pasará de `<div class="flex items-center text-red-500">` a `<div class="aumic-rs-1a2b3c aumic-rs-9f8e7d">`. Tailwind será eliminado de tus dependencias y configuraciones respaldadas en `.aumic-bak`.

### 3. Modo Restauración (Rollback)
*Si cometiste un error o necesitas volver a trabajar con Tailwind, este comando lee el `aumic-lock.json` y revierte tu código fuente a su estado original legible.*
```bash
npx @ingcrea/aumic-tailwind-killer -m restore -t ./frontend-app
```

---

## 👨‍💻 Código Fuente y Desarrollo (Monorepo)

Si deseas clonar el repositorio, ten en cuenta que el código fuente se divide físicamente para respetar las integraciones CI/CD de GitHub Actions:

- 📁 `src-rust/`: Contiene el manifiesto `Cargo.toml` y la lógica nativa multiplataforma.
- 📁 `src-typescript/`: Contiene el motor legacy fuertemente tipado en Node y parsers de AST.
- 📁 `bin/`: Contiene `aumic-killer.js`, el Wrapper interceptor inteligente que hace el puente entre NPM y el ejecutable pre-compilado en GitHub Releases.

> Construido bajo los estándares de despliegue de **Ingeniería Creativa**.
