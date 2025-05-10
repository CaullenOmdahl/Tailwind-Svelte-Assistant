# Builder stage
FROM node:20-slim AS builder

WORKDIR /usr/src/app

# Copy package files for better layer caching
COPY package*.json ./

# Install all dependencies (including devDependencies for the build process)
RUN npm install

# Copy all source files (src, content, tsconfig.json, etc.)
COPY . .

# Build the application (runs tsc and creates the 'build' directory)
RUN npm run build

# --- Production stage ---
FROM node:20-slim AS release

WORKDIR /usr/src/app

# Copy package files again for installing production dependencies
COPY package*.json ./

# Only install production dependencies
RUN npm install --omit=dev

# Copy the built application from the builder stage
COPY --from=builder /usr/src/app/build ./build

# Copy the 'content' directory from the builder stage as it's likely needed at runtime
COPY --from=builder /usr/src/app/content ./content

# The command to run when the container starts
CMD ["node", "build/index.js"]
