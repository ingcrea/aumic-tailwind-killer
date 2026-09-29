import crypto from 'crypto';

/**
 * [EN] Deterministic 6-char hex hash for reproducible AUM-IC class identifiers.
 * [ES] Hash hex determinista de 6 chars para identificadores de clase AUM-IC reproducibles.
 */
export function getHash(str: string): string {
    return crypto.createHash('shake256', { outputLength: 3 }).update(str).digest('hex');
}

/**
 * [EN] Escapes a string for safe use as a CSS class selector.
 * [ES] Escapa un string para uso seguro como selector de clase CSS.
 */
export function escapeCssSelector(className: string): string {
    return className.replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}
