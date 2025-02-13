import { SessionRecorder } from './sessionRecorder';

interface SDKConfig {
  apiKey: string;
  backendUrl: string;
  flushInterval?: number;
}

let instance: SessionRecorder | null = null;

/**
 * Initializes the session recording SDK
 * @param config - Configuration object containing apiKey and backendUrl
 * @returns SessionRecorder instance
 */
export function init(config: SDKConfig): SessionRecorder {
  if (!instance) {
    instance = new SessionRecorder(config);
    instance.start();
  }
  return instance;
}

/**
 * Stops the session recording and cleans up resources
 */
export function destroy(): void {
  if (instance) {
    instance.stop();
    instance = null;
  }
}

export { SessionRecorder };
