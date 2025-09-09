const { addPresence, removePresence, listPresence } = require('./src/services/redisPresence');
const { AuditLog } = require('./src/models');

module.exports = (server) => {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('joinBoard', async ({ boardId, user }) => {
      socket.join(`board:${boardId}`);
      socket.data.boardId = boardId;
      socket.data.user = user;
      if (user && user.id) await addPresence(boardId, user.id, { name: user.name });
      const current = await listPresence(boardId);
      io.to(`board:${boardId}`).emit('presence', current);
    });

    socket.on('leaveBoard', async () => {
      const bid = socket.data.boardId;
      const uid = socket.data.user?.id;
      if (bid && uid) {
        await removePresence(bid, uid);
        const current = await listPresence(bid);
        io.to(`board:${bid}`).emit('presence', current);
      }
      socket.leave(`board:${socket.data.boardId}`);
    });

    socket.on('card:create', async ({ boardId, card }) => {
      // Persist minimal server-side; ideally create with REST route
      io.to(`board:${boardId}`).emit('card:created', { card });
      await AuditLog.create({ boardId, eventType: 'CardCreated', payload: { card } });
    });

    socket.on('card:update', async ({ boardId, card }) => {
      io.to(`board:${boardId}`).emit('card:updated', { card });
      await AuditLog.create({ boardId, eventType: 'CardUpdated', payload: { card } });
    });

    socket.on('card:move', async ({ boardId, cardId, fromColumnId, toColumnId, position }) => {
      io.to(`board:${boardId}`).emit('card:moved', { cardId, fromColumnId, toColumnId, position });
      await AuditLog.create({ boardId, eventType: 'CardMoved', payload: { cardId, fromColumnId, toColumnId, position } });
    });

    socket.on('disconnect', async () => {
      const bid = socket.data.boardId;
      const uid = socket.data.user?.id;
      if (bid && uid) {
        await removePresence(bid, uid);
        const current = await listPresence(bid);
        io.to(`board:${bid}`).emit('presence', current);
      }
    });
  });

  return io;
};
