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
echo "NUXT_APP_API_URL is set to: $(printenv NUXT_APP_API_URL)"

# Start the Nuxt studio on port 3000
NUXT_APP_API_URL=$(printenv NUXT_APP_API_URL) node packages/studio/.output/server/index.mjs &

# Start Nginx
nginx -g 'daemon off;'