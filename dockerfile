FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM nginx:1.17.1-alpine

COPY dist/totem-front-end/browser /usr/share/nginx/html/
COPY dist/totem-front-end/server /usr/share/nginx/html/
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
