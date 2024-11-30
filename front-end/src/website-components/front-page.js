import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const FrontPage = () => {
    // store initial states for website
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [clubs, setClubs] = useState([]);  //club data
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        //fetch user data
        fetch('http://localhost:5000/front-page', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
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
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                } else {
                    console.log('Error:', data.message);
                }
            })
            .catch((error) => {
                console.log('Problem with fetching data', error);
            });


        // Fetch clubs data
        fetch('http://localhost:5000/api/clubs', {
            method: 'GET',
                credentials: 'include',
                headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => console.log('Error fetching club data:', error));
    }, []);

    //helper method to log out
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
        // Navigate to user profile page
        navigate('/profile');
    };

    const handleReviews = () => {
        navigate('/YourReviews')
    };

    //helper method for search bar functionality
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    //user can search by club name or tags
    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.tags.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //help from chat.gpt: randomly generates a consistent color based on the tag
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

    //set background color for the average rating box
    const getRatingColor = (rating) => {
        if (rating >= 4.0) return '#4CAF50'; //high ratings
        if (rating >= 2.0) return '#FFEB3B'; //medium ratings
        return '#F44336'; //else red for low ratings
    };

    return (
        <div style={{position: 'relative'}}>
            {/* Banner Image */}
            <img
                src={`${process.env.PUBLIC_URL}/banner.jpg`} //Replaced it with img src to avoid using import
                alt="Banner"
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block',
                    padding: 0,
                    margin: 0
                }}
            />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                textAlign: 'center',
            }}>
                {/* Welcome user by first name */}
                <h1 style={{
                    fontFamily: "'Alfa Slab One', serif",
                    fontSize: '3rem',
                    marginTop: '20px',
                }}>
                    WELCOME {firstName}
                </h1>

                <div className="button-container"
                     style={{
                         textAlign: 'right',
                     }}>
                    <button onClick={handleProfile}>Profile</button>
                    <button onClick={handleReviews}>Your Reviews</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Search bar: help from chat.gpt */}
            <div style={{maxWidth: '600px', margin: '20px auto', padding: '10px',}}>
                <input
                    type="text"
                    placeholder="Search by clubs or tags"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '2px solid #c7c7c7'
                    }}
                />
            </div>

            {/* Clubs list */}
            <div style={{maxWidth: '600px', margin: 'auto', padding: '20px', border: '3px solid #ccc'}}>
                {filteredClubs.map((club, index) => (
                    <div key={index}
                         onClick={() => navigate(`/club-page/${club.name}`)}
                         style={{
                             border: '2px solid #c7c7c7',
                             padding: '1rem',
                             cursor: 'pointer',
                             transition: 'background-color 0.3s',
                             marginBottom: '20px'
                         }}
                         onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c7c7c7')}
                         onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ededed')}
                    >
                        <h2 style={{fontSize: '1.8rem', fontWeight: 'bold'}}>
                            {club.name}
                        </h2>

                        {/* Map over tags and display each as a colored button */}
                        <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                            {(Array.isArray(club.tags) ? club.tags : club.tags ? club.tags.split('|') : [])
                                .filter(tag => tag.trim() !== '')  //filter out empty tags
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

                        {/* Display the average overall rating */}
                        <div
                            style={{
                                backgroundColor: getRatingColor(club.avg_overall_rating),
                                color: '#fff',
                                padding: '5px',
                                borderRadius: '8px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: '10px',
                            }}>
                            Average Overall Rating: {club.avg_overall_rating?.toFixed(1) ?? 'N/A'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FrontPage;
