// HTTP server logic for Tailwind Svelte Assistant MCP

import { createServer } from "http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { TOOLS, handleToolCall } from "./tools/index.js";
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
  const server = createServer((req, res) => {
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
          // Only allow known tool names
          const validTools = [
            "validate_tailwind_classes",
            "get_documentation_snippet",
            "get_svelte_component_template",
            "explain_development_concept"
          ] as const;
          type ToolName = typeof validTools[number];

          if (!validTools.includes(tool as ToolName)) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Unknown tool" }));
            return;
          }

          const result = handleToolCall(tool as ToolName, args, {
            validTailwindClassesData: validTailwindClassesData ?? { exactClasses: [], arbitraryValueStems: [], responsivePrefixes: [], statePrefixes: [], colorNames: [], colorShades: [] },
            validTailwindClassesLoadError: validTailwindClassesLoadError ?? "",
          });
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ result }));
        } catch (err) {
          const errorMsg =
            err instanceof Error ? err.message : String(err);
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