# --- Etapa 1: Construcción de la aplicación React ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: Servir la aplicación con Nginx ---
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiamos la configuración personalizada de Nginx para manejar SPAs
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
