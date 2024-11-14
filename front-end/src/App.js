// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './website-components/Home';
import Login from './website-components/Login';
import FrontPage from './website-components/front-page';
import CreateAccount from './website-components/create-account';
import UserProfile from './website-components/UserProfile';
import ClubPage from './website-components/ClubPage';
import YourReviews from './website-components/YourReviews';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path ="/front-page" element={<FrontPage />} />
                <Route path ="/profile" element={<UserProfile />} />
                <Route path="/club-page/:club_name" element={<ClubPage />} />
                <Route path="/YourReviews" element={<YourReviews />} />
            </Routes>
        </Router>
    );
};

export default App;