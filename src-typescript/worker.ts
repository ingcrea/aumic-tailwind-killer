import { AstInterceptor } from './ast/parser';

const astEngine = new AstInterceptor();

export default async function processFile(data: { mode: 'scan' | 'mutate', content: string, filePath: string, map?: Record<string, any> }) {
    if (data.mode === 'scan') {
        const extracted = new Map<string, number>();
        astEngine.processFrameworkFile(data.content, data.filePath, (twClass) => {
            extracted.set(twClass, (extracted.get(twClass) || 0) + 1);
            return twClass;
        });
        // Retornamos las entradas serializadas para que Piscina las cruce entre hilos
        return Array.from(extracted.entries());
    } else if (data.mode === 'mutate') {
        const { newCode } = astEngine.processFrameworkFile(data.content, data.filePath, (twClass) => {
            if (data.map && data.map[twClass]) {
                return data.map[twClass].aumicClass;
            }
            return twClass;
        });
        return newCode;
    }
}
