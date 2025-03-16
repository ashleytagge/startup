import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './map.css';

export function Map() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const userName = localStorage.getItem('userName') || 'Guest';

  async function saveScore(score) {
    const newScore = { name: userName, score: score };
  
    await fetch('/api/score', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newScore),
    });
  
  }

  const handleCheckIn = async () => {
    let newProgress = progress + 1;
    const newPoints = newProgress === 5 ? 300 : 100;
    const newTotalPoints = points + newPoints;

    if (newProgress >= 5) {
      newProgress = 0;
    }

    setProgress(newProgress);
    setPoints(newTotalPoints);
    //I am keeping these local storage items intentially because this info is used to calculate the 
    //users points which ARE stored in the backend. but I don't need the backend to remember how many points 
    //they earned everysingle time or what step they are on at any given moment.
    localStorage.setItem('progress', newProgress);
    localStorage.setItem('newPoints', JSON.stringify(newPoints));
    
    await saveScore(newTotalPoints);
    navigate('/checkin');
  };

  return (
    <main>
      <div className="wrapper">
        <ul className="StepProgress">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className={`StepProgress-item ${index < progress ? 'is-done' : ''} ${index === progress ? 'current' : ''}`}
              style={{
                borderColor: index === progress ? 'blue' : 'gray',
                backgroundColor: index < progress ? 'green' : 'transparent'
              }}
            />
          ))}
        </ul>
      </div>
      <button onClick={handleCheckIn}>Check In</button>
    </main>
  );
}

export function getCurrentUserPoints() {
  return localStorage.getItem('points');
}
