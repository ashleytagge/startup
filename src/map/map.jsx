import React from 'react';
import './map.css';


import { useNavigate } from 'react-router-dom';

export function Map() {

  const navigate = useNavigate();

  const handleCheckIn = () => {
    navigate('/checkin'); 
  };

  return (
    <main>
      <div className="container">
        <div className="circle circle-1"></div>
        <div className="line"></div>
        <div className="circle circle-2"></div>
        <div className="line"></div>
        <div className="circle circle-3"></div>
        <div className="line"></div>
        <div className="circle circle-4"></div>
        <div className="line bottom"></div>
        <div className="largecircle"></div>
      </div>
      <div id="checkin">
        <button onClick={handleCheckIn}>Check In</button>
      </div>
    </main>
  
  );
}