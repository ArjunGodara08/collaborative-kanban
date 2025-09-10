require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');

const { initDB } = require('./models');
const boardRoutes = require('./routes/boards');
const setupSockets = require('./socket');

const app = express();
app.use(cors());
app.use(express.json());

// REST routes
app.use('/api/boards', boardRoutes);

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Serve React build (after API routes)
app.use(express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// HTTP + WebSockets
const server = http.createServer(app);
const io = setupSockets(server);

const PORT = process.env.PORT || 4000;

initDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB init error', err);
    process.exit(1);
  });

