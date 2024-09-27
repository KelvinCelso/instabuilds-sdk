declare class SDKError extends Error {
    constructor(message: string);
}
declare class APIError extends SDKError {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
declare class NetworkError extends SDKError {
    constructor(message: string);
}

export { APIError, NetworkError, SDKError };
