import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "./Row";
import "../App.css";

const KanbanBoard = () => {
  // State for the cards
  const [rows, setRows] = useState([
    [{ id: 1, title: "TASK1", color: "#4a90e2" }, null, null, null, null],
    [{ id: 2, title: "TASK2", color: "#5c5bc5" }, null, null, null, null],
    [{ id: 3, title: "TASK3", color: "#c54c4c" }, null, null, null, null],
    [{ id: 4, title: "TASK4", color: "#d7c544" }, null, null, null, null],
  ]);

  // Handle moving a card
  const moveCard = (fromRowIndex, fromColIndex, toColIndex) => {
    const newRows = [...rows];
    const card = newRows[fromRowIndex][fromColIndex];

    // Move the card
    newRows[fromRowIndex][fromColIndex] = null;
    newRows[fromRowIndex][toColIndex] = card;

    setRows(newRows);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        <div className="kanban-header">
          {["TODO", "IN PROGRESS", "IN QA", "DONE", "BLOCK"].map((column) => (
            <div key={column} className="kanban-column-header">
              {column}
            </div>
          ))}
        </div>
        <div className="kanban-body">
          {rows.map((row, rowIndex) => (
            <Row
              key={rowIndex}
              row={row}
              rowIndex={rowIndex}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
