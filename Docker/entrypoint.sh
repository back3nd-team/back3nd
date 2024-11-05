#!/bin/sh

# Gerar o cliente Prisma
bunx prisma generate  

# Aplicar as migrações do Prisma
bunx prisma migrate deploy --schema=./prisma/schema

# Inicia a API Hono na porta 3737
bun packages/api/dist/main.js &

# Iniciar o studio Nuxt na porta 3000
node packages/studio/.output/server/index.mjs
