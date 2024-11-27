import React from "react";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import "../App.css";

const Cell = ({ card, rowIndex, colIndex, moveCard, isDraggable, isDroppable, deleteTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    canDrop: () => isDroppable,
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
    canDrag: () => isDraggable,
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
          <div>{`#${card.id}`}</div> {/* Ticket number */}
          <div>{card.title}</div> {/* Story title */}
        </div>
      )}

      {/* Show the delete button if the card is in the "DONE" column */}
      {colIndex === 3 && card && (
        <button
          className="delete-button small"
          onClick={() => deleteTask(rowIndex, colIndex)} // Delete the task
        >
          X
        </button>
      )}
    </div>
  );
};

export default Cell;
