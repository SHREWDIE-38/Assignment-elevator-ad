import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import MainPage from './pages/MainPage'

function App() {

  const dummyData = [
    {
      id: 'AD_001',
      category: 'DELIVERY',
      transmissionDate: '2022-10-15',
      startTime: '12:00',
      endTime: '18:00',
      limitPerDay: '10',
    }
  ]

  localStorage.setItem('data', JSON.stringify(dummyData))

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={ <MainPage/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
