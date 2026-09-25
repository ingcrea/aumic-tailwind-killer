# 🛡 MANIFIESTO DE SEGURIDAD OPERACIONAL Y FILOSOFÍA AUM-IC

## 1. Filosofía AUM-IC
AUM-IC (Atomic Universal Modeling - Ingeniería Creativa) postula que el CSS debe ser escalable, matemáticamente predecible y respetar la jerarquía universal: **Átomos, Moléculas, Organismos, Ecosistemas y Galaxias**. 
Tailwind CSS rompe esta doctrina al ofuscar el DOM con cadenas utilitarias ("Sopa de clases") que degradan la mantenibilidad a largo plazo. Este motor fue creado para restaurar el orden.

## 2. Determinismo Criptográfico (Zero-Trust)
Por defecto, el motor no adivina nombres. Ejecuta un algoritmo de hashing `SHAKE-256` sobre cada bloque utilitario detectado y asigna una firma única (`aumic-[etiqueta]-[hash]`). Esto garantiza Cero Colisiones en arquitecturas masivas de CSS.

## 3. Aislamiento y Privacidad de Datos
1. **Ejecución Offline:** Todo el escaneo de código (Babel AST y Expresiones Regulares) y la regeneración de CSS (PostCSS) se realiza localmente en la máquina del usuario (o en el clon extraído). 
2. **Cero Telemetría:** El CLI no contacta servidores de terceros, no contiene rastreadores, ni envía estadísticas de uso.
3. **Módulo de IA:** Las peticiones a proveedores externos (OpenAI, Anthropic, Gemini, etc.) **solo** ocurren si el desarrollador:
   - Activa el parámetro `--ai`.
   - Inyecta su propia `--key` (la cual *jamás* se persiste en disco, solo reside en memoria RAM durante la ejecución).
   - Los datos enviados al proveedor consisten únicamente en un array JSON de las clases extraídas (ej. `["flex p-4", "text-center"]`). El código fuente completo (JS/TS/HTML), lógica de negocio, IPs, o variables de entorno **JAMÁS** abandonan el sistema local.

## 4. Modo Parásito (Web Cloning)
El motor de clonación web descarga archivos HTML, JS y CSS expuestos de manera pública en el front-end. El objetivo del motor es exclusivamente la transmutación técnica del CSS (refactorización) para desarrollo en local o análisis estático. No elude autenticaciones ni inyecta payloads maliciosos.

## 5. Prevención de Pérdida de Datos
Antes de erradicar Tailwind, el motor genera un `aumic-lock.json` en la raíz del proyecto. Este archivo contiene el mapeo inverso exacto, permitiendo una posible restauración futura o auditoría forense manual.
