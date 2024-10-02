FROM node:16-alpine as builder


RUN mkdir /app
WORKDIR /app

COPY . /app
RUN rm -rf node_modules

RUN yarn install
#RUN yarn generate-store -> Dashboard
RUN yarn build

FROM nginx:1.21-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
