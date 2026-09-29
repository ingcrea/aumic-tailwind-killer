/**
 * [EN] AI Engine cell: manages stateful LLM connections for AI Semantic Naming.
 * [ES] Célula del Motor de IA: gestiona conexiones LLM con estado para el Nombrado Semántico.
 */
import type { AIProvider, SemanticsRequest, SemanticResponse } from '../1_atoms/types';

export class AIEngine {
    private provider: AIProvider;
    private apiKey: string;
    private model: string;

    constructor(provider: AIProvider, apiKey: string, model?: string) {
        this.provider = provider;
        this.apiKey = apiKey;
        this.model = model || this.getDefaultModel(provider);
    }

    /** [EN] Canonical default model for each provider. [ES] Modelo predeterminado canónico por proveedor. */
    private getDefaultModel(provider: AIProvider): string {
        const map: Record<string, string> = {
            openai: 'gpt-4o-mini', deepseek: 'deepseek-chat', xai: 'grok-beta',
            alibaba: 'qwen-turbo', claude: 'claude-3-haiku-20240307',
            gemini: 'gemini-1.5-flash', ollama: 'llama3',
        };
        return map[provider] || 'gpt-4o-mini';
    }

    /** [EN] Base endpoint URL per provider. [ES] URL de endpoint base por proveedor. */
    private getProviderBaseUrl(provider: AIProvider): string {
        const map: Record<string, string> = {
            openai: 'https://api.openai.com/v1/chat/completions',
            deepseek: 'https://api.deepseek.com/chat/completions',
            xai: 'https://api.x.ai/v1/chat/completions',
            alibaba: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
            ollama: 'http://127.0.0.1:11434/api/generate',
        };
        return map[provider] || '';
    }

    /**
     * [EN] Dispatches the naming request to the correct provider and returns a normalized mapping.
     * [ES] Despacha la solicitud de nombrado al proveedor correcto y devuelve un mapeo normalizado.
     */
    public async generateSemanticNames(request: SemanticsRequest): Promise<SemanticResponse> {
        let sys = "Eres un Arquitecto CSS AUM-IC. Te daré un array JSON de cadenas de utilidades de Tailwind. Devuelve un objeto JSON donde la clave es la cadena exacta de Tailwind, y el valor es un nombre de clase semántico BEM corto que empiece con 'aumic-'. Responde ÚNICAMENTE con el objeto JSON válido.";
        if (request.customRules) sys += `\n\nREGLAS PERSONALIZADAS:\n${request.customRules}\nDEBES DAR PRIORIDAD ABSOLUTA A ESTAS REGLAS.`;
        const user = JSON.stringify(request.utilities);
        let raw = '';
        if (['openai','deepseek','xai','alibaba'].includes(this.provider)) raw = await this.callOpenAICompatible(sys, user);
        else if (this.provider === 'gemini')  raw = await this.callGemini(sys, user);
        else if (this.provider === 'claude')  raw = await this.callClaude(sys, user);
        else if (this.provider === 'ollama')  raw = await this.callOllama(sys, user);
        else throw new Error(`Proveedor ${this.provider} no implementado.`);
        try {
            // [EN] Strip markdown fences — some LLMs ignore the plain-JSON instruction.
            // [ES] Eliminar bloques markdown — algunos LLMs ignoran la instrucción de JSON plano.
            return { mapping: JSON.parse(raw.replace(/```json/g,'').replace(/```/g,'').trim()) };
        } catch { return { mapping: {} }; }
    }

    /** [EN] Adapter for OpenAI-compatible REST APIs. [ES] Adaptador para APIs REST compatibles con OpenAI. */
    private async callOpenAICompatible(sys: string, user: string): Promise<string> {
        const res = await fetch(this.getProviderBaseUrl(this.provider), {
            method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${this.apiKey}`},
            body: JSON.stringify({ model: this.model, messages:[{role:'system',content:sys},{role:'user',content:user}], temperature:0.1 })
        });
        if (!res.ok) throw new Error(`[IA] HTTP ${res.status}: ${await res.text()}`);
        return (await res.json()).choices[0].message.content;
    }

    /** [EN] Adapter for Google Gemini. [ES] Adaptador para Google Gemini. */
    private async callGemini(sys: string, user: string): Promise<string> {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`,{
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ system_instruction:{parts:{text:sys}}, contents:[{parts:[{text:user}]}], generationConfig:{temperature:0.1} })
        });
        if (!res.ok) throw new Error(`[IA] HTTP ${res.status}: ${await res.text()}`);
        return (await res.json()).candidates[0].content.parts[0].text;
    }

    /** [EN] Adapter for Anthropic Claude. [ES] Adaptador para Anthropic Claude. */
    private async callClaude(sys: string, user: string): Promise<string> {
        const res = await fetch('https://api.anthropic.com/v1/messages',{
            method:'POST', headers:{'Content-Type':'application/json','x-api-key':this.apiKey,'anthropic-version':'2023-06-01'},
            body: JSON.stringify({ model:this.model, system:sys, messages:[{role:'user',content:user}], temperature:0.1, max_tokens:4096 })
        });
        if (!res.ok) throw new Error(`[IA] HTTP ${res.status}: ${await res.text()}`);
        return (await res.json()).content[0].text;
    }

    /** [EN] Adapter for self-hosted Ollama. [ES] Adaptador para Ollama auto-hospedado. */
    private async callOllama(sys: string, user: string): Promise<string> {
        const res = await fetch(this.getProviderBaseUrl(this.provider),{
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ model:this.model, system:sys, prompt:user, stream:false, options:{temperature:0.1} })
        });
        if (!res.ok) throw new Error(`[IA] Ollama HTTP ${res.status}: ¿Está corriendo Ollama?`);
        return (await res.json()).response;
    }
}
