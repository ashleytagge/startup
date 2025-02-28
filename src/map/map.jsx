import React, { useState, useEffect } from 'react'; //step progress functionality state tracker
import { useNavigate } from 'react-router-dom';
import './map.css';

export function Map() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);  // Track the current step
  const [points, setPoints] = useState(0);  // Tracks the amount of points earned.

  // Load saved progress and points from local storage
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

  const handleCheckIn = () => {
    // Increment progress by 1 and add points depending on which step the user is on
    let newProgress = progress + 1;
    const newPoints = newProgress === 5 ? 300 : 100;  // 300 points for the last step! yay you checked in 5 times!
    const newTotalPoints = points + newPoints; //add another local variable so I can display on treasure page

    if (newProgress >= 5) {
      newProgress = 0; // Reset progress after completing step 5
    }

    // Update state!
    setProgress(newProgress);
    setPoints(newTotalPoints);


    // Save updated progress and points to local storage
    localStorage.setItem('progress', newProgress);
    localStorage.setItem('points', newTotalPoints);
    localStorage.setItem('newPoints', JSON.stringify(newPoints));
    //localStorage.setItem('currentUserPoints', newTotalPoints);

    // Navigate to the check-in page
    navigate('/checkin');
  };

  return (
    <main>
      <div className="wrapper">
        <ul className="StepProgress">
          {[...Array(5)].map((_, index) => (
            <li
              key={index}
              className={`StepProgress-item 
                ${index < progress ? 'is-done' : ''} 
                ${index === progress ? 'current' : ''}`}
              style={{
                borderColor: index === progress ? 'blue' : 'gray', // current step should have a border
                backgroundColor: index < progress ? 'green' : 'transparent' // completed steps should fill in with color
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