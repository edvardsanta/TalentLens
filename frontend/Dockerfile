FROM node:20-alpine AS builder

RUN npm install -g corepack && corepack enable 

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:20-alpine

ENV PNPM_HOME=/pnpm-global
ENV PATH=$PNPM_HOME:$PATH

RUN npm install -g corepack && corepack enable 

RUN pnpm install -g pm2 serve

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/ecosystem.config.cjs ./

RUN pnpm install --prod --frozen-lockfile

# Expose port
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]