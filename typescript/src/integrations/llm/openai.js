"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIChatAdapter = void 0;
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
/**
 * Adapt an MCP client so it works seamlessly with OpenAI chat completions
 */
class OpenAIChatAdapter {
    constructor(client, options = {
        // Restriction enforced by OpenAI
        truncateDescriptionLength: 1024,
    }) {
        this.client = client;
        this.options = options;
    }
    async listTools() {
        const toolResult = await this.client.listTools();
        return toolResult.tools.map((tool) => ({
            type: "function",
            function: {
                name: tool.name,
                description: tool.description?.slice(0, this.options?.truncateDescriptionLength),
                parameters: tool.inputSchema,
                strict: this.options?.strict ?? false,
            },
        }));
    }
    // TODO: Support streaming
    async callTool(response, options) {
        if (response.choices.length !== 1) {
            // TODO: Support `n`
            throw new Error("Multiple choices not supported");
        }
        const choice = response.choices[0];
        if (!choice?.message?.tool_calls) {
            return [];
        }
        const toolCalls = choice.message.tool_calls;
        const results = await Promise.all(toolCalls.map(async (toolCall) => {
            return await this.client.callTool({
                name: toolCall.function.name,
                arguments: JSON.parse(toolCall.function.arguments),
            }, types_js_1.CallToolResultSchema, options);
        }));
        return results.map((result, index) => ({
            role: "tool",
            content: result.content,
            tool_call_id: toolCalls[index].id,
        }));
    }
}
exports.OpenAIChatAdapter = OpenAIChatAdapter;
