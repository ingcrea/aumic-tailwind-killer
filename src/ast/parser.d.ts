export interface ASTProcessResult {
    newCode: string;
    extractedClasses: string[];
}
export declare class AstInterceptor {
    /**
     * Destripa archivos TSX/JSX, localiza los atributos className/class
     * e intercepta todos los StringLiterals dentro, sin importar su nivel
     * de anidación o lógica condicional (ternarios, arrays, etc).
     */
    processFrameworkFile(code: string, replacerFn: (twClass: string) => string): ASTProcessResult;
}
//# sourceMappingURL=parser.d.ts.map