# Stage 1: Install all dependencies (including devDependencies)
FROM node:20-slim AS deps
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Stage 2: Build the application
# This stage inherits all node_modules (including devDependencies) from the 'deps' stage
FROM deps AS builder
WORKDIR /usr/src/app
# Copy the rest of the application source code
COPY . .
# Run the build script (e.g., tsc, webpack, etc.)
# This stage has access to devDependencies like typescript
RUN npm run build

# Stage 3: Create the final production image
# Use a clean base image for the production stage
FROM node:20-slim AS final
ENV NODE_ENV=production
WORKDIR /usr/src/app
# Copy package.json and package-lock.json again to install only production dependencies
COPY package.json ./
COPY package-lock.json ./
# Install only production dependencies
RUN npm ci --omit=dev
# Copy the built application from the 'builder' stage
COPY --from=builder /usr/src/app/build ./build
# Copy the docs directory from the 'builder' stage
COPY --from=builder /usr/src/app/docs ./docs
# Set the command to run the application
CMD ["node", "build/index.js"]