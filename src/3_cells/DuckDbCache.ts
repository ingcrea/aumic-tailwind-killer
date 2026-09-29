/**
 * [EN] DuckDB L1 Cache cell: high-speed lookup of pre-computed Tailwind CSS definitions.
 * [ES] Célula Caché L1 DuckDB: búsqueda de alta velocidad de definiciones CSS Tailwind pre-computadas.
 */
import type { TailwindVersion } from '../1_atoms/types';

export interface L1CacheResult {
    css: string;
    unresolved: Set<string>;
}

/**
 * [EN] Queries the bundled DuckDB lexicon. Unresolved classes are forwarded to the L2 JIT compiler.
 * [ES] Consulta el léxico DuckDB incluido. Las clases no resueltas se reenvían al compilador JIT L2.
 */
export async function queryL1Cache(classes: string[], version: TailwindVersion, dbPath: string): Promise<L1CacheResult> {
    const duckdb = require('duckdb');
    const db = new duckdb.Database(dbPath);
    let css = '';
    const unresolved = new Set<string>();
    await Promise.all(classes.map(cls =>
        new Promise<void>(resolve => {
            db.all('SELECT css FROM tw_lexicon WHERE version = ? AND class = ?', [version, cls], (err: any, rows: any[]) => {
                if (err || rows.length === 0) unresolved.add(cls);
                else css += `\n/* tw: ${cls} (L1) */\n.${cls} { ${rows[0].css} }\n`;
                resolve();
            });
        })
    ));
    db.close();
    return { css, unresolved };
}
