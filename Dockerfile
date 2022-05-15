FROM node:16 as base

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV PRISMA_QUERY_ENGINE_BINARY=/usr/src/app/node_modules/prisma/node_modules/@prisma/engines/libquery_engine-darwin-arm64.dylib.node \
  PRISMA_MIGRATION_ENGINE_BINARY=/usr/src/app/node_modules/prisma/node_modules/@prisma/engines/migration-engine-darwin-arm64 \
  PRISMA_INTROSPECTION_ENGINE_BINARY=/usr/src/app/node_modules/prisma/node_modules/@prisma/engines/introspection-engine-darwin-arm64 \
  PRISMA_FMT_BINARY=/usr/src/app/node_modules/prisma/node_modules/@prisma/engines/prisma-fmt-darwin-arm64 \
  PRISMA_CLI_QUERY_ENGINE_TYPE=binary \
  PRISMA_CLIENT_ENGINE_TYPE=binary 

COPY package.json .
COPY prisma ./prisma/

# RUN prisma generate

RUN yarn

COPY . .
