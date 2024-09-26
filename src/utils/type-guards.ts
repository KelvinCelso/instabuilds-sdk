// src/utils/type-guards.ts

import { ChatGPTResponse, ClaudeResponse /* ... */ } from '../types/api-responses';

export function isChatGPTResponse(response: any): response is ChatGPTResponse {
  return 'result' in response && typeof response.result === 'string';
}

// export function isClaudeResponse(response: any): response is ClaudeResponse {
//   // Implement Claude-specific checks
// }

// ... implement other type guards