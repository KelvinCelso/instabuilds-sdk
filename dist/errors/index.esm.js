// src/errors/index.ts
var SDKError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "SDKError";
  }
};
var APIError = class extends SDKError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
  }
};
var NetworkError = class extends SDKError {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
};
export {
  APIError,
  NetworkError,
  SDKError
};
//# sourceMappingURL=index.esm.js.map