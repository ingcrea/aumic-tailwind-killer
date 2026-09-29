/**
 * [EN] Piscina worker — runs in a separate thread for each file.
 *      Two modes:
 *        - 'scan':   extracts Tailwind class strings and returns their frequency map
 *        - 'mutate': applies the pre-computed class mapping and returns mutated source code
 * [ES] Worker de Piscina — se ejecuta en un hilo separado por cada archivo.
 *      Dos modos:
 *        - 'scan':   extrae strings de clase Tailwind y devuelve su mapa de frecuencias
 *        - 'mutate': aplica el mapeo de clases pre-computado y devuelve el código fuente mutado
 */
import { AstInterceptor } from './4_organisms/AstParser';

// [EN] Single shared instance per worker thread — instantiation is cheap and stateless.
// [ES] Instancia compartida única por hilo worker — la instanciación es barata y sin estado.
const astEngine = new AstInterceptor();

export default async function processFile(data: {
    mode: 'scan' | 'mutate';
    content: string;
    filePath: string;
    map?: Record<string, any>;
}) {
    if (data.mode === 'scan') {
        // [EN] Scan pass: count occurrences of each unique class string.
        // [ES] Pase de escaneo: contar las ocurrencias de cada string de clase único.
        const freq = new Map<string, number>();
        astEngine.processFrameworkFile(data.content, data.filePath, (cls) => {
            freq.set(cls, (freq.get(cls) || 0) + 1);
            return cls; // [EN] No mutation in scan mode. [ES] Sin mutación en modo escaneo.
        });
        return Array.from(freq.entries());
    }

    if (data.mode === 'mutate') {
        // [EN] Mutate pass: replace each matched class with its AUM-IC counterpart.
        // [ES] Pase de mutación: reemplazar cada clase coincidente con su contraparte AUM-IC.
        const { newCode } = astEngine.processFrameworkFile(data.content, data.filePath, (cls) => {
            return data.map?.[cls]?.replacementString ?? data.map?.[cls]?.aumicClass ?? cls;
        });
        return newCode;
    }
}
