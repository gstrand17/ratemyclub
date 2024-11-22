import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const ReviewForm = () => {

    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const { club_name } = useParams(); // using club_name to get club
    const [user, setUser] = useState({
        user_name: '',
        club_name: '',
        date: '',
        review_text: '',
        overall_rating: '',
        soc_rating: '',
        acad_rating: '',
        exec_rating: '',
        comlev: '',
        current_mem: '',
        time_mem: '',
        paid: ''
    });

    function getCurrentDate() {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    }

    const [writtenReview, confirmReview] = useState(false);

    const updateProfile = (type, currValue) =>{
      setUser({...user, [type]: currValue});
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

    useEffect(() => {
        fetch(`http://localhost:5000/writereview/${club_name}`, {
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
                    setUser({
                        user_name: data.user_name,
                        club_name: data.club_name,
                        date: new Date().toISOString(),
                        review_text: data.review_text,
                        overall_rating: '',
                        soc_rating: '',
                        acad_rating: '',
                        exec_rating: '',
                        comlev: '',
                        current_mem: '',
                        time_mem: '',
                        paid: ''
                    });
                } else {
                    console.log('Error:', data.message);
                }})
            .catch(error => console.log('Error fetching club data:', error));
    }, [club_name]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/writereview/${club_name}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
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
                if (data.message === "Data has been fetched!") {
                    setMessage(data.message);
                    setUser({
                        user_name: data.user_name
                    });
                    confirmReview(false);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            });
    };

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
                        value={user.user_email}
                        disabled={!writtenReview}
                    />
                </label>
            </div>
            <div>
                <label>
                    Club Name:
                    <input
                        type="text"
                        value={user.club_name}
                        disabled={!writtenReview}
                    />
                </label>
            </div>
            <div>
                <label>
                    Date:
                    <input
                        type="text"
                        value={getCurrentDate()}
                        disabled={!writtenReview}
                    />
                </label>
            </div>
            <div>
                <label>
                    Overall Rating:
                    <input
                        type='number'
                        value={user.overall_rating}
                        onChange={(e) => {
                            updateProfile('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Social Rating:
                    <input
                        type='number'
                        value={user.soc_rating}
                        onChange={(e) => {
                            updateProfile('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Academic Rating:
                    <input
                        type='number'
                        value={user.acad_rating}
                        onChange={(e) => {
                            updateProfile('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Executive Rating:
                    <input
                        type='number'
                        value={user.exec_rating}
                        onChange={(e) => {
                            updateProfile('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Current Member:
                    <input
                        type='number'
                        value={user.current_mem}
                        onChange={(e) => {
                            updateProfile('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Time Member:
                    <input
                        type='number'
                        value={user.time_mem}
                        onChange={(e) => {
                            updateProfile('overall_rating', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Paid:
                    <input
                        type='number'
                        value={user.paid}
                        onChange={(e) => {
                            updateProfile('overall_rating', e.target.value)
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