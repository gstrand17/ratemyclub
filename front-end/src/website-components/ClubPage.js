import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import YourReviews from "./YourReviews";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

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


//button if only club or admin edit details->blanks to change data?
//time_mem: store dates? member since ____
//date of review??

const ClubPage = () => {
    const navigate = useNavigate();
    const { club_name } = useParams(); // using club_name to get club
    const [reviews, setReviews] = useState([]);
    const [club, setClub] = useState({
        name: '',
        description: '',
        tags: '',
        avg_rating: 0.0,
        social_rating: 0.0,
        academic_rating:0.0,
        exec_rating:0.0,
        active_mem_count:0,
        commitment_level: 0.0,
        link: ''
    });
    //const [avgRating, setAvgRating] = useState(0);

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

                    setClub({
                        name: data.name,
                        description: data.description,
                        tags: data.tags,
                        avg_rating: data.avg_rating,
                        social_rating: data.social_rating,
                        academic_rating: data.academic_rating,
                        exec_rating: data.exec_rating,
                        active_mem_count: data.active_mem_count,
                        commitment_level: data.commitment_level,
                        link: data.link
                    });
                    if (data.reviews) {
                        setReviews(data.reviews); // Ensure reviews is an array
                    }
                } else {
                    console.log('Error:', data.message);
                }})
            .catch(error => console.log('Error fetching club data:', error));
    }, [club_name]);

    //code for a bar chart of ratings
    const barChartData = {
        labels: ['Social', 'Academic', 'Executive Board', 'Commitment Level'], // Rating categories
        datasets: [
            {
                label: 'Rating',
                data: [
                    club.social_rating,
                    club.academic_rating,
                    club.exec_rating,
                    club.commitment_level
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Light teal
                    'rgba(153, 102, 255, 0.2)', // Light purple
                    'rgba(255, 159, 64, 0.2)', // Light orange
                    'rgba(255, 99, 132, 0.2)' // Light red
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', // Teal
                    'rgba(153, 102, 255, 1)', // Purple
                    'rgba(255, 159, 64, 1)', // Orange
                    'rgba(255, 99, 132, 1)' // Red
                ],
                borderWidth: 2
            }
        ]
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Rating Distribution by Category',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 20, // Padding from the top
                    bottom: 20 // Padding from the bottom
                }
            },
            legend: {display: false},
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(1)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5 //scale of 0-5 for ratings!
            }
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
            }}>
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '3rem',
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

            {/* Tags */}
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

            {/* emphasize overall average rating*/}
            <h2>
                <span style={{fontWeight: 'bold', fontSize: '3rem'}}>{club.avg_rating.toFixed(1)}</span>
                <span style={{fontWeight: 'bold', fontSize: '1.5rem', color: '#777'}}> / 5</span>
                <div style={{fontSize: '1rem', fontWeight: 'bold'}}>
                    Average Overall Rating
                </div>
            </h2>

            {/* Bar Chart */}
            <div style={{maxWidth: '600px', margin: '2rem auto'}}>
                <Bar data={barChartData} options={barChartOptions}/>
            </div>

            <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>
                Student Reviews:
            </div>

            <div>
                {reviews.map((review, index) => (
                    <div key={index} style={{
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '1rem'
                    }}>
                        <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem'}}>{club_name}</h3>
                        <p style={{fontStyle: 'italic', color: '#666'}}>Date: {review.date}</p>
                        <h1 style={{fontSize: '1.2rem'}}>Overall: <strong>{review.overall_rating.toFixed(1)}/5</strong></h1>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
                            <span>Social: <strong>{review.soc_rating}</strong>/5</span>
                            <span>Academic: <strong>{review.acad_rating}</strong>/5</span>
                            <span>Executive: <strong>{review.exec_rating}</strong>/5</span>
                            <span>Commitment Level: <strong>{review.comlev}</strong>/5</span>
                        </div>
                        <p style={{
                            border: '1px solid #ddd',
                            borderRadius: '7px',
                            padding: '1rem'}}>{review.review_text}</p>
                        <p>Time as Member: <strong>{review.time_mem}</strong></p>
                        <p>Current Member: <strong>{review.current_mem ? 'Yes' : 'No, Former'}</strong></p>
                        <p>Paid Membership: <strong>{review.paid ? 'Yes' : 'No'}</strong></p>
                    </div>
                ))}
            </div>

            <button onClick={handleReviewForm}>Submit a Review</button>

        </div>
    );
};

export default ClubPage;