FROM node:22-alpine AS base
WORKDIR /app

COPY package.json ./
RUN npm install --no-fund --no-audit

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/app ./app
COPY --from=base /app/components ./components
COPY --from=base /app/services ./services
COPY --from=base /app/types ./types
COPY --from=base /app/next.config.ts ./next.config.ts
COPY --from=base /app/tsconfig.json ./tsconfig.json

EXPOSE 3000

CMD ["npm", "run", "start", "--", "-p", "3000"]
