/**
 * [EN] AST Interception Organism — the core transmutation engine.
 *      Routes files through Babel AST (JSX/TSX) or Universal Regex (HTML/templates).
 *      Supports forward (Tailwind→AUM-IC) and reverse (rollback) passes.
 * [ES] Organismo de Intercepción AST — el motor principal de transmutación.
 *      Enruta archivos por Babel AST (JSX/TSX) o Regex Universal (HTML/plantillas).
 *      Soporta pases directo (Tailwind→AUM-IC) e inverso (rollback).
 */
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import type { ASTProcessResult } from '../1_atoms/types';

export type { ASTProcessResult };

export class AstInterceptor {

    /**
     * [EN] Public router: delegates to Babel or Regex based on file extension.
     *      `replacerFn` receives a class string and returns the replacement.
     *      Set `isRestore = true` to enable reverse (rollback) mode.
     * [ES] Enrutador público: delega a Babel o Regex según la extensión del archivo.
     *      `replacerFn` recibe un string de clase y devuelve el reemplazo.
     *      Establece `isRestore = true` para el modo inverso (rollback).
     */
    public processFrameworkFile(
        code: string, fileName: string,
        replacerFn: (twClass: string) => string,
        isRestore: boolean = false
    ): ASTProcessResult {
        const ext = fileName.split('.').pop()?.toLowerCase();
        return ['jsx','tsx','js','ts'].includes(ext || '')
            ? this.processWithBabel(code, replacerFn, isRestore)
            : this.processWithUniversalRegex(code, replacerFn, isRestore);
    }

    /**
     * [EN] Universal Regex engine for non-JS templates.
     *      Phase 1 extracts class strings; Phase 2 mutates via replacerFn callback.
     * [ES] Motor Regex Universal para plantillas no-JS.
     *      La Fase 1 extrae strings de clase; la Fase 2 muta mediante el callback replacerFn.
     */
    private processWithUniversalRegex(code: string, replacerFn: (s: string) => string, isRestore: boolean): ASTProcessResult {
        const extracted = new Set<string>();
        const classRegex = /(class|className|class:list)\s*(=|:)\s*(["'`])(.*?)\3/gs;
        let match;
        while ((match = classRegex.exec(code)) !== null) {
            const clean = match[4].replace(/\s+/g,' ').trim();
            if (clean && (isRestore || !clean.includes('aumic-'))) extracted.add(clean);
        }
        const newCode = code.replace(classRegex, (full, attr, sep, q, cls) => {
            const clean = cls.replace(/\s+/g,' ').trim();
            if (!clean || (!isRestore && clean.includes('aumic-'))) return full;
            return `${attr}${sep}${q}${replacerFn(clean)}${q}`;
        });
        return { newCode, extractedClasses: Array.from(extracted) };
    }

    /**
     * [EN] Babel AST engine for JSX/TSX. Visits JSXAttribute nodes (className/class)
     *      and CallExpression nodes (clsx, cva, cn, twMerge). Preserves original line numbers.
     * [ES] Motor AST Babel para JSX/TSX. Visita nodos JSXAttribute (className/class)
     *      y CallExpression (clsx, cva, cn, twMerge). Preserva números de línea originales.
     */
    private processWithBabel(code: string, replacerFn: (s: string) => string, isRestore: boolean): ASTProcessResult {
        const ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] });
        const extracted = new Set<string>();
        const traverseAst = (traverse as any).default || traverse;
        const fn = replacerFn; // Capture outside Babel visitors to avoid closure loss

        traverseAst(ast, {
            CallExpression(path: any) {
                if (['clsx','cva','cn','twMerge','classNames'].includes(path.node.callee.name)) {
                    path.traverse({
                        StringLiteral(p: any) {
                            const c = p.node.value.replace(/\s+/g,' ').trim();
                            if (c && (isRestore || !c.includes('aumic-'))) { extracted.add(c); p.node.value = fn(c); }
                        },
                        TemplateElement(p: any) {
                            const c = p.node.value.raw.replace(/\s+/g,' ').trim();
                            if (c && (isRestore || !c.includes('aumic-'))) { extracted.add(c); p.node.value.raw = fn(c); p.node.value.cooked = p.node.value.raw; }
                        }
                    });
                }
            },
            JSXAttribute(path: any) {
                if (['className','class'].includes(path.node.name.name)) {
                    path.traverse({
                        StringLiteral(p: any) {
                            const c = p.node.value.replace(/\s+/g,' ').trim();
                            if (c && (isRestore || !c.includes('aumic-'))) { extracted.add(c); p.node.value = fn(c); }
                        },
                        TemplateElement(p: any) {
                            const c = p.node.value.raw.replace(/\s+/g,' ').trim();
                            if (c && (isRestore || !c.includes('aumic-'))) { extracted.add(c); p.node.value.raw = fn(c); p.node.value.cooked = p.node.value.raw; }
                        }
                    });
                }
            }
        });

        const genCode = (generate as any).default || generate;
        const out = genCode(ast, { retainLines: true }, code);
        return { newCode: out.code, extractedClasses: Array.from(extracted) };
    }
}
