import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './treasure.css';

export function Treasure() {
  //local storages
  const navigate = useNavigate();
  const [image, setImage] = useState('goldenpaddle.png'); // Placeholder image before api image generator
  const newPoints = JSON.parse(localStorage.getItem('newPoints')) || 100; //get newpoints and use 100 as a saftey net

  useEffect(() => {
    // create my api random image generator placeholder
    const randomImage = 'goldenpaddle.png'; 

    // Get existing images list or initialize empty array to store images to display on treasure chest
    const images = JSON.parse(localStorage.getItem('images')) || [];

    // Add the new marine image to the front of the list
    images.unshift(randomImage);

    // Save the updated list to localStorage
    localStorage.setItem('images', JSON.stringify(images));

    // Set current image
    setImage(randomImage);
  }, []);

  return (
    
    <main>
  <div className="congrats-container">
    <div className="congrats"><h2>Congratulations!</h2></div>
    <div className="points"><p>+{newPoints} POINTS</p></div>
    <div className="image-container">
      <img src={image} alt="marine animal" width="200" />
    </div>
    <div className="buttons-container">
      <button onClick={() => navigate('/treasurechest')}>Open Treasure Chest</button>
      <button onClick={() => navigate('/map')}>Close</button>
    </div>
  </div>
</main>
  );
}