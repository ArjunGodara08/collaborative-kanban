import React from 'react';

export default function Column({ column, socket, boardId }) {
  const onDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ cardId: card.id, fromColumnId: column.id }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    // Emit move event
    socket.emit('card:move', { boardId, cardId: data.cardId, fromColumnId: data.fromColumnId, toColumnId: column.id, position: 0 });
  };

  const onDragOver = (e) => e.preventDefault();

  return (
    <div style={{ border: '1px solid #ddd', padding: 8, width: 280 }}>
      <h3>{column.title}</h3>
      <div onDrop={onDrop} onDragOver={onDragOver} style={{ minHeight: 200 }}>
        {column.cards?.map(card => (
          <div key={card.id} draggable onDragStart={(e)=>onDragStart(e, card)} style={{ padding: 8, margin: 8, background:'#fff', boxShadow:'0 0 2px rgba(0,0,0,.1)' }}>
            <div>{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
