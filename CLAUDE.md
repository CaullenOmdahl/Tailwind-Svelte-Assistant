# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Model Context Protocol (MCP) server that provides SvelteKit and Tailwind CSS documentation and code snippets. Built with TypeScript using ES modules, it features security-hardened file operations, input validation, and caching.

**Key Technology Stack:**
- MCP SDK v1.17+ with Smithery deployment
- TypeScript 5.3+ with strict mode
- Node.js 20+ (ES modules required)
- Zod for schema validation

## Build and Development Commands

### Standard Development
```bash
npm run build          # Build using Smithery CLI (outputs to dist/)
npm run dev            # Development mode with hot reload
npm run watch          # TypeScript watch mode
npm run inspector      # Launch MCP inspector for testing
```

### Content Management
```bash
npm run update-content # Scrape and update docs from SvelteKit/Tailwind sites
```

### Maintenance
```bash
npm run security-audit # Run security audit (moderate level)
npm run outdated-check # Check for outdated dependencies
```

## Architecture

### Module System
- **ES Modules Only**: Uses `"type": "module"` in package.json
- All imports must use `.js` extensions even for `.ts` files (TypeScript requirement)
- No CommonJS `require()` - use `import` statements

### Core Architecture Pattern

The server follows a modular security-first design:

```
src/index.ts                    # Smithery HTTP transport server factory
  ↓ creates
McpServer instance
  ↓ registers tools with
SecureFileService              # Handles all file I/O with caching
  ↓ uses
validateToolInput()            # Input validation (security.ts)
sanitizeAndValidatePath()      # Path traversal protection
ErrorHandler                   # Safe error formatting
```

### Key Architectural Principles

1. **Smithery Integration**: The server uses `createServer()` factory pattern that accepts config from smithery.yaml and returns an MCP server instance

2. **Path Resolution**: All paths use `process.cwd()` as base (not `__dirname`) for Smithery compatibility - the working directory is the project root when deployed

3. **Security Layers**:
   - Input validation with regex patterns (alphanumeric + `-_.` only)
   - Path sanitization to prevent `../` traversal
   - Base path boundary checking
   - File size limits (1MB default)
   - Safe error messages (no internal details exposed)

4. **Caching Strategy**: LRU cache with 5-minute timeout in SecureFileService - cache keys are full resolved file paths

5. **Error Handling Hierarchy**:
   ```
   McpError (from SDK)
     ← thrown by tools
     ← converted by ErrorHandler.formatSafeErrorMessage()
     ← catches: ValidationErrors, FileSystemErrors, UnknownErrors
   ```

### Content Organization

```
content/
├── docs/
│   ├── sveltekit/     # SvelteKit docs (.md files)
│   └── tailwind/      # Tailwind CSS docs (.md files)
└── snippets/
    └── [category]/    # Component directories
        └── *.svelte   # Svelte component files
```

File naming: Use kebab-case with alphanumeric characters, hyphens, underscores, and dots only.

## MCP Tools Available

The server exposes 7 tools:
- `get_sveltekit_doc` - Read SvelteKit documentation by topic
- `get_tailwind_info` - Read Tailwind CSS documentation by query
- `get_component_snippet` - Read Svelte component snippet by category/name
- `list_sveltekit_topics` - List available SvelteKit doc files
- `list_tailwind_info_topics` - List available Tailwind doc files
- `list_snippet_categories` - List snippet category directories
- `list_snippets_in_category` - List snippets within a category

All tools have audit logging and structured error handling.

## Code Patterns and Conventions

### TypeScript Strictness
- No `any` types allowed
- All parameters must have explicit types
- Use `as const` for literal type assertions
- Return types are explicit on public methods

### Security Validation Pattern
Every tool that accepts user input follows this pattern:
```typescript
validateToolInput(toolName, request);  // Throws McpError if invalid
const content = await fileService.readSecureFile(basePath, userInput, extension);
```

### Audit Logging Pattern
All tool executions log:
```typescript
createAuditLog('info', 'tool_request', { tool: 'name', timestamp, argsProvided });
// ... operation ...
createAuditLog('info', 'operation_completed', { details });
// ... or on error ...
createAuditLog('error', 'tool_request_failed', { tool, error, code });
```

### Error Handling Pattern
```typescript
try {
  // operation
} catch (error: any) {
  createAuditLog('error', 'tool_request_failed', { tool, error: error.message, code: error.code });

  if (error instanceof McpError) {
    throw error;  // Re-throw MCP errors as-is
  }

  throw new McpError(
    ErrorCode.InternalError,
    ErrorHandler.formatSafeErrorMessage(error, toolName)
  );
}
```

## Smithery Deployment

This server is deployed via Smithery with HTTP transport:
- Configuration: `smithery.yaml` defines runtime and startCommand
- Build: `npx @smithery/cli build` creates production bundle
- The server factory returns an MCP server instance compatible with Smithery's HTTP transport layer

### Version Management (CRITICAL)

**ALWAYS increment the version number before pushing ANY changes to the repository.** Smithery may cache builds based on version numbers, so failing to increment can cause deployment issues where changes don't take effect.

Version numbers must be updated in TWO locations:
1. `package.json` - the `"version"` field
2. `src/index.ts` - the `McpServer` version parameter

Follow semantic versioning (semver):
- **Patch version** (0.1.x → 0.1.x+1): Bug fixes, minor corrections, no functionality changes
- **Minor version** (0.x.0 → 0.x+1.0): New features, backward-compatible changes
- **Major version** (x.0.0 → x+1.0.0): Breaking changes, incompatible API changes

Example workflow for any change:
```bash
# 1. Make your code changes
# 2. Update version in package.json (e.g., 0.1.1 → 0.1.2)
# 3. Update version in src/index.ts McpServer constructor
# 4. Build, commit, and push
npm run build
git add -A
git commit -m "chore: Bump version to 0.1.2"
git commit -m "fix: Your actual change description"
git push origin main
```

## Content Update System

The `scripts/update-content.js` script scrapes documentation from official sources:
- Uses optional dependencies (axios, cheerio, turndown)
- Gracefully handles missing dependencies
- Targets specific content selectors for SvelteKit and Tailwind sites
- Converts HTML to Markdown for storage
- Manual trigger via `npm run update-content`

## Testing with MCP Inspector

```bash
npm run inspector
```

This launches the MCP inspector connected to `dist/index.js` for interactive testing of all tools.

## Important Notes

- **Never use `__dirname`**: Use `process.cwd()` or `import.meta.url` conversions for path resolution
- **File extensions in imports**: Always use `.js` in imports even for TypeScript files
- **No writes from tools**: All MCP tools are read-only operations
- **Validation first**: Always validate and sanitize user inputs before file operations
- **Cache awareness**: File content is cached for 5 minutes, so rapid changes may not be immediately visible
