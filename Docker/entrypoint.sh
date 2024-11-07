#!/bin/sh

# Generate the Prisma client
bunx prisma generate  

# Apply the Prisma migrations
bunx prisma migrate deploy --schema=./prisma/schema

# Seed the database
bun run prisma:seed

# Start the Hono API on port 3737
bun packages/api/dist/main.js &
# Print the environment variable NUXT_APP_API_URL
echo "NUXT_PUBLIC_API_BASE is set to: $(printenv NUXT_PUBLIC_API_BASE)"

# Start the Nuxt studio on port 3000
NUXT_PUBLIC_API_BASE=$(printenv NUXT_PUBLIC_API_BASE) node packages/studio/.output/server/index.mjs &

# Start Nginx
nginx -g 'daemon off;'