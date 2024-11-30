import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    //store init states of user
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        password: '',
        role: ''
    });
    const [edit, confirmEdit] = useState(false); //for edit mode

    //fetch user data from backend
    useEffect(() => {
        fetch('http://localhost:5000/profile', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401 || 404) {
                    return response.json();
                } else if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message === "Data has been fetched!") {
                    setUser(data);
                }
                else {
                    console.log('Error:', data.message);
                }
            })
            .catch((error) => {
                console.log('Problem with fetching data', error);
            });
    }, []);

    //on submit, save new user data
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/profile', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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
                if (data.message === "Data has been fetched!") {
                    setMessage(data.message);
                    setUser(data);
                    confirmEdit(false);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            });
    };

    //helper function to edit profile
    const updateProfile = (type, currValue) => {
        setUser(prevValue => ({ ...prevValue, [type]: currValue }));
    };

    //navigate back to clubs
    const back = () => {
        navigate('/front-page');
    };

    return (
        <div style={{position: 'relative'}}>
            <h1 style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '3rem',
            }}>
                PROFILE
            </h1>
            <div>
                {/* display first name */}
                <label>
                    First Name:
                    <input
                        type="text"
                        value={user.first_name}
                        onChange={(e) => {updateProfile('first_name', e.target.value)}}
                        disabled={!edit}
                        />
                </label>
            </div>
            <div>
                {/* display last name */}
                <label>
                    Last Name:
                    <input
                    type="text"
                    value={user.last_name}
                    onChange={(e) => {updateProfile('last_name', e.target.value)}}
                    disabled={!edit}
                    />
                </label>
            </div>
            <div>
                {/* display email */}
                <label>
                    Email:
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => {updateProfile('email', e.target.value)}}
                        disabled={!edit}
                        />
                </label>
            </div>
            <div>
                {/* display username */}
                <label>
                    Username:
                    <input
                    type="text"
                    value={user.username}
                    onChange={(e) => {updateProfile('username', e.target.value)}}
                    disabled={!edit}
                    />
                </label>
            </div>
            <div>
                {/* display password */}
                <label>
                    Password:
                    <input
                    type="text"
                    value={user.password}
                    onChange={(e) => {updateProfile('password', e.target.value)}}
                    disabled={!edit}
                    />
                </label>
            </div>

            {/* buttons for edit mode */}
            {edit ? (
                <button onClick={handleSubmit}>Save</button>
            ) : (
                <button onClick={() => confirmEdit(true)}>Edit</button>
            )}

            {/* back to club */}
            <div className="button-container">
                <button style={{marginTop: '10px'}} onClick={back}>Back to Home</button>
            </div>
        </div>
    );
};

export default UserProfile;
