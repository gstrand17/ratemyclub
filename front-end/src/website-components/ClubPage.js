import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

const ClubPage = () => {
    const { club_name } = useParams(); // using club_name to get club
    //const [reviews, setReviews] = useState([]);
    const [club, setClub] = useState({
        name: '',
        description: '',
        tags: '',
        avg_rating: 0.0,
        social_rating: 0.0,
        academic_rating:0.0,
        exec_rating:0.0,
        active_mem_rating:0.0,
        link: ''
    });
    //const [newRating, setNewRating] = useState(0);
    //const [newReview, setNewReview] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/api/club-page/${club_name}`)
            .then(response =>  {
                if (response.status === 401 || 404) {
                    return response.json();
                } else if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data =>  {
                if (data.message === "Data has been fetched!") {
                    console.log(data.description);
                    //setReviews(data);
                    setClub(data);
                } else {
                    console.log('Error:', data.message);
                }})
            .catch(error => console.log('Error fetching club data:', error));
    }, [club_name]);

    //Having issue finding the club from backend
    //if (!club) return <div>Club Not Found...</div>;


    return (
        <div>
            <h1 style={{
                textAlign: 'center',
            }}> {club_name}</h1>
            <p>Description: {club.description}</p>
            <p>Link: <a href={club.link}>{club.link}</a></p>
            <p>Average Rating: {club.avg_rating}</p>
            {/*<div>*/}
            {/*    {reviews.map((review, index) => (*/}
            {/*        <div key={index}>*/}
            {/*            <h2>{review.user_email}</h2>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
};

export default ClubPage;