// Configuration constants extracted from src/index.ts
import path from "node:path";
import { fileURLToPath } from "node:url";
// ESM-compatible __dirname
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
// Documentation directories (relative to project root)
export const sveltekitDocsDir = path.resolve(__dirname, "../../docs/svelte/documentation/docs/");
export const tailwindcssDocsDir = path.resolve(__dirname, "../../docs/tailwindcss.com/src/docs/");
// Valid Tailwind classes JSON filename
export const VALID_CLASSES_FILENAME = "valid_tailwind_classes.json";
// Build directory (for compiled assets)
export const buildDir = path.resolve(__dirname, "../../build");
