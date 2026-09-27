# 🛡️ MANIFIESTO DE SEGURIDAD OPERACIONAL Y FILOSOFÍA [AUM-IC](https://github.com/ingcrea/aum-ic)

## 1. Filosofía [AUM-IC](https://github.com/ingcrea/aum-ic)

[AUM-IC](https://github.com/ingcrea/aum-ic) (Arquitectura de Universos Multidimensionales de Ingeniería Creativa) es nuestro estándar interno para devolverle la cordura al desarrollo web. Creemos que los estilos deben ser escalables, limpios y respetar una jerarquía lógica: **Átomos, Moléculas, Organismos, Ecosistemas y Galaxias**. 

### 1.1. La Razón de Existir de la Herramienta
Como desarrolladores, nos cansamos de lo infernal y tedioso que resulta migrar o mutar un proyecto amarrado a Tailwind para pasarlo a CSS puro. Creamos este motor destructivo exactamente para automatizar ese dolor: extraer las utilidades, purgar el framework y generar un CSS estandarizado que cumpla obligatoriamente con nuestras directivas AUM-IC para los que vengan detrás.

### 1.2. Intercepción JIT (Zero-Bloat Guarantee)
Nosotros no generamos CSS a mano. Nuestro motor instancia el compilador nativo `JIT` (Just-In-Time) de Tailwind de forma oculta en memoria RAM, inyecta un DOM virtual, y permite que el algoritmo original de Tailwind minifique y optimice el código. Una vez optimizado, *secuestramos* ese CSS y reemplazamos los selectores con las clases AUM-IC. El resultado es un archivo CSS puro estructuralmente idéntico (byte por byte) al que generaría el framework original. Cero código muerto, cero inflación.

### 1.3. Determinismo y Titanium Cache
Delegar el nombramiento masivo de clases a una IA suele provocar inconsistencias y alucinaciones en proyectos grandes. Lo solucionamos con el **Titanium Cache** (`aumic-lock.json`). El motor fuerza un mapeo 1:1 estricto: si un botón utilitario (`bg-red-500 text-white p-4`) se repite 500 veces en tu proyecto, la clave criptográfica se resuelve matemáticamente desde la memoria local. Es algorítmicamente imposible que el motor asigne dos nombres AUM-IC distintos para el mismo bloque original.

### 1.4. Inmutabilidad (Zero-Trust)
Si el comando no lleva la bandera estricta `-m local`, la herramienta vive en un estado de desconfianza (Simulación). El motor jamás sobreescribirá tus componentes de React, Astro o Python a menos que pase satisfactoriamente la validación del Pre-Flight, que verifica los permisos de lectura/escritura y el estado del árbol de Git.

## 1.5. El Abandono de Rust y la Adopción del Multi-Level Cache
Históricamente, intentamos construir AUM-IC en Rust para obtener rendimiento de CPU crudo. Sin embargo, nos dimos cuenta de un cuello de botella arquitectónico: Rust es estático. No podía invocar versiones específicas de Tailwind JIT del cliente sin crear lentos subprocesos de CLI (`npx tailwindcss`).

En la v4.1.3 cambiamos las reglas del juego. Convertimos a **TypeScript + Node.js en el amo absoluto** equipándolo con:
1. **DuckDB (L1 Cache):** Compresión columnar masiva que resuelve >26,000 clases instantáneamente (Zero-Execution).
2. **Dynamic L2 Cache:** Capacidad única de Node para inyectar un `require()` dinámico directo al `node_modules/tailwindcss` del cliente, fusionando la velocidad de base de datos con la precisión milimétrica del motor local del usuario.

## 2. Escenarios Soportados
- Proyectos Astro SSR.
- Monorepos de Next.js (Server/Client components).
- Backends Python (Jinja2 / Django Templates).
- Transmutación a AUM-IC de plantillas legacy compradas en marketplaces.
