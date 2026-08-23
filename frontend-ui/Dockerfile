# --- NIVEAU 1 : Builder (Node.js) ---
FROM registry.access.redhat.com/ubi9/nodejs-18:latest AS builder
USER root
WORKDIR /app
# N'installiw les dépendances w n'compiliw l'React
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- NIVEAU 2 : Runtime (Serveur Nginx) ---
FROM registry.access.redhat.com/ubi9/nginx-120:latest
# N'jibou KEN l'dossier 'build' elli fih l'HTML/JS l'7adher
COPY --from=builder /app/build /opt/app-root/src

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]