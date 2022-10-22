import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdPage from './pages/AdPage'
import UserPage from './pages/UserPage'

function App() {

    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path='/' element={<AdPage />} />
                    <Route path='/:adData' element={<UserPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
