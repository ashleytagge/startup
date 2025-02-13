import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './treasure_chest.css';

export function TreasureChest() {
  return (
    <main>
        <div>
          <h1 className="glowing-title">Treasure Chest</h1>
        </div>

        <div className="container">
          {[
            { src: "turtle.png", alt: "Speedy Shell", label: "Speedy Shell", location: "Turtle Beach" },
            { src: "goldenpaddle.png", alt: "Golden Paddle", label: "Golden Paddle", location: "Horseshoe Bend" },
            { src: "pump.png", alt: "Pump Up the Jam", label: "Pump Up the Jam", location: "Saguaro Lake" },
            { src: "pearl.png", alt: "Pearl-fect Catch", label: "Pearl-fect Catch", location: "Newport Beach" },
            { src: "mermaid.png", alt: "Mermaid Tail", label: "Mermaid Tail", location: "Echo Lake" },
            { src: "islandbeater.png", alt: "Island Beater", label: "Island Beater", location: "Hukilau Beach" },
            { src: "tackle.png", alt: "Tackle Box", label: "Tackle Box", location: "Provo River" },
            { src: "blue.png", alt: "Blue Wave Wonder", label: "Blue Wave Wonder", location: "Mid Atlantic Ocean" },
            { src: "goldenpaddle.png", alt: "Golden Paddle", label: "Golden Paddle", location: "Niagra Falls" }
          ].map((item, index) => (
            <div key={index} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <img src={item.src} alt={item.alt} />
                </div>
                <div className="card-back">
                  <div className="card-label">
                    {item.label} <br /><small>Location: {item.location}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
  );
}