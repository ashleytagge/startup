import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './treasure.css';

export function Treasure() {
  //local storages
  const navigate = useNavigate();
  const [image, setImage] = useState([]); 
  const [newPoints, setNewPoints] = useState(0);
  const randomImage = 'goldenpaddle.png'; 

  //put in an async function
  try {
    // Fetch the current user data from the backend
    const response = await fetch('/api/user/me', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const user = await response.json(); // Parse the user data from the response

      // Get existing locations and activities (from the backend data)
      let updatedImages = user.images || [];
      setNewPoints(user.newpoints);
      // Add the new location and activity to the lists
      updatedImages.push(randomImage);

      // Update the user data on the backend (including the new location and activity)
      const updateResponse = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          locations: user.locations,
          activities: user.activities,
          progress: user.progress, // Keep the user's progress intact
          score: user.score, // Keep the user's score intact
          images: updatedImages,
          newpoints: newPoints,
        }),
      });
    }
    updateUserData();

//start reviewing from here down
      if (updateResponse.ok) {
        const updatedUser = await updateResponse.json(); // Parse updated user data
        console.log('Updated user data:', updatedUser);

        setNewPoints(user.newpoints);
        setImage(user.images);

      } else {
        console.error('Failed to update user data');
      }
    } else {
      console.error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
};  

  return (
    
    <main>
  <div className="congrats-container">
    <div className="congrats"><h2>Congratulations!</h2></div>
    <div className="points"><p>+{newPoints} POINTS</p></div>
    <div className="image-container">
      <img src={randomImage} alt="marine animal" width="200" />
    </div>
    <div className="buttons-container">
      <button onClick={() => navigate('/treasurechest')}>Open Treasure Chest</button>
      <button onClick={() => navigate('/map')}>Close</button>
    </div>
  </div>
</main>
  );
}