// src/errors/index.ts

export class SDKError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SDKError';
  }
}

export class APIError extends SDKError {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends SDKError {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}