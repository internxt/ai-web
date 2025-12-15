const AI_API_URL = import.meta.env.VITE_AI_SERVER_URL;
const AI_SYSTEM_PROMPT = import.meta.env.VITE_AI_SYSTEM_PROMPT;

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface ChatError {
  error: string;
  message?: string;
  retryAfter?: number;
}

export const aiService = {
  async chat(
    messages: Message[],
    options?: {
      max_tokens?: number;
      temperature?: number;
    },
  ): Promise<string> {
    try {
      const hasSystemMessage = messages.some(msg => msg.role === 'system');
      
      const finalMessages = hasSystemMessage ? messages : [
        { role: 'system' as const, content: AI_SYSTEM_PROMPT },
        ...messages
      ];

      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: finalMessages,
          max_tokens: options?.max_tokens || 4000,
          temperature: options?.temperature || 0.7,
        }),
      });

      if (!response.ok) {
        const error: ChatError = await response.json();
        throw new Error(error.message || error.error || 'AI request failed');
      }

      const data: ChatResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  },
};