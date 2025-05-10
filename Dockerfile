# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install production dependencies
# Using npm ci is generally recommended for production builds if package-lock.json is present and reliable
# Otherwise, npm install --omit=dev can be used.
RUN npm ci --omit=dev

# Copy the rest of the application code
# This includes the 'build' directory with compiled JS, and the 'content' directory with data.
COPY build ./build
COPY content ./content
# If scripts are needed at runtime by the server, copy them too.
# COPY scripts ./scripts

# The command to run when the container starts
CMD ["node", "build/index.js"]
