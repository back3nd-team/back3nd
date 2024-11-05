#!/bin/sh

# Generate the Prisma client
bunx prisma generate  

# Apply the Prisma migrations
bunx prisma migrate deploy --schema=./prisma/schema

# Start the Hono API on port 3737
bun packages/api/dist/main.js &

# Start the Nuxt studio on port 3000
node packages/studio/.output/server/index.mjs &

# Start Nginx
nginx -g 'daemon off;'
