##### DEPENDENCIES

FROM node:20 AS deps
# RUN apk add --no-cache libc6-compat openssl python3 make g++
RUN apt-get update && apt-get install -y python3 python3-pip python-is-python3 ffmpeg libsm6 libxext6 libgl1 wget curl
WORKDIR /app

# Install Prisma Client - remove if not using Prisma


# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN npm install -g pnpm
RUN pnpm i

##### BUILDER

FROM node:20-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_SOLANA_RPC
ARG NEXT_PUBLIC_MAPBOX_KEY

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install -g pnpm
RUN SKIP_ENV_VALIDATION=1 npm run build

##### RUNNER

FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3200
ENV PORT 3200

CMD ["server.js"]
