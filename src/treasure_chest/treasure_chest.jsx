import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './treasure_chest.css';

export function TreasureChest() {

  const [locations, setLocations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
    const savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
    const savedImages = JSON.parse(localStorage.getItem('images')) || [];

    setLocations(savedLocations);
    setActivities(savedActivities);
    setImages(savedImages);
  }, []);

  if (images.length === 0) {
    return (
      <main>
        <div>
          <h1 className="glowing-title">TREASURE CHEST</h1>
        </div>
        <p id="treasure-message">Your treasure chest is empty. Start collecting treasures by checking in!</p>
      </main>
    );
  }

  return (
    <main>
        <div>
          <h1 className="glowing-title">TREASURE CHEST</h1>
        </div>

        <div className="container">
          {images.map((src, index) => (
            <div key={index} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <img src={src} alt={`Treasure ${index}`} />
                </div>
                <div className="card-back">
                  <div className="card-label">
                    {activities[index] || 'Unknown Activity'} <br />
                    <small>Location: {locations[index] || 'Unknown Location'}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
  );
}