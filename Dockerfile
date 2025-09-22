FROM node:20-bullseye

WORKDIR /usr/src/app

# Prevent lifecycle scripts (prepare/test/build) from running during install
ENV NPM_CONFIG_IGNORE_SCRIPTS=true

# Copy package files and install dependencies (including dev deps)
COPY package*.json ./
RUN npm ci

# Re-enable scripts for runtime
ENV NPM_CONFIG_IGNORE_SCRIPTS=false

# Copy source
COPY . .

EXPOSE 5173

# Start Vite dev server, binding to 0.0.0.0 so it's reachable from host
CMD ["npm","run","dev","--","--host","0.0.0.0"]
