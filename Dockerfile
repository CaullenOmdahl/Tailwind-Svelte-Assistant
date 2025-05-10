FROM node:18-alpine
WORKDIR /app

# Copy only the relevant files from the subdirectory
COPY tailwind-svelte-assistant-mcp-server/package*.json ./
COPY tailwind-svelte-assistant-mcp-server/tsconfig*.json ./
COPY tailwind-svelte-assistant-mcp-server/src ./src

RUN npm install
# This next COPY ensures that if there are other files at the root of 
# tailwind-svelte-assistant-mcp-server (e.g. .npmrc, other configs) they are also copied.
# It will overwrite package.json and tsconfig.json if they were also matched by the wildcard,
# but that's fine as they'd be the same. It ensures src is fully populated if it had sub-configs.
COPY tailwind-svelte-assistant-mcp-server/. ./ 
RUN npm run build

CMD ["node", "dist/index.js"]