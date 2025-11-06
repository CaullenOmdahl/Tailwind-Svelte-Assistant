#!/usr/bin/env node

import { TextContent } from "@modelcontextprotocol/sdk/types.js";

// Type definitions for better type safety
export interface ToolRequest {
  params: {
    name: string;
    arguments?: Record<string, unknown>;
  };
}

export interface ContentResponse {
  content: TextContent[];
}

export interface SvelteKitDocArgs {
  topic: string;
}

export interface TailwindInfoArgs {
  query: string;
}

export interface ComponentSnippetArgs {
  component_category: string;
  snippet_name: string;
}

export interface ListSnippetsArgs {
  category: string;
}

export interface ValidationResult {
  isValid: boolean;
  sanitizedValue?: string;
  error?: string;
}

export interface CacheEntry {
  content: string;
  lastModified: number;
}

export interface ServerConfig {
  contentBasePath: string;
  svelteKitDocsPath: string;
  tailwindDocsPath: string;
  snippetsPath: string;
  svelteFullDocsPath: string;
  tailwindFullDocsPath: string;
  maxFileSize: number;
  cacheTimeout: number;
}

export interface SearchDocsArgs {
  query: string;
  limit?: number;
}