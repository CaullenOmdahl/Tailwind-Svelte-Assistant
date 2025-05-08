"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicChatAdapter = void 0;
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
/**
 * Adapt an MCP client so it works seamlessly with Anthropic messages
 */
class AnthropicChatAdapter {
    constructor(client) {
        this.client = client;
    }
    async listTools() {
        const toolResult = await this.client.listTools();
        return toolResult.tools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            input_schema: tool.inputSchema,
        }));
    }
    // TODO: Support streaming
    async callTool(response, options) {
        const content = response.content;
        if (!content || content.length === 0) {
            return [];
        }
        // Find tool calls in the message content
        const toolCalls = content.filter((part) => part.type === "tool_use");
        if (toolCalls.length === 0) {
            return [];
        }
        // Run parallel tool call
        const results = await Promise.all(toolCalls.map(async (toolCall) => {
            return await this.client.callTool({
                name: toolCall.name,
                arguments: toolCall.input,
            }, types_js_1.CallToolResultSchema, options);
        }));
        return [
            {
                role: "user",
                content: results.map((result, index) => ({
                    tool_use_id: toolCalls[index].id,
                    type: "tool_result",
                    // TODO: Find a way to remove the any
                    content: result.content.filter((part) => part.type === "text"),
                    is_error: Boolean(result.isError),
                })),
            },
        ];
    }
}
exports.AnthropicChatAdapter = AnthropicChatAdapter;
