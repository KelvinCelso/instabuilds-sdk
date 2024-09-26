// src/types/api-responses.ts

/**
 * Represents the response from the ChatGPT API.
 * @interface
 */
export interface ChatGPTResponse {
  /** The generated text response */
  result: string;
  /** Usage statistics for the API call */
  usage?: {
    /** Number of tokens in the prompt */
    prompt_tokens: number;
    /** Number of tokens in the completion */
    completion_tokens: number;
    /** Total number of tokens used */
    total_tokens: number;
  };
}

export interface ClaudeResponse {
  result: string;
  // Add any Claude-specific fields
}

export interface DALLEResponse {
  result: string; // URL of the generated image
}

export interface DeepLResponse {
  translation: string;
  source_lang: string;
  target_lang: string;
}

export interface ElevenLabsResponse {
  audio_url: string;
  // Add any other relevant fields
}

export interface GeminiResponse {
  result: string;
  // Add any Gemini-specific fields
}