"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStatefulServer = createStatefulServer;
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const express_1 = __importDefault(require("express"));
const node_crypto_1 = require("node:crypto");
const config_js_1 = require("../config.js");
/**
 * Creates a stateful server for handling MCP requests.
 * For every new session, we invoke createMcpServer to create a new instance of the server.
 * @param createMcpServer Function to create an MCP server
 * @returns Express app
 */
function createStatefulServer(createMcpServer) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Map to store transports by session ID
    const transports = {};
    // Handle POST requests for client-to-server communication
    app.post("/mcp", async (req, res) => {
        // Check for existing session ID
        const sessionId = req.headers["mcp-session-id"];
        let transport;
        if (sessionId && transports[sessionId]) {
            // Reuse existing transport
            transport = transports[sessionId];
        }
        else if (!sessionId && (0, types_js_1.isInitializeRequest)(req.body)) {
            // New initialization request
            const newSessionId = (0, node_crypto_1.randomUUID)();
            transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
                sessionIdGenerator: () => newSessionId,
                onsessioninitialized: (sessionId) => {
                    // Store the transport by session ID
                    transports[sessionId] = transport;
                },
            });
            // Clean up transport when closed
            transport.onclose = () => {
                if (transport.sessionId) {
                    delete transports[transport.sessionId];
                }
            };
            let config;
            try {
                config = (0, config_js_1.parseExpressRequestConfig)(req);
            }
            catch (error) {
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
            try {
                const server = createMcpServer({
                    sessionId: newSessionId,
                    config: config,
                });
                // Connect to the MCP server
                await server.connect(transport);
            }
            catch (error) {
                console.error("Error initializing server:", error);
                res.status(500).json({
                    jsonrpc: "2.0",
                    error: {
                        code: -32603,
                        message: "Error initializing server.",
                    },
                    id: null,
                });
                return;
            }
        }
        else {
            // Invalid request
            res.status(400).json({
                jsonrpc: "2.0",
                error: {
                    code: -32000,
                    message: "Bad Request: No valid session ID provided",
                },
                id: null,
            });
            return;
        }
        // Handle the request
        await transport.handleRequest(req, res, req.body);
    });
    // Reusable handler for GET and DELETE requests
    const handleSessionRequest = async (req, res) => {
        const sessionId = req.headers["mcp-session-id"];
        if (!sessionId || !transports[sessionId]) {
            res.status(400).send("Invalid or missing session ID");
            return;
        }
        const transport = transports[sessionId];
        await transport.handleRequest(req, res);
    };
    // Handle GET requests for server-to-client notifications via SSE
    app.get("/mcp", handleSessionRequest);
    // Handle DELETE requests for session termination
    app.delete("/mcp", handleSessionRequest);
    return { app };
}
