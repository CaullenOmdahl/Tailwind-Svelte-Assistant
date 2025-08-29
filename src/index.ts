import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import path from 'path';
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

// Import our existing types and utilities
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

// Configuration schema for smithery.yaml
export const configSchema = z.object({});

export default function createServer({
  config,
}: {
  config: z.infer<typeof configSchema>;
}) {
  // Server configuration with secure defaults - using process.cwd() for Smithery compatibility
  const CONFIG: ServerConfig = {
    contentBasePath: path.join(process.cwd(), 'content'),
    svelteKitDocsPath: path.join(process.cwd(), 'content', 'docs', 'sveltekit'),
    tailwindDocsPath: path.join(process.cwd(), 'content', 'docs', 'tailwind'),
    snippetsPath: path.join(process.cwd(), 'content', 'snippets'),
    maxFileSize: 1024 * 1024, // 1MB max file size
    cacheTimeout: 5 * 60 * 1000 // 5 minutes cache timeout
  };

  // Initialize secure file service
  const fileService = new SecureFileService(CONFIG.maxFileSize, CONFIG.cacheTimeout);

  const server = new McpServer({
    name: "tailwind-svelte-assistant-mcp-server",
    version: "0.1.1",
  });

  // Register tool: get_sveltekit_doc
  server.registerTool(
    "get_sveltekit_doc",
    {
      title: "Get SvelteKit Doc",
      description: "Get SvelteKit documentation for a specific topic.",
      inputSchema: {
        topic: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(50)
          .describe("The documentation topic (e.g., 'routing', 'hooks'). Only alphanumeric characters, hyphens, underscores, and dots allowed."),
      }
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'get_sveltekit_doc',
          timestamp: new Date().toISOString(),
          argsProvided: true
        });

        validateToolInput('get_sveltekit_doc', request);
        const content = await fileService.readSecureFile(
          CONFIG.svelteKitDocsPath,
          request.topic,
          '.md'
        );
        
        createAuditLog('info', 'sveltekit_doc_served', { topic: request.topic });
        return {
          content: [{
            type: "text" as const,
            text: content
          }]
        };
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'get_sveltekit_doc',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'get_sveltekit_doc')
        );
      }
    }
  );

  // Register tool: get_tailwind_info
  server.registerTool(
    "get_tailwind_info",
    {
      title: "Get Tailwind Info",
      description: "Get Tailwind CSS information for a specific query.",
      inputSchema: {
        query: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(50)
          .describe("The Tailwind CSS class or concept. Only alphanumeric characters, hyphens, underscores, and dots allowed."),
      }
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'get_tailwind_info',
          timestamp: new Date().toISOString(),
          argsProvided: true
        });

        validateToolInput('get_tailwind_info', request);
        const content = await fileService.readSecureFile(
          CONFIG.tailwindDocsPath,
          request.query,
          '.md'
        );
        
        createAuditLog('info', 'tailwind_info_served', { query: request.query });
        return {
          content: [{
            type: "text" as const,
            text: content
          }]
        };
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'get_tailwind_info',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'get_tailwind_info')
        );
      }
    }
  );

  // Register tool: get_component_snippet
  server.registerTool(
    "get_component_snippet",
    {
      title: "Get Component Snippet",
      description: "Get a Svelte component code snippet for a specific UI element.",
      inputSchema: {
        component_category: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(30)
          .describe("The category of the component. Only alphanumeric characters, hyphens, underscores, and dots allowed."),
        snippet_name: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(50)
          .describe("The name of the specific snippet. Only alphanumeric characters, hyphens, underscores, and dots allowed."),
      }
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'get_component_snippet',
          timestamp: new Date().toISOString(),
          argsProvided: true
        });

        validateToolInput('get_component_snippet', request);
        const categoryPath = path.join(CONFIG.snippetsPath, request.component_category);
        const content = await fileService.readSecureFile(
          categoryPath,
          request.snippet_name,
          '.svelte'
        );
        
        createAuditLog('info', 'component_snippet_served', {
          category: request.component_category,
          snippet: request.snippet_name
        });
        return {
          content: [{
            type: "text" as const,
            text: content
          }]
        };
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'get_component_snippet',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'get_component_snippet')
        );
      }
    }
  );

  // Register tool: list_sveltekit_topics
  server.registerTool(
    "list_sveltekit_topics",
    {
      title: "List SvelteKit Topics",
      description: "Lists available SvelteKit documentation topics.",
      inputSchema: {}
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'list_sveltekit_topics',
          timestamp: new Date().toISOString(),
          argsProvided: false
        });

        const result = await fileService.listDirectoryContents(CONFIG.svelteKitDocsPath, '.md');
        createAuditLog('info', 'sveltekit_topics_listed', {});
        return result;
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'list_sveltekit_topics',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'list_sveltekit_topics')
        );
      }
    }
  );

  // Register tool: list_tailwind_info_topics
  server.registerTool(
    "list_tailwind_info_topics",
    {
      title: "List Tailwind Info Topics",
      description: "Lists available Tailwind CSS documentation topics.",
      inputSchema: {}
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'list_tailwind_info_topics',
          timestamp: new Date().toISOString(),
          argsProvided: false
        });

        const result = await fileService.listDirectoryContents(CONFIG.tailwindDocsPath, '.md');
        createAuditLog('info', 'tailwind_topics_listed', {});
        return result;
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'list_tailwind_info_topics',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'list_tailwind_info_topics')
        );
      }
    }
  );

  // Register tool: list_snippet_categories
  server.registerTool(
    "list_snippet_categories",
    {
      title: "List Snippet Categories",
      description: "Lists available component snippet categories.",
      inputSchema: {}
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'list_snippet_categories',
          timestamp: new Date().toISOString(),
          argsProvided: false
        });

        const result = await fileService.listDirectoryContents(CONFIG.snippetsPath);
        createAuditLog('info', 'snippet_categories_listed', {});
        return result;
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'list_snippet_categories',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'list_snippet_categories')
        );
      }
    }
  );

  // Register tool: list_snippets_in_category
  server.registerTool(
    "list_snippets_in_category",
    {
      title: "List Snippets In Category",
      description: "Lists available snippets within a specified category.",
      inputSchema: {
        category: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(30)
          .describe("The category name to list snippets for. Only alphanumeric characters, hyphens, underscores, and dots allowed."),
      }
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'list_snippets_in_category',
          timestamp: new Date().toISOString(),
          argsProvided: true
        });

        validateToolInput('list_snippets_in_category', request);
        const categoryPath = path.join(CONFIG.snippetsPath, request.category);
        const result = await fileService.listDirectoryContents(categoryPath, '.svelte');
        
        createAuditLog('info', 'snippets_in_category_listed', { category: request.category });
        return result;
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'list_snippets_in_category',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }
        
        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'list_snippets_in_category')
        );
      }
    }
  );

  return server.server;
}
