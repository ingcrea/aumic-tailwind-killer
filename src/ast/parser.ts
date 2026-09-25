import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

export interface ASTProcessResult {
    newCode: string;
    extractedClasses: string[];
}

export class AstInterceptor {
    
    /**
     * Destripa archivos TSX/JSX, localiza los atributos className/class 
     * e intercepta todos los StringLiterals dentro, sin importar su nivel 
     * de anidación o lógica condicional (ternarios, arrays, etc).
     */
    public processFrameworkFile(code: string, fileName: string, replacerFn: (twClass: string) => string): ASTProcessResult {
        const ext = fileName.split('.').pop()?.toLowerCase();
        const jsExtensions = ['jsx', 'tsx', 'js', 'ts'];
        
        if (jsExtensions.includes(ext || '')) {
            return this.processWithBabel(code, replacerFn);
        } else {
            return this.processWithUniversalRegex(code, replacerFn);
        }
    }

    private processWithUniversalRegex(code: string, replacerFn: (twClass: string) => string): ASTProcessResult {
        const extracted = new Set<string>();
        // Regex letal que captura class="...", className='...', class:list={`...`} en cualquier motor de plantillas (Jinja, Blade, Tera, HTML)
        const classRegex = /(class|className|class:list)\s*(=|:)\s*(["'`])(.*?)\3/gs;
        
        let newCode = code;
        
        // Fase 1: Extracción
        let match;
        while ((match = classRegex.exec(code)) !== null) {
            const classString = match[4];
            const cleanStr = classString.replace(/\s+/g, ' ').trim();
            if (cleanStr && !cleanStr.includes('aumic-')) {
                extracted.add(cleanStr);
            }
        }

        // Fase 2: Mutación directa
        newCode = code.replace(classRegex, (fullMatch, attr, separator, quote, classString) => {
            const cleanStr = classString.replace(/\s+/g, ' ').trim();
            if (!cleanStr || cleanStr.includes('aumic-')) return fullMatch;
            const newClass = replacerFn(cleanStr);
            return `${attr}${separator}${quote}${newClass}${quote}`;
        });

        return { newCode, extractedClasses: Array.from(extracted) };
    }

    private processWithBabel(code: string, replacerFn: (twClass: string) => string): ASTProcessResult {
        const ast = parse(code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript']
        });

        const extracted = new Set<string>();
        const traverseAst = (traverse as any).default || traverse;

        traverseAst(ast, {
            CallExpression(path: any) {
                const calleeName = path.node.callee.name;
                if (['clsx', 'cva', 'cn', 'twMerge', 'classNames'].includes(calleeName)) {
                    path.traverse({
                        StringLiteral(strPath: any) {
                            const originalStr = strPath.node.value;
                            const cleanStr = originalStr.replace(/\s+/g, ' ').trim();
                            if (cleanStr && !cleanStr.includes('aumic-')) {
                                extracted.add(cleanStr);
                                strPath.node.value = replacerFn(cleanStr);
                            }
                        },
                        TemplateElement(tplPath: any) {
                            const originalRaw = tplPath.node.value.raw;
                            const cleanStr = originalRaw.replace(/\s+/g, ' ').trim();
                            if (cleanStr && !cleanStr.includes('aumic-')) {
                                extracted.add(cleanStr);
                                tplPath.node.value.raw = replacerFn(cleanStr);
                                tplPath.node.value.cooked = tplPath.node.value.raw;
                            }
                        }
                    });
                }
            },
            JSXAttribute(path: any) {
                const attrName = path.node.name.name;
                if (attrName === 'className' || attrName === 'class') {
                    path.traverse({
                        StringLiteral(strPath: any) {
                            const originalStr = strPath.node.value;
                            const cleanStr = originalStr.replace(/\s+/g, ' ').trim();
                            if (cleanStr && !cleanStr.includes('aumic-')) {
                                extracted.add(cleanStr);
                                strPath.node.value = replacerFn(cleanStr);
                            }
                        },
                        TemplateElement(tplPath: any) {
                            const originalRaw = tplPath.node.value.raw;
                            const cleanStr = originalRaw.replace(/\s+/g, ' ').trim();
                            if (cleanStr && !cleanStr.includes('aumic-')) {
                                extracted.add(cleanStr);
                                tplPath.node.value.raw = replacerFn(cleanStr);
                                tplPath.node.value.cooked = tplPath.node.value.raw;
                            }
                        }
                    });
                }
            }
        });

        const generateCode = (generate as any).default || generate;
        const output = generateCode(ast, { retainLines: true }, code);

        return {
            newCode: output.code,
            extractedClasses: Array.from(extracted)
        };
    }
}
