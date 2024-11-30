import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const ReviewForm = () => {

    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const { club_name } = useParams(); // using club_name to get club
    //const { user_name } = useParams();
    const [review, setReview] = useState({
        user_email: '',
        club_name: '',
        date: '',
        review_text: '',
        overall_rating: 1,
        soc_rating: 1,
        acad_rating: 1,
        exec_rating: 1,
        comlev: 1,
        current_mem: null,
        time_mem: 'Example: 3 semesters',
        paid: null
    }); // sets up the review array

    function getCurrentDate() {
        const date = new Date(); // gets current date
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0'); // pulls day from date format
        const year = date.getFullYear(); // pulls year from date format
        return `${month}-${day}-${year}`;
    }

    const [writtenReview, confirmReview] = useState(false);

    const createReview = (type, currValue) =>{
        setReview({...review, [type]: currValue}); // changes the review component when information is entered
    };

    const backToClubs = () => {
        navigate(`/club-page/${club_name}`); // navigates back to the club page
    }

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
        navigate('/front-page'); // Navigate to the front-page
    };

    const handleSubmit = () =>{

        fetch(`http://localhost:5000/ReviewForm/${club_name}`, {
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
                    console.log(data.message); // logs the review data in the console
                    backToClubs(); // once submitted it returns to the club page
                }
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage('An error occurred. Please try again.');
            });
    };


    useEffect(() => {
        fetch(`http://localhost:5000/ReviewForm/${club_name}`, {
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
                    throw new Error('Network response was not ok' + response.statusText);
                }
                return response.json();
            })
            .then(data =>  {
                if (data.message === "Data has been fetched!") {
                    setReview({
                        user_email: data.user_email, // auto-populates user email, cannot be changed
                        club_name: club_name, // auto-populates club, cannot be changed
                        date: getCurrentDate(), // auto-populates current date, cannot be changed
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
                <button onClick={handleProfile}>Profile</button> {/* Goes to profile when pressed */}
                <button onClick={handleHome}>Home</button> {/* Goes to homepage when pressed */}
                <button onClick={handleLogout}>Logout</button> {/* Logout when pressed */}
            </div>
        </div>

        {/* Container for the review form */}
        <div style={{position: 'relative'}}>

            {/* User Email container */}
            <div>
                <label>
                    User Email:
                    <input
                        type="text"
                        value={review.user_email} // populates user-email
                        disabled={!writtenReview} // Makes user email non-changeable
                    />
                </label>
            </div>

            {/* Club name container*/}
            <div>
                <label>
                    Club Name:
                    <input
                        type="text"
                        value={review.club_name} // populates club name
                        disabled={!writtenReview} // Makes club name non-changeable
                    />
                </label>
            </div>

            {/* Date container */}
            <div>
                <label>
                    Date:
                    <input
                        type="text"
                        value={review.date} // populates the date
                        disabled={!writtenReview} // makes date non-changeable
                    />
                </label>
            </div>
            <br></br>
            <label><u>Rate the following aspects from 1-5 </u></label>

            {/* Social Atmosphere container */}
            <div>
                <label>
                    Social Atmosphere:
                    <select
                        value={review.soc_rating} // connects value to soc_rating for the review
                        onChange={(e) => {
                            createReview('soc_rating', e.target.value); // updates the review state with the selected value
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </label>
            </div>

            {/* Academic Strength container*/}
            <div>
                <label>
                    Academic Strength:
                    <select
                        value={review.acad_rating} // connects value to soc_rating for the review
                        onChange={(e) => {
                            createReview('acad_rating', e.target.value); // updates the review state with the selected value
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </label>
            </div>

            {/* Executive leadership container*/}
            <div>
                <label>
                    Executive Leadership:
                    <select
                        value={review.exec_rating} // connects value to soc_rating for the review
                        onChange={(e) => {
                            createReview('exec_rating', e.target.value); // updates the review state with the selected value
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </label>
            </div>

            {/* Level of Commitment container*/}
            <div>
                <label>
                    Level of Commitment:
                    <select
                        value={review.comlev} // connects value to soc_rating for the review
                        onChange={(e) => {
                            createReview('comlev', e.target.value); // updates the review state with the selected value
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </label>
            </div>

            {/* Overall scoring container */}
            <div>
                <label>
                    Overall Scoring:
                    <select
                        value={review.overall_rating} // connects value to soc_rating for the review
                        onChange={(e) => {
                            createReview('overall_rating', e.target.value); // updates the review state with the selected value
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </label>
            </div>
            <br></br>

            {/* Tell us about your experience container */}
            <div>
                <label>Tell us about your experience: </label><br></br>
                <input
                    type='string'
                    value={review.review_text}
                    onChange={(e) => {
                        createReview('review_text', e.target.value)
                    }}
                />
            </div>

            {/* Member duration container */}
            <div>
                <label>
                    Membership Duration:
                    <input
                        type='string'
                        value={review.time_mem}
                        onChange={(e) => {
                            createReview('time_mem', e.target.value)
                        }}
                    />
                </label>
            </div>
            <div>
                <input type="checkbox"
                       value="True"
                       name="check1"
                       onChange={(e) => {
                           createReview('current_mem', e.target.checked)
                       }}/>
                <label> Currently a member?</label>
            </div>
            <div>
                <input type="checkbox"
                       value="True"
                       name="check2"
                       onChange={(e) => {
                           createReview('paid', e.target.checked)
                       }}/>

                <label> This club requires membership payment</label>

            </div>
        </div>
        <br></br>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={backToClubs}>Back to Club</button>
        </body>
    )
};

export default ReviewForm;