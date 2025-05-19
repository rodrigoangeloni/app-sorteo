# --- Etapa 1: Construcción de la aplicación React ---
FROM node:23.11.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: Servir la aplicación con Nginx ---
FROM nginx:alpine

# Actualiza los paquetes para reducir vulnerabilidades
RUN apk update && apk upgrade

COPY --from=builder /app/dist /usr/share/nginx/html
# Copiamos la configuración personalizada de Nginx para manejar SPAs
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
