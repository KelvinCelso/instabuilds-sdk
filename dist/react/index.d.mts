import React from 'react';
import { S as SessionRecorder } from '../sessionRecorder-Cg0ae0QE.mjs';

interface InstabuildConfig {
    apiKey: string;
    backendUrl: string;
    flushInterval?: number;
    disabled?: boolean;
}
interface InstabuildContextType {
    recorder: SessionRecorder | null;
    isInitialized: boolean;
}
declare function useInstabuilds(): InstabuildContextType;
interface InstabuildProviderProps {
    config: InstabuildConfig;
    children: React.ReactNode;
}
declare function InstabuildProvider({ config, children }: InstabuildProviderProps): React.JSX.Element;

export { InstabuildProvider, useInstabuilds };
