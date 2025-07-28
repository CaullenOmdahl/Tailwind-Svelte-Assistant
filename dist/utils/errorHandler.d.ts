/**
 * Centralized error handling for file system operations
 */
export declare class ErrorHandler {
    /**
     * Handles file system errors with proper classification and security-conscious messaging
     * @param error - The original error object
     * @param operation - Description of the operation that failed
     * @param toolName - Name of the tool where error occurred
     * @returns Never - always throws an McpError
     */
    static handleFileSystemError(error: any, operation: string, toolName: string): never;
    /**
     * Handles directory listing errors with appropriate fallbacks
     * @param error - The original error object
     * @param dirPath - The directory path that failed (for logging only)
     * @returns Empty result instead of throwing
     */
    static handleDirectoryListingError(error: any, dirPath: string): {
        type: "text";
        text: string;
    };
    /**
     * Validates file size before processing
     * @param filePath - Path to the file
     * @param stats - File stats object
     * @param maxSize - Maximum allowed file size in bytes
     * @throws McpError if file is too large
     */
    static validateFileSize(filePath: string, stats: any, maxSize?: number): void;
    /**
     * Safely formats error messages without exposing sensitive information
     * @param error - The error to format
     * @param context - Additional context for the error
     * @returns Formatted error message
     */
    static formatSafeErrorMessage(error: any, context: string): string;
}
/**
 * Creates a structured log entry for audit purposes
 * @param level - Log level (info, warn, error)
 * @param operation - The operation being performed
 * @param details - Additional details to log
 */
export declare function createAuditLog(level: 'info' | 'warn' | 'error', operation: string, details: Record<string, any>): void;
//# sourceMappingURL=errorHandler.d.ts.map