import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const ReviewForm = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user authentication data here (localStorage, sessionStorage, etc.) BACKEND
        // Navigate back home
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    navigate('/');
                } else {
                    console.log('Error:', response.message);
                }
            });
    };
    const handleProfile = () => {
        // Navigate to user profile page
        navigate('/profile');
    };

    const handleHome = () => {
        navigate('/front-page');
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center', // Align items vertically centered
            justifyContent: 'space-between', // Center horizontally
            textAlign: 'center', // center text for h1
        }}>
            <h1 style={{
                textAlign: 'center',
            }}>Review Form</h1>
            <div className="button-container"
                 style={{
                     textAlign: 'right',
                 }}>
                <button onClick={handleProfile}>Profile</button>
                <button onClick={handleHome}>Home</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
};

export default ReviewForm;