"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapErrorAdapter = wrapErrorAdapter;
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
/**
 * Wraps each tool call so any errors get sent back to the LLM instead of throwing
 */
function wrapErrorAdapter(client) {
    const callTool = client.callTool.bind(client);
    client.callTool = async (params, resultSchema = types_js_1.CallToolResultSchema, options) => {
        try {
            return await callTool(params, resultSchema, options);
        }
        catch (err) {
            console.error("Tool calling error:", err);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(err, Object.getOwnPropertyNames(err)),
                    },
                ],
                isError: true,
            };
        }
    };
    return client;
}
