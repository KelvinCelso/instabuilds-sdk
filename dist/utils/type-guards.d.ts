import { ChatGPTResponse } from '../types/api-responses.d.js';

declare function isChatGPTResponse(response: any): response is ChatGPTResponse;

export { isChatGPTResponse };
