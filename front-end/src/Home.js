import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1 style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '4rem',
            }}>
                Welcome to RateMyClub
            </h1>
            <p style={{fontSize: '1.2rem', fontFamily: "'Alfa Slab One', serif", color: '#555'}}>
                Your one-stop destination to rate and review clubs at the University of Florida.
            </p>
            <Link to="/login">
                <button style={{padding: '10px 20px', fontSize: '16px', backgroundColor: '#59a7ff',}}>Login to Get Started</button>
            </Link>
        </div>
    );
};

export default Home;
