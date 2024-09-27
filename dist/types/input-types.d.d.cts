// src/types/input-types.ts

/**
 * Represents the input for a ChatGPT API request.
 * @interface
 */
interface ChatGPTInput {
  /** Array of message objects representing the conversation */
  messages: Array<{
    /** The role of the message sender */
    role: 'user' | 'assistant' | 'system';
    /** The content of the message */
    content: string
  }>;
  /** Optional parameters for the API call */
  options?: {
    /** Controls randomness: 0.0 is deterministic, 1.0 is very random */
    temperature?: number;
    /** The maximum number of tokens to generate */
    max_tokens?: number;
    // Add other relevant options
  };
}


interface ClaudeInput {
  prompt: string;
  options?: {
    // Claude-specific options
  };
}

interface DALLEInput {
  prompt: string;
  options?: {
    size?: '256x256' | '512x512' | '1024x1024';
    n?: number;
  };
}

interface DeepLInput {
  text: string;
  target_lang: string;
  source_lang?: string;
}

interface ElevenLabsInput {
  text: string;
  voice_id?: string;
  options?: {
    stability?: number;
    similarity_boost?: number;
  };
}

interface GeminiInput {
  prompt: string;
  options?: {
    // Gemini-specific options
  };
}

export type { ChatGPTInput, ClaudeInput, DALLEInput, DeepLInput, ElevenLabsInput, GeminiInput };
