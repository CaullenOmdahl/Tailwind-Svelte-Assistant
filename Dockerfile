# Multi-stage Dockerfile for tailwind-svelte-assistant-mcp-server

# --- Build Stage ---
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

# --- Production Stage ---
FROM node:20-slim AS production

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/README.md ./README.md
COPY --from=builder /app/docs ./docs

# EXPOSE  # Not needed for stdio-based servers

CMD ["node", "build/index.js"]