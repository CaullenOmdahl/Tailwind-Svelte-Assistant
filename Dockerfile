# Stage 1: Install all dependencies (including devDependencies)
FROM node:20-slim AS deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install # Changed from npm ci

# Stage 2: Build the application
FROM deps AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm run build

# Stage 3: Create the final production image
FROM node:20-slim AS final
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/build ./build

# Install only production dependencies
RUN npm ci --omit=dev

CMD ["node", "build/server.js"]