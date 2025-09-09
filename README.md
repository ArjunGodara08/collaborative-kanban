# Collaborative Kanban (INE Assignment)

A mini real-time collaborative Kanban board built with **React, Node.js, Supabase, Redis, and WebSockets**.

## Features
- Create boards, columns, and cards
- Drag-and-drop cards between columns
- Real-time sync across users (Socket.IO)
- Presence tracking (Upstash Redis)
- Audit logs for all events
- Deployed via Docker on Render

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js + Express + Sequelize
- Database: Supabase (Postgres)
- Real-time: Socket.IO
- Redis: Upstash
- Deployment: Docker + Render

## Run Locally

### 1. Clone repo & install dependencies
```bash
git clone <your-repo-url>
cd collaborative-kanban

# install backend
cd server
npm install

# install frontend
cd ../client
npm install
```

### 2. Add `.env` file in root with values:
```
PORT=4000
DATABASE_URL=postgresql://<user>:<pw>@<host>:5432/<db>?schema=public
DB_SSL=true
UPSTASH_REDIS_URL=rediss://<token>@<host>:<port>
SENDGRID_API_KEY=<optional>
REACT_APP_API_URL=/api
REACT_APP_SOCKET_URL=/
```

### 3. Start locally
```bash
# start backend
cd server
npm run dev

# in another terminal, start frontend
cd client
npm run dev
```

Visit: http://localhost:5173

### 4. Docker build & run
```bash
docker build -t kanban-app .
docker run -p 4000:4000 --env-file .env kanban-app
```

## Deployment on Render
- Push repo to GitHub
- Create new Web Service on Render using this repo
- Add env variables under Settings
- Set port: 4000
- Deploy 🚀

## Submission Checklist
- [x] Public GitHub repo link
- [x] Render deployed app link
- [x] Resume PDF

---
**Deadline: 11 Sept 2025, 11:59 PM IST**
