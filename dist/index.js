"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAPISDK = exports.ChatGPT = void 0;
const chatgpt_1 = __importDefault(require("./services/chatgpt"));
exports.ChatGPT = chatgpt_1.default;
/**
 * The main class for interacting with various AI services.
 * @class
 */
class MyAPISDK {
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
        this.chatgpt = new chatgpt_1.default(config);
        // this.claude = new Claude(config);
        // this.dalle = new DALLE(config);
        // this.deepl = new DeepL(config);
        // this.elevenlabs = new ElevenLabs(config);
        // this.gemini = new Gemini(config);
    }
}
exports.MyAPISDK = MyAPISDK;
exports.default = MyAPISDK;
//# sourceMappingURL=index.js.map