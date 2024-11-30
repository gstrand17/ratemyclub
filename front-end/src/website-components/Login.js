import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    //store init states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('student');
    const [passkey, setPasskey] = useState('');

    //helper function to handle submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Preparing the JSON data variables to be sent back to back-end route
        const loginData = {
            username: username,
            password: password,
            role: role,
            passkey: role === 'admin' ? passkey : null
        };

        // Use fetch-command to send a POST request to Flask local machine server for /login API route
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 401) {
                    return response.json();
                } else if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message) {
                    setMessage(data.message);
                }
                if (data.message === 'Successful Login!') {
                    setMessage(data.message);
                    navigate('/front-page', { state: { username } });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            });
    };

    return (
        <div style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '3px solid #ccc' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* Input username */}
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {/* Input password */}
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
                                    setPasskey(''); // Reset passcode if switching to student
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
                {/* check user admin passkey */}
                {role === 'admin' && (
                    <div>
                        <label>Admin Passkey:</label>
                        <input
                            type="text"
                            value={passkey}
                            onChange={(e) => setPasskey(e.target.value)}
                            required
                            maxLength="8"
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
