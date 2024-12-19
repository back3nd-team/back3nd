#!/bin/sh

set -e

# Função para verificar se um serviço está pronto
wait_for_service() {
  local service_name=$1
  local url=$2
  local max_attempts=10
  local attempt=1

  echo "Waiting for $service_name to be ready at $url..."

  while [ $attempt -le $max_attempts ]; do
    if curl -s "$url" > /dev/null; then
      echo "$service_name is ready!"
      return 0
    fi

    echo "Attempt $attempt/$max_attempts: $service_name not ready yet. Retrying in 2 seconds..."
    attempt=$((attempt + 1))
    sleep 2
  done

  echo "Error: $service_name did not become ready in time."
  exit 1
}

# Execute Better Auth migrations
echo "Running Better Auth migrations..."
bunx @better-auth/cli migrate --config packages/api/src/lib/auth.ts

# Generate Better Auth client
echo "Generating Better Auth client..."
bunx @better-auth/cli generate --config packages/api/src/lib/auth.ts

# Seed the database
echo "Seeding database..."
bun run packages/api/src/scripts/seed.ts

# Start the Hono API on port 3737
echo "Starting Hono API on port 3737..."
bun run packages/api/dist/main.js &

# Wait for Hono API to be ready
wait_for_service "Hono API" "http://localhost:3737"

# Start the admin on port 3000
echo "Starting admin on port 3000..."
bun run -- serve -s /app/packages/admin/dist &

# Start Nginx
echo "Starting Nginx..."
nginx -g 'daemon off;'
