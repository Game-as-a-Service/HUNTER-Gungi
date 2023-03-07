FROM node:18-alpine as base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY --from=base /app/dist/ /app/dist/

EXPOSE 8000

CMD ["node", "dist/main"]