import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import YourReviews from "./YourReviews";

//helper method to color code tags
const getTagColor = (tag) => {
    //creates a hash value for each tag
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    //convert hash value->hex color
    const color = `#${((hash >> 24) & 0xFF).toString(16).padStart(2, '0')}${
        ((hash >> 16) & 0xFF).toString(16).padStart(2, '0')
    }${((hash >> 8) & 0xFF).toString(16).padStart(2, '0')}`;
    return color;
};

const ClubPage = () => {
    const navigate = useNavigate();
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

    const handleReviewForm = () => {
        navigate('/ReviewForm');
    }

    const handleReviews = () => {
        navigate('/YourReviews')
    }

    const handleHome = () => {
        navigate('/front-page');
    };

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

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center', // Align items vertically centered
                justifyContent: 'space-between', // Center horizontally
                textAlign: 'center', // center text for h1
            }}>
                <h1 style={{
                    textAlign: 'center',
                }}>{club_name}</h1>
                <div className="button-container"
                     style={{
                         textAlign: 'right',
                     }}>
                    <button onClick={handleProfile}>Profile</button>
                    <button onClick={handleReviews}>Your Reviews</button>
                    <button onClick={handleHome}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap',}}>
                {(Array.isArray(club.tags) ? club.tags : club.tags ? club.tags.split('|') : [])
                    .filter(tag => tag.trim() !== '') // Filter out empty tags
                    .map((tag, tagIndex) => (
                        <span
                            key={tagIndex}
                            style={{
                                backgroundColor: getTagColor(tag),
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '15px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                            }}>
                            {tag.trim()}
                        </span>
                    ))}
            </div>

            <p>{club.description}</p>
            <p>Link: <a href={club.link}>{club.link}</a></p>
            <p>Average Rating: {club.avg_rating}</p>


            <button onClick={handleReviewForm}>Submit a Review</button>
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