#!/usr/bin/env node

// Debug logging removed for production MCP deployment
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
  TextContent,
} = require("@modelcontextprotocol/sdk/types.js");
const fs = require('fs').promises;
const path = require('path');
// Define base paths for content.
/* In CommonJS, __filename and __dirname are available by default */

const CONTENT_BASE_PATH = path.join(__dirname, '..', 'content'); // Reverted to dynamic path
const SVELTEKIT_DOCS_PATH = path.join(CONTENT_BASE_PATH, 'docs', 'sveltekit');
const TAILWIND_DOCS_PATH = path.join(CONTENT_BASE_PATH, 'docs', 'tailwind');
const SNIPPETS_PATH = path.join(CONTENT_BASE_PATH, 'snippets');

const server = new Server(
  {
    name: "tailwind-svelte-assistant-mcp-server",
    version: "0.1.1", // Incremented version for testing restart
    description: "Provides SvelteKit and Tailwind CSS documentation and code snippets.",
  },
  {
    capabilities: {
      tools: {}, // Tools are dynamically listed
      resources: {}, // No static resources defined for now
      prompts: {}, // No prompts defined for now
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
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
              description: "The documentation topic (e.g., 'routing', 'hooks'). Corresponds to a filename without .md extension.",
            },
          },
          required: ["topic"],
        },
      },
      {
        name: "get_tailwind_info",
        description: "Get Tailwind CSS information for a specific query (e.g., class name or concept).",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The Tailwind CSS class or concept (e.g., 'padding', 'flexbox-alignment'). Corresponds to a filename without .md extension.",
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
              description: "The category of the component (e.g., 'headers', 'footers', 'faqs'). Corresponds to a sub-directory name.",
            },
            snippet_name: {
              type: "string",
              description: "The name of the specific snippet (e.g., 'default', 'accordion'). Corresponds to a filename without .svelte extension.",
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
              description: "The category name to list snippets for.",
            },
          },
          required: ["category"],
        },
      },
    ],
  };
});

async function listDirectoryContents(dirPath: string, fileExtension?: string): Promise<any> {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    let contentList: string[];
    if (fileExtension) {
      contentList = files
        .filter((dirent: any) => dirent.isFile() && dirent.name.endsWith(fileExtension))
        .map((dirent: any) => dirent.name.replace(fileExtension, ''));
    } else {
      contentList = files
        .filter((dirent: any) => dirent.isDirectory())
        .map((dirent: any) => dirent.name);
    }
    return { type: "text", text: contentList.join('\n') };
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // Return empty list if directory does not exist (prevents tool list failures)
      return { type: "text", text: "" };
    }
    // Log and return empty list for other errors to avoid timeouts
    console.error(`Error listing directory ${dirPath}:`, error);
    return { type: "text", text: "" };
  }
}

server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
  const args = request.params.arguments;
  let filePath: string = ''; // Declare filePath here to be accessible in catch

  try {
    switch (request.params.name) {
      case "get_sveltekit_doc": {
        if (!args || typeof args.topic !== 'string') {
           throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'topic' argument.");
         }
         filePath = path.join(SVELTEKIT_DOCS_PATH, `${args.topic}.md`);
         console.error(`[tailwind-svelte-assistant] Attempting to read SvelteKit doc from: ${filePath}`); // DEBUG LOG to stderr
         const content = await fs.readFile(filePath, 'utf-8');
         return { content: [{ type: "text", text: content }] };
      }

      case "get_tailwind_info": {
        if (!args || typeof args.query !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'query' argument.");
        }
        filePath = path.join(TAILWIND_DOCS_PATH, `${args.query}.md`);
        console.error(`[tailwind-svelte-assistant] Attempting to read Tailwind doc from: ${filePath}`); // DEBUG LOG to stderr
        const content = await fs.readFile(filePath, 'utf-8');
        return { content: [{ type: "text", text: content }] };
      }

      case "get_component_snippet": {
        if (!args || typeof args.component_category !== 'string' || typeof args.snippet_name !== 'string') {
           throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'component_category' or 'snippet_name' arguments.");
         }
         filePath = path.join(SNIPPETS_PATH, args.component_category, `${args.snippet_name}.svelte`);
         console.error(`[tailwind-svelte-assistant] Attempting to read snippet from: ${filePath}`); // DEBUG LOG to stderr
         const content = await fs.readFile(filePath, 'utf-8');
         return { content: [{ type: "text", text: content }] };
      }

      case "list_sveltekit_topics": {
        return { content: [await listDirectoryContents(SVELTEKIT_DOCS_PATH, '.md')] };
      }
      case "list_tailwind_info_topics": {
        return { content: [await listDirectoryContents(TAILWIND_DOCS_PATH, '.md')] };
      }
      case "list_snippet_categories": {
        return { content: [await listDirectoryContents(SNIPPETS_PATH)] };
      }
      case "list_snippets_in_category": {
        if (!args || typeof args.category !== 'string') {
          throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'category' argument.");
        }
        const categoryPath = path.join(SNIPPETS_PATH, args.category);
        return { content: [await listDirectoryContents(categoryPath, '.svelte')] };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
    }
  } catch (error: any) {
    if (error instanceof McpError) throw error; // Re-throw McpErrors directly
    if (error.code === 'ENOENT') { 
      throw new McpError(ErrorCode.InvalidRequest, `Content not found for tool ${request.params.name} with arguments: ${JSON.stringify(args)}. Attempted path: ${filePath || 'N/A for list ops'}`);
    }
    console.error(`Error processing tool ${request.params.name} (path: ${filePath || 'N/A for list ops'}):`, error);
    throw new McpError(ErrorCode.InternalError, `An unexpected error occurred while processing ${request.params.name} for path ${filePath || 'N/A for list ops'}: ${error.message}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  server.onerror = (error: any) => console.error('[MCP SERVER ERROR]', error);
  process.on('SIGINT', async () => {
    console.log("tailwind-svelte-assistant-mcp-server shutting down...");
    await server.close();
    process.exit(0);
  });
  await server.connect(transport);
  console.log("tailwind-svelte-assistant-mcp-server running on stdio");
}

main().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
