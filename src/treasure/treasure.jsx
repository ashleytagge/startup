import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Treasure() {
  const navigate = useNavigate();

  return (
    
    <main>
      <div className="congrats-container">
        <div className="congrats">Congrats!</div>
        <div className="points">You've earned 150 points!</div>
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