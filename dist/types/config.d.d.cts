/**
 * Configuration options for the SDK.
 * @interface
 */
interface SDKConfig {
  /** API key for authentication */
  apiKey: string;
  /** Base URL for API requests */
  baseUrl?: string;
  /** Timeout for API requests in milliseconds */
  timeout?: number;
  /** API version to use */
  version?: string;
}

export type { SDKConfig };
