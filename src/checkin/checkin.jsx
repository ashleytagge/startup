import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkin() {

  const navigate = useNavigate();

  const saveCheckIn = () => {
    navigate('/treasure'); 
  };

  return (
    
<main>
      <div id="logo-section">
        <img src="paddleboard.png" width="200" height="150" />
      </div>

      <div id="header-section">
        <h2>ADVENTURE CHECK</h2>
      </div>

      <div id="form-section">
        <form action="treasure.html" method="get">
          <label for="Location">Adventure ID:</label>
          <br />
          <input type="text" id="Location" name="Location" placeholder="Havasupai Falls" required />
          <br /><br />
          <label for="activity">Activity:</label>
          <br />
          <input type="text" id="activity" name="activity" placeholder="swimming" />
          <br /><br />
          <br />
        </form>
        <div id="savecheckin">
          <button onClick={saveCheckIn}>Save</button>
          </div>
      </div>
    </main>

  );
}