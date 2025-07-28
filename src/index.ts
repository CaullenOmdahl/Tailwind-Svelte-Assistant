#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
  TextContent,
} from "@modelcontextprotocol/sdk/types.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Import our custom types and utilities
import {
  SvelteKitDocArgs,
  TailwindInfoArgs,
  ComponentSnippetArgs,
  ListSnippetsArgs,
  ServerConfig
} from './types.js';
import { validateToolInput } from './utils/security.js';
import { ErrorHandler, createAuditLog } from './utils/errorHandler.js';
import { SecureFileService } from './services/fileService.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server configuration with secure defaults
const CONFIG: ServerConfig = {
  contentBasePath: path.join(__dirname, '..', 'content'),
  svelteKitDocsPath: path.join(__dirname, '..', 'content', 'docs', 'sveltekit'),
  tailwindDocsPath: path.join(__dirname, '..', 'content', 'docs', 'tailwind'),
  snippetsPath: path.join(__dirname, '..', 'content', 'snippets'),
  maxFileSize: 1024 * 1024, // 1MB max file size
  cacheTimeout: 5 * 60 * 1000 // 5 minutes cache timeout
};

// Initialize secure file service
const fileService = new SecureFileService(CONFIG.maxFileSize, CONFIG.cacheTimeout);

// Create and configure MCP server
const server = new Server(
  {
    name: "tailwind-svelte-assistant-mcp-server",
    version: "0.1.1",
    description: "Provides SvelteKit and Tailwind CSS documentation and code snippets with enhanced security.",
  },
  {
    capabilities: {
      tools: {}, // Tools are dynamically listed
      resources: {}, // No static resources defined
      prompts: {}, // No prompts defined
    },
  }
);

/**
 * Enhanced tool definitions with improved validation and security
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  createAuditLog('info', 'list_tools_requested', { timestamp: new Date().toISOString() });
  
  return {
    tools: [
      {
        name: "get_sveltekit_doc",
        description: "Get SvelteKit documentation for a specific topic.",
        inputSchema: {
          type: "object",
          properties: {
            topic: {
              type: "string",
              description: "The documentation topic (e.g., 'routing', 'hooks'). Only alphanumeric characters, hyphens, underscores, and dots allowed.",
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              minLength: 1,
              maxLength: 50,
              examples: ["routing", "hooks", "load", "form-actions"]
            },
          },
          required: ["topic"],
        },
      },
      {
        name: "get_tailwind_info",
        description: "Get Tailwind CSS information for a specific query.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The Tailwind CSS class or concept. Only alphanumeric characters, hyphens, underscores, and dots allowed.",
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              minLength: 1,
              maxLength: 50,
              examples: ["padding", "flex", "grid-template-columns", "responsive-design"]
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_component_snippet",
        description: "Get a Svelte component code snippet for a specific UI element.",
        inputSchema: {
          type: "object",
          properties: {
            component_category: {
              type: "string",
              description: "The category of the component. Only alphanumeric characters, hyphens, underscores, and dots allowed.",
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              minLength: 1,
              maxLength: 30,
              examples: ["headers", "footers", "faqs", "forms"]
            },
            snippet_name: {
              type: "string",
              description: "The name of the specific snippet. Only alphanumeric characters, hyphens, underscores, and dots allowed.",
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              minLength: 1,
              maxLength: 50,
              examples: ["default", "accordion", "simple", "centered"]
            },
          },
          required: ["component_category", "snippet_name"],
        },
      },
      {
        name: "list_sveltekit_topics",
        description: "Lists available SvelteKit documentation topics.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "list_tailwind_info_topics",
        description: "Lists available Tailwind CSS documentation topics.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "list_snippet_categories",
        description: "Lists available component snippet categories.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "list_snippets_in_category",
        description: "Lists available snippets within a specified category.",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "The category name to list snippets for. Only alphanumeric characters, hyphens, underscores, and dots allowed.",
              pattern: "^[a-zA-Z0-9\\-_.]+$",
              minLength: 1,
              maxLength: 30,
            },
          },
          required: ["category"],
        },
      },
    ],
  };
});

/**
 * Enhanced request handler with comprehensive security and error handling
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments || {};
  
  // Log the request for audit purposes
  createAuditLog('info', 'tool_request', {
    tool: toolName,
    timestamp: new Date().toISOString(),
    argsProvided: Object.keys(args).length > 0
  });

  try {
    // Validate input parameters
    validateToolInput(toolName, args);

    switch (toolName) {
      case "get_sveltekit_doc": {
        const docArgs = args as unknown as SvelteKitDocArgs;
        const content = await fileService.readSecureFile(
          CONFIG.svelteKitDocsPath,
          docArgs.topic,
          '.md'
        );
        
        createAuditLog('info', 'sveltekit_doc_served', { topic: docArgs.topic });
        return { content: [{ type: "text", text: content }] };
      }

      case "get_tailwind_info": {
        const infoArgs = args as unknown as TailwindInfoArgs;
        const content = await fileService.readSecureFile(
          CONFIG.tailwindDocsPath,
          infoArgs.query,
          '.md'
        );
        
        createAuditLog('info', 'tailwind_info_served', { query: infoArgs.query });
        return { content: [{ type: "text", text: content }] };
      }

      case "get_component_snippet": {
        const snippetArgs = args as unknown as ComponentSnippetArgs;
        const categoryPath = path.join(CONFIG.snippetsPath, snippetArgs.component_category);
        const content = await fileService.readSecureFile(
          categoryPath,
          snippetArgs.snippet_name,
          '.svelte'
        );
        
        createAuditLog('info', 'component_snippet_served', {
          category: snippetArgs.component_category,
          snippet: snippetArgs.snippet_name
        });
        return { content: [{ type: "text", text: content }] };
      }

      case "list_sveltekit_topics": {
        const result = await fileService.listDirectoryContents(CONFIG.svelteKitDocsPath, '.md');
        createAuditLog('info', 'sveltekit_topics_listed', {});
        return result;
      }

      case "list_tailwind_info_topics": {
        const result = await fileService.listDirectoryContents(CONFIG.tailwindDocsPath, '.md');
        createAuditLog('info', 'tailwind_topics_listed', {});
        return result;
      }

      case "list_snippet_categories": {
        const result = await fileService.listDirectoryContents(CONFIG.snippetsPath);
        createAuditLog('info', 'snippet_categories_listed', {});
        return result;
      }

      case "list_snippets_in_category": {
        const listArgs = args as unknown as ListSnippetsArgs;
        const categoryPath = path.join(CONFIG.snippetsPath, listArgs.category);
        const result = await fileService.listDirectoryContents(categoryPath, '.svelte');
        
        createAuditLog('info', 'snippets_in_category_listed', { category: listArgs.category });
        return result;
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${toolName}`);
    }
  } catch (error: any) {
    // Log error for debugging
    createAuditLog('error', 'tool_request_failed', {
      tool: toolName,
      error: error.message,
      code: error.code
    });

    // Re-throw McpErrors directly, wrap others
    if (error instanceof McpError) {
      throw error;
    }
    
    throw new McpError(
      ErrorCode.InternalError,
      ErrorHandler.formatSafeErrorMessage(error, toolName)
    );
  }
});

/**
 * Server initialization and lifecycle management
 */
async function main(): Promise<void> {
  try {
    const transport = new StdioServerTransport();
    
    // Configure error handling
    server.onerror = (error: any) => {
      createAuditLog('error', 'mcp_server_error', {
        error: error.message,
        stack: error.stack
      });
    };

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      createAuditLog('info', 'server_shutdown_initiated', {});
      
      // Clear expired cache before shutdown
      fileService.clearExpiredCache();
      
      console.log("tailwind-svelte-assistant-mcp-server shutting down...");
      await server.close();
      process.exit(0);
    });

    // Start the server
    await server.connect(transport);
    
    createAuditLog('info', 'server_started', {
      version: "0.1.1",
      config: {
        maxFileSize: CONFIG.maxFileSize,
        cacheTimeout: CONFIG.cacheTimeout
      }
    });
    
    console.log("tailwind-svelte-assistant-mcp-server running on stdio");

    // Setup periodic cache cleanup
    setInterval(() => {
      fileService.clearExpiredCache();
    }, CONFIG.cacheTimeout);

  } catch (error) {
    createAuditLog('error', 'server_startup_failed', {
      error: error instanceof Error ? error.message : String(error)
    });
    
    console.error("Server failed to start:", error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  createAuditLog('error', 'unhandled_promise_rejection', {
    reason: String(reason),
    promise: String(promise)
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  createAuditLog('error', 'uncaught_exception', {
    error: error.message,
    stack: error.stack
  });
  process.exit(1);
});

// Start the server
main().catch((error) => {
  createAuditLog('error', 'main_function_failed', {
    error: error.message
  });
  console.error("Fatal error:", error);
  process.exit(1);
});
