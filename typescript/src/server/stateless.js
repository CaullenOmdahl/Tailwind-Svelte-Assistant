"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStatelessServer = createStatelessServer;
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const express_1 = __importDefault(require("express"));
const config_js_1 = require("../config.js");
/**
 * Creates a stateless server for handling MCP requests
 * In stateless mode, each request creates a new server and transport instance
 * @param createMcpServer Function to create an MCP server
 * @returns Express app
 */
function createStatelessServer(createMcpServer) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.post("/mcp", async (req, res) => {
        // In stateless mode, create a new instance of transport and server for each request
        // to ensure complete isolation. A single instance would cause request ID collisions
        // when multiple clients connect concurrently.
        try {
            // Parse base64 encoded config from URL query parameter if present
            let config = {};
            if (req.query.config) {
                try {
                    config = (0, config_js_1.parseExpressRequestConfig)(req);
                }
                catch (configError) {
                    res.status(400).json({
                        jsonrpc: "2.0",
                        error: {
                            code: -32000,
                            message: "Bad Request: Invalid configuration",
                        },
                        id: null,
                    });
                    return;
                }
            }
            // Create a new server instance with config
            const server = createMcpServer({ config: config });
            // Create a new transport instance
            const transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
                sessionIdGenerator: undefined,
            });
            // Clean up resources when the request ends
            res.on("close", () => {
                transport.close();
                server.close();
            });
            // Connect the server to the transport
            await server.connect(transport);
            // Handle the incoming request
            await transport.handleRequest(req, res, req.body);
        }
        catch (error) {
            console.error("Error handling MCP request:", error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: "2.0",
                    error: {
                        code: -32603,
                        message: "Internal server error",
                    },
                    id: null,
                });
            }
        }
    });
    app.get("/mcp", async (req, res) => {
        console.log("Received GET MCP request");
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed in stateless mode",
            },
            id: null,
        }));
    });
    app.delete("/mcp", async (req, res) => {
        console.log("Received DELETE MCP request");
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed in stateless mode",
            },
            id: null,
        }));
    });
    return { app };
}
