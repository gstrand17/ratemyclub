import React from 'react';
import './UserProfile.css';
import {useNavigate} from "react-router-dom";

const UserProfile = () => {
    //diff options shown depending on type of user?
    const navigate = useNavigate();
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