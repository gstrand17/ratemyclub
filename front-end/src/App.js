// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './website-components/Home';
import Login from './website-components/Login';
import FrontPage from './website-components/front-page';
import CreateAccount from './website-components/create-account';


// const App = () => {
//   return (
//       <div>
//         <h1>Welcome to the home Page</h1>
//         <Home />
//       </div>
//   );
// };
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path ="front-page" element={<FrontPage />} />
            </Routes>
        </Router>
    );
};

export default App;