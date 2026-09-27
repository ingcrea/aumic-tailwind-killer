# 🛡️ MANIFIESTO DE SEGURIDAD OPERACIONAL Y FILOSOFÍA [AUM-IC](https://github.com/ingcrea/aum-ic)

## 1. Filosofía [AUM-IC](https://github.com/ingcrea/aum-ic)
Seamos sinceros: Tailwind CSS es brutalmente rápido para prototipar, pero a la larga te deja el HTML lleno de basura y una "sopa de clases" inmanejable. Rompe la escalabilidad real porque dificulta la reutilización limpia de componentes y mezcla la estructura (HTML) con la capa de presentación (CSS).

[AUM-IC](https://github.com/ingcrea/aum-ic) (Modelado Universal Atómico - Ingeniería Creativa) es nuestro estándar interno para devolverle la cordura al desarrollo web. Creemos que los estilos deben ser escalables, limpios y respetar una jerarquía lógica.

Creamos este motor destructivo exactamente para automatizar el dolor de abandonar Tailwind: extraer las utilidades, purgar el framework y generar un CSS puro y estandarizado.

## 1.5. El Abandono de Rust y la Adopción del Multi-Level Cache
Históricamente, intentamos construir AUM-IC en Rust para obtener rendimiento de CPU crudo. Sin embargo, nos dimos cuenta de un cuello de botella arquitectónico: Rust es estático. No podía invocar versiones específicas de Tailwind JIT del cliente sin crear lentos subprocesos de CLI (
px tailwindcss).

En la v4.1.3 cambiamos las reglas del juego. Convertimos a **TypeScript + Node.js en el amo absoluto** equipándolo con:
1. **DuckDB (L1 Cache):** Compresión columnar masiva que resuelve >26,000 clases instantáneamente (Zero-Execution).
2. **Dynamic L2 Cache:** Capacidad única de Node para inyectar un equire() dinámico directo al 
ode_modules/tailwindcss del cliente, fusionando la velocidad de base de datos con la precisión milimétrica del motor local del usuario.

## 2. Inmunidad a la Inflación de CSS (Zero-Bloat)
Nosotros no generamos CSS a mano. Nuestro motor L2 secuestra el compilador JIT local, inyecta un DOM virtual en RAM y recupera el CSS minificado y de-duplicado byte por byte. Cero código muerto, cero inflación.

## 3. Consistencia Semántica y Fidelidad Visual (Preflight Theme Extractor)
Para garantizar la inmunidad a corrupciones visuales, el motor inyecta las tipografías y colores configurados en tu 	ailwind.config.* directamente al CSS Reset (Preflight) generado, asegurando que tu proyecto final se vea 100% idéntico al desarrollo nativo original.

## 4. Agnosticismo de Framework (Anti-Mantenimiento)
El motor aplica pragmatismo puro: caza implacablemente los atributos class=, className= y class:list= a través de todos tus archivos fuente (.astro, .tsx, .vue). Mientras los frameworks rendericen HTML, nuestro motor jamás quedará obsoleto.
