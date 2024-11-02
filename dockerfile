FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.17.1-alpine

COPY --from=build /app/dist/totem-front/browser /usr/share/nginx/html/
COPY --from=build /app/dist/totem-front/server /usr/share/nginx/html/

EXPOSE 80
