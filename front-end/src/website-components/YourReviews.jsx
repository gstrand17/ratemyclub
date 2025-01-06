import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const YourReviews = () => {

    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]); // initialize as empty array, tracks reviews and where updated review changes are stored
    const [currentReview, setCurrentReview] = useState({
        review_text: '',
        soc_rating: 1,
        acad_rating: 1,
        exec_rating: 1,
        comlev: 1,
        current_mem: null,
        time_mem: 'Example: 3 semesters',
        paid: null
    }); // initializes empty array, initial data that is not edited when putting in change form
    const [editIndex, setEditIndex] = useState(null); // track which review is being edited

    // Handles logout when logout button is pressed
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

    const handleHome = () => {
        navigate('/front-page'); // Navigates to front-page
    };

    useEffect(() => {
        fetch(`http://localhost:5000/YourReviews`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }})
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
                    if (data.reviews) {
                        setCurrentReview(data.reviews); // keeps track of current reviews, non-edited array for cancel button
                        setReviews(data.reviews); // Ensure reviews is an array, this array is changed when information is inputed
                    }
                } else {
                    console.log('Error:', data.message);
                }})
            .catch(error => console.log('Error fetching club data:', error));
    }, []);

    const handleDelete = (reviewId) => {
        fetch('http://localhost:5000/YourReviews', {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ review_id: reviewId }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'Review has been deleted!') {
                    console.log('Review has been successfully deleted!');
                    setReviews((prevReviews) => prevReviews.filter((review) => review.review_num !== reviewId)); //Use chatgpt for this line
                } else {
                    console.log('Error:', data.message);
                }
            })
            .catch((error) => console.log('Error deleting review!', error));
    };

    const handleSave = (index) => {
        const updatedReview = { ...reviews[index], review_num: reviews[index].review_num }; // Include review_num in the request body

        fetch('http://localhost:5000/YourReviews', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedReview),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.message === 'Review updated successfully!') {
                    // Exit edit mode and update current reviews
                    setEditIndex(null);
                    setReviews((prevReviews) => {
                        const newReviews = [...prevReviews];
                        newReviews[index] = updatedReview; // Update the specific edited review in the array
                        return newReviews;
                    });
                    console.log('Review successfully updated!');
                } else {
                    console.log('Error:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error updating review:', error);
            });
    };



    const handleCancel = () => {
        setEditIndex(null); // Exits editing state
        setReviews(currentReview); // Reverts information back to previous state before changes
    }

    const handleChange = (index, field, value) => {
        const updatedReviews = [...reviews]; // Copy the reviews array
        updatedReviews[index] = {
            ...updatedReviews[index], // Spread existing review object
            [field]: value}; // update specific field with new value
        setReviews(updatedReviews); // Update the state with the new reviews array
    };

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
                }}>Your Reviews</h1>
                <div className="button-container"
                     style={{
                         textAlign: 'right',
                     }}>
                    <button onClick={handleProfile}>Profile</button>
                    <button onClick={handleHome}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div> {/*code from erin in clubpage.js*/}
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
                        <h3 style={{fontSize: '1.5rem', marginTop: 0, marginBottom: '0.5rem'}}>{review.club_name}</h3>
                        <p style={{
                            fontStyle: 'italic',
                            color: '#666',
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            margin: 0
                        }}>Date: {review.date}</p>
                        <h1 style={{fontSize: '1.2rem'}}>Overall: <strong>{review.overall_rating}/5</strong></h1>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
                            <span>Social: <strong>{review.soc_rating}</strong>/5</span>
                            <span>Academic: <strong>{review.acad_rating}</strong>/5</span>
                            <span>Executive: <strong>{review.exec_rating}</strong>/5</span>
                            <span>Commitment Level: <strong>{review.comlev}</strong>/5</span>
                        </div>
                        <p style={{
                            border: '2px solid #ddd',
                            borderRadius: '6px',
                            padding: '1rem',
                            backgroundColor: '#e8e6e6',
                        }}>{review.review_text}</p>
                        <p>Time as Member: <strong>{review.time_mem}</strong></p>
                        <p>Current Member: <strong>{review.current_mem ? 'Yes' : 'No'}</strong></p>
                        <p>Paid Membership: <strong>{review.paid ? 'Yes' : 'No'}</strong></p>
                        <div className="button-container"
                             style={{
                                 textAlign: 'right',
                             }}>
                            {editIndex === index ? ( // Checks if current index it the one being edited
                                <div>
                                    <div>
                                        <label>
                                            Social:
                                            <select
                                                value={review.soc_rating} // connects value to soc_rating for the review
                                                // Changes review value when inputted by the user
                                                onChange={(e) => handleChange(index, 'soc_rating', e.target.value)} // updates the review state with the selected value
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            Academic:
                                            <select
                                                value={review.acad_rating} // connects value to soc_rating for the review
                                                // Changes review value when inputted by the user
                                                onChange={(e) => handleChange(index, 'acad_rating', e.target.value)} // updates the review state with the selected value
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            Executive:
                                            <select
                                                value={review.exec_rating} // connects value to soc_rating for the review
                                                // Changes review value when inputted by the user
                                                onChange={(e) => handleChange(index, 'exec_rating', e.target.value)} // updates the review state with the selected value
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            Commitment Level:
                                            <select
                                                value={review.comlev} // connects value to soc_rating for the review
                                                // Changes review value when inputted by the user
                                                onChange={(e) => handleChange(index, 'comlev', e.target.value)} // updates the review state with the selected value
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div>
                                        <label>
                                            Review:
                                            <input
                                                type={'text'}
                                                value={review.review_text}
                                                // Changes review value when inputted by the user
                                                onChange={(e) => handleChange(index, 'review_text', e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <button onClick={() => handleSave(index)}>Save</button>
                                    <button onClick={() => handleCancel()}>Cancel</button>
                                </div>
                            ) : (
                                <button onClick={() => setEditIndex(index)}>Edit</button>
                            )}
                            <button onClick={() => handleDelete(review.review_num)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>)
};

export default YourReviews;