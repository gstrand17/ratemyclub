// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';


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
            </Routes>
        </Router>
    );
};

export default App;