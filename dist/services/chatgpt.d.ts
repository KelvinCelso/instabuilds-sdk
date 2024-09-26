import { SDKConfig } from '../types/config';
import { ChatGPTInput } from '../types/input-types';
import { ChatGPTResponse } from '../types/api-responses';
/**
 * ChatGPT service class for interacting with the ChatGPT API.
 * @class
 */
declare class ChatGPT {
    /**
     * The Axios instance for making HTTP requests.
     * @private
     */
    private client;
    /**
     * Creates an instance of ChatGPT service.
     * @param {SDKConfig} config - The configuration object for the service.
     */
    constructor(config: SDKConfig);
    /**
     * Sends a completion request to the ChatGPT API.
     * @param {ChatGPTInput} input - The input for the completion request.
     * @returns {Promise<ChatGPTResponse>} A promise that resolves to the ChatGPT API response.
     * @throws {Error} If there's an error with the API request.
     */
    completion(input: ChatGPTInput): Promise<ChatGPTResponse>;
    /**
     * Sends a single question to the ChatGPT API.
     * @param {string} question - The question to ask.
     * @param {ChatGPTInput['options']} [options] - Optional parameters for the request.
     * @returns {Promise<ChatGPTResponse>} A promise that resolves to the ChatGPT API response.
     * @throws {Error} If there's an error with the API request.
     */
    ask(question: string, options?: ChatGPTInput['options']): Promise<ChatGPTResponse>;
}
export default ChatGPT;
//# sourceMappingURL=chatgpt.d.ts.map