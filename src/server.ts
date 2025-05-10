// HTTP server logic for Tailwind Svelte Assistant MCP

import { createServer } from "http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { tools as toolRegistry, masterHandleToolCall, toolDefinitions, ToolContext } from "./tools/index.js"; // Updated imports
import { VALID_CLASSES_FILENAME, buildDir } from "./config/index.js";
import { ValidTailwindClassesData } from "./tailwind-class-validator.js";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load valid Tailwind classes JSON at startup
let validTailwindClassesData: ValidTailwindClassesData | null = null;
let validTailwindClassesLoadError: string | null = null;

const candidatePaths = [
  path.resolve(__dirname, "./valid_tailwind_classes.json"),
  path.resolve(buildDir, VALID_CLASSES_FILENAME)
];

for (const candidate of candidatePaths) {
  try {
    if (fs.existsSync(candidate)) {
      const raw = fs.readFileSync(candidate, "utf8");
      validTailwindClassesData = JSON.parse(raw) as ValidTailwindClassesData;
      break;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    validTailwindClassesLoadError = `Failed to load valid Tailwind classes from ${candidate}: ${msg}`;
  }
}
if (!validTailwindClassesData && !validTailwindClassesLoadError) {
  validTailwindClassesLoadError = `Could not find ${VALID_CLASSES_FILENAME} in build or src directory.`;
}

// Minimal MCP server implementation
export function startServer() {
  const server = createServer(async (req, res) => { // Added async here
    if (req.method === "GET" && req.url === "/list-tools") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ tools: toolDefinitions })); // Use toolDefinitions
      return;
    }
    if (req.method === "POST" && req.url === "/call-tool") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => { // Added async here
        try {
          let parsed: unknown;
          try {
            parsed = JSON.parse(body);
          } catch {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON" }));
            return;
          }

          if (
            typeof parsed !== "object" ||
            parsed === null ||
            !("tool" in parsed) ||
            !("args" in parsed)
          ) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Malformed request body" }));
            return;
          }

          const { tool, args } = parsed as { tool: string; args: unknown };
          
          // Validate tool name against registered tools
          if (!toolRegistry[tool as keyof typeof toolRegistry]) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: `Unknown tool: ${tool}` }));
            return;
          }
          
          const toolContext: ToolContext = {
            validTailwindClassesData: validTailwindClassesData ?? { 
              exactClasses: [], 
              arbitraryValueStems: [], 
              responsivePrefixes: [], 
              statePrefixes: [], 
              colorNames: [], 
              colorShades: [] 
            }, // Ensure default matches ValidTailwindClassesData structure (arrays)
            validTailwindClassesLoadError: validTailwindClassesLoadError ?? "Default: Tailwind class data not loaded.",
          };

          try {
            const result = await masterHandleToolCall(tool, args, toolContext); // Use masterHandleToolCall
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ result }));
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            // Log server-side error for debugging
            console.error(`Error calling tool ${tool}:`, err);
            res.writeHead(500, { "Content-Type": "application/json" }); // Use 500 for server errors
            res.end(JSON.stringify({ error: `Tool execution failed: ${errorMsg}` }));
          }
        } catch (err) { // This catch is for JSON.parse or body read errors
          const errorMsg = err instanceof Error ? err.message : String(err);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: errorMsg }));
        }
      });
      return;
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
     
    console.log(
      `Tailwind Svelte Assistant MCP server running on port ${PORT}` +
        (validTailwindClassesLoadError
          ? ` (WARNING: ${validTailwindClassesLoadError})`
          : "")
    );
  });
}
