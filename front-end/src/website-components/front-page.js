import './front-page.css';
import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
//import bannerImage from './uf_dupe.png';
//import bannerImage from './banner.jpg';

const FrontPage = () => {
//ADD A SEARCH BAR TO SEARCH FOR CLUBS?
    //search bar routes to club search page

//diff options shown depending on type of user?
    //get user role from login/create acct or backend?

    // website structure goes here
    const location = useLocation();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/front-page', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
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
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                }
                else {
                    console.log('Error:', data.message);
                }
            })
            .catch((error) => {
                console.log('Problem with fetching data', error);
            });
    }, []);

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


    return (
        <div style={{position: 'relative'}}>
            {/* Banner Image */}
            <img
                src={`${process.env.PUBLIC_URL}/banner.jpg`} //Replaced it with img src to avoid using import
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
                WELCOME {firstName} {lastName}
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
