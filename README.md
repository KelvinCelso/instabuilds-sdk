# Instabuilds SDK

A powerful session recording and user behavior tracking SDK for web applications. This SDK allows you to capture and analyze user interactions, errors, and session data in real-time.

## Features

- Session recording using rrweb
- User interaction tracking (clicks, form submissions, etc.)
- Error tracking
- Performance monitoring
- Rage click detection
- Automatic event batching and delivery

## Installation

```bash
npm install instabuilds-sdk
# or
yarn add instabuilds-sdk
```

## Quick Start

```typescript
import { init } from 'instabuilds-sdk';

// Initialize the SDK
const recorder = init({
  apiKey: 'your-api-key',
  backendUrl: 'https://your-backend-url',
  flushInterval: 5000 // Optional: Set custom flush interval in milliseconds
});

// The SDK will automatically start recording the session and tracking events
// No additional configuration needed!

// When you want to stop recording (optional)
import { destroy } from 'instabuilds-sdk';
destroy();
```

## Configuration Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| apiKey | string | Yes | - | Your API key for authentication |
| backendUrl | string | Yes | - | URL of your backend server |
| flushInterval | number | No | 5000 | Interval in milliseconds to flush events to the server |

## Events Tracked

The SDK automatically tracks the following events:

- Session start/end
- Page views
- Mouse movements
- Clicks and rage clicks
- Form interactions
- JavaScript errors
- Network errors
- Page load performance
- Custom events (coming soon)

## API Reference

### init(config)

Initializes the SDK and starts recording.

```typescript
interface SDKConfig {
  apiKey: string;
  backendUrl: string;
  flushInterval?: number;
}

function init(config: SDKConfig): SessionRecorder;
```

### destroy()

Stops recording and cleans up resources.

```typescript
function destroy(): void;
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC 