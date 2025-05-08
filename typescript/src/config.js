"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSmitheryUrl = createSmitheryUrl;
exports.parseExpressRequestConfig = parseExpressRequestConfig;
/**
 * Creates a URL to connect to the Smithery MCP server.
 * @param baseUrl The base URL of the Smithery server
 * @param config Optional configuration object
 * @param apiKey API key for authentication. Required if using Smithery.
 * @returns A URL object with properly encoded parameters. Example: https://server.smithery.ai/{namespace}/mcp?config=BASE64_ENCODED_CONFIG&api_key=API_KEY
 */
function createSmitheryUrl(baseUrl, config, apiKey) {
    const url = new URL(`${baseUrl}/mcp`);
    if (config) {
        const param = typeof window !== "undefined"
            ? btoa(JSON.stringify(config))
            : Buffer.from(JSON.stringify(config)).toString("base64");
        url.searchParams.set("config", param);
    }
    if (apiKey) {
        url.searchParams.set("api_key", apiKey);
    }
    return url;
}
/**
 * Parses the config from an express request by checking the query parameter "config".
 * @param req The express request
 * @returns The config
 */
function parseExpressRequestConfig(req) {
    return JSON.parse(Buffer.from(req.query.config, "base64").toString());
}
