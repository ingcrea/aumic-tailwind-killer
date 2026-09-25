export type AIProvider = 'gemini' | 'openai' | 'claude' | 'deepseek' | 'xai' | 'alibaba';

export interface SemanticsRequest {
    utilities: string[];
    customRules?: string;
}

export interface SemanticResponse {
    mapping: Record<string, string>;
}

export class AIEngine {
    private provider: AIProvider;
    private apiKey: string;
    private model: string;

    constructor(provider: AIProvider, apiKey: string, model?: string) {
        this.provider = provider;
        this.apiKey = apiKey;
        this.model = model || this.getDefaultModel(provider);
    }

    private getDefaultModel(provider: AIProvider): string {
        switch(provider) {
            case 'openai': return 'gpt-4o-mini';
            case 'deepseek': return 'deepseek-chat';
            case 'xai': return 'grok-beta';
            case 'alibaba': return 'qwen-turbo';
            case 'claude': return 'claude-3-haiku-20240307';
            case 'gemini': return 'gemini-1.5-flash';
            default: return 'gpt-4o-mini';
        }
    }

    private getProviderBaseUrl(provider: AIProvider): string {
        switch(provider) {
            case 'openai': return 'https://api.openai.com/v1/chat/completions';
            case 'deepseek': return 'https://api.deepseek.com/chat/completions';
            case 'xai': return 'https://api.x.ai/v1/chat/completions';
            case 'alibaba': return 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
            default: return '';
        }
    }

    public async generateSemanticNames(request: SemanticsRequest): Promise<SemanticResponse> {
        let systemPrompt = "Eres un Arquitecto CSS AUM-IC. Te daré un array JSON de cadenas de utilidades de Tailwind. Devuelve un objeto JSON donde la clave es la cadena exacta de Tailwind, y el valor es un nombre de clase semántico BEM corto que empiece con 'aumic-' (ej: 'aumic-btn--primary', 'aumic-card__header'). Responde ÚNICAMENTE con el objeto JSON válido, sin bloques de código markdown ni texto adicional.";
        
        if (request.customRules) {
            systemPrompt += `\n\nREGLAS PERSONALIZADAS DE LA EMPRESA/DESARROLLADOR:\n${request.customRules}\nDEBES DAR PRIORIDAD ABSOLUTA A ESTAS REGLAS EN EL RENOMBRAMIENTO.`;
        }

        const userContent = JSON.stringify(request.utilities);

        let jsonRaw = '';

        if (['openai', 'deepseek', 'xai', 'alibaba'].includes(this.provider)) {
            jsonRaw = await this.callOpenAICompatible(systemPrompt, userContent);
        } else if (this.provider === 'gemini') {
            jsonRaw = await this.callGemini(systemPrompt, userContent);
        } else if (this.provider === 'claude') {
            jsonRaw = await this.callClaude(systemPrompt, userContent);
        } else {
            throw new Error(`Proveedor ${this.provider} no implementado.`);
        }

        try {
            // Limpieza agresiva por si la IA devuelve markdown a pesar de las instrucciones
            const cleanJson = jsonRaw.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);
            return { mapping: parsed };
        } catch (error) {
            console.error("[IA] Fallo al parsear la respuesta semántica:", jsonRaw);
            return { mapping: {} };
        }
    }

    private async callOpenAICompatible(system: string, user: string): Promise<string> {
        const url = this.getProviderBaseUrl(this.provider);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: user }
                ],
                temperature: 0.1 // Temperatura baja para determinismo
            })
        });

        if (!res.ok) throw new Error(`[IA] Error HTTP ${res.status}: ${await res.text()}`);
        const data = await res.json();
        return data.choices[0].message.content;
    }

    private async callGemini(system: string, user: string): Promise<string> {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: { text: system } },
                contents: [{ parts: [{ text: user }] }],
                generationConfig: { temperature: 0.1 }
            })
        });

        if (!res.ok) throw new Error(`[IA] Error HTTP ${res.status}: ${await res.text()}`);
        const data = await res.json();
        return data.candidates[0].content.parts[0].text;
    }

    private async callClaude(system: string, user: string): Promise<string> {
        const url = 'https://api.anthropic.com/v1/messages';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: this.model,
                system: system,
                messages: [{ role: 'user', content: user }],
                temperature: 0.1,
                max_tokens: 4096
            })
        });

        if (!res.ok) throw new Error(`[IA] Error HTTP ${res.status}: ${await res.text()}`);
        const data = await res.json();
        return data.content[0].text;
    }
}
