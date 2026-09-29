import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AstInterceptor } from '../src/4_organisms/AstParser';

describe('AstInterceptor (Atoms & Molecules)', () => {
    const parser = new AstInterceptor();

    describe('1. Universal Regex Parser (HTML / Astro / Svelte)', () => {
        it('debe extraer clases estáticas de atributos class', () => {
            const code = `<div class="flex items-center p-4"></div>`;
            const result = parser.processFrameworkFile(code, 'file.html', (cls) => 'aumic-hash');
            
            assert.ok(result.extractedClasses.includes('flex items-center p-4'));
            assert.ok(result.newCode.includes('class="aumic-hash"'));
        });

        it('debe ignorar clases que ya contengan el hash aumic- (Idempotencia)', () => {
            const code = `<div class="aumic-rs-1234"></div>`;
            const result = parser.processFrameworkFile(code, 'file.html', (cls) => 'no-deberia-llamar');
            
            assert.strictEqual(result.extractedClasses.length, 0);
            assert.strictEqual(result.newCode, code);
        });

        it('debe revertir hashes a clases originales en modo Restore', () => {
            const code = `<div class="aumic-rs-1234"></div>`;
            const result = parser.processFrameworkFile(code, 'file.html', (cls) => {
                if (cls === 'aumic-rs-1234') return 'flex items-center';
                return cls;
            }, true);
            
            assert.ok(result.extractedClasses.includes('aumic-rs-1234'));
            assert.ok(result.newCode.includes('class="flex items-center"'));
        });
    });

    describe('2. Babel AST Parser (JSX / TSX)', () => {
        it('debe mutar className en archivos TSX de manera segura', () => {
            const code = `const Comp = () => <div className="text-red-500 font-bold">Hello</div>;`;
            const result = parser.processFrameworkFile(code, 'file.tsx', (cls) => 'aumic-hash');
            
            assert.ok(result.extractedClasses.includes('text-red-500 font-bold'));
            assert.ok(result.newCode.includes('className="aumic-hash"'));
        });

        it('debe ignorar código dinámico y hashes existentes (Idempotencia)', () => {
            const code = `const Comp = () => <div className="aumic-rs-9999">Hello</div>;`;
            const result = parser.processFrameworkFile(code, 'file.tsx', (cls) => 'fail');
            
            assert.strictEqual(result.extractedClasses.length, 0);
            assert.ok(result.newCode.includes('className="aumic-rs-9999"'));
        });

        it('debe mutar literales de string dentro de funciones como clsx o twMerge', () => {
            const code = `const classes = clsx("p-4 bg-white", isTrue ? "text-red-500" : "text-blue-500");`;
            const result = parser.processFrameworkFile(code, 'file.tsx', (cls) => 'aumic-hash');
            
            assert.ok(result.extractedClasses.includes('p-4 bg-white'));
            assert.ok(result.extractedClasses.includes('text-red-500'));
            assert.ok(result.extractedClasses.includes('text-blue-500'));
            assert.ok(result.newCode.includes('clsx("aumic-hash", isTrue ? "aumic-hash" : "aumic-hash")'));
        });
        
        it('debe ejecutar el Rollback en modo Restore dentro de TSX', () => {
            const code = `const Comp = () => <div className="aumic-rs-1234">Hello</div>;`;
            const result = parser.processFrameworkFile(code, 'file.tsx', (cls) => 'p-4', true);
            
            assert.ok(result.extractedClasses.includes('aumic-rs-1234'));
            assert.ok(result.newCode.includes('className="p-4"'));
        });
    });
});
