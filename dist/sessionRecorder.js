"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRecorder = void 0;
const rrweb_1 = __importDefault(require("rrweb"));
const uuid_1 = require("uuid");
class SessionRecorder {
    constructor(config) {
        this.rrwebEvents = [];
        this.sessionInitialized = false;
        this.sessionId = (0, uuid_1.v4)();
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
    }
    getDeviceInfo() {
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
    getOS(ua) {
        if (ua.includes('Windows'))
            return 'Windows';
        if (ua.includes('Mac OS'))
            return 'MacOS';
        if (ua.includes('Linux'))
            return 'Linux';
        if (ua.includes('Android'))
            return 'Android';
        if (ua.includes('iOS'))
            return 'iOS';
        return 'Unknown';
    }
    getBrowser(ua) {
        if (ua.includes('Chrome'))
            return 'Chrome';
        if (ua.includes('Firefox'))
            return 'Firefox';
        if (ua.includes('Safari'))
            return 'Safari';
        if (ua.includes('Edge'))
            return 'Edge';
        return 'Unknown';
    }
    initializeSession() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.config.backendUrl}/api/session/init`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        apiKey: this.config.apiKey,
                        sessionId: this.sessionId,
                        metadata: this.metadata,
                        startTime: this.sessionStart
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to initialize session');
                }
                this.sessionInitialized = true;
            }
            catch (error) {
                console.error('Failed to initialize session:', error);
                throw error;
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // Initialize session first
            yield this.initializeSession();
            // Start rrweb recording
            this.stopRrweb = rrweb_1.default.record({
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
        });
    }
    trackMetrics() {
        // Track key presses
        document.addEventListener('keydown', () => {
            this.metadata.metrics.keyPresses++;
        });
        // Track mouse clicks
        document.addEventListener('click', () => {
            this.metadata.metrics.mouseClicks++;
        });
    }
    flush(isFinal) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rrwebEvents.length === 0)
                return;
            // Update session duration
            this.metadata.metrics.sessionDuration =
                Math.floor((Date.now() - this.sessionStart) / 1000);
            const payload = {
                apiKey: this.config.apiKey,
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
                    navigator.sendBeacon(`${this.config.backendUrl}/api/session/events`, JSON.stringify(payload));
                }
                else {
                    // Regular flush using fetch
                    const response = yield fetch(`${this.config.backendUrl}/api/session/events`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    if (!response.ok) {
                        throw new Error('Failed to send events');
                    }
                }
            }
            catch (error) {
                console.error('Failed to send session data:', error);
                // Restore events if send failed
                this.rrwebEvents = [...eventsToSend, ...this.rrwebEvents];
            }
        });
    }
    stop() {
        if (this.stopRrweb) {
            this.stopRrweb();
            this.stopRrweb = undefined;
        }
        this.flush(true);
    }
}
exports.SessionRecorder = SessionRecorder;
