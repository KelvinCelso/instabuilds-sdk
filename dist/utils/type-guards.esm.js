// src/utils/type-guards.ts
function isChatGPTResponse(response) {
  return "result" in response && typeof response.result === "string";
}
export {
  isChatGPTResponse
};
//# sourceMappingURL=type-guards.esm.js.map