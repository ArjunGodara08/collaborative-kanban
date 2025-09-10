# ---- build frontend ----
FROM node:20-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# ---- build backend ----
FROM node:20-alpine AS backend-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install --production
COPY server/ .

# ---- final image ----
FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# copy backend
COPY --from=backend-build /app/server /app/server

# copy frontend build into backend public folder
COPY --from=frontend-build /app/client/dist /app/server/public

WORKDIR /app/server
EXPOSE 4000
CMD ["node", "src/index.js"]


