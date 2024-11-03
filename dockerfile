# Partindo de uma imagem do Nginx para servir o conteúdo
FROM nginx:1.17.1-alpine

# Definindo o diretório de trabalho no contêiner
WORKDIR /usr/share/nginx/html

# Copia a pasta dist gerada localmente para o contêiner
COPY ./dist/totem-front/browser /usr/share/nginx/html/
COPY ./dist/totem-front/server /usr/share/nginx/html/

# Expõe a porta 80 para o servidor Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
