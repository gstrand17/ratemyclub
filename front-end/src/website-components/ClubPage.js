import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

const ClubPage = () => {
    const { club_name } = useParams(); // using club_name to get club
<<<<<<< HEAD
    const [review, setReview] = useState([]);
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [clubs, setClubs] = useState([]);  //club data
    const [club, setClub] = useState(null);  // state to hold specific club information
=======
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
>>>>>>> f1537d7d4440e8e440c655ad492ee694caeb796b
    //const [newRating, setNewRating] = useState(0);
    //const [newReview, setNewReview] = useState('');

    useEffect(() => {
<<<<<<< HEAD
        fetch('http://localhost:5000/api/clubs', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the fetched data to see its structure
                setClubs(data); // Assume each club object already has avg_rating property

                // Find the specific club that matches the club_name
                const foundClub = data.find(club => club.name === club_name);
                if (foundClub) {
                    setClub(foundClub);
                    setDescription(foundClub.description || 'No description available'); // Set description if available
                    setLink(foundClub.link || 'No link available'); // Set link if available
=======
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
>>>>>>> f1537d7d4440e8e440c655ad492ee694caeb796b
                } else {
                    setClub(null); // If no club is found, set club to null
                }
            })
            .catch(error => console.log('Error fetching club data:', error));
    }, [club_name]);

    //Having issue finding the club from backend
    //if (!club) return <div>Club Not Found...</div>;


    return (
        <div>
<<<<<<< HEAD
            <h1 style = {{
                textAlign: 'center',
            }}>Club Name: {club_name}</h1>
            <p>Description: {description}</p>
            <p>Link: {link}</p>

            {/* code option to submit their own ratings and/or reviews */}
=======
            <h1> {club_name}</h1>
            <p>{club.description}</p>
            <p>{club.link}</p>
            <p>{club.avg_rating}</p>
            {/*<div>*/}
            {/*    {reviews.map((review, index) => (*/}
            {/*        <div key={index}>*/}
            {/*            <h2>{review.user_email}</h2>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
>>>>>>> f1537d7d4440e8e440c655ad492ee694caeb796b
        </div>
    );
};

export default ClubPage;