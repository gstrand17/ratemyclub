import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate

const CreateAccount = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState(''); //SEND TO BACKEND SOMEHOW
    const [password, setPassword] = useState(''); //SEND TO BACKEND
    const [role, setRole] = useState('student'); // Default role
    const [firstName, setFirstName] = useState(''); // State for first name
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [passkey, setPasskey] = useState(''); // State for admin passcode
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        // Preparing the JSON data variables to be sent back to back-end route
        const createAccountData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            user_name: username,
            password: password,
            role: role,
            passkey: role === 'admin' ? passkey : null
        };

        // Use fetch-command to send a POST request to Flask local machine server for /login API route
        fetch('http://localhost:5000/create-account', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createAccountData),
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
                if (data.message === 'User created!') {
                    console.log(data.message);
                    navigate('/front-page', { state: { username } });
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            });
    };

    return (
        <div style={{maxWidth: '400px', margin: 'auto', padding: '20px', border: '3px solid #ccc'}}>

            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>

                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>

                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>

                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="username"
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
                            <input //USER == STUDENT
                                type="radio"
                                value="student"
                                checked={role === 'student'}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    setPasskey(''); // Reset passcode when switching roles
                                }}
                            />
                            Student
                        </label>
                        <label>
                            <input //USER == CLUB MEMBER
                                type="radio"
                                value="clubMember"
                                checked={role === 'clubMember'}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    setPasskey(''); // Reset passcode when switching roles
                                }}
                            />
                            Club Member
                        </label>
                        <label>
                            <input //USER == CLUB OWNER
                                type="radio"
                                value="clubOwner"
                                checked={role === 'clubOwner'}
                                onChange={(e) => {
                                    setRole(e.target.value);
                                    setPasskey(''); // Reset passcode when switching roles
                                }}
                            />
                            Club Owner
                        </label>

                        <label>
                            <input //ADMIN
                                type="radio"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Admin
                        </label>

                    </div>
                </div>

                {/* Admin passcode input */}
                {role === 'admin' && (
                    <div>
                        <label>Admin Passkey:</label>
                        <input
                            type="text"
                            value={passkey}
                            onChange={(e) => setPasskey(e.target.value)}
                            maxLength={8} // Limit to 12 digits
                            required
                        />
                    </div>
                )}

                <button type="submit" style={{padding: '10px 20px', fontSize: '16px', marginTop: '10px'}}>
                    Create Account
                </button>

                <Link to="/">
                    <button style={{padding: '10px 20px', fontSize: '16px', marginTop: '10px'}}>
                        Home
                    </button>
                </Link>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

//should we add options to add clubs they belong to if they click club owner/club member, or do that in the profile page??

export default CreateAccount;