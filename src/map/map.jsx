import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './map.css';

export function Map() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
 /*const [username, setUsername] = useState('');

  async function fetchUser() {
    try {
      const res = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include', // Ensures cookies (token) are sent
      });

      if (res.ok) {
        const data = await res.json();
        setUsername(data.userid); // Set the username in state
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

    async function fetchScore() {
    const res = await fetch('/api/user/score', {
      method: 'GET',
      credentials: 'include',
    });
  
    const data = await res.json();
    if (res.ok) {
      console.log(`Current score: ${data.score}`);
    } else {
      alert(data.msg || 'Failed to fetch score');
    }
  }*/

    useEffect(() => {
      const savedProgress = localStorage.getItem('progress');
      const savedPoints = localStorage.getItem('points');
      
      if (savedProgress !== null) {
        setProgress(Number(savedProgress));
      }
      if (savedPoints !== null) {
        setPoints(Number(savedPoints));
      }
    }, []);

    async function updateScore(score) {
      const res = await fetch('/api/user/score', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensures cookies are sent with the request
        body: JSON.stringify({ score }), // Using the passed score instead of getCurrentUserPoints()
      });
    
      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || 'Failed to update score');
      }
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
    localStorage.setItem('progress', newProgress);
    localStorage.setItem('points', newTotalPoints);
    localStorage.setItem('newPoints', JSON.stringify(newPoints));
    
    fetchUser();
    updateScore(newTotalPoints);

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
  return Number(localStorage.getItem('points'));
}
