import React from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import "../App.css";

const Cell = ({ card, rowIndex, colIndex, moveCard, isLastEmpty }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    canDrop: () => isLastEmpty && !card, // Can drop only if the previous cell is filled and this cell is empty
    drop: (item) => {
      moveCard(rowIndex, item.colIndex, colIndex);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { rowIndex, colIndex },
    canDrag: () => !!card, // Can drag only if a card exists
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`kanban-cell ${isOver ? "highlight" : ""}`}
      style={{ backgroundColor: card ? card.color : "rgba(0,0,0,0.05)" }}
    >
      {card && (
        <div ref={drag} className={`task-card ${isDragging ? "dragging" : ""}`}>
          {card.title}
        </div>
      )}
    </div>
  );
};

export default Cell;
