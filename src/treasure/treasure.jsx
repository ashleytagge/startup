import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './treasure.css';

export function Treasure() {
  //local storages
  const navigate = useNavigate();
  const [image, setImage] = useState([]); 
  const [newPoints, setNewPoints] = useState(0);

  //update helper varaibles with backend data
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          setNewPoints(user.newpoints);
          setImage(user.images);
          
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  //turn this into an update image array function? how do I do that? idk

  useEffect(() => {
    // create my api random image generator placeholder
    const randomImage = 'goldenpaddle.png'; 

    // Add the new marine image to the front of the list
    image.push(randomImage);

    // save the updated list to backend image
    

    // save updated list to local varable?? is this neccessary?? maybe delete later
    setImage(randomImage);

    /*try catch block for updating image array. needs to be inside of an async block
  try {
    const response = await fetch('/api/user/update', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images: images}), //update images list in backend
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
  }*/

  }, []);

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