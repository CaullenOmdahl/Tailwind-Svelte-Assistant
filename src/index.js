"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// MCP server entrypoint for Tailwind Svelte Assistant
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = require("node:url");
// ESM-compatible __dirname
const __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
const __dirname = node_path_1.default.dirname(__filename);
const tailwind_class_validator_1 = require("../../tailwind-class-validator");
// --- DynamicDocumentationSnippetRetriever: Helper functions and schema ---
// Input schema for get_documentation_snippet
const getDocumentationSnippetInputSchema = {
    type: "object",
    title: "DynamicDocumentationSnippetRetrieverInput",
    properties: {
        search_query: {
            type: "string",
            description: "Keywords or a phrase describing the documentation topic to search for (e.g., 'SvelteKit data loading', 'Tailwind CSS responsive design', 'flex justify').",
        },
        source: {
            type: "string",
            enum: ["sveltekit", "tailwindcss", "all"],
            default: "all",
            description: "Specify which documentation source to search: 'sveltekit', 'tailwindcss', or 'all'.",
        },
        max_results: {
            type: "integer",
            minimum: 1,
            maximum: 10,
            default: 3,
            description: "The maximum number of relevant snippets to return.",
        },
    },
    required: ["search_query"],
    additionalProperties: false,
};
// Documentation directories (relative to src/index.ts)
const sveltekitDocsDir = node_path_1.default.resolve(__dirname, "../../docs/svelte/documentation/docs/");
const tailwindcssDocsDir = node_path_1.default.resolve(__dirname, "../../docs/tailwindcss.com/src/docs/");
// Recursively find all .md/.mdx files in a directory
function findMarkdownFiles(dir) {
    let results = [];
    if (!node_fs_1.default.existsSync(dir))
        return results;
    for (const entry of node_fs_1.default.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = node_path_1.default.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(findMarkdownFiles(fullPath));
        }
        else if (entry.isFile() &&
            (fullPath.endsWith(".md") || fullPath.endsWith(".mdx"))) {
            results.push(fullPath);
        }
    }
    return results;
}
// Read file content safely
function readFileContent(filePath) {
    try {
        return node_fs_1.default.readFileSync(filePath, "utf8");
    }
    catch {
        return "";
    }
}
// Extract a snippet around the first match of the query (paragraph or ±3 lines)
function extractSnippet(content, query) {
    const lcContent = content.toLowerCase();
    const lcQuery = query.toLowerCase();
    const idx = lcContent.indexOf(lcQuery);
    if (idx === -1)
        return null;
    // Try to extract the paragraph containing the match
    const before = content.lastIndexOf("\n\n", idx);
    const after = content.indexOf("\n\n", idx);
    if (before !== -1 && after !== -1) {
        return content.slice(before + 2, after).trim();
    }
    // Fallback: ±3 lines around the match
    const lines = content.split("\n");
    let lineNum = 0, charCount = 0;
    for (let i = 0; i < lines.length; ++i) {
        charCount += lines[i].length + 1;
        if (charCount > idx) {
            lineNum = i;
            break;
        }
    }
    const start = Math.max(0, lineNum - 3);
    const end = Math.min(lines.length, lineNum + 4);
    return lines.slice(start, end).join("\n").trim();
}
// Search for query in a list of files, return up to maxResults snippets
function searchDocs(files, query, maxResults) {
    const results = [];
    for (const file of files) {
        const content = readFileContent(file);
        if (!content)
            continue;
        if (content.toLowerCase().includes(query.toLowerCase())) {
            const snippet = extractSnippet(content, query);
            if (snippet) {
                // Optional: simple relevance score (match count)
                const score = (content.match(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || [])
                    .length;
                results.push({
                    sourceFile: file,
                    snippet,
                    relevanceScore: score > 0 ? Math.min(1, score / 5) : undefined,
                });
                if (results.length >= maxResults)
                    break;
            }
        }
    }
    return results;
}
// Tool input schema (from Architect)
const validateTailwindClassesInputSchema = {
    type: "object",
    title: "TailwindCSSClassValidatorInput",
    properties: {
        classes_string: {
            type: "string",
            description: "A string containing Tailwind CSS classes separated by spaces (e.g., 'text-red-500 font-bold md:text-lg invalid-class p-2 p-4 text-[12px]').",
        },
    },
    required: ["classes_string"],
    additionalProperties: false,
};
// Load valid Tailwind classes JSON at startup
let validTailwindClassesData = null;
let validTailwindClassesLoadError = null;
const VALID_CLASSES_FILENAME = "valid_tailwind_classes.json";
// Try to load from build directory (alongside compiled index.js)
const buildDir = node_path_1.default.resolve(__dirname, "..", "build");
const candidatePaths = [node_path_1.default.join(buildDir, VALID_CLASSES_FILENAME)];
for (const candidate of candidatePaths) {
    try {
        if (node_fs_1.default.existsSync(candidate)) {
            const raw = node_fs_1.default.readFileSync(candidate, "utf8");
            validTailwindClassesData = JSON.parse(raw);
            break;
        }
    }
    catch (err) {
        validTailwindClassesLoadError = `Failed to load valid Tailwind classes from ${candidate}: ${err.message}`;
    }
}
if (!validTailwindClassesData && !validTailwindClassesLoadError) {
    validTailwindClassesLoadError = `Could not find ${VALID_CLASSES_FILENAME} in build or src directory.`;
}
// Minimal MCP server implementation
const http_1 = require("http");
const TOOLS = [
    {
        name: "validate_tailwind_classes",
        description: "Validate a string of Tailwind CSS classes. Returns which classes are valid, invalid, and suggestions if available.",
        inputSchema: validateTailwindClassesInputSchema,
    },
    // Add get_documentation_snippet tool
    {
        name: "get_documentation_snippet",
        description: "Retrieve relevant documentation snippets from local SvelteKit and Tailwind CSS docs based on a search query. Specify the source and max results.",
        inputSchema: getDocumentationSnippetInputSchema,
    },
];
/**
 * Validates input arguments against a JSON schema.
 * Checks required fields, types, enums, and disallows extra properties.
 * @param schema - The JSON schema to validate against.
 * @param input - The input object to validate.
 * @throws Error if validation fails.
 */
function validateInputStrict(schema, input) {
    if (typeof input !== "object" || input === null) {
        throw new Error("Input must be an object.");
    }
    // Check required fields
    if (Array.isArray(schema.required)) {
        for (const req of schema.required) {
            if (!(req in input)) {
                throw new Error(`Missing required field: ${req}`);
            }
        }
    }
    // Check types and enums
    for (const key in schema.properties) {
        const prop = schema.properties[key];
        const val = input[key];
        if (val === undefined)
            continue;
        if (prop.type && typeof val !== prop.type && !(prop.type === "integer" && Number.isInteger(val))) {
            throw new Error(`Field '${key}' must be of type ${prop.type}`);
        }
        if (prop.enum && !prop.enum.includes(val)) {
            throw new Error(`Field '${key}' must be one of: ${prop.enum.join(", ")}`);
        }
    }
    // Disallow additional properties
    if (schema.additionalProperties === false) {
        for (const key in input) {
            if (!(key in schema.properties)) {
                throw new Error(`Unexpected property: ${key}`);
            }
        }
    }
}
/**
 * Handles a tool call by validating input and executing the tool logic.
 * @param tool - The tool name.
 * @param args - The tool arguments.
 * @returns The tool result.
 */
function handleToolCall(tool, args) {
    if (tool === "validate_tailwind_classes") {
        validateInputStrict(validateTailwindClassesInputSchema, args);
        if (!validTailwindClassesData) {
            return {
                error: {
                    code: "DataUnavailable",
                    message: validTailwindClassesLoadError || "Tailwind class data not loaded.",
                },
            };
        }
        try {
            return (0, tailwind_class_validator_1.validateTailwindClasses)(args.classes_string, validTailwindClassesData);
        }
        catch (err) {
            return {
                error: {
                    code: "InternalError",
                    message: "Validation failed: " + (err.message || String(err)),
                },
            };
        }
    }
    if (tool === "get_documentation_snippet") {
        validateInputStrict(getDocumentationSnippetInputSchema, args);
        const source = args.source || "all";
        const maxResults = typeof args.max_results === "number"
            ? Math.max(1, Math.min(10, args.max_results))
            : 3;
        let files = [];
        try {
            if (source === "sveltekit") {
                files = findMarkdownFiles(sveltekitDocsDir);
            }
            else if (source === "tailwindcss") {
                files = findMarkdownFiles(tailwindcssDocsDir);
            }
            else {
                files = [
                    ...findMarkdownFiles(sveltekitDocsDir),
                    ...findMarkdownFiles(tailwindcssDocsDir),
                ];
            }
        }
        catch (err) {
            return {
                error: {
                    code: "FileSystemError",
                    message: "Failed to read documentation files: " + (err.message || String(err)),
                },
            };
        }
        if (!files.length) {
            return {
                error: {
                    code: "NoDocsFound",
                    message: "No documentation files found for the selected source.",
                },
            };
        }
        try {
            const results = searchDocs(files, args.search_query, maxResults);
            return { results };
        }
        catch (err) {
            return {
                error: {
                    code: "SearchError",
                    message: "Failed to search documentation: " + (err.message || String(err)),
                },
            };
        }
    }
    return {
        error: {
            code: "UnknownTool",
            message: `Unknown tool: ${tool}`,
        },
    };
}
// Simple HTTP API for MCP protocol (POST /call-tool, GET /list-tools)
const server = (0, http_1.createServer)(async (req, res) => {
    if (req.method === "GET" && req.url === "/list-tools") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ tools: TOOLS }));
        return;
    }
    if (req.method === "POST" && req.url === "/call-tool") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            try {
                const { tool, args } = JSON.parse(body);
                const result = handleToolCall(tool, args);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ result }));
            }
            catch (err) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Tailwind Svelte Assistant MCP server running on port ${PORT}` +
        (validTailwindClassesLoadError
            ? ` (WARNING: ${validTailwindClassesLoadError})`
            : ""));
});
