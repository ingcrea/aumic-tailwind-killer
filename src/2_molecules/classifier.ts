/**
 * [EN] Component classifier: maps a file name to its AUM-IC structural tier.
 * [ES] Clasificador de componentes: mapea un nombre de archivo a su nivel estructural AUM-IC.
 */
import path from 'path';
import { COMPONENT_ALIASES } from '../1_atoms/constants';

export interface ComponentClassification { category: string; component: string; }

/** [EN] Classifies a file into its AUM-IC tier using alias lookup then regex patterns. [ES] Clasifica un archivo en su nivel AUM-IC usando búsqueda de alias y luego patrones regex. */
export function classifyComponent(fileName: string): ComponentClassification {
    const name = path.basename(fileName, path.extname(fileName)).toLowerCase();
    if (COMPONENT_ALIASES[name]) {
        const comp = COMPONENT_ALIASES[name];
        if (/(button|icon|input|badge|link|label)/.test(name))    return { category: 'atoms', component: comp };
        if (/(card|form|dropdown|menu|list|modal)/.test(name))    return { category: 'molecules', component: comp };
        if (/(header|footer|sidebar|hero|table|nav)/.test(name)) return { category: 'organisms', component: comp };
        return { category: 'ecosystems', component: comp };
    }
    const comp = name.replace(/[^a-z0-9]/g, '').slice(0, 8) || 'comp';
    if (/(button|btn|icon|input|badge|link|label|chip|tag|avatar)/.test(name))             return { category: 'atoms', component: comp };
    if (/(card|form|dropdown|drop|menu|list|modal|toast|banner)/.test(name))               return { category: 'molecules', component: comp };
    if (/(header|footer|sidebar|hero|table|nav|pricing|trust|features|teaser|rmm|cta)/.test(name)) return { category: 'organisms', component: comp };
    if (/(main|section|article|page|layout|index)/.test(name))                             return { category: 'ecosystems', component: comp };
    if (/(app|root|core|galaxy|global|provider)/.test(name))                               return { category: 'galaxies', component: comp };
    return { category: 'molecules', component: comp };
}
