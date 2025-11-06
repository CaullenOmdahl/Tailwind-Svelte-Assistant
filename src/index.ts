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
  SearchDocsArgs,
  ServerConfig
} from './types.js';
import { validateToolInput } from './utils/security.js';
import { ErrorHandler, createAuditLog } from './utils/errorHandler.js';
import { SecureFileService } from './services/fileService.js';

// No configSchema export - this server doesn't require user configuration
// Per Smithery docs: "If your server doesn't require configuration, simply omit the configSchema export entirely"

export default function createServer() {
  // Server configuration with secure defaults - using process.cwd() for Smithery compatibility
  const CONFIG: ServerConfig = {
    contentBasePath: path.join(process.cwd(), 'content'),
    svelteKitDocsPath: path.join(process.cwd(), 'content', 'docs', 'sveltekit'),
    tailwindDocsPath: path.join(process.cwd(), 'content', 'docs', 'tailwind'),
    snippetsPath: path.join(process.cwd(), 'content', 'snippets'),
    svelteFullDocsPath: path.join(process.cwd(), 'content', 'docs', 'svelte-sveltekit-full.txt'),
    tailwindFullDocsPath: path.join(process.cwd(), 'content', 'docs', 'tailwind-docs-full.txt'),
    maxFileSize: 3 * 1024 * 1024, // 3MB max file size (increased for full docs)
    cacheTimeout: 5 * 60 * 1000 // 5 minutes cache timeout
  };

  // Initialize secure file service
  const fileService = new SecureFileService(CONFIG.maxFileSize, CONFIG.cacheTimeout);

  const server = new McpServer({
    name: "tailwind-svelte-assistant-mcp-server",
    version: "0.1.6",
  });

  // Register resources for documentation
  server.registerResource(
    "svelte-docs",
    "docs://svelte-sveltekit-full",
    {
      name: "Complete Svelte and SvelteKit Documentation",
      description: "Full Svelte and SvelteKit documentation in LLM-optimized format (1MB)",
      mimeType: "text/plain"
    },
    async () => {
      const content = await fileService.readFullDocsFile(CONFIG.svelteFullDocsPath);
      return {
        text: content
      };
    }
  );

  server.registerResource(
    "tailwind-docs",
    "docs://tailwind-docs-full",
    {
      name: "Complete Tailwind CSS Documentation",
      description: "Full Tailwind CSS documentation extracted from GitHub (2.1MB, 249 files)",
      mimeType: "text/plain"
    },
    async () => {
      const content = await fileService.readFullDocsFile(CONFIG.tailwindFullDocsPath);
      return {
        text: content
      };
    }
  );

  server.registerResource(
    "content-summary",
    "docs://content-summary",
    {
      name: "Content Summary",
      description: "Summary of available documentation and snippets",
      mimeType: "application/json"
    },
    async () => {
      const summaryPath = path.join(CONFIG.contentBasePath, 'content-summary.json');
      try {
        const content = await fileService.readFullDocsFile(summaryPath);
        return {
          text: content
        };
      } catch (error) {
        return {
          text: JSON.stringify({
            error: "Content summary not available",
            message: "Run 'npm run update-content' to generate summary"
          }, null, 2)
        };
      }
    }
  );

  // Register prompts for common use cases
  server.registerPrompt(
    "search-svelte-routing",
    {
      title: "Search Svelte Routing Documentation",
      description: "Search the complete Svelte documentation for routing information",
      arguments: []
    },
    async () => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: "Search the Svelte documentation for information about routing and navigation. Use search_svelte_docs with query 'routing'."
        }
      }]
    })
  );

  server.registerPrompt(
    "get-tailwind-utilities",
    {
      title: "Get Tailwind CSS Utilities",
      description: "Get complete Tailwind CSS utility documentation",
      arguments: []
    },
    async () => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: "Get the complete Tailwind CSS documentation to explore all available utility classes. Use get_tailwind_full_docs."
        }
      }]
    })
  );

  server.registerPrompt(
    "find-component-snippet",
    {
      title: "Find Component Snippet",
      description: "Browse and find Svelte component code snippets",
      arguments: [{
        name: "category",
        description: "Component category (e.g., 'headers', 'heroes', 'forms')",
        required: false
      }]
    },
    async (args) => ({
      messages: [{
        role: "user",
        content: {
          type: "text",
          text: args.category
            ? `List available snippets in the '${args.category}' category using list_snippets_in_category.`
            : "List all available component categories using list_snippet_categories, then choose one to explore."
        }
      }]
    })
  );

  // Register tool: get_sveltekit_doc
  server.registerTool(
    "get_sveltekit_doc",
    {
      title: "Get SvelteKit Doc",
      description: "[LEGACY] Get SvelteKit documentation for a specific topic. NOTE: This tool only covers ~8% of SvelteKit docs. Use 'get_svelte_full_docs' for complete documentation coverage.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {
        topic: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(50)
          .describe("The documentation topic (e.g., 'routing', 'hooks'). Only alphanumeric characters, hyphens, underscores, and dots allowed"),
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
      description: "[LEGACY] Get Tailwind CSS information for a specific query. NOTE: This tool only covers ~4% of Tailwind docs. Use 'get_tailwind_full_docs' for complete documentation coverage.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {
        query: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(50)
          .describe("The Tailwind CSS class or concept. Only alphanumeric characters, hyphens, underscores, and dots allowed"),
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
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {
        component_category: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(30)
          .describe("The category of the component. Only alphanumeric characters, hyphens, underscores, and dots allowed"),
        snippet_name: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(50)
          .describe("The name of the specific snippet. Only alphanumeric characters, hyphens, underscores, and dots allowed"),
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
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
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
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
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
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
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
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {
        category: z.string()
          .regex(/^[a-zA-Z0-9\-_.]+$/, "Only alphanumeric characters, hyphens, underscores, and dots allowed")
          .min(1)
          .max(30)
          .describe("The category name to list snippets for. Only alphanumeric characters, hyphens, underscores, and dots allowed"),
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

  // Register tool: get_svelte_full_docs
  server.registerTool(
    "get_svelte_full_docs",
    {
      title: "Get Complete Svelte Documentation",
      description: "Get the complete Svelte and SvelteKit documentation (1MB, 100% coverage). This is the recommended way to access Svelte docs, as it includes all topics in a single LLM-optimized file.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {}
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'get_svelte_full_docs',
          timestamp: new Date().toISOString(),
          argsProvided: false
        });

        const content = await fileService.readFullDocsFile(CONFIG.svelteFullDocsPath);

        createAuditLog('info', 'svelte_full_docs_served', { size: content.length });
        return {
          content: [{
            type: "text" as const,
            text: content
          }]
        };
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'get_svelte_full_docs',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'get_svelte_full_docs')
        );
      }
    }
  );

  // Register tool: get_tailwind_full_docs
  server.registerTool(
    "get_tailwind_full_docs",
    {
      title: "Get Complete Tailwind Documentation",
      description: "Get the complete Tailwind CSS documentation (2.1MB, 249 files, 100% coverage). This is the recommended way to access Tailwind docs, as it includes all utility classes and concepts in a single LLM-optimized file.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {}
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'get_tailwind_full_docs',
          timestamp: new Date().toISOString(),
          argsProvided: false
        });

        const content = await fileService.readFullDocsFile(CONFIG.tailwindFullDocsPath);

        createAuditLog('info', 'tailwind_full_docs_served', { size: content.length });
        return {
          content: [{
            type: "text" as const,
            text: content
          }]
        };
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'get_tailwind_full_docs',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'get_tailwind_full_docs')
        );
      }
    }
  );

  // Register tool: search_svelte_docs
  server.registerTool(
    "search_svelte_docs",
    {
      title: "Search Svelte Documentation",
      description: "Search within the complete Svelte and SvelteKit documentation for specific topics or keywords.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {
        query: z.string()
          .min(2)
          .max(100)
          .describe("The search query (e.g., 'routing', 'load function', 'hooks')"),
        limit: z.number()
          .int()
          .min(1)
          .max(20)
          .optional()
          .describe("Maximum number of results to return (default: 5)")
      }
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'search_svelte_docs',
          timestamp: new Date().toISOString(),
          argsProvided: true
        });

        const content = await fileService.readFullDocsFile(CONFIG.svelteFullDocsPath);
        const results = fileService.searchDocsContent(
          content,
          request.query,
          request.limit || 5
        );

        createAuditLog('info', 'svelte_docs_searched', {
          query: request.query,
          resultsCount: results.length
        });

        return {
          content: [{
            type: "text" as const,
            text: results.join('\n\n')
          }]
        };
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'search_svelte_docs',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'search_svelte_docs')
        );
      }
    }
  );

  // Register tool: search_tailwind_docs
  server.registerTool(
    "search_tailwind_docs",
    {
      title: "Search Tailwind Documentation",
      description: "Search within the complete Tailwind CSS documentation for specific utility classes or concepts.",
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true
      },
      inputSchema: {
        query: z.string()
          .min(2)
          .max(100)
          .describe("The search query (e.g., 'padding', 'flex', 'dark mode')"),
        limit: z.number()
          .int()
          .min(1)
          .max(20)
          .optional()
          .describe("Maximum number of results to return (default: 5)")
      }
    },
    async (request) => {
      try {
        createAuditLog('info', 'tool_request', {
          tool: 'search_tailwind_docs',
          timestamp: new Date().toISOString(),
          argsProvided: true
        });

        const content = await fileService.readFullDocsFile(CONFIG.tailwindFullDocsPath);
        const results = fileService.searchDocsContent(
          content,
          request.query,
          request.limit || 5
        );

        createAuditLog('info', 'tailwind_docs_searched', {
          query: request.query,
          resultsCount: results.length
        });

        return {
          content: [{
            type: "text" as const,
            text: results.join('\n\n')
          }]
        };
      } catch (error: any) {
        createAuditLog('error', 'tool_request_failed', {
          tool: 'search_tailwind_docs',
          error: error.message,
          code: error.code
        });

        if (error instanceof McpError) {
          throw error;
        }

        throw new McpError(
          ErrorCode.InternalError,
          ErrorHandler.formatSafeErrorMessage(error, 'search_tailwind_docs')
        );
      }
    }
  );

  return server.server;
}
