// src/services/chatgpt.ts
import axios from "axios";
var ChatGPT = class {
  /**
   * Creates an instance of ChatGPT service.
   * @param {SDKConfig} config - The configuration object for the service.
   */
  constructor(config) {
    this.client = axios.create({
      baseURL: config.baseUrl || "https://api.yourdomain.com",
      headers: {
        "Authorization": `Bearer ${config.apiKey}`,
        "Content-Type": "application/json"
      }
    });
  }
  /**
   * Sends a completion request to the ChatGPT API.
   * @param {ChatGPTInput} input - The input for the completion request.
   * @returns {Promise<ChatGPTResponse>} A promise that resolves to the ChatGPT API response.
   * @throws {Error} If there's an error with the API request.
   */
  async completion(input) {
    try {
      const response = await this.client.post("/api/v1/gpt/completion", input);
      return response.data;
    } catch (error) {
      throw new Error(`ChatGPT API Error: ${error.message}`);
    }
  }
  /**
   * Sends a single question to the ChatGPT API.
   * @param {string} question - The question to ask.
   * @param {ChatGPTInput['options']} [options] - Optional parameters for the request.
   * @returns {Promise<ChatGPTResponse>} A promise that resolves to the ChatGPT API response.
   * @throws {Error} If there's an error with the API request.
   */
  async ask(question, options) {
    return this.completion({ messages: [{ role: "user", content: question }], options });
  }
};
var chatgpt_default = ChatGPT;
export {
  chatgpt_default as default
};
//# sourceMappingURL=chatgpt.esm.js.map