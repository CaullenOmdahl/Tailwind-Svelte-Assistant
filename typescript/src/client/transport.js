"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransport = createTransport;
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/client/streamableHttp.js");
const config_js_1 = require("../config.js");
/**
 * Creates a transport to connect to the Smithery server
 * @param baseUrl The URL of the Smithery server (without trailing slash or protocol)
 * @param config Config to pass to the server
 * @param apiKey Optional API key for authentication
 * @returns Transport
 */
function createTransport(baseUrl, config, apiKey) {
    return new streamableHttp_js_1.StreamableHTTPClientTransport((0, config_js_1.createSmitheryUrl)(`${baseUrl}`, config, apiKey));
}
