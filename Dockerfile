# Fly.io deployment Dockerfile for the backend server
# Uses Node 18 for ESM support
FROM node:18-alpine

ENV NODE_ENV=production
WORKDIR /app

# Copy package metadata first for better caching
COPY package*.json ./

# Install only production deps
RUN npm ci --only=production || npm i --only=production

# Copy server files and static public assets (used only if needed)
COPY server.js ./
COPY public ./public

# Expose server port
EXPOSE 3000

# Environment default (override in Fly)
ENV PORT=3000

CMD ["node", "server.js"]
