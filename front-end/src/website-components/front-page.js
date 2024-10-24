import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import bannerImage from './uf_dupe.png';
import bannerImage from './banner.jpg';

const FrontPage = () => {
//ADD A SEARCH BAR TO SEARCH FOR CLUBS?
    //search bar routes to club search page

//diff options shown depending on type of user?
    //get user role from login/create acct or backend?

    const storedData = localStorage.getItem('accountData');
    const accountData = storedData ? JSON.parse(storedData) : null;

    // website structure goes here
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || { username: '' }; // Default to '' if no username is provided
    //^Change this to retrieve from backend database

    const handleLogout = () => {
        // Clear user authentication data here (localStorage, sessionStorage, etc.) BACKEND
        // Navigate back home
        navigate('/');
    };
    const handleProfile = () => {
        // Navigate to user profile page
        navigate('/profile');
    };

    return (
        <div style={{position: 'relative'}}>
            {/* Banner Image */}
            <img
                src={bannerImage}
                alt="Banner"
                style={{
                    width: '100%', // Make the image full width
                    height: '200px', // Maintain aspect ratio
                    objectFit: 'cover',
                }}
            />

            <h1 style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '3rem',
                marginTop: '20px',
            }}>
                WELCOME {accountData.firstName}
            </h1>


            <div className="button-container">
                <button onClick={handleProfile}>Profile</button>
                <button>Your Reviews</button>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>

    );
};

export default FrontPage;