import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BoardView from './components/BoardView';
const socket = io(process.env.REACT_APP_SOCKET_URL || '/');

function App(){
  const [user] = useState({ id: 'user-1', name: 'Arjun' }); // replace with auth
  const [boardId, setBoardId] = useState(null);

  useEffect(()=> {
    // Example: join a demo board (create board via API in real usage)
    if (boardId) {
      socket.emit('joinBoard', { boardId, user });
    }
    return () => {
      if (boardId) socket.emit('leaveBoard');
    };
  }, [boardId]);

  return (
    <div>
      <h1>Collaborative Kanban</h1>
      <input placeholder="Board ID" value={boardId||''} onChange={(e)=>setBoardId(e.target.value)} />
      {boardId && <BoardView socket={socket} boardId={boardId} user={user} />}
    </div>
  );
}

export default App;
