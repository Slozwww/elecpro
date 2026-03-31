FROM nginx:alpine

# Copie les fichiers du site dans le dossier NGINX
COPY . /usr/share/nginx/html

# Copie la config NGINX personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Railway injecte le PORT dynamiquement
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
