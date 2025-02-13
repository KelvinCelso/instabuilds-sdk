interface SDKConfig {
    apiKey: string;
    backendUrl: string;
    flushInterval?: number;
}
declare class SessionRecorder {
    private readonly sessionId;
    private readonly config;
    private readonly sessionStart;
    private rrwebEvents;
    private stopRrweb?;
    private flushInterval?;
    private metadata;
    private sessionInitialized;
    constructor(config: SDKConfig);
    private getDeviceInfo;
    private getOS;
    private getBrowser;
    private initializeSession;
    start(): Promise<void>;
    private trackMetrics;
    private flush;
    stop(): void;
}

export { SessionRecorder as S };
