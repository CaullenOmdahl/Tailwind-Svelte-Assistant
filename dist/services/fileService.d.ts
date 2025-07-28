/**
 * Secure file service with path validation, caching, and proper error handling
 */
export declare class SecureFileService {
    private cache;
    private readonly maxFileSize;
    private readonly cacheTimeout;
    constructor(maxFileSize?: number, cacheTimeout?: number);
    /**
     * Securely reads a file with path validation and caching
     * @param basePath - The base directory that should contain the file
     * @param userPath - The user-provided path component
     * @param extension - The expected file extension
     * @returns Promise resolving to file content
     */
    readSecureFile(basePath: string, userPath: string, extension: string): Promise<string>;
    /**
     * Securely lists directory contents with validation
     * @param dirPath - Directory path to list
     * @param fileExtension - Optional file extension filter
     * @returns Promise resolving to directory contents
     */
    listDirectoryContents(dirPath: string, fileExtension?: string): Promise<{
        content: Array<{
            type: "text";
            text: string;
        }>;
    }>;
    /**
     * Gets cached content if valid and not expired
     * @param filePath - Path to the file
     * @returns Cached content or null if not available/expired
     */
    private getCachedContent;
    /**
     * Sets content in cache
     * @param filePath - Path to the file
     * @param content - File content
     * @param lastModified - Last modified timestamp
     */
    private setCacheContent;
    /**
     * Clears expired cache entries
     */
    clearExpiredCache(): void;
}
//# sourceMappingURL=fileService.d.ts.map