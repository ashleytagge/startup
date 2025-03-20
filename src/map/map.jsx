import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './map.css';

export function Map() {

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const [newpoints, setNewPoints] = useState(0);

  // Fetch user data from the backend when the component loads
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          setProgress(user.progress || 0);
          setPoints(user.score || 0);
          setNewPoints(0);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  // Function to update progress and points in the backend
  async function handleCheckIn() {
    let newProgress = progress + 1; 
    const newPoints = newProgress === 5 ? 300 : 100;
    const newTotalPoints = points + newPoints;

    if (newProgress >= 5) {
      newProgress = 0;
    }

    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress, score: newTotalPoints, newpoints: newPoints }),
      });


      if (response.ok) {
        setProgress(newProgress);
        setPoints(newTotalPoints);
        setNewPoints(newPoints);
        set
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }

    navigate('/checkin');
  }

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
