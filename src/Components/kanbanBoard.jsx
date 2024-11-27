import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "./Row";
import AddTask from "./AddTask";
import "../App.css";

const KanbanBoard = () => {
  const [rows, setRows] = useState([
    [{ id: 1, title: "TASK1", color: "#4a90e2" }, null, null, null, null],
    [{ id: 2, title: "TASK2", color: "#5c5bc5" }, null, null, null, null],
    [{ id: 3, title: "TASK3", color: "#c54c4c" }, null, null, null, null],
    [{ id: 4, title: "TASK4", color: "#d7c544" }, null, null, null, null],
  ]);

  // Add a new task to the board
  const addTask = (ticketNumber, taskTitle) => {
    const newTask = {
      id: ticketNumber,
      title: taskTitle,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate a random color
    };

    // Always create a new row at the bottom
    setRows((prevRows) => [
      ...prevRows,
      [newTask, null, null, null, null],
    ]);
  };

  // Move card from one column to another
  const moveCard = (fromRowIndex, fromColIndex, toColIndex) => {
    const newRows = [...rows];
    const card = newRows[fromRowIndex][fromColIndex];

    // Move the card
    newRows[fromRowIndex][fromColIndex] = null;
    newRows[fromRowIndex][toColIndex] = card;

    setRows(newRows);
  };

  // Delete task from board and shift rows up
  const deleteTask = (rowIndex, colIndex) => {
    const newRows = [...rows];

    // Remove the task by setting it to null
    newRows[rowIndex][colIndex] = null;

    // Shift the rows up by removing empty rows and compacting the array
    const compactedRows = newRows.filter(row => row.some(cell => cell !== null));

    setRows(compactedRows); // Update state with compacted rows
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <AddTask addTask={addTask} />
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
                deleteTask={deleteTask} // Pass deleteTask function
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
