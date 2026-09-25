# 🛡 MANIFIESTO DE SEGURIDAD OPERACIONAL Y FILOSOFÍA [AUM-IC](https://github.com/ingcrea/aum-ic)

## 1. Filosofía [AUM-IC](https://github.com/ingcrea/aum-ic)
Seamos sinceros: Tailwind CSS es brutalmente rápido para prototipar, pero a la larga te deja el HTML lleno de basura y una "sopa de clases" inmanejable. Rompe la escalabilidad real porque dificulta la reutilización limpia de componentes y mezcla la estructura (HTML) con la capa de presentación (CSS).
[AUM-IC](https://github.com/ingcrea/aum-ic) (Modelado Universal Atómico - Ingeniería Creativa) es nuestro estándar interno para devolverle la cordura al desarrollo web. Creemos que los estilos deben ser escalables, limpios y respetar una jerarquía lógica: **Átomos, Moléculas, Organismos, Ecosistemas y Galaxias**. 
Como desarrolladores, nos cansamos de lo infernal y tedioso que resulta migrar o mutar un proyecto amarrado a Tailwind para pasarlo a CSS puro. Creamos este motor destructivo exactamente para automatizar ese dolor: extraer las utilidades, purgar el framework y generar un CSS estandarizado que cumpla obligatoriamente con nuestras directivas AUM-IC para los que vengan detrás.

## 2. Determinismo Criptográfico (Zero-Trust)
Si no usas la IA opcional, la herramienta opera 100% offline. No adivina nombres. Ejecuta un algoritmo de hashing `SHAKE-256` sobre cada bloque detectado y asigna una firma única (`aumic-[etiqueta]-[hash]`). Entran los mismos datos, sale siempre la misma clase. Cero magia negra, pura matemática para evitar colisiones.

## 3. Aislamiento y Privacidad de Datos
1. **Ejecución Offline:** Todo el escaneo de código (Babel AST y Expresiones Regulares) y la regeneración de CSS (PostCSS) se realiza localmente en tu máquina. 
2. **Cero Telemetría:** El CLI no contacta servidores, no nos envía estadísticas de uso, ni hace rastreos.
3. **Módulo de IA (Opcional):** Las peticiones a proveedores externos (OpenAI, Claude, Gemini, etc.) **solo** ocurren si:
   - Activas el parámetro explícitamente.
   - Pones tu propia llave API (que *jamás* guardamos en disco, vive solo en RAM durante los milisegundos que dura la ejecución).
   - A las APIs de IA solo les mandamos un JSON con las clases sueltas (ej. `["flex p-4", "text-center"]`). El código fuente real de tu proyecto, tu lógica de negocio y tus secretos **JAMÁS** abandonan tu disco duro.

## 4. Modo Parásito (Web Cloning)
Básicamente, el motor baja el HTML, JS y CSS de una web pública para que puedas refactorizar su estructura de diseño en tu máquina local.
No te equivoques, esto no es para hackear: no elude logins, no intercepta bases de datos ni inyecta payloads raros. Es simplemente un scraper puro y duro enfocado en agilizarte la vida cuando necesitas refactorizar el diseño de un front-end existente.

## 5. Prevención de Pérdida de Datos y Rollback
Sabemos que borrar Tailwind y reescribir clases de todo un proyecto asusta. Por eso, antes de tocar nada, generamos el archivo `aumic-lock.json` en la raíz. 
Es un mapa exacto de qué clase de Tailwind se convirtió en qué clase de AUM-IC. Si te arrepientes o la mutación falla en algo, usamos este archivo como "Control Z" en el Modo Restauración para dejar tu código exactamente como estaba.
