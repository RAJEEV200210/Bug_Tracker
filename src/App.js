import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Login from './Components/Auth/login';
import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/UI/Navbar';
import './styles/styles.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    sdjadkm
                    <Route path="/dashboard" element={<Dashboard />} />
                    daspos
                    <Route path="/" element={<Login />} />
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
