# --- STAGE 1: Build Stage ---
# Use the specific Node.js version requested. Using Alpine for a smaller base image.
FROM node:22.12.0-alpine AS builder

# Set the working directory for all subsequent commands
WORKDIR /
# Copy package.json and package-lock.json (or yarn.lock/pnpm-lock.yaml)
# Copying these first allows Docker to cache the npm install step unless they change.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application. The default output directory for Vite is 'dist'.
# The production build will generate optimized static assets.
RUN npm run build


# --- STAGE 2: Production Stage (Serving Static Files) ---
# Use a lightweight Node.js image again for consistency.
# This stage only needs the built assets and a server to host them.
FROM node:22.12.0-alpine AS production

# Set the working directory for the server
WORKDIR /

# Install 'serve', a simple, production-ready static file server
RUN npm install -g serve

# Copy the built application files from the 'builder' stage
COPY --from=builder /app/dist ./dist

# The default port for Coolify and many hosting platforms is 3000, 
# but we'll use 8080 as a common default for static servers. 
# Make sure this port matches what you configure in Coolify if necessary.
EXPOSE 3000

# Command to run the static server
# The '-s' flag means serve the 'dist' folder and fall back to index.html for SPAs (History API routing)
CMD [ "serve", "-s", "dist", "-l", "3000" ]
