# Dockerfile for Next.js with Prisma (Standalone Output)

# 1. Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
# Use clean install (ci) for faster and more reliable installs in CI environments
RUN npm ci

# Copy source code
# We copy prisma folder separately to ensure it's there for generate
COPY prisma ./prisma/
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js app
# The build will create a standalone output in .next/standalone
RUN npm run build


# 2. Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy the standalone output
COPY --from=builder /app/.next/standalone ./
# Copy the public folder
COPY --from=builder /app/public ./public
# Copy the .next/static folder for static assets
COPY --from=builder /app/.next/static ./.next/static

# The standalone output includes a server.js file
# We can run it directly with node
# The prisma client is copied into the standalone output during the build
# but the schema file is needed for runtime (e.g. for migrations)
# So we copy the prisma folder
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "server.js"]
