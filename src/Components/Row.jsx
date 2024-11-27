import React from "react";
import Cell from "./Cell";
import "../App.css";

const Row = ({ row, rowIndex, moveCard, deleteTask }) => {
  return (
    <div className="kanban-row">
      {row.map((card, colIndex) => {
        const isDraggable = !!card; // Card exists
        const isDroppable =
          !card && // Cell is empty
          (colIndex === 4 || // "BLOCK" column is always droppable
            row[4] !== null || // Allow from "BLOCK" to any column
            (Math.abs(colIndex - row.findIndex((c) => c)) === 1)); // Adjacent columns only

        return (
          <Cell
            key={colIndex}
            card={card}
            rowIndex={rowIndex}
            colIndex={colIndex}
            moveCard={moveCard}
            isDraggable={isDraggable}
            isDroppable={isDroppable}
            deleteTask={deleteTask} // Pass deleteTask function to Cell
          />
        );
      })}
    </div>
  );
};

export default Row;
