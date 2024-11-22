import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const ReviewForm = () => {

    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const { club_name } = useParams(); // using club_name to get club
    //const { user_name } = useParams();
    const [review, setReview] = useState({
        // review_num:0,
        user_email: '',
        club_name: '',
        date: '',
        review_text: '',
        overall_rating: 0,
        soc_rating: 0,
        acad_rating: 0,
        exec_rating: 0,
        comlev: 0,
        current_mem: false,
        time_mem: '',
        paid: false
    });

    function getCurrentDate() {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }

    const [writtenReview, confirmReview] = useState(false);

    const createReview = (type, currValue) =>{
      setReview({...review, [type]: currValue});
    };




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
        navigate('/front-page');
    };

    const handleSubmit = () =>{
        fetch(`http://localhost:5000/api/ReviewFrom/${club_name}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        })
            .then(response => {
                if (response.status === 401) {
                    return response.json();
                } else if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message === 'Review created!') {
                    console.log(data.message);
                    navigate(`/club-page/${review.club_name}`);
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            });
    };


    useEffect(() => {
        fetch(`http://localhost:5000/api/ReviewFrom/${club_name}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
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
                    setReview({
                        user_email: data.user_email,
                        club_name: club_name,
                        date: getCurrentDate()
                        // review_text: '',
                        // overall_rating: '',
                        // soc_rating: '',
                        // acad_rating: '',
                        // exec_rating: '',
                        // comlev: '',
                        // current_mem: '',
                        // time_mem: '',
                        // paid: ''
                    });
                } else {
                    console.log('Error:', data.message);
                }})
            .catch(error => console.log('Error fetching club data:', error));
    }, [club_name]);


    return (
        <body>
        <div style={{
            display: 'flex',
            alignItems: 'center', // Align items vertically centered
            justifyContent: 'space-between', // Center horizontally
            textAlign: 'center', // center text for h1
        }}>
            <h1 style={{
                textAlign: 'center',
            }}>Review Form</h1>
            <div className="button-container"
                 style={{
                     textAlign: 'right',
                 }}>
                <button onClick={handleProfile}>Profile</button>
                <button onClick={handleHome}>Home</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>

        {/* Container for the review form */}
        <div style={{position: 'relative'}}>
            <h1 style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '3rem',
            }}>
                Review Form
            </h1>
            <div>
                <label>
                    User Email:
                    <input
                        type="text"
                        value={review.user_email}
                        disabled={!writtenReview}
                    />
                </label>
            </div>
            <div>
                <label>
                    Club Name:
                    <input
                        type="text"
                        value={review.club_name}
                        disabled={!writtenReview}
                    />
                </label>
            </div>
            <div>
                <label>
                    Date:
                    <input
                        type="text"
                        value={review.date}
                        disabled={!writtenReview}
                    />
                </label>
            </div>
            <div>
                <label>
                    Overall Rating:
                    <input
                        type='number'
                        value={review.overall_rating}
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Social Rating:
                    <input
                        type='number'
                        value={review.soc_rating}
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Academic Rating:
                    <input
                        type='number'
                        value={review.acad_rating}
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Executive Rating:
                    <input
                        type='number'
                        value={review.exec_rating}
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Current Member:
                    <input
                        type='number'
                        value={review.current_mem}
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Time Member:
                    <input
                        type='number'
                        value={review.time_mem}
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Paid:
                    <input
                        type='number'
                        value={review.paid}
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
        </div>
        <button onClick={handleSubmit}>Save</button>
        </body>
    )
};

export default ReviewForm;