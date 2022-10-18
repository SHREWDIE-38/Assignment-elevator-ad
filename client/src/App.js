import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import MainPage from './pages/MainPage'
import UserPage from './pages/UserPage'
import { useSelector, useDispatch } from 'react-redux';
import {setAdvertisements} from "./redux/Resource"

function App() {

  const dummyData = [
    {
      id: 'AD_001',
      category: 'DELIVERY',
      transmissionDate: '2022-10-15',
      startTime: '12:00',
      endTime: '18:00',
      limitPerDay: '10',
    },
  ]

  const dispatch = useDispatch()
  dispatch(setAdvertisements(dummyData))

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={ <MainPage/> }/>
          <Route path='/:adData' element={ <UserPage/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
