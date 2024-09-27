"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ChatGPT: () => chatgpt_default,
  MyAPISDK: () => MyAPISDK,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/services/chatgpt.ts
var import_axios = __toESM(require("axios"), 1);
var ChatGPT = class {
  /**
   * Creates an instance of ChatGPT service.
   * @param {SDKConfig} config - The configuration object for the service.
   */
  constructor(config) {
    this.client = import_axios.default.create({
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

// src/index.ts
var MyAPISDK = class {
  // /** Claude service instance */
  // claude: Claude;
  // /** DALL-E service instance */
  // dalle: DALLE;
  // /** DeepL service instance */
  // deepl: DeepL;
  // /** ElevenLabs service instance */
  // elevenlabs: ElevenLabs;
  // /** Gemini service instance */
  // gemini: Gemini;
  /**
   * Creates an instance of MyAPISDK.
   * @param {SDKConfig} config - The configuration object for the SDK.
   */
  constructor(config) {
    this.chatgpt = new chatgpt_default(config);
  }
};
var src_default = MyAPISDK;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatGPT,
  MyAPISDK
});
//# sourceMappingURL=index.cjs.js.map