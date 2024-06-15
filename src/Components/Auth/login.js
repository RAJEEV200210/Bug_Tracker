import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import AuthContext from '../../Context/AuthContext';
import AuthContext from '../../Context/AuthContext';
const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    console.log("App.js1")
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        navigate('/dashboard');
    };
    // /sbcnxz

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                <button type="submit">Login</button>
            </form>
                                                                                                                                                                                                                                                                                                                                                                        
        </div>
    );
};

export default Login;
