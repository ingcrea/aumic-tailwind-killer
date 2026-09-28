# 🛡️ MANIFIESTO DE SEGURIDAD OPERACIONAL Y FILOSOFÍA [AUM-IC](https://github.com/ingcrea/aum-ic)

> 🌐 **Navegación:** 🇺🇸 [Read in English](./MANIFEST.md) &nbsp;|&nbsp; 📖 [README (ES)](./README.es.md) &nbsp;|&nbsp; 📖 [README (EN)](./README.md)

> *"El software no es un producto, es un sistema de consciencia. Construye con la precisión de un relojero suizo y la visión de un arquitecto del cosmos."*
> — Estándar AUM-IC, INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S.

---

## 1. Filosofía AUM-IC

[AUM-IC](https://github.com/ingcrea/aum-ic) (Arquitectura de Universos Multidimensionales de Ingeniería Creativa) es nuestro estándar interno para erradicar la deuda técnica y devolverle la cordura al desarrollo web. El software es un sistema de consciencia fractálica; por lo tanto, los estilos deben ser escalables, modulares y respetar una jerarquía lógica de expansión: **Átomos, Moléculas, Organismos, Ecosistemas y Universos**.

### 1.1. Pragmatismo y Liberación del Framework

Nos cansamos de la fragilidad y el acoplamiento que genera atar un proyecto masivo a las clases utilitarias de Tailwind. Creamos este orquestador para automatizar una migración destructiva y precisa: extraer las utilidades, purgar el framework original y generar un ecosistema de CSS estandarizado. El objetivo es simple: tu código fuente deja de ser esclavo de una dependencia externa y se convierte en un activo inmutable, limpio y eternamente escalable.

### 1.2. Intercepción JIT (Zero-Bloat Guarantee)

No generamos CSS a mano ni adivinamos estilos. Nuestro motor instancia el compilador nativo `JIT` (Just-In-Time) de Tailwind de forma oculta en memoria RAM, inyecta un DOM virtual y permite que el algoritmo original minifique el código. Una vez optimizado, ejecutamos un secuestro táctico del CSS y reemplazamos los selectores con hashes AUM-IC. El resultado es CSS puro estructuralmente idéntico (byte por byte) al framework original. Cero código muerto, cero inflación.

### 1.3. Determinismo, Prevención de Colisiones e IA Semántica

Delegar el nombramiento masivo de clases a una Inteligencia Artificial archivo por archivo provoca inconsistencias, colapsos por colisiones de CSS y un gasto absurdo de tokens. Lo solucionamos con el **Titanium Cache** (`aumic-lock.json`) y nuestro algoritmo de deduplicación.

El motor fuerza un mapeo 1:1 estricto: si una tarjeta (`bg-white shadow-lg p-6 rounded-xl`) se repite 5,000 veces en tu monorepo, el sistema la comprime a una única combinación matemática. Es gracias a esta arquitectura de unificación que podemos integrar de forma segura **Nombrado Semántico por IA** (*Ollama, Claude, Codex, DeepSeek, Gemini*). Al enviar únicamente los diccionarios deduplicados en lugar del código fuente completo, garantizamos **cero colisiones de estilos**, ahorramos millones de tokens de procesamiento y blindamos la privacidad (Zero-Trust): la propiedad intelectual y la lógica de negocio de la empresa jamás se exponen a servidores de terceros.

### 1.4. Inmutabilidad (Zero-Trust)

Si el orquestador no se invoca con la bandera de mutación destructiva (`-m local`), opera bajo un estado de desconfianza absoluto (Modo Simulación). El motor jamás sobreescribirá tus componentes (React, Astro, Python) a menos que aprueben la validación Pre-Flight, verificando los permisos del sistema de archivos y el estado de tu árbol de Git. Prevenimos estados corruptos antes de que ocurran.

### 1.5. Escalabilidad Absoluta (Multi-Level Cache)

Procesar miles de archivos en monorepos corporativos exige velocidad determinista. Por ello, la arquitectura opera bajo una red de cachés de doble nivel que destroza cuellos de botella:

1. **L1 Cache (DuckDB - Oráculo Estático):** Mediante ingeniería inversa, pre-compilamos y extrajimos las equivalencias exactas en CSS puro de más de 26,000 clases nativas. Toda esta data reside en una base de datos binaria súper comprimida (`aumic-lexicon.duckdb`), operando bajo compresión columnar masiva. Inyecta los valores CSS directamente en tiempo O(1), sin costo de procesamiento (Zero-Execution). Su naturaleza de diccionario universal lo hace invulnerable a cambios arquitectónicos, soportando a la perfección desde ecosistemas legacy (v1, v2, v3) hasta el nuevo motor Oxide (v4).
2. **L2 Cache (Dynamic JIT):** Capacidad de inyección dinámica que secuestra el entorno `node_modules/tailwindcss` del propio usuario. Esto fusiona la velocidad de una base de datos analítica con la precisión milimétrica del motor local del cliente, garantizando escalabilidad infinita sin importar la versión del framework subyacente.

### 1.6. Paranoia Operacional: El Búnker Criptográfico de Búsqueda

Sabemos que como ingeniero senior, confías en el código y en la arquitectura, no en las promesas de marketing. Si asumes (con justa razón) que cualquier herramienta CLI moderna está extrayendo telemetría en la sombra o enviando tu código propietario a un servidor remoto para ser procesado, esta sección es para ti. Diseñamos el mecanismo de emparejamiento de AUM-IC bajo una estricta estándar de **Paranoia Operacional**.

**¿Cómo encuentra AUM-IC la relación exacta entre tu clase y el CSS sin comprometer tu máquina?**

```
  Tu archivo .tsx / .astro / .vue
           │
           │  [Babel/Cheerio AST — LECTURA ESTÁTICA]
           │  Tu código NUNCA se ejecuta.
           ▼
  Lista de clases extraídas
  [ "bg-white", "p-4", "hover:shadow-lg", "w-[320px]" ]
           │
           │  [Deduplicación matemática en RAM]
           ▼
  Combinaciones únicas (solo estas se procesan)
           │
           ├──────────────────────────────────────────┐
           │ ¿Clase estática?                         │ ¿Clase dinámica?
           ▼                                          ▼
  ┌─────────────────────┐              ┌──────────────────────────┐
  │  L1: DuckDB         │              │  L2: JIT local           │
  │  aumic-lexicon.duckdb│              │  tailwindcss de tu       │
  │  READ-ONLY · Offline│              │  node_modules            │
  │  O(1) instantáneo   │              │  Aislado · Sin red       │
  └──────────┬──────────┘              └─────────────┬────────────┘
             └─────────────────────────────────────────┘
                                  │
                                  │  [Todo ocurre en RAM]
                                  │  Tu código NUNCA abandona tu máquina.
                                  ▼
                        CSS puro + aumic-lock.json
                        Memoria destruida al terminar.
```

1. **Aislamiento Total (Air-Gapped):** La base de datos `aumic-lexicon.duckdb` se descarga una sola vez y opera de forma 100% local, desconectada e inmutable (Read-Only). No hace *ping* a ningún servidor. Cero llamadas a APIs en la sombra. Cero rastreo.
2. **Análisis Estático (Cero Ejecución de Código):** Nunca ejecutamos tus scripts. Utilizamos interceptores AST (Babel) que leen tus componentes como un árbol matemático puro. Extraemos las clases quirúrgicamente, garantizando inmunidad total contra ataques de ejecución de código arbitrario que pudieran esconderse en proyectos de terceros.
3. **Búsqueda Indexada Determinista:** Una vez extraída una clase (ej. `bg-red-500`), el motor no realiza heurísticas dudosas. Ejecuta una consulta vectorial exacta en memoria: `SELECT css_value FROM lexicon WHERE class_name = 'bg-red-500'`. Si la utilidad existe en el diccionario estático de 26,000 clases, se inyecta su equivalente CSS al instante. Si es dinámica (ej. `w-[320px]`), se aísla temporalmente y se compila en un entorno local y cerrado.
4. **Memoria Efímera (Zero-Trace):** Todo el proceso ocurre exclusivamente en la RAM de tu procesador. Tras inyectar el CSS final y guardar `aumic-lock.json`, la memoria es destruida. Tu propiedad intelectual nunca abandona tu ecosistema local.

---

## 2. Principios de Diseño No Negociables

Toda contribución, modificación o extensión de AUM-IC Tailwind Killer debe respetar estos principios fundacionales. Son la columna vertebral del estándar:

| # | Principio | Descripción |
| :---: | :--- | :--- |
| **P1** | **Determinismo Absoluto** | La misma entrada siempre produce exactamente la misma salida. Sin aleatoriedad, sin timestamps en los hashes. |
| **P2** | **Zero-Execution** | AUM-IC nunca ejecuta el código del usuario. Solo lo lee como árbol sintáctico. Sin excepciones. |
| **P3** | **Offline-First** | El núcleo de procesamiento no requiere conexión a internet. La IA es una capa opcional, no estructural. |
| **P4** | **Rollback Garantizado** | Cualquier mutación destructiva debe poder revertirse en un solo comando usando `aumic-lock.json`. |
| **P5** | **Cero Dependencias de Framework** | El CSS de salida no debe requerir ningún preprocesador, runtime ni framework para funcionar. CSS puro y estándar. |

---

## 3. Escenarios Soportados

| Framework / Tecnología | Extensiones Soportadas | Node.js Mínimo | Estado |
| :--- | :--- | :---: | :---: |
| **Astro SSR** | `.astro` | 18.0 | ✅ Estable |
| **Next.js / React** | `.tsx`, `.jsx`, `.js` | 18.0 | ✅ Estable |
| **Vue.js** | `.vue` | 18.0 | ✅ Estable |
| **Python (Jinja2 / Django)** | `.html`, `.j2` | 18.0 | ✅ Estable |
| **Plantillas HTML puras** | `.html` | 18.0 | ✅ Estable |
| **Monorepos con Turborepo** | Múltiples frameworks | 20.0 | ✅ Estable |
| **Svelte** | `.svelte` | 18.0 | 🔄 Beta |
| **Angular 17+** | `.html`, `.ts` | 20.0 | 📋 Planificado |

---

## 4. Garantías de Seguridad y Privacidad

Esta herramienta fue construida para operar dentro de entornos corporativos donde el código fuente es propiedad intelectual altamente sensible. Nuestras garantías técnicas son:

- **Cero telemetría:** No existe ningún mecanismo de reporte de uso, errores o métricas a servidores externos. El código fuente es auditable al 100%.
- **Cero dependencias de red en runtime:** Una vez instalado, AUM-IC opera completamente offline. La única conexión a internet ocurre en la instalación inicial de npm.
- **Código fuente nunca abandona tu máquina:** El análisis AST, la deduplicación y la generación de hashes suceden en procesos locales de Node.js que terminan inmediatamente al finalizar la tarea.
- **IA Opcional y Controlada:** La integración con APIs de IA (Claude, Gemini, DeepSeek) es 100% opcional y solo envía los *hashes de combinaciones únicas*, nunca el código fuente, nombres de variables ni lógica de negocio.

**¿Quieres verificarlo tú mismo?** Puedes auditar exactamente qué se incluye en el paquete antes de instalarlo:

```bash
# Ver todos los archivos que se incluyen en el paquete npm
npx npm pack @ingcrea/aumic-tailwind-killer --dry-run

# Inspeccionar el código fuente buscando llamadas de red
git clone https://github.com/ingcrea/aumic-tailwind-killer
grep -r "fetch\|axios\|http\|https\|request" src/ --include="*.ts"
# Resultado esperado: cero llamadas de red en el núcleo de procesamiento.
```

---

## 5. Historial de Versiones

| Versión | Cambios Principales |
| :--- | :--- |
| **v4.1.3** *(actual)* | Motor 100% Node.js. DuckDB L1 Cache con 26,000+ clases. Soporte AST para React/Astro/Vue/Python. Nombrado semántico por IA (Ollama, Claude, Gemini, DeepSeek). Rollback determinista. |
| **v4.0.x** | Primera integración de DuckDB como caché primario. Arquitectura Multi-Level JIT. |
| **v3.x** | Motor de extracción paralela con Piscina Worker Threads. Soporte Astro SSR. |

---

> Diseñado bajo el rigor arquitectónico de **INGENIERÍA CREATIVA Y DESARROLLOS TECNOLÓGICOS S.A.S. (IngCrea)**. Excelencia, Determinismo y Zero-Trust.
