#!/bin/sh

# Execute Better Auth migrations
bunx @better-auth/cli migrate --config packages/api/src/lib/auth.ts

# Generate Better Auth client
bunx @better-auth/cli generate --config packages/api/src/lib/auth.ts

# Check table existence, sync schema, and seed database
bun run packages/api/src/scripts/seed.ts

# Start the Hono API on port 3737
bun packages/api/dist/main.js &

# Wait for the Hono API to be ready
sleep 10

# Start the admin on port 3000
serve -s /app/packages/admin/dist &

# Start Nginx
nginx -g 'daemon off;'