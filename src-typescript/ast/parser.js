"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstInterceptor = void 0;
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
const generator_1 = __importDefault(require("@babel/generator"));
class AstInterceptor {
    /**
     * Destripa archivos TSX/JSX, localiza los atributos className/class
     * e intercepta todos los StringLiterals dentro, sin importar su nivel
     * de anidación o lógica condicional (ternarios, arrays, etc).
     */
    processFrameworkFile(code, replacerFn) {
        const ast = (0, parser_1.parse)(code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript']
        });
        const extracted = new Set();
        // Usamos .default por compatibilidad de Babel en CommonJS
        const traverseAst = traverse_1.default.default || traverse_1.default;
        traverseAst(ast, {
            JSXAttribute(path) {
                const attrName = path.node.name.name;
                // Interceptamos 'className' (React/Preact) y 'class' (Solid/Astro/Svelte)
                if (attrName === 'className' || attrName === 'class') {
                    // Un misil teledirigido: busca literales dentro del atributo
                    path.traverse({
                        StringLiteral(strPath) {
                            const originalStr = strPath.node.value;
                            const cleanStr = originalStr.replace(/\s+/g, ' ').trim();
                            if (cleanStr && !cleanStr.includes('aumic-')) {
                                extracted.add(cleanStr);
                                // Mutamos el AST directamente
                                strPath.node.value = replacerFn(cleanStr);
                            }
                        },
                        TemplateElement(tplPath) {
                            // Soporte para Template Literals: className={`flex ${activo ? 'bg-red' : ''}`}
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
        const generateCode = generator_1.default.default || generator_1.default;
        const output = generateCode(ast, { retainLines: true }, code);
        return {
            newCode: output.code,
            extractedClasses: Array.from(extracted)
        };
    }
}
exports.AstInterceptor = AstInterceptor;
//# sourceMappingURL=parser.js.map