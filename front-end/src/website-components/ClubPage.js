import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

const ClubPage = () => {
    const { club_name } = useParams(); // using club_name to get club
    const [review, setReview] = useState([]);
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
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
                    setDescription(data.description);
                    setLink(data.link);
                } else {
                    console.log('Error:', data.message);
                }})
            .catch(error => console.log('Error fetching club data:', error));
    }, [club_name]);

    //Having issue finding the club from backend
    //if (!club) return <div>Club Not Found...</div>;


    return (
        <div>
            <h1> {club_name}</h1>
            <p>{description}</p>
            <p>{link}</p>


            {/* code option to submit their own ratings and/or reviews */}
        </div>
    );
};

export default ClubPage;