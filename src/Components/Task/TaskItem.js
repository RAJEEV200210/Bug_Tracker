import React, { useState } from 'react';

const TaskItem = ({ task, onEdit, onDelete, onEndTask }) => {
    const [isDetailsVisible, setDetailsVisible] = useState(false);

    const handleViewClick = () => {
        setDetailsVisible(!isDetailsVisible);
    };

    const handleEditClick = () => {
        onEdit(task);
    };

    return (
        <div className="task-item">
            <h3>{task.title}</h3>
            <button onClick={handleViewClick}>
                {isDetailsVisible ? 'Hide' : 'View'}
            </button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
            {task.status !== 'Closed' && (
                <button onClick={() => onEndTask(task.id)}>End Task</button>
            )}
            {task.status === 'Closed' && (
                <p>Days Spent: {task.daysSpent}</p>
            )}
            {isDetailsVisible && (
                <div>
                    <p>Description: {task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.status}</p>
                    <p>Assignee: {task.assignee}</p>
                    <p>Due Date: {task.dueDate}</p>
                    <p>Start Date: {task.startDate}</p>
                    {task.status !== 'Closed' && (
                        <button onClick={handleEditClick}>Edit</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskItem;
