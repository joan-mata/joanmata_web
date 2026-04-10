# Stage 1: Build
FROM node:23.6-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve (Full-Stack Engine)
FROM node:23.6-alpine
WORKDIR /app

# Copiamos solo lo necesario para el servidor
COPY package*.json ./
RUN npm install --only=production --legacy-peer-deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/src/models/cvData.json ./src/models/cvData.json

# Exponemos el puerto del servidor Node
EXPOSE 3000

# Arrancamos el servidor
CMD ["node", "server.js"]
