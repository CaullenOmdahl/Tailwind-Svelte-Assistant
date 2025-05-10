FROM node:18-alpine
WORKDIR /app

# COPY commands are relative to the build context (repository root)

# Copy package.json and tsconfig.json for the MCP server
# These are located in the tailwind-svelte-assistant-mcp-server/ directory
COPY tailwind-svelte-assistant-mcp-server/package*.json ./
COPY tailwind-svelte-assistant-mcp-server/tsconfig.json ./

# Copy the actual source code for the MCP server
# This is located in the root src/ directory
COPY src ./src

RUN npm install

# Removed 'COPY . .' to avoid copying unnecessary files from the repo root.
# If specific other files ARE needed, they should be copied explicitly.

RUN npm run build

CMD ["node", "dist/index.js"]
