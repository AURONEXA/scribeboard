# --- Build Stage: This stage installs ALL dependencies and builds the app ---
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker layer caching for faster builds
COPY package*.json ./

# Install all dependencies (including devDependencies for building/Prisma)
RUN npm ci

# Copy the entire project source code into the builder stage
COPY . .

# Generate the Prisma Client based on the schema (required for DB interactions)
RUN npx prisma generate

# --- Production Stage: This stage creates the final, slim, and secure image ---
FROM node:18-alpine

# Set the working directory for the runtime environment
WORKDIR /app

# Set Node to production mode (optimizes performance and security)
ENV NODE_ENV=production

# Re-copy package files to install ONLY production-critical dependencies
COPY package*.json ./

# Install only production dependencies to reduce image size and attack surface
RUN npm ci --only=production

# Copy ONLY the necessary built assets from the builder stage
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma
# Copy the generated Prisma client binary
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Document that the container listens on port 3000
EXPOSE 3000

# SECURITY: Create a non-root group and user to run the application
# This prevents an attacker from gaining root access to the host if the app is compromised
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Switch to the non-root user
USER appuser

# Start the application using the production start script
CMD ["npm", "start"]
