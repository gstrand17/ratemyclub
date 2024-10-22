// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication
        if (username === 'user' && password === 'pass') {
            setMessage('Login successful!');
            navigate('/'); // Redirect to the home page->change to front-page
        } else {
            setMessage('Invalid username or password.');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* Bigger Login Button */}
                <button type="submit" style={{ padding: '5px 10px', fontSize: '18px', marginTop: '10px' }}>
                    Login
                </button>
            </form>
            {message && <p>{message}</p>}

            {/* Button to go back to Home */}
            <Link to="/">
                <button style={{marginTop: '10px', padding: '5px 10px', fontSize: '13px'}}>
                    Back to Home
                </button>
            </Link>

            {/* Button to Create Account */}
            <Link to="/create-account">
                <button style={{marginTop: '10px', padding: '5px 10px', fontSize: '13px'}}>
                    Create Account
                </button>
            </Link>
        </div>
    );
};

export default Login;