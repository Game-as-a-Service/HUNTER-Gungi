FROM node:18-alpine as base

WORKDIR /home/server/app

COPY package*.json ./

RUN npm install

# TODO: add docker ignore to ignore all files under source
# but add the non-src folders and files here
COPY . .
