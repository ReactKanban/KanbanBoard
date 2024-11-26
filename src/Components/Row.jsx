import React from "react";
import Cell from "./Cell";
import "../App.css";

const Row = ({ row, rowIndex, moveCard }) => {
  return (
    <div className="kanban-row">
      {row.map((card, colIndex) => (
        <Cell
          key={colIndex}
          card={card}
          rowIndex={rowIndex}
          colIndex={colIndex}
          moveCard={moveCard}
          isLastEmpty={colIndex === 0 || row[colIndex - 1] !== null} // Only allow if the previous cell is filled
        />
      ))}
    </div>
  );
};

export default Row;
