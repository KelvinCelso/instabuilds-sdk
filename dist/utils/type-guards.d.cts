import { ChatGPTResponse } from '../types/api-responses.d.cjs';

declare function isChatGPTResponse(response: any): response is ChatGPTResponse;

export { isChatGPTResponse };
