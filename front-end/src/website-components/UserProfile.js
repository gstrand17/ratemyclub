import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    //diff options shown depending on type of user?
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        role: ''
    });
    const [edit, confirmEdit] = useState(false);

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
    })

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
    }

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
            {/*
                Get info from backend: Name, email, role, hide pass(?)
                Have an edit button
             */}
                <div className="button-container">
                    <button onClick={back}>Back to Home</button>
                </div>

        </div>

    );
};

export default UserProfile;