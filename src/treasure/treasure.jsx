import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './treasure.css';

export function Treasure() {
  const navigate = useNavigate();
  const [image, setImage] = useState([]); 
  const [newPoints, setNewPoints] = useState(null);
  const [randomImage, setRandomImage] = useState(null); // Store random image URL in state

  useEffect(() => {
    const updateUserData = async () => {
      try {
        // Fetch the current user data from the backend
        const response = await fetch('/api/user/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        const user = await response.json();

        // Fetch a random image to get a new ID
        const imageResponse = await fetch('https://picsum.photos/200');
        const imageURL = imageResponse.url; // This will be a random image URL

        // Extract the image ID from the response headers
        const imageID = imageResponse.headers.get('Picsum-ID');

        // If we got an ID, construct a stable image URL
        const stableImageURL = imageID 
          ? `https://picsum.photos/id/${imageID}/200` 
          : imageURL; // in case ID is missing

        // Get existing images or initialize empty array
        const updatedImages = [...(user.images || []), stableImageURL];

        setNewPoints(user.newpoints);
        setImage(updatedImages);
        setRandomImage(stableImageURL); // Update state with new image

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

      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    updateUserData();
  }, []); 

  return (
    <main>
      <div className="congrats-container">
        <div className="congrats"><h2>Congratulations!</h2></div>
        <div className="points"><p>+{newPoints} POINTS</p></div>
        <div className="image-container">
          {randomImage ? (
            <img src={randomImage} alt="Randomly Generated" width="200" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
        <div className="buttons-container">
          <button onClick={() => navigate('/treasurechest')}>Open Treasure Chest</button>
          <button onClick={() => navigate('/map')}>Close</button>
        </div>
      </div>
    </main>
  );
}
