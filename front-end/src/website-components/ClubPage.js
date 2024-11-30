import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import YourReviews from "./YourReviews";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

//button if only club or admin edit details->blanks to change data?
//button to edit your review in YourReviews.js?
//admin can delete reviews

const ClubPage = () => {
    const navigate = useNavigate();
    const { club_name } = useParams(); // using club_name to get club
    const [reviews, setReviews] = useState([]);
    const [club, setClub] = useState({
        name: '',
        description: '',
        tags: '',
        avg_overall_rating: 0.0,
        avg_soc_rating: 0.0,
        avg_acad_rating:0.0,
        avg_exec_rating:0.0,
        active_mem_count:0,
        avg_comlev: 0.0,
        link: ''
    });
    const [isEditing, setIsEditing] = useState(false); //track editing mode for admin/club owners
    const [updatedClub, setUpdatedClub] = useState({description: '', link: '' }); //store the edits,names/tags: ''
    const [userRole, setUserRole] = useState(''); // Role of the user
    const [isClubOwner, setIsClubOwner] = useState(false);

    const handleLogout = () => {
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
        navigate('/profile');
    };

    const handleReviewForm = () => {
        navigate(`/ReviewForm/${club_name}`);
    }

    const handleReviews = () => {
        navigate('/YourReviews')
    }

    const handleHome = () => {
        navigate('/front-page');
    };

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
                        avg_overall_rating: data.avg_overall_rating,
                        avg_soc_rating: data.avg_soc_rating,
                        avg_acad_rating: data.avg_acad_rating,
                        avg_exec_rating: data.avg_exec_rating,
                        active_mem_count: data.active_mem_count,
                        avg_comlev: data.avg_comlev,
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

    //fetch the list of review IDs the user has liked
    useEffect(() => {
        fetch('http://localhost:5000/api/liked-reviews', { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                if (data.liked_reviews) {
                    setLikedReviews(data.liked_reviews);
                }
            });
    }, []);

    // Fetch user role and club details
    useEffect(() => {
        fetch('http://localhost:5000/api/user-role', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                if (data.role) {
                    setUserRole(data.role); // Set role
                }
                if (data.clubs === club_name) {
                    setIsClubOwner(true);
                }
            });
        fetch(`http://localhost:5000/api/club-page/${club_name}`)
            .then(response => response.json())
            .then(data => {
                if (data.message === "Data has been fetched!") {
                    setClub(data);
                    setUpdatedClub({
                        description: data.description,
                        link: data.link,
                    });
                }
            });
    }, [club_name]);

    // Handle edits
    const handleEditToggle = () => setIsEditing(!isEditing);

    //store edited changes
    const handleFieldChange = (field, value) => {
        setUpdatedClub(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        fetch(`http://localhost:5000/api/club-page/${club_name}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updatedClub),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Club updated successfully") {
                    setClub(prev => ({
                        ...prev,
                        description: updatedClub.description,
                        link: updatedClub.link,
                    }));
                    setIsEditing(false);
                }
            })
            .catch(error => console.log('Error saving club details:', error));
    };

    //helper function for admin to delete reviews
    const handleDelete = (reviewId) => {
        if (userRole !== 'admin') {
            console.log('Only admins can delete reviews');
            return;
        }

        fetch(`http://localhost:5000/api/review/${reviewId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'Review deleted successfully') {
                    console.log('Review has been successfully deleted!');
                    setReviews((prevReviews) => prevReviews.filter((review) => review.review_num !== reviewId));
                } else {
                    console.log('Error:', data.message);
                }
            })
            .catch((error) => console.log('Error deleting review:', error));
    };

    //helper function for admin to unflag student reviews
    const handleUnflagReview = (reviewId) => {
        if (userRole !== 'admin') return;

        fetch(`http://localhost:5000/api/review/${reviewId}/unflag`, {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Review unflagged') {
                    setReviews(prevReviews => prevReviews.map(review =>
                        review.review_num === reviewId ? { ...review, flagged: false } : review
                    ));
                }
            })
            .catch(error => console.log('Error unflagging review:', error));
    };

    //code for a bar chart of average club ratings
    const barChartData = {
        labels: ['Social', 'Academic', 'Executive Board', 'Commitment Level'], // Rating categories
        datasets: [
            {
                label: 'Rating',
                data: [
                    club.avg_soc_rating,
                    club.avg_acad_rating,
                    club.avg_exec_rating,
                    club.avg_comlev
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

    //helper method for bar chart
    const barChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Average Rating Distributions by Category',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 20,
                    bottom: 20
                }
            },
            legend: {display: false},
            tooltip: {
                callbacks: {
                    title: () => null,
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(1)}`;
                    }
                },
                bodyColor: 'black',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5 //scale of 0-5 for ratings!
            }
        }
    };

    //helper method for users to like a review and update count in backend
    const [likedReviews, setLikedReviews] = useState([]);
    const handleThumbsUp = (reviewId) => {
        fetch(`http://localhost:5000/api/review/${reviewId}/thumbs-up`, {
            method: "POST",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("You already liked this review");
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === "Thumbs up updated") {
                    setLikedReviews((prev) => [...prev, reviewId]);
                    setReviews((prevReviews) =>
                        prevReviews.map((review) =>
                            review.review_num === reviewId
                                ? { ...review, thumbs: data.thumbs }
                                : review
                        )
                    );
                }
            })
            .catch((error) => console.log("Error updating thumbs up:", error.message));
    };


    //helper method to set flag variable as true and mark review as 'flagged'
    const handleFlag = (reviewId) => {
        fetch(`http://localhost:5000/api/review/${reviewId}/flag`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Review flagged") {
                    setReviews((prevReviews) =>
                        prevReviews.map((review) =>
                            review.review_num === reviewId
                                ? { ...review, flagged: true }
                                : review
                        )
                    );
                }
            })
            .catch((error) => console.log("Error flagging review:", error));
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
                }}>
                    {club_name}
                </h1>

                <div className="button-container"
                     style={{textAlign: 'right',}}>
                    <button onClick={handleProfile}>Profile</button>
                    <button onClick={handleReviews}>Your Reviews</button>
                    <button onClick={handleHome}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* edit view for club owner */}
            {isEditing ? (
                <div>
                    <div style={{marginBottom: '1rem'}}>
                        <textarea
                            //edit club description
                            value={updatedClub.description}
                            onChange={e => handleFieldChange('description', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                            }}
                            placeholder="Update club description"
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            //edit club link
                            type="text"
                            value={updatedClub.link}
                            onChange={e => handleFieldChange('link', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                            }}
                            placeholder="Update club link"
                        />
                    </div>
                        <button onClick={handleSave}>Save</button> {/* save changes */}
                    </div>
                ) :
                (<div>
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
                        <p>{club.description}</p> {/* club description */}
                        <p>Link: <a href={club.link}>{club.link}</a></p> {/* club external link */}
                </div>
                )}

            {/* button to edit club details */}
            {userRole === 'club_exec' && isClubOwner && (
                <button onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit Club Details'}
                </button>
            )}

            {/*emphasize overall average rating*/}
            <h2>
                <span style={{fontWeight: 'bold', fontSize: '3rem'}}>{club.avg_overall_rating.toFixed(1)}</span>
                <span style={{fontWeight: 'bold', fontSize: '1.5rem', color: '#777'}}> / 5</span>
                <div style={{fontSize: '1rem', fontWeight: 'bold'}}>
                    Average Overall Rating
                </div>
            </h2>

            {/* Bar Chart */}
            <div style={{maxWidth: '600px', margin: '2rem auto'}}>
                <Bar data={barChartData} options={barChartOptions}/>
            </div>


            {/* Student Reviews */}
            <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>
                Student Reviews ({reviews.length}):
            </div>

            {/* button to submit a student review */}
            <button onClick={handleReviewForm}
                    style={{
                        padding: '5px 10px',
                        fontSize: '1rem',
                        backgroundColor: '#59a7ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}>Submit a Review</button>

            {/* Display all student reviews/ratings */}
            <div>
                {reviews.map((review, index) => (
                    <div key={index} style={{
                        border: '2px solid #ddd',
                        borderRadius: '7px',
                        padding: '1rem',
                        backgroundColor: '#eee',
                        margin: '2rem',
                        marginTop: '1rem',
                        position: 'relative'
                    }}>

                        {/* Button for admin view to delete reviews */}
                        {userRole==='admin' && (<div className="button-container"
                                                     style={{textAlign: 'left', marginTop: "0", marginBottom: "1rem"}}>
                                <button onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this review?')) {
                                            handleDelete(review.review_num);}}}
                                        className="delete-button">
                                    Delete
                                </button>
                            </div>
                        )}

                        <h3 style={{fontSize: '1.5rem', marginTop: 0, marginBottom: '0.5rem'}}>{club_name}</h3>
                        <p style={{
                            fontStyle: 'italic',
                            color: '#666',
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            margin: 0
                        }}>Date: {review.date}</p>

                        {/* display ratings */}
                        <h1 style={{fontSize: '1.2rem'}}>Overall: <strong>{review.overall_rating}/5</strong></h1>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
                            <span>Social: <strong>{review.soc_rating}</strong>/5</span>
                            <span>Academic: <strong>{review.acad_rating}</strong>/5</span>
                            <span>Executive: <strong>{review.exec_rating}</strong>/5</span>
                            <span>Commitment Level: <strong>{review.comlev}</strong>/5</span>
                        </div>

                        {/* Actual written Review */}
                        <p style={{
                            border: '2px solid #ddd',
                            borderRadius: '6px',
                            padding: '1rem',
                            backgroundColor: '#e8e6e6',
                        }}>{review.review_text}</p>

                        <p>Time as Member: <strong>{review.time_mem}</strong></p>
                        <p>Current Member: <strong>{review.current_mem ? 'Yes' : 'No'}</strong></p>
                        <p>Paid Membership: <strong>{review.paid ? 'Yes' : 'No'}</strong></p>

                        <div style={{display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
                            <button
                                onClick={() => handleThumbsUp(review.review_num)}
                                style={{
                                    padding: '5px 10px',
                                    fontSize: '1rem',
                                    backgroundColor: likedReviews.includes(review.review_num) ? '#ccc' : '#59a7ff',
                                    color: likedReviews.includes(review.review_num) ? 'black' : 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: likedReviews.includes(review.review_num) ? 'not-allowed' : 'pointer'
                                }}
                                disabled={likedReviews.includes(review.review_num)} // Prevent multiple likes
                            >
                                👍 {review.thumbs}
                            </button>

                            <button
                                onClick={() => handleFlag(review.review_num)}
                                style={{
                                    padding: '5px 10px',
                                    fontSize: '1rem',
                                    backgroundColor: review.flagged ? '#ffcccc' : '#ff5757',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: review.flagged ? 'not-allowed' : 'pointer'
                                }}
                                disabled={review.flagged} // Prevent multiple flags
                            >
                                🚩 {review.flagged ? 'Flagged' : 'Flag'}
                            </button>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClubPage;