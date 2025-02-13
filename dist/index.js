"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRecorder = void 0;
exports.init = init;
exports.destroy = destroy;
const sessionRecorder_1 = require("./sessionRecorder");
Object.defineProperty(exports, "SessionRecorder", { enumerable: true, get: function () { return sessionRecorder_1.SessionRecorder; } });
let instance = null;
/**
 * Initializes the session recording SDK
 * @param config - Configuration object containing apiKey and backendUrl
 * @returns SessionRecorder instance
 */
function init(config) {
    if (!instance) {
        instance = new sessionRecorder_1.SessionRecorder(config);
        instance.start();
    }
    return instance;
}
/**
 * Stops the session recording and cleans up resources
 */
function destroy() {
    if (instance) {
        instance.stop();
        instance = null;
    }
}
