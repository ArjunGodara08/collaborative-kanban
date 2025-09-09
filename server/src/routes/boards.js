const express = require('express');
const router = express.Router();
const { Board, Column, Card, AuditLog } = require('../models');

router.get('/', async (req, res) => {
  const boards = await Board.findAll();
  res.json(boards);
});

router.post('/', async (req, res) => {
  const b = await Board.create({ title: req.body.title || 'Untitled' });
  res.json(b);
});

router.get('/:boardId', async (req, res) => {
  const board = await Board.findByPk(req.params.boardId, {
    include: [{ model: Column, as: 'columns', include: [{ model: Card, as: 'cards' }] }]
  });
  if (!board) return res.status(404).json({ error: 'Not found' });
  res.json(board);
});

router.post('/:boardId/columns', async (req, res) => {
  const { title } = req.body;
  const col = await Column.create({ title, boardId: req.params.boardId });
  res.json(col);
});

router.post('/:boardId/columns/:columnId/cards', async (req, res) => {
  const { title, description, assigneeId } = req.body;
  const card = await Card.create({ title, description, assigneeId, columnId: req.params.columnId });
  await AuditLog.create({ boardId: req.params.boardId, eventType: 'CardCreated', payload: { cardId: card.id }});
  res.json(card);
});

module.exports = router;
