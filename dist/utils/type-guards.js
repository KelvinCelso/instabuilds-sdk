"use strict";
// src/utils/type-guards.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChatGPTResponse = isChatGPTResponse;
function isChatGPTResponse(response) {
    return 'result' in response && typeof response.result === 'string';
}
// export function isClaudeResponse(response: any): response is ClaudeResponse {
//   // Implement Claude-specific checks
// }
// ... implement other type guards
//# sourceMappingURL=type-guards.js.map