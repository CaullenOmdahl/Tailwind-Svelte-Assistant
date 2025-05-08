// HTTP server logic for Tailwind Svelte Assistant MCP
import { createServer } from "http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { TOOLS, handleToolCall } from "./tools/index.js";
import { VALID_CLASSES_FILENAME, buildDir } from "./config/index.js";
// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load valid Tailwind classes JSON at startup
let validTailwindClassesData = null;
let validTailwindClassesLoadError = null;
const candidatePaths = [
    path.resolve(__dirname, "./valid_tailwind_classes.json"),
    path.resolve(buildDir, VALID_CLASSES_FILENAME)
];
for (const candidate of candidatePaths) {
    try {
        if (fs.existsSync(candidate)) {
            const raw = fs.readFileSync(candidate, "utf8");
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
export function startServer() {
    const server = createServer(async (req, res) => {
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
                    let parsed;
                    try {
                        parsed = JSON.parse(body);
                    }
                    catch (err) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Invalid JSON" }));
                        return;
                    }
                    if (typeof parsed !== "object" ||
                        parsed === null ||
                        !("tool" in parsed) ||
                        !("args" in parsed)) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Malformed request body" }));
                        return;
                    }
                    const { tool, args } = parsed;
                    // Only allow known tool names
                    const validTools = [
                        "validate_tailwind_classes",
                        "get_documentation_snippet",
                        "get_svelte_component_template",
                        "explain_development_concept"
                    ];
                    if (!validTools.includes(tool)) {
                        res.writeHead(400, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ error: "Unknown tool" }));
                        return;
                    }
                    const result = handleToolCall(tool, args, {
                        validTailwindClassesData: validTailwindClassesData ?? {},
                        validTailwindClassesLoadError: validTailwindClassesLoadError ?? "",
                    });
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ result }));
                }
                catch (err) {
                    const errorMsg = err && typeof err === "object" && "message" in err
                        ? err.message
                        : String(err);
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
        // eslint-disable-next-line no-console
        console.log(`Tailwind Svelte Assistant MCP server running on port ${PORT}` +
            (validTailwindClassesLoadError
                ? ` (WARNING: ${validTailwindClassesLoadError})`
                : ""));
    });
}
