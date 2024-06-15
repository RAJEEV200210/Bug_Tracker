import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import TaskList from '../Task/TaskList';
const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <nav>
            <h1>Bug Tracker</h1>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {isAuthenticated ? (
                    <li><button onClick={logout}>Logout</button></li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
