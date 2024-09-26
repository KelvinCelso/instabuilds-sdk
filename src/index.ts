
// import Claude from './services/claude';
// import DALLE from './services/dalle';
// import DeepL from './services/deepl';
// import ElevenLabs from './services/elevenlabs';
// import Gemini from './services/gemini';
import ChatGPT from './services/chatgpt';
import { SDKConfig } from './types/config';

/**
 * The main class for interacting with various AI services.
 * @class
 */
class MyAPISDK {
  /** ChatGPT service instance */
  chatgpt: ChatGPT;
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
  constructor(config: SDKConfig) {
    this.chatgpt = new ChatGPT(config);
    // this.claude = new Claude(config);
    // this.dalle = new DALLE(config);
    // this.deepl = new DeepL(config);
    // this.elevenlabs = new ElevenLabs(config);
    // this.gemini = new Gemini(config);
  }
}

export default MyAPISDK;

export { ChatGPT, MyAPISDK }