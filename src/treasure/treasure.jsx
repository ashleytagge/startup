import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './treasure.css';

export function Treasure() {
  const navigate = useNavigate();
  const [image, setImage] = useState([]); 
  const [newPoints, setNewPoints] = useState(0);
  const randomImage = 'goldenpaddle.png'; 

  useEffect(() => {
    const updateUserData = async () => {
      try {
        // Fetch the current user data from the backend
        const response = await fetch('/api/user/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json(); // Parse user data

          // Get existing images or initialize empty array
          let updatedImages = user.images || [];
          setNewPoints(user.newpoints);

          // Add new image
          updatedImages.push(randomImage);
          setImage(updatedImages); // Update state with new image list

          // Update user data on the backend
          await fetch('/api/user/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              locations: user.locations,
              activities: user.activities,
              progress: user.progress, 
              score: user.score,
              images: updatedImages,
              newpoints: user.newpoints,
            }),
          });
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    updateUserData();
  }, []); // Runs only once when the component mounts

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
