export type AIProvider = 'gemini' | 'openai' | 'claude' | 'deepseek' | 'xai' | 'alibaba';
export interface SemanticsRequest {
    utilities: string[];
}
export interface SemanticResponse {
    mapping: Record<string, string>;
}
export declare class AIEngine {
    private provider;
    private apiKey;
    constructor(provider: AIProvider, apiKey: string);
    generateSemanticNames(request: SemanticsRequest): Promise<SemanticResponse>;
}
//# sourceMappingURL=provider.d.ts.map