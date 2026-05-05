FROM node:20-bullseye-slim AS builder
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y ca-certificates build-essential curl && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate

FROM node:20-bullseye-slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN apt-get update && apt-get install -y ca-certificates curl && rm -rf /var/lib/apt/lists/* && npm ci --omit=dev

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/src ./src

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=5 \
    CMD curl -f http://localhost:3000/health/ready || exit 1

CMD ["node", "./src/server.js"]