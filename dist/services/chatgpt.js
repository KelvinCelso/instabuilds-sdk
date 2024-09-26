"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
/**
 * ChatGPT service class for interacting with the ChatGPT API.
 * @class
 */
class ChatGPT {
    /**
     * Creates an instance of ChatGPT service.
     * @param {SDKConfig} config - The configuration object for the service.
     */
    constructor(config) {
        this.client = axios_1.default.create({
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
    completion(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.client.post('/api/v1/gpt/completion', input);
                return response.data;
            }
            catch (error) {
                throw new Error(`ChatGPT API Error: ${error.message}`);
            }
        });
    }
    /**
     * Sends a single question to the ChatGPT API.
     * @param {string} question - The question to ask.
     * @param {ChatGPTInput['options']} [options] - Optional parameters for the request.
     * @returns {Promise<ChatGPTResponse>} A promise that resolves to the ChatGPT API response.
     * @throws {Error} If there's an error with the API request.
     */
    ask(question, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completion({ messages: [{ role: 'user', content: question }], options });
        });
    }
}
exports.default = ChatGPT;
//# sourceMappingURL=chatgpt.js.map