import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './create-account.css';

const CreateAccount = () => {
    const [email, setEmail] = useState(''); //SEND TO BACKEND SOMEHOW
    const [password, setPassword] = useState(''); //SEND TO BACKEND
    const [role, setRole] = useState('student'); // Default role
    const [firstName, setFirstName] = useState(''); // State for first name
    const [lastName, setLastName] = useState('');
    const [adminPasscode, setAdminPasscode] = useState(''); // State for admin passcode
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const accountData = { email, password, role, firstName, lastName, adminPasscode };

        // Store account data in local storage
        localStorage.setItem('accountData', JSON.stringify(accountData));

        // Check if the admin passcode is required and validate it
        if (role === 'admin' && adminPasscode !== '1234') { // Replace '1234' with your actual admin passcode logic
            alert('Invalid admin passcode.');
            return;
        }


        // Mock account creation logic->replace this with real logic later!
        console.log('Account Created:', { firstName, lastName, email, password, role });
        alert(`Account created for ${role} ${firstName} with email: ${email}`);
        // Reset form, optional
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setRole('student');
        setAdminPasscode('');

        const username = `${firstName}`;
        // Navigate to the front page after successful account creation
        navigate('/front-page', { state: { username } });
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
                                    setAdminPasscode(''); // Reset passcode when switching roles
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
                                    setAdminPasscode(''); // Reset passcode when switching roles
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
                                    setAdminPasscode(''); // Reset passcode when switching roles
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
                        <label>Admin Passcode:</label>
                        <input
                            type="text"
                            value={adminPasscode}
                            onChange={(e) => setAdminPasscode(e.target.value)}
                            maxLength={4} // Limit to 4 digits
                            required
                        />
                    </div>
                )}

                <button type="submit" style={{padding: '10px 20px', fontSize: '16px', marginTop: '10px'}}>
                    Create Account
                </button>
            </form>

        </div>
    );
};

//should we add options to add clubs they belong to if they click club owner/club member, or do that in the profile page??

export default CreateAccount;