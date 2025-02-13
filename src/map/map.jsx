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
      <div class="wrapper">
        <ul class="StepProgress">
          <li class="StepProgress-item is-done"></li>
          <li class="StepProgress-item is-done"></li>
           <li class="StepProgress-item current"></li>
          <li class="StepProgress-item"></li>
           <li class="StepProgress-item"></li>
        </ul>
      </div>
      <div id="checkin">
        <button onClick={handleCheckIn}>Check In</button>
      </div>
    </main>
  
  );
}