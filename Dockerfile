FROM node:18-alpine
WORKDIR /app

# COPY commands are now relative to the `build.context` 
# (tailwind-svelte-assistant-mcp-server/)
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

RUN npm install

# This COPY ensures all other files from the context are included.
COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]