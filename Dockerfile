
# ---- build frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY client/package.json client/package-lock.json* ./client/
WORKDIR /app/client
COPY client/ ./
RUN npm ci && npm run build

# ---- build backend ----
FROM node:20-alpine AS backend-build
WORKDIR /app
COPY server/package.json server/package-lock.json* ./server/
WORKDIR /app/server
COPY server/ ./
RUN npm ci --production

# ---- final image ----
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# copy backend
COPY --from=backend-build /app/server /app/server

# copy frontend build into server's public folder (serve via express static)
COPY --from=frontend-build /app/client/dist /app/server/public

WORKDIR /app/server
EXPOSE 4000
CMD ["node", "src/index.js"]




