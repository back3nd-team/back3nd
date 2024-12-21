## docker build -f Docker/Dockerfile -t back3nd:beta . 
# Use the latest LTS version of Node.js based on Bullseye
FROM node:lts-bullseye

# Set the working directory
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Copy the entrypoint script and give execution permissions
COPY Docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the PATH
ENV PATH="/root/.bun/bin:${PATH}"

# Install project dependencies
RUN bun install 

# Preparing the API (Hono) environment
WORKDIR /app/packages/api
RUN bun install 
RUN bun tsc
EXPOSE 3737

# Preparing the Studio environment (nuxt)
WORKDIR /app/packages/admin
RUN bun install 
RUN bun run build
RUN bun add -g serve
EXPOSE 3000

# Install Nginx
RUN apt-get update && apt-get install -y nginx net-tools curl

# Copy the Nginx configuration file
COPY Docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

WORKDIR /app/

# Command to run the application
CMD ["/entrypoint.sh"]