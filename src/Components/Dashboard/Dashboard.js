import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../Context/AuthContext';
import TaskList from '../Task/TaskList';
import TrendChart from './TrendChart';
import TaskForm from '../Task/TaskForm';

const Dashboard = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setTasks(data))
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    }, []);

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
        .then(newTask => setTasks([...tasks, newTask]))
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const editTask = (task) => {
        fetch(`http://localhost:5000/api/tasks/${task.id}`, {
            method: 'PUT',
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
        .then(updatedTask => {
            setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    if (!isAuthenticated) {
        return <div>Please log in to view the dashboard.</div>;
    }

    return (
        <div className="dashboard">
            <div className='header' style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1>Dashboard</h1>
                <button onClick={() => setShowTaskForm(!showTaskForm)}>
                    {showTaskForm ? 'Hide Form' : 'Create New Task'}
                </button>
            </div>
            {showTaskForm && <TaskForm addTask={addTask} onClose={() => setShowTaskForm(false)} />}
            <TaskList tasks={tasks} setTasks={setTasks} editTask={editTask} />
            <TrendChart tasks={tasks} />
        </div>
    );
};

export default Dashboard;
