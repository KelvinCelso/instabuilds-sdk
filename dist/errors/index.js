"use strict";
// src/errors/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkError = exports.APIError = exports.SDKError = void 0;
class SDKError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SDKError';
    }
}
exports.SDKError = SDKError;
class APIError extends SDKError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'APIError';
    }
}
exports.APIError = APIError;
class NetworkError extends SDKError {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}
exports.NetworkError = NetworkError;
//# sourceMappingURL=index.js.map