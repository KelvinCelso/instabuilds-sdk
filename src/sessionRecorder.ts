import * as rrweb from 'rrweb';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

interface SDKConfig {
  apiKey: string;
  backendUrl: string;
  flushInterval?: number;
}

interface SessionMetadata {
  origin: string;
  device: {
    type: string;
    os: string;
    browser: string;
    screenSize: {
      width: number;
      height: number;
    };
  };
  metrics: {
    keyPresses: number;
    mouseClicks: number;
    sessionDuration: number;
  };
}

export class SessionRecorder {
  private readonly sessionId: string;
  private readonly config: SDKConfig;
  private readonly sessionStart: number;
  private rrwebEvents: any[] = [];
  private stopRrweb?: () => void;
  private flushInterval?: number;
  private metadata: SessionMetadata;
  private sessionInitialized: boolean = false;
  private axiosInstance;

  constructor(config: SDKConfig) {
    this.sessionId = uuidv4();
    this.config = config;
    this.flushInterval = config.flushInterval || 5000;
    this.sessionStart = Date.now();
    this.metadata = {
      origin: window.location.origin,
      device: this.getDeviceInfo(),
      metrics: {
        keyPresses: 0,
        mouseClicks: 0,
        sessionDuration: 0
      }
    };

    this.axiosInstance = axios.create({
      baseURL: this.config.backendUrl,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.config.apiKey
      }
    });
  }

  private getDeviceInfo() {
    const ua = navigator.userAgent;
    const mobile = /Mobile|Android|iPhone|iPad|iPod/i.test(ua);

    return {
      type: mobile ? 'mobile' : 'desktop',
      os: this.getOS(ua),
      browser: this.getBrowser(ua),
      screenSize: {
        width: window.screen.width,
        height: window.screen.height
      }
    };
  }

  private getOS(ua: string): string {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac OS')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private getBrowser(ua: string): string {
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private async initializeSession(): Promise<void> {
    try {
      const response = await this.axiosInstance.post('/api/sessions/init', {
        sessionId: this.sessionId,
        metadata: this.metadata,
        startTime: this.sessionStart
      });

      if (response.status !== 200) {
        throw new Error('Failed to initialize session');
      }

      this.sessionInitialized = true;
    } catch (error) {
      console.error('Failed to initialize session:', error);
      throw error;
    }
  }

  public async start(): Promise<void> {
    // Initialize session first
    await this.initializeSession();

    // Start rrweb recording
    this.stopRrweb = rrweb.record({
      emit: event => {
        this.rrwebEvents.push(event);

        // If buffer gets too large, flush immediately
        if (this.rrwebEvents.length >= 100) {
          this.flush(false);
        }
      }
    });

    // Track metrics
    this.trackMetrics();

    // Start flush interval
    setInterval(() => this.flush(false), this.flushInterval);

    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.stop();
    });
  }

  private trackMetrics(): void {
    // Track key presses
    document.addEventListener('keydown', () => {
      this.metadata.metrics.keyPresses++;
    });

    // Track mouse clicks
    document.addEventListener('click', () => {
      this.metadata.metrics.mouseClicks++;
    });
  }

  private async flush(isFinal: boolean): Promise<void> {
    if (this.rrwebEvents.length === 0) return;

    this.metadata.metrics.sessionDuration =
      Math.floor((Date.now() - this.sessionStart) / 1000);

    const payload = {
      sessionId: this.sessionId,
      metadata: this.metadata,
      events: [...this.rrwebEvents],
      isFinal
    };

    const eventsToSend = [...this.rrwebEvents];
    this.rrwebEvents = [];

    try {
      if (isFinal) {
        // For final flush, use sendBeacon to ensure delivery
        const blob = new Blob([JSON.stringify(payload)], {
          type: 'application/json',
        });
        navigator.sendBeacon(
          `${this.config.backendUrl}/api/sessions/events`,
          blob
        );
      } else {
        const response = await this.axiosInstance.post('/api/sessions/events', payload);

        if (response.status !== 200) {
          throw new Error('Failed to send events');
        }
      }
    } catch (error) {
      console.error('Failed to send session data:', error);
      this.rrwebEvents = [...eventsToSend, ...this.rrwebEvents];
    }
  }

  public stop(): void {
    if (this.stopRrweb) {
      this.stopRrweb();
      this.stopRrweb = undefined;
    }
    this.flush(true);
  }
} 