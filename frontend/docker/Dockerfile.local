FROM node:18-alpine as base

# set up
WORKDIR /frontend

COPY package*.json ./

CMD npm ci

COPY . .
