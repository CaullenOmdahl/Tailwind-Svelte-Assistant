import path from 'path';
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ValidationResult } from '../types.js';

/**
 * Sanitizes and validates file paths to prevent directory traversal attacks
 * @param userInput - The user-provided path component
 * @param maxLength - Maximum allowed length for the input
 * @returns ValidationResult with sanitized path or error
 */
export function sanitizeAndValidatePath(
  userInput: string, 
  maxLength: number = 100
): ValidationResult {
  // Check if input exists and is a string
  if (!userInput || typeof userInput !== 'string') {
    return {
      isValid: false,
      error: 'Input must be a non-empty string'
    };
  }

  // Check length constraints
  if (userInput.length > maxLength) {
    return {
      isValid: false,
      error: `Input exceeds maximum length of ${maxLength} characters`
    };
  }

  // Remove any path traversal attempts
  const normalized = path.normalize(userInput).replace(/^(\.\.[\\/\\])+/, '');
  
  // Check for remaining dangerous patterns
  if (normalized.includes('..') || 
      normalized.includes('/') || 
      normalized.includes('\\') ||
      normalized.includes('\0')) {
    return {
      isValid: false,
      error: 'Invalid characters detected in path'
    };
  }

  // Allow only alphanumeric characters, hyphens, underscores, and dots
  const allowedPattern = /^[a-zA-Z0-9\-_.]+$/;
  if (!allowedPattern.test(normalized)) {
    return {
      isValid: false,
      error: 'Path contains invalid characters. Only alphanumeric, hyphens, underscores, and dots are allowed'
    };
  }

  return {
    isValid: true,
    sanitizedValue: normalized
  };
}

/**
 * Validates that a resolved file path is within the allowed base directory
 * @param requestedPath - The full resolved path to validate
 * @param basePath - The base directory that should contain the file
 * @returns boolean indicating if path is safe
 */
export function isPathWithinBase(requestedPath: string, basePath: string): boolean {
  const resolvedBase = path.resolve(basePath);
  const resolvedRequested = path.resolve(requestedPath);
  
  return resolvedRequested.startsWith(resolvedBase + path.sep) ||
         resolvedRequested === resolvedBase;
}

/**
 * Validates tool input parameters with comprehensive checks
 * @param toolName - Name of the tool being called
 * @param args - Arguments provided to the tool
 * @throws McpError if validation fails
 */
export function validateToolInput(toolName: string, args: any): void {
  if (!args || typeof args !== 'object') {
    throw new McpError(ErrorCode.InvalidParams, `Invalid arguments for tool ${toolName}`);
  }

  switch (toolName) {
    case 'get_sveltekit_doc':
      validateSvelteKitDocArgs(args);
      break;
    case 'get_tailwind_info':
      validateTailwindInfoArgs(args);
      break;
    case 'get_component_snippet':
      validateComponentSnippetArgs(args);
      break;
    case 'list_snippets_in_category':
      validateListSnippetsArgs(args);
      break;
    default:
      // For list operations without parameters, no validation needed
      break;
  }
}

function validateSvelteKitDocArgs(args: any): void {
  if (!args.topic || typeof args.topic !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'topic' argument");
  }

  const validation = sanitizeAndValidatePath(args.topic, 50);
  if (!validation.isValid) {
    throw new McpError(ErrorCode.InvalidParams, `Invalid topic: ${validation.error}`);
  }
}

function validateTailwindInfoArgs(args: any): void {
  if (!args.query || typeof args.query !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'query' argument");
  }

  const validation = sanitizeAndValidatePath(args.query, 50);
  if (!validation.isValid) {
    throw new McpError(ErrorCode.InvalidParams, `Invalid query: ${validation.error}`);
  }
}

function validateComponentSnippetArgs(args: any): void {
  if (!args.component_category || typeof args.component_category !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'component_category' argument");
  }

  if (!args.snippet_name || typeof args.snippet_name !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'snippet_name' argument");
  }

  const categoryValidation = sanitizeAndValidatePath(args.component_category, 30);
  if (!categoryValidation.isValid) {
    throw new McpError(ErrorCode.InvalidParams, `Invalid component_category: ${categoryValidation.error}`);
  }

  const snippetValidation = sanitizeAndValidatePath(args.snippet_name, 50);
  if (!snippetValidation.isValid) {
    throw new McpError(ErrorCode.InvalidParams, `Invalid snippet_name: ${snippetValidation.error}`);
  }
}

function validateListSnippetsArgs(args: any): void {
  if (!args.category || typeof args.category !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "Missing or invalid 'category' argument");
  }

  const validation = sanitizeAndValidatePath(args.category, 30);
  if (!validation.isValid) {
    throw new McpError(ErrorCode.InvalidParams, `Invalid category: ${validation.error}`);
  }
}