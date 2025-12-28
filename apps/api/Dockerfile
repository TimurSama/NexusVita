# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files for workspace support
COPY package*.json ./
COPY turbo.json ./

# Copy API package files
COPY apps/api/package*.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma/

# Install root dependencies
RUN npm ci

# Install API dependencies
WORKDIR /app/apps/api
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy API source code
COPY apps/api/src ./src
COPY apps/api/tsconfig.json ./

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy API package files
COPY apps/api/package*.json ./apps/api/
COPY apps/api/prisma ./apps/api/prisma/

# Install production dependencies
RUN npm ci --only=production
WORKDIR /app/apps/api
RUN npm ci --only=production

# Copy Prisma client
COPY --from=builder /app/apps/api/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/apps/api/node_modules/@prisma ./node_modules/@prisma

# Copy built application
COPY --from=builder /app/apps/api/dist ./dist

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Start the application
WORKDIR /app/apps/api
CMD ["node", "dist/index.js"]


