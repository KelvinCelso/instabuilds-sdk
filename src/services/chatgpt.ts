import axios from 'axios';
import { AxiosInstance } from 'axios';

import { SDKConfig } from '../types/config';
import { ChatGPTInput } from '../types/input-types';
import { ChatGPTResponse } from '../types/api-responses';

/**
 * ChatGPT service class for interacting with the ChatGPT API.
 * @class
 */
class ChatGPT {
  /**
   * The Axios instance for making HTTP requests.
   * @private
   */
  private client: AxiosInstance;

  /**
   * Creates an instance of ChatGPT service.
   * @param {SDKConfig} config - The configuration object for the service.
   */
  constructor(config: SDKConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://api.yourdomain.com',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Sends a completion request to the ChatGPT API.
   * @param {ChatGPTInput} input - The input for the completion request.
   * @returns {Promise<ChatGPTResponse>} A promise that resolves to the ChatGPT API response.
   * @throws {Error} If there's an error with the API request.
   */
  async completion(input: ChatGPTInput): Promise<ChatGPTResponse> {
    try {
      const response = await this.client.post<ChatGPTResponse>('/api/v1/gpt/completion', input);
      return response.data;
    } catch (error) {
      throw new Error(`ChatGPT API Error: ${(error as Error).message}`);
    }
  }

  /**
   * Sends a single question to the ChatGPT API.
   * @param {string} question - The question to ask.
   * @param {ChatGPTInput['options']} [options] - Optional parameters for the request.
   * @returns {Promise<ChatGPTResponse>} A promise that resolves to the ChatGPT API response.
   * @throws {Error} If there's an error with the API request.
   */
  async ask(question: string, options?: ChatGPTInput['options']): Promise<ChatGPTResponse> {
    return this.completion({ messages: [{ role: 'user', content: question }], options });
  }
}

export default ChatGPT;