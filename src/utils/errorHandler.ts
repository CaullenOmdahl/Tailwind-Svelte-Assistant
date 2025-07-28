import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * Centralized error handling for file system operations
 */
export class ErrorHandler {
  /**
   * Handles file system errors with proper classification and security-conscious messaging
   * @param error - The original error object
   * @param operation - Description of the operation that failed
   * @param toolName - Name of the tool where error occurred
   * @returns Never - always throws an McpError
   */
  static handleFileSystemError(error: any, operation: string, toolName: string): never {
    // Log internal error details for debugging (without exposing to client)
    console.error(`FileSystem error in ${toolName}:${operation}:`, {
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString()
    });

    switch (error.code) {
      case 'ENOENT':
        throw new McpError(
          ErrorCode.InvalidRequest, 
          `Requested content not found for ${toolName}`
        );
      
      case 'EACCES':
        throw new McpError(
          ErrorCode.InternalError, 
          `Access denied while processing ${toolName}`
        );
      
      case 'EMFILE':
      case 'ENFILE':
        throw new McpError(
          ErrorCode.InternalError, 
          `System resource limit reached while processing ${toolName}`
        );
      
      case 'EISDIR':
        throw new McpError(
          ErrorCode.InvalidRequest, 
          `Invalid content type requested for ${toolName}`
        );
        
      case 'ENOTDIR':
        throw new McpError(
          ErrorCode.InvalidRequest, 
          `Invalid path structure for ${toolName}`
        );
        
      default:
        throw new McpError(
          ErrorCode.InternalError, 
          `An unexpected error occurred while processing ${toolName}`
        );
    }
  }

  /**
   * Handles directory listing errors with appropriate fallbacks
   * @param error - The original error object
   * @param dirPath - The directory path that failed (for logging only)
   * @returns Empty result instead of throwing
   */
  static handleDirectoryListingError(error: any, dirPath: string): { type: "text"; text: string } {
    console.error(`Directory listing error for ${dirPath}:`, {
      code: error.code,
      message: error.message,
      timestamp: new Date().toISOString()
    });

    // Return empty list for directory listing failures to prevent tool list failures
    return { type: "text", text: "" };
  }

  /**
   * Validates file size before processing
   * @param filePath - Path to the file
   * @param stats - File stats object
   * @param maxSize - Maximum allowed file size in bytes
   * @throws McpError if file is too large
   */
  static validateFileSize(filePath: string, stats: any, maxSize: number = 1024 * 1024): void {
    if (stats.size > maxSize) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `File too large. Maximum size allowed: ${Math.round(maxSize / 1024)}KB`
      );
    }
  }

  /**
   * Safely formats error messages without exposing sensitive information
   * @param error - The error to format
   * @param context - Additional context for the error
   * @returns Formatted error message
   */
  static formatSafeErrorMessage(error: any, context: string): string {
    const timestamp = new Date().toISOString();
    
    if (error instanceof McpError) {
      return `[${timestamp}] MCP Error in ${context}: ${error.message}`;
    }
    
    return `[${timestamp}] Unexpected error in ${context}. Check server logs for details.`;
  }
}

/**
 * Creates a structured log entry for audit purposes
 * @param level - Log level (info, warn, error)
 * @param operation - The operation being performed
 * @param details - Additional details to log
 */
export function createAuditLog(level: 'info' | 'warn' | 'error', operation: string, details: Record<string, any>): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    operation,
    ...details
  };
  
  console.error(JSON.stringify(logEntry));
}