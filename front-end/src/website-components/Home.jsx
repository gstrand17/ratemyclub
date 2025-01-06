import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            height: '100vh',
            backgroundImage: 'url(/uf.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <h1 style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '5rem',
            }}>
                {/* Display title: */}
                Welcome to RateMyClub
            </h1>

            {/* display cute subtitle */}
            <p style={{fontSize: '1.5rem', fontFamily: "'Alfa Slab One', serif", color: '#1a1a1a'}}>
                Your one-stop destination to rate and review clubs at the University of Florida.
            </p>

            {/* Button to login */}
            <Link to="/login">
                <button style={{padding: '10px 20px', fontSize: '16px', backgroundColor: '#59a7ff',}}>Login to Get
                    Started
                </button>
            </Link>

            {/* Button to create an acct */}
            <Link to="/create-account">
                <button style={{marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#59a7ff',}}>
                    Create Account
                </button>
            </Link>
        </div>
    );
};

export default Home;