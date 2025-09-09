import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import Column from './Column';

export default function BoardView({ socket, boardId, user }){
  const [board, setBoard] = useState(null);
  const [presence, setPresence] = useState([]);

  useEffect(()=>{
    API.get(`/boards/${boardId}`).then(r => setBoard(r.data)).catch(()=>setBoard(null));
    socket.on('presence', (p) => setPresence(p));
    socket.on('card:created', ({ card }) => {
      // simple local update: refetch board (or incremental update)
      API.get(`/boards/${boardId}`).then(r => setBoard(r.data));
    });
    socket.on('card:moved', () => API.get(`/boards/${boardId}`).then(r => setBoard(r.data)));
    socket.on('card:updated', () => API.get(`/boards/${boardId}`).then(r => setBoard(r.data)));

    return () => {
      socket.off('presence');
      socket.off('card:created');
    };
  }, [boardId, socket]);

  if (!board) return <div>Loading board...</div>;

  return (
    <div>
      <div>Online: {presence.map(p => p.meta?.name || p.id).join(', ')}</div>
      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        {board.columns.map(col => <Column key={col.id} column={col} socket={socket} boardId={boardId} />)}
      </div>
    </div>
  );
}
