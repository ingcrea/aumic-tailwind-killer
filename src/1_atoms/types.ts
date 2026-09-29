/**
 * [EN] Core type definitions — the most primitive building blocks.
 * [ES] Definiciones de tipos fundamentales — los bloques de construcción más primitivos.
 */

export type AIProvider = 'gemini' | 'openai' | 'claude' | 'deepseek' | 'xai' | 'alibaba' | 'ollama';
export type ExecutionMode = 'local' | 'surgical' | 'clone' | 'restore';
export type OutputMode = 'aumic' | 'global' | 'css-modules' | 'styled-components';
export type TailwindVersion = 3 | 4;

export interface ASTProcessResult {
    newCode: string;
    extractedClasses: string[];
}

export interface ClassMappingEntry {
    original: string;
    array: string[];
    tailwindOnlyArray: string[];
    customArray: string[];
    aumicClass: string;
    replacementString: string;
    category: string;
    component: string;
    occurrences: number;
}

export interface SemanticsRequest {
    utilities: string[];
    customRules?: string;
}

export interface SemanticResponse {
    mapping: Record<string, string>;
}

export interface EnvironmentState {
    version: TailwindVersion;
    usesAstro: boolean;
    usesVite: boolean;
    usesPostcss: boolean;
    importsPreflight: boolean;
    importsUtilities: boolean;
    cssEntrypoint: string | null;
}

export interface ResolvedOptions {
    mode: ExecutionMode;
    scope?: string;
    targetUrl?: string;
    cloneDepth: 'page' | 'site';
    targetDir: string;
    outputMode: OutputMode;
    simulate: boolean;
    useAI: boolean;
    aiProvider?: AIProvider;
    apiKey?: string;
    eradicate: boolean;
    concurrency?: string;
}
