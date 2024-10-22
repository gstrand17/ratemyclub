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
            //backgroundImage: 'url(/uf_image.png)',
            backgroundImage: 'url(/uf.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <h1 style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '5rem',
            }}>
                Welcome to RateMyClub
            </h1>

            <p style={{fontSize: '1.5rem', fontFamily: "'Alfa Slab One', serif", color: '#1a1a1a'}}>
                Your one-stop destination to rate and review clubs at the University of Florida.
            </p>

            <Link to="/login">
                <button style={{padding: '10px 20px', fontSize: '16px', backgroundColor: '#59a7ff',}}>Login to Get
                    Started
                </button>
            </Link>

            <Link to="/create-account">
                <button style={{marginTop: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#59a7ff',}}>
                    Create Account
                </button>
            </Link>
        </div>
    );
};

//have the following options on home page or front-page?
//ADD A SEARCH BAR TO SEARCH FOR CLUBS?
    //search bar routes to club search page

//diff options shown depending on type of user?

//have buttons for:
                    // 1. profile
                    // 2. acct settings
                    // 3. your reviews
                    // 4. logout


export default Home;