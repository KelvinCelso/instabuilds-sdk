'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { init, destroy } from './index';
import type { SessionRecorder } from './sessionRecorder';

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

const InstabuildContext = createContext<InstabuildContextType>({
  recorder: null,
  isInitialized: false,
});

export function useInstabuilds() {
  const context = useContext(InstabuildContext);
  if (!context) {
    throw new Error('useInstabuilds must be used within an InstabuildProvider');
  }
  return context;
}

interface InstabuildProviderProps {
  config: InstabuildConfig;
  children: React.ReactNode;
}

export function InstabuildProvider({ config, children }: InstabuildProviderProps) {
  const recorderRef = useRef<SessionRecorder | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    // Skip initialization if disabled
    if (config.disabled) {
      return;
    }

    // Skip if already initialized
    if (recorderRef.current) {
      return;
    }

    try {
      // Initialize the SDK
      recorderRef.current = init({
        apiKey: config.apiKey,
        backendUrl: config.backendUrl,
        flushInterval: config.flushInterval,
      });
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to initialize Instabuilds:', error);
    }

    // Cleanup on unmount
    return () => {
      if (recorderRef.current) {
        destroy();
        recorderRef.current = null;
        setIsInitialized(false);
      }
    };
  }, [
    config.apiKey,
    config.backendUrl,
    config.flushInterval,
    config.disabled,
  ]);

  const value = React.useMemo(
    () => ({
      recorder: recorderRef.current,
      isInitialized,
    }),
    [isInitialized]
  );

  return (
    <InstabuildContext.Provider value={value}>
      {children}
    </InstabuildContext.Provider>
  );
} 