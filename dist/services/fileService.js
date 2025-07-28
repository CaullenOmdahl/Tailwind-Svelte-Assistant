import { promises as fs } from 'fs';
import path from 'path';
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { sanitizeAndValidatePath, isPathWithinBase } from '../utils/security.js';
import { ErrorHandler } from '../utils/errorHandler.js';
/**
 * Secure file service with path validation, caching, and proper error handling
 */
export class SecureFileService {
    cache = new Map();
    maxFileSize;
    cacheTimeout;
    constructor(maxFileSize = 1024 * 1024, cacheTimeout = 5 * 60 * 1000) {
        this.maxFileSize = maxFileSize;
        this.cacheTimeout = cacheTimeout;
    }
    /**
     * Securely reads a file with path validation and caching
     * @param basePath - The base directory that should contain the file
     * @param userPath - The user-provided path component
     * @param extension - The expected file extension
     * @returns Promise resolving to file content
     */
    async readSecureFile(basePath, userPath, extension) {
        // Validate and sanitize the user input
        const validation = sanitizeAndValidatePath(userPath);
        if (!validation.isValid) {
            throw new McpError(ErrorCode.InvalidParams, validation.error);
        }
        const sanitizedPath = validation.sanitizedValue;
        const fullPath = path.resolve(path.join(basePath, `${sanitizedPath}${extension}`));
        // Verify the resolved path is within the allowed base directory
        if (!isPathWithinBase(fullPath, basePath)) {
            throw new McpError(ErrorCode.InvalidParams, "Invalid file path");
        }
        // Check cache first
        const cached = this.getCachedContent(fullPath);
        if (cached) {
            return cached;
        }
        try {
            // Check if file exists and get stats
            const stats = await fs.stat(fullPath);
            // Validate file size
            ErrorHandler.validateFileSize(fullPath, stats, this.maxFileSize);
            // Read file content
            const content = await fs.readFile(fullPath, 'utf-8');
            // Cache the content
            this.setCacheContent(fullPath, content, stats.mtime.getTime());
            return content;
        }
        catch (error) {
            ErrorHandler.handleFileSystemError(error, 'readSecureFile', 'file reading');
        }
    }
    /**
     * Securely lists directory contents with validation
     * @param dirPath - Directory path to list
     * @param fileExtension - Optional file extension filter
     * @returns Promise resolving to directory contents
     */
    async listDirectoryContents(dirPath, fileExtension) {
        try {
            const files = await fs.readdir(dirPath, { withFileTypes: true });
            let contentList;
            if (fileExtension) {
                contentList = files
                    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(fileExtension))
                    .map((dirent) => dirent.name.replace(fileExtension, ''));
            }
            else {
                contentList = files
                    .filter((dirent) => dirent.isDirectory())
                    .map((dirent) => dirent.name);
            }
            return {
                content: [{ type: "text", text: contentList.join('\n') }]
            };
        }
        catch (error) {
            // For directory listing, return empty result instead of throwing
            const emptyResult = ErrorHandler.handleDirectoryListingError(error, dirPath);
            return { content: [emptyResult] };
        }
    }
    /**
     * Gets cached content if valid and not expired
     * @param filePath - Path to the file
     * @returns Cached content or null if not available/expired
     */
    getCachedContent(filePath) {
        const cached = this.cache.get(filePath);
        if (!cached) {
            return null;
        }
        const now = Date.now();
        if (now - cached.lastModified > this.cacheTimeout) {
            this.cache.delete(filePath);
            return null;
        }
        return cached.content;
    }
    /**
     * Sets content in cache
     * @param filePath - Path to the file
     * @param content - File content
     * @param lastModified - Last modified timestamp
     */
    setCacheContent(filePath, content, lastModified) {
        this.cache.set(filePath, { content, lastModified });
    }
    /**
     * Clears expired cache entries
     */
    clearExpiredCache() {
        const now = Date.now();
        for (const [filePath, entry] of this.cache.entries()) {
            if (now - entry.lastModified > this.cacheTimeout) {
                this.cache.delete(filePath);
            }
        }
    }
}
//# sourceMappingURL=fileService.js.map