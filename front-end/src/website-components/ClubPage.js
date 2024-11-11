import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

const ClubPage = () => {
    const { club_name } = useParams(); // using club_name to get club
    const [club, setClub] = useState([]);
    //const [newRating, setNewRating] = useState(0);
    //const [newReview, setNewReview] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/api/club-page/${club_name}`)
            .then(response => response.json())
            .then(data => setClub(data))
            .catch(error => console.log('Error fetching club data:', error));
    }, [club_name]);

    //Having issue finding the club from backend
    //if (!club) return <div>Club Not Found...</div>;


    return (
        <div>
            <h1> {club_name}</h1>
            <p>{club.description}</p>
            <p>{club.link}</p>


            {/* code option to submit their own ratings and/or reviews */}
        </div>
    );
};

export default ClubPage;