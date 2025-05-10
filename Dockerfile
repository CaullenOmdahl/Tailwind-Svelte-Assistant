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

# Copy necessary documentation files for the get_documentation_snippet tool
COPY docs/svelte/documentation/docs /app/docs/svelte/documentation/docs/
COPY docs/tailwindcss.com/src/docs /app/docs/tailwindcss.com/src/docs/

RUN npm install

# Removed 'COPY . .' to avoid copying unnecessary files from the repo root.
# If specific other files ARE needed, they should be copied explicitly.

RUN npm run build

# The valid_tailwind_classes.json is loaded at runtime by src/server.ts.
# If it's missing, the server logs a warning and the validation tool may not function fully.
# This assumes build/valid_tailwind_classes.json is generated prior to docker build.
COPY build/valid_tailwind_classes.json /app/dist/valid_tailwind_classes.json

CMD ["node", "dist/index.js"]
