declare module 'instabuilds-sdk' {
  export interface SDKConfig {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
    version?: string;
  }

  export interface ChatGPTInput {
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
    options?: { temperature?: number; max_tokens?: number };
  }

  export interface ChatGPTResponse {
    result: string;
    usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
  }

  export class ChatGPT {
    constructor(config: SDKConfig);
    completion(input: ChatGPTInput): Promise<ChatGPTResponse>;
    ask(question: string, options?: ChatGPTInput['options']): Promise<ChatGPTResponse>;
  }

  export default class MyAPISDK {
    constructor(config: SDKConfig);
    chatgpt: ChatGPT;
  }
}
