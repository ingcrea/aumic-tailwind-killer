# 🛡 MANIFIESTO DE SEGURIDAD OPERACIONAL Y FILOSOFÍA [AUM-IC](https://github.com/ingcrea/aum-ic)

## 1. Filosofía [AUM-IC](https://github.com/ingcrea/aum-ic)
Seamos sinceros: Tailwind CSS es brutalmente rápido para prototipar, pero a la larga te deja el HTML lleno de basura y una "sopa de clases" inmanejable. Rompe la escalabilidad real porque dificulta la reutilización limpia de componentes y mezcla la estructura (HTML) con la capa de presentación (CSS).
[AUM-IC](https://github.com/ingcrea/aum-ic) (Modelado Universal Atómico - Ingeniería Creativa) es nuestro estándar interno para devolverle la cordura al desarrollo web. Creemos que los estilos deben ser escalables, limpios y respetar una jerarquía lógica: **Átomos, Moléculas, Organismos, Ecosistemas y Galaxias**. 
Como desarrolladores, nos cansamos de lo infernal y tedioso que resulta migrar o mutar un proyecto amarrado a Tailwind para pasarlo a CSS puro. Creamos este motor destructivo exactamente para automatizar ese dolor: extraer las utilidades, purgar el framework y generar un CSS estandarizado que cumpla obligatoriamente con nuestras directivas AUM-IC para los que vengan detrás.

## 2. Inmunidad a la Inflación de CSS (Zero-Bloat JIT Interceptor)
Muchos temen que al abandonar Tailwind se pierda su de-duplicación nativa y el CSS resultante se infle brutalmente. **Falso**. 
Nosotros no generamos CSS a mano. Nuestro motor instancia el compilador nativo `JIT` (Just-In-Time) de Tailwind de forma oculta en memoria RAM, inyecta un DOM virtual, y permite que el algoritmo original de Tailwind minifique y optimice el código. Una vez optimizado, *secuestramos* ese CSS y reemplazamos los selectores con las clases AUM-IC. El resultado es un archivo CSS puro estructuralmente idéntico (byte por byte) al que generaría el framework original. Cero código muerto, cero inflación.

## 3. Consistencia Semántica (Anti-Alucinaciones)
Delegar el nombramiento masivo de clases a una IA suele provocar inconsistencias y alucinaciones en proyectos grandes. Lo solucionamos con el **Titanium Cache** (`.aumic-memory.json`). El motor fuerza un mapeo 1:1 estricto: si un botón utilitario (`bg-red-500 text-white p-4`) se repite 500 veces en tu proyecto, la API se consulta **una sola vez**. El resto se resuelve matemáticamente desde la memoria local. Es algorítmicamente imposible que el motor asigne dos nombres AUM-IC distintos para el mismo bloque original.

## 4. Agnosticismo de Framework (Anti-Mantenimiento)
El ecosistema JS muta cada pocos meses. Para evitar que nuestro motor se rompa con cada nueva actualización de los frameworks, aplicamos pragmatismo puro: utilizamos análisis profundo de AST (Babel) *exclusivamente* para JS/TS/JSX (React/Next). Para el resto del universo (Vue, Svelte, Astro, PHP Blade, Python Jinja, Go), el motor recurre a nuestro **Interceptor Agnóstico Universal**, cazando implacablemente los atributos `class=` y `className=`. Mientras los frameworks sigan compilando hacia HTML, nuestro motor jamás quedará obsoleto.

## 5. Auditoría Forense y Modo Inverso (Web Clone)
El motor permite clonar archivos HTML, JS y CSS expuestos públicamente. Su naturaleza **no es ofensiva ni de intrusión**. Está diseñado estrictamente para:
- Auditorías de Accesibilidad (a11y) y rediseños UI.
- Análisis competitivo de diseño estático.
- **Disaster Recovery**: Recuperar tus propios proyectos de los cuales perdiste el código fuente, transmutando el código compilado de Tailwind de vuelta a una estructura AUM-IC mantenible.
No elude autenticaciones, DRM ni inyecta payloads maliciosos.

## 6. Resolución Dinámica AST
Una crítica común a la migración de Tailwind es la rotura de clases dinámicas (ej. `clsx`, `twMerge` o condicionales JS/TS). Nuestro **AST Dynamic Resolver** intercepta algorítmicamente estas llamadas a funciones o expresiones ternarias, penetrando en los literales de cadena interiores y transmutándolos matemáticamente sin romper la lógica de tu aplicación. 

## 7. Prevención de Pérdida de Datos y Rollback Absoluto
Sabemos que borrar Tailwind y reescribir clases de todo un proyecto asusta. Por eso, antes de tocar nada, generamos el archivo `aumic-lock.json` y creamos respaldos ocultos (`.aumic-bak`) de tus configuraciones y `package.json`. 
Si la mutación final no te convence, el **Modo Restauración** usa estos mapas como un "Control Z" maestro. Restaura todo tu código fuente original, resucita tu `package.json` exacto (con todos sus scripts) y ejecuta una reinstalación pura. Cero riesgo de pérdida de datos.

## 8. Arquitectura de Salida Universal (Output Targets)
AUM-IC no fuerza tu proyecto a una estructura �nica. Entendemos que el frontend es vasto y cada ecosistema exige su propio formato. Por ello, el motor est� dise�ado con m�ltiples vectores de salida:
- **SCSS Modular AUM-IC**: Nuestra recomendaci�n. Exporta en SCSS segmentando �tomos y mol�culas. Ideal para proyectos agn�sticos o globales.
- **CSS Global**: Todo en un solo archivo para inyecci�n r�pida y Legacy.
- **Astro Nativo**: Respeta las etiquetas <style> encapsuladas (Manejado impl�citamente por la arquitectura del framework objetivo).
- **CSS Modules y Styled Components (Beta)**: Exclusivo para desarrolladores atados al ecosistema React/Next.js. Genera archivos .module.css locales o transmuta Tailwind directamente a objetos JS de \styled-components\, eliminando los archivos CSS externos.
