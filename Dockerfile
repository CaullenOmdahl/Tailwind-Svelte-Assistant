# Builder stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package files for better layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies for the build process)
# Ignore scripts here because tsconfig.json and src are not yet copied.
# The actual build will happen later via "RUN npm run build".
RUN npm install --ignore-scripts

# Copy all source files (src, content, tsconfig.json, etc.)
COPY . .

# Build the application (runs tsc and creates the 'build' directory)
RUN npm run build

# --- Production stage ---
FROM node:18-alpine AS release

WORKDIR /usr/src/app

# Copy package files again for installing production dependencies
COPY package*.json ./

# Only install production dependencies
RUN npm install --omit=dev --ignore-scripts

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Copy the 'content' directory from the builder stage as it's likely needed at runtime
COPY --from=builder /usr/src/app/content ./content

# The command to run when the container starts
CMD ["node", "dist/index.js"]
