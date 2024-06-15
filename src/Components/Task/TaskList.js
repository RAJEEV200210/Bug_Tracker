import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = ({ tasks, setTasks, editTask }) => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const addTask = (task) => {
        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(newTask => {
            setTasks([...tasks, newTask]);
            setShowTaskForm(false);
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const endTask = (id) => {
        const endDate = new Date().toISOString();
        const task = tasks.find(task => task.id === id);
        if (!task) {
            console.error('Task not found');
            return;
        }

        const startDate = new Date(task.startDate);
        const end = new Date(endDate);
        const timeDiff = Math.abs(end - startDate);
        const daysSpent = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...task, status: 'Closed', endDate, daysSpent })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(updatedTask => {
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const handleEditTask = (task) => {
        setTaskToEdit(task);
        setShowTaskForm(true);
    };

    return (
        <div>
            <button onClick={() => { setShowTaskForm(!showTaskForm); setTaskToEdit(null); }}>
                {showTaskForm ? 'Hide Form' : 'Create New Task'}
            </button>
            {showTaskForm && <TaskForm addTask={taskToEdit ? editTask : addTask} taskToEdit={taskToEdit} onClose={() => setShowTaskForm(false)} />}
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onEdit={handleEditTask}
                    onDelete={deleteTask}
                    onEndTask={endTask}
                />
            ))}
        </div>
    );
};

export default TaskList;
