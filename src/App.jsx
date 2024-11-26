import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
