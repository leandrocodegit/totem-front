FROM node:18 as build
WORKDIR /app
COPY package*.json ./
COPY --from=node dist/totem-front-end/browser /usr/share/nginx/html
COPY --from=node dist/totem-front-end/server /usr/share/nginx/html
RUN npm install

FROM nginx:1.17.1-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
