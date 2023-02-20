FROM node:18-alpine as base

# set up
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=base /app/next.config.js ./
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules

CMD ["node_modules/.bin/next", "start"]
