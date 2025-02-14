import React from 'react';
import { useNavigate } from 'react-router-dom';
import './treasure.css';

export function Treasure() {
  const navigate = useNavigate();

  return (
    
    <main>
  <div className="congrats-container">
    <div className="congrats"><h2>Congratulations!</h2></div>
    <div className="points"><p>+150 POINTS</p></div>
    <div className="image-container">
      <img src="mermaid.png" alt="mermaid" width="200" />
    </div>
    <div className="buttons-container">
      <button onClick={() => navigate('/treasurechest')}>Open Treasure Chest</button>
      <button onClick={() => navigate('/map')}>Close</button>
    </div>
  </div>
</main>
  );
}