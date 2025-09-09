const Redis = require('ioredis');
const redis = new Redis(process.env.UPSTASH_REDIS_URL, { tls: {} });

const makeKey = (boardId) => `board:${boardId}:presence`;

async function addPresence(boardId, userId, meta = {}) {
  await redis.hset(makeKey(boardId), userId, JSON.stringify({ ts: Date.now(), meta }));
  // set TTL to remove stale presence
  await redis.expire(makeKey(boardId), 60 * 5);
}

async function removePresence(boardId, userId) {
  await redis.hdel(makeKey(boardId), userId);
}

async function listPresence(boardId) {
  const data = await redis.hgetall(makeKey(boardId));
  return Object.entries(data).map(([id, json]) => ({ id, ...JSON.parse(json) }));
}

module.exports = { addPresence, removePresence, listPresence, redis };
