export interface EventDetails {
  type: string;
  details: object;
  timestamp: number;
}

export class EventManager {
  private events: EventDetails[] = [];

  /**
   * Records an event by pushing it to the events array.
   * @param type - The type/name of the event.
   * @param details - Additional details related to the event.
   */
  public recordEvent(type: string, details: object) {
    this.events.push({ type, details, timestamp: Date.now() });
  }

  /**
   * Retrieves and clears the recorded events.
   * @returns An array of recorded events.
   */
  public flushEvents(): EventDetails[] {
    const flushedEvents = [...this.events];
    this.events = [];
    return flushedEvents;
  }

  /**
   * Gets the current number of recorded events.
   * @returns The number of events.
   */
  public getEventCount(): number {
    return this.events.length;
  }
}

/**
 * Initializes event tracking by setting up all necessary event listeners.
 * @param eventManager - The instance of EventManager to record events.
 */
export function initEventTracking(eventManager: EventManager) {
  const loadStartTime: number = Date.now();
  const clickTimestamps: number[] = [];
  const rageClickThreshold: number = 5; // Number of clicks
  const rageClickTimeFrame: number = 1000; // Time frame in ms

  // Record session_start event
  eventManager.recordEvent('session_start', {
    timestamp: loadStartTime,
  });

  // Capture load time for slow_load event
  window.addEventListener('load', () => {
    const loadTime = Date.now() - loadStartTime;
    if (loadTime > 5000) { // Threshold set to 5000 ms (5 seconds)
      eventManager.recordEvent('slow_load', {
        loadTime,
        threshold: 5000,
      });
    }
  });

  // Capture mouse movements
  window.addEventListener('mousemove', (e) => {
    eventManager.recordEvent('mousemove', { x: e.clientX, y: e.clientY });
  });

  // Capture clicks with rage_click detection
  window.addEventListener('click', (e) => {
    eventManager.recordEvent('click', { x: e.clientX, y: e.clientY });

    const currentTime = Date.now();
    clickTimestamps.push(currentTime);

    // Remove clicks outside the timeframe
    while (clickTimestamps.length && currentTime - clickTimestamps[0] > rageClickTimeFrame) {
      clickTimestamps.shift();
    }

    if (clickTimestamps.length >= rageClickThreshold) {
      eventManager.recordEvent('rage_click', {
        count: clickTimestamps.length,
        timeframe: rageClickTimeFrame,
      });

      // Reset click timestamps after detection
      clickTimestamps.length = 0;
    }
  });

  // Capture scroll events
  window.addEventListener('scroll', () => {
    eventManager.recordEvent('scroll', { scrollY: window.scrollY });
  });

  // Capture pageview events on DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    eventManager.recordEvent('pageview', { url: window.location.href });
  });

  // Capture pageleave events and send remaining events
  window.addEventListener('beforeunload', () => {
    eventManager.recordEvent('pageleave', { url: window.location.href });
  });

  // Capture input events
  window.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    eventManager.recordEvent('input', {
      tag: target.tagName,
      id: target.id,
      class: target.className,
      value: (target as any).value,
    });
  });

  // Capture change events
  window.addEventListener('change', (e) => {
    const target = e.target as HTMLElement;
    eventManager.recordEvent('change', {
      tag: target.tagName,
      id: target.id,
      class: target.className,
      value: (target as any).value,
    });
  });

  // Capture form_submit events
  window.addEventListener('submit', (e) => {
    const target = e.target as HTMLFormElement;
    eventManager.recordEvent('form_submit', {
      formId: target.id || null,
      formClass: target.className || null,
      action: target.action || null,
    });
  });

  // Capture JavaScript errors
  window.addEventListener('error', (event) => {
    eventManager.recordEvent('error', {
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error ? event.error.stack : null,
    });
  });

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    eventManager.recordEvent('unhandledrejection', {
      reason: event.reason instanceof Error ? event.reason.message : event.reason,
      promise: event.promise,
    });
  });
} 