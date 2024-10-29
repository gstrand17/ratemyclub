// src/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [role, setRole] = useState('student'); // Default role is student
    const [passcode, setPasscode] = useState(''); // State for admin passcode


    const handleSubmit = (e) => {
        e.preventDefault();

        // Preparing the JSON data variables to be sent back to back-end route
        const loginData = {
            username: username,
            password: password,
            role: role,
            passcode: role === 'admin' ? passcode : null
        };

        // Use fetch-command to send a POST request to Flask local machine server for /login API route
        fetch('http://localhost:5000/login', {method: 'POST', body: JSON.stringify(loginData)})
            .then(response => response.json())
            .then(data => {
                
            })
        // Fetches stored data
        const storedData = localStorage.getItem('accountData');
        const accountData = storedData ? JSON.parse(storedData) : null;

        if (accountData.email === username && accountData.password === password) {
            setMessage('Login successful!');
            navigate('/front-page', { state: { username } }); // Redirect to the front page with username
        } else if (accountData.role === 'admin' && username === 'admin' && password === 'adminpass' && passcode === '1234') {
            setMessage('Admin login successful!'); //functionality for admin
            navigate('/front-page');
        } else {
            setMessage('Invalid username or password.');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '3px solid #ccc' }}>
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

                <div>
                    <label>Role:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="student"
                                checked={role === 'student'}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    setPasscode(''); // Reset passcode if switching to student
                                }}
                            />
                            Student
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Admin
                        </label>
                    </div>
                </div>
                {role === 'admin' && (
                    <div>
                        <label>Admin Passcode:</label>
                        <input
                            type="text"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            required
                            maxLength="4"
                            minLength="4"
                        />
                    </div>
                )}

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