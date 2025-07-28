import { ValidationResult } from '../types.js';
/**
 * Sanitizes and validates file paths to prevent directory traversal attacks
 * @param userInput - The user-provided path component
 * @param maxLength - Maximum allowed length for the input
 * @returns ValidationResult with sanitized path or error
 */
export declare function sanitizeAndValidatePath(userInput: string, maxLength?: number): ValidationResult;
/**
 * Validates that a resolved file path is within the allowed base directory
 * @param requestedPath - The full resolved path to validate
 * @param basePath - The base directory that should contain the file
 * @returns boolean indicating if path is safe
 */
export declare function isPathWithinBase(requestedPath: string, basePath: string): boolean;
/**
 * Validates tool input parameters with comprehensive checks
 * @param toolName - Name of the tool being called
 * @param args - Arguments provided to the tool
 * @throws McpError if validation fails
 */
export declare function validateToolInput(toolName: string, args: any): void;
//# sourceMappingURL=security.d.ts.map