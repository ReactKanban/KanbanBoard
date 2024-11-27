import React, { useState } from "react";
import "../App.css";

const AddTask = ({ addTask }) => {
    const [ticketNumber, setTicketNumber] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [showTitleField, setShowTitleField] = useState(false);

    const handleAddTask = () => {
        if (ticketNumber && taskTitle) {
            // Call the addTask function to add a task at the bottom of the board
            addTask(ticketNumber, taskTitle);
            setTicketNumber(""); // Reset ticket number field
            setTaskTitle(""); // Reset task title field
            setShowTitleField(false); // Hide task title input field
        }
    };

    return (
        <div className="add-task">
            {!showTitleField ? (
                <>
                    <input
                        type="text"
                        placeholder="Enter Ticket Number"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                    />
                    <button
                        onClick={() => {
                            if (ticketNumber) {
                                setShowTitleField(true); // Proceed to task title input when ticket number is filled
                            }
                        }}
                    >
                        Next
                    </button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter Task Title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                </>
            )}
        </div>
    );
};

export default AddTask;
