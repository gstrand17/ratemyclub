import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

//import bannerImage from './uf_dupe.png';
//import bannerImage from './banner.jpg';

const FrontPage = () => {
//ADD A SEARCH BAR TO SEARCH FOR CLUBS?
    //search bar routes to club search page

//diff options shown depending on type of user?
    //get user role from login/create acct or backend?

    // website structure goes here
    //const location = useLocation();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [clubs, setClubs] = useState([]);  //club data

    useEffect(() => {
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
                    width: '100%', // Make the image full width
                    height: '200px', // Maintain aspect ratio
                    objectFit: 'cover',
                    marginTop: '0'
                }}
            />

            <div style={{
                display: 'flex',
                alignItems: 'center', // Align items vertically centered
                justifyContent: 'space-between', // Center horizontally
                textAlign: 'center', // center text for h1
            }}>
                <h1 style={{
                    fontFamily: "'Alfa Slab One', serif",
                    fontSize: '3rem',
                    marginTop: '20px',
                }}>
                    WELCOME {firstName} {lastName}
                </h1>


                <div className="button-container"
                     style={{
                         textAlign: 'right',
                     }}>
                    <button onClick={handleProfile}>Profile</button>
                    <button>Your Reviews</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div style={{maxWidth: '600px', margin: 'auto', padding: '20px', border: '3px solid #ccc'}}>
                {clubs.map((club, index) => (
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
                        <h2 style={{ fontSize: '1.8rem',fontWeight: 'bold'}}>
                            {club.name}
                        </h2>

                        {/* Map over tags and display each as a colored button
                        Back end will hopefully come up with an easier getter method to return substring*/}
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

                        {/*It's printing out 0 for all clubs, when I tried changing a couple in command.py,
                        it didnt update on website :( */}
                        <div
                            style={{
                                backgroundColor: getRatingColor(club.avg_rating),
                                color: '#fff',
                                padding: '5px',
                                borderRadius: '8px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: '10px',
                            }}
                        >
                            Average Rating: {club.avg_rating}
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};
//navigate(`/club/${club.id}`)
//<p>Tags: {club.tags}</p>
//style={{ maxWidth: '300px', margin: 'auto', padding: '20px', border: '3px solid #ccc' }}>
export default FrontPage;
