import { S as SessionRecorder } from './sessionRecorder-Cg0ae0QE.js';

interface SDKConfig {
    apiKey: string;
    backendUrl: string;
    flushInterval?: number;
}
/**
 * Initializes the session recording SDK
 * @param config - Configuration object containing apiKey and backendUrl
 * @returns SessionRecorder instance
 */
declare function init(config: SDKConfig): SessionRecorder;
/**
 * Stops the session recording and cleans up resources
 */
declare function destroy(): void;

export { SessionRecorder, destroy, init };
