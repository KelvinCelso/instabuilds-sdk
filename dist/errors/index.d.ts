export declare class SDKError extends Error {
    constructor(message: string);
}
export declare class APIError extends SDKError {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare class NetworkError extends SDKError {
    constructor(message: string);
}
//# sourceMappingURL=index.d.ts.map