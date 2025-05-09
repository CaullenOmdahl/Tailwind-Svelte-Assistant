// Utility functions extracted from src/index.ts

import fs from "node:fs";
import path from "node:path";

// Recursively find all .md/.mdx files in a directory
export function findMarkdownFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMarkdownFiles(fullPath));
    } else if (
      entry.isFile() &&
      (fullPath.endsWith(".md") || fullPath.endsWith(".mdx"))
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

// Read file content safely
export function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

// Extract a snippet around the first match of the query (paragraph or ±3 lines)
export function extractSnippet(content: string, query: string): string | null {
  const lcContent = content.toLowerCase();
  const lcQuery = query.toLowerCase();
  const idx = lcContent.indexOf(lcQuery);
  if (idx === -1) return null;

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
export function searchDocs(files: string[], query: string, maxResults: number) {
  const results: { sourceFile: string; snippet: string; relevanceScore?: number }[] = [];
  for (const file of files) {
    const content = readFileContent(file);
    if (!content) continue;
    if (content.toLowerCase().includes(query.toLowerCase())) {
      const snippet = extractSnippet(content, query);
      if (snippet) {
        // Optional: simple relevance score (match count)
        const score =
          (content.match(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || [])
            .length;
        results.push({
          sourceFile: file,
          snippet,
          relevanceScore: score > 0 ? Math.min(1, score / 5) : undefined,
        });
        if (results.length >= maxResults) break;
      }
    }
  }
  return results;
}

/**
 * JSON Schema property definition for validation.
 */
interface JSONSchemaProperty {
  type?: string;
  enum?: unknown[];
}

/**
 * Minimal JSON Schema interface for validation.
 */
interface JSONSchema {
  required?: string[];
  properties: Record<string, JSONSchemaProperty>;
  additionalProperties?: boolean;
}

/**
 * Validates input arguments against a JSON schema.
 * Checks required fields, types, enums, and disallows extra properties.
 * @param schema - The JSON schema to validate against.
 * @param input - The input object to validate.
 * @throws Error if validation fails.
 */
export function validateInputStrict(schema: JSONSchema, input: Record<string, unknown>): void {
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
    const val = (input as Record<string, unknown>)[key];
    if (val === undefined) continue;
    if (
      prop.type &&
      typeof val !== prop.type &&
      !(prop.type === "integer" && typeof val === "number" && Number.isInteger(val))
    ) {
      throw new Error(`Field '${key}' must be of type ${prop.type}`);
    }
    if (prop.enum && Array.isArray(prop.enum) && !prop.enum.includes(val)) {
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