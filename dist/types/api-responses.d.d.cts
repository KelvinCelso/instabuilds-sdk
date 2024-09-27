// src/types/api-responses.ts

/**
 * Represents the response from the ChatGPT API.
 * @interface
 */
interface ChatGPTResponse {
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

interface ClaudeResponse {
  result: string;
  // Add any Claude-specific fields
}

interface DALLEResponse {
  result: string; // URL of the generated image
}

interface DeepLResponse {
  translation: string;
  source_lang: string;
  target_lang: string;
}

interface ElevenLabsResponse {
  audio_url: string;
  // Add any other relevant fields
}

interface GeminiResponse {
  result: string;
  // Add any Gemini-specific fields
}

export type { ChatGPTResponse, ClaudeResponse, DALLEResponse, DeepLResponse, ElevenLabsResponse, GeminiResponse };
