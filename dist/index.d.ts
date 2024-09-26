import ChatGPT from './services/chatgpt';
import { SDKConfig } from './types/config';
/**
 * The main class for interacting with various AI services.
 * @class
 */
declare class MyAPISDK {
    /** ChatGPT service instance */
    chatgpt: ChatGPT;
    /**
     * Creates an instance of MyAPISDK.
     * @param {SDKConfig} config - The configuration object for the SDK.
     */
    constructor(config: SDKConfig);
}
export default MyAPISDK;
export { ChatGPT, MyAPISDK };
//# sourceMappingURL=index.d.ts.map