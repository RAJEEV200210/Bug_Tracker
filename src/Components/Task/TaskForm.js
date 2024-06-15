import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, onClose, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Open');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setPriority(taskToEdit.priority);
            setStatus(taskToEdit.status);
            setAssignee(taskToEdit.assignee);
            setDueDate(taskToEdit.dueDate);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: taskToEdit ? taskToEdit.id : Date.now(),
            title,
            description,
            priority,
            status,
            assignee,
            dueDate,
            startDate: taskToEdit ? taskToEdit.startDate : new Date().toISOString(),
        };
        if (taskToEdit) {
            addTask(newTask);
        } else {
            addTask(newTask);
        }
        setTitle('');
        setDescription('');
        setPriority('Low');
        setStatus('Open');
        setAssignee('');
        setDueDate('');
        onClose();
    };

    return (
        <div>
            <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <div>
                    <label>Assignee</label>
                    <input
                        type="text"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    />
                </div>
                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <button type="submit">{taskToEdit ? 'Save Changes' : 'Add Task'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default TaskForm;
