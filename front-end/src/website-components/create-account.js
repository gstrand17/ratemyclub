import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './create-account.css';

const CreateAccount = () => {
    const [email, setEmail] = useState(''); //SEND TO BACKEND SOMEHOW
    const [password, setPassword] = useState(''); //SEND TO BACKEND
    const [role, setRole] = useState('student'); // Default role
    //can admin create an acct?
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock account creation logic->replace this with real logic later!
        console.log('Account Created:', { email, password, role });
        alert(`Account created for ${role} with email: ${email}`);
        // Reset form, optional
        setEmail('');
        setPassword('');
        setRole('student');
        // Navigate to the home page after successful account creation
        navigate('/');
    };

    return (
        <div style={{maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc'}}>

            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>

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
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Student
                        </label>
                        <label>
                            <input //USER == CLUB MEMBER
                                type="radio"
                                value="clubMember"
                                checked={role === 'clubMember'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Club Member
                        </label>
                        <label>
                            <input //USER == CLUB OWNER
                                type="radio"
                                value="clubOwner"
                                checked={role === 'clubOwner'}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            Club Owner
                        </label>
                    </div>
                </div>

                <button type="submit" style={{padding: '10px 20px', fontSize: '16px', marginTop: '10px'}}>
                    Create Account
                </button>
            </form>

        </div>
    );
};

//once login, direct back to home? make sure user can see "their reviews"

export default CreateAccount;