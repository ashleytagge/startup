import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate('/map'); 
  };

  return (
    <main className="page-content">
      <div id="logo-section">
        <img src="paddleboard.png" width="150" height="100" alt="Checkin Logo" />
      </div>

      <div id="header-section">
        <h2>ADVENTURE CHECK</h2>
      </div>

      <div id="form-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="Location">Location:</label>
          <br />
          <input type="text" id="Location" name="Location" placeholder="Havasupai Falls" required />
          <br /><br />
          <label htmlFor="activity">Activity:</label>
          <br />
          <input type="text" id="activity" name="activity" placeholder="swimming" />
          <br /><br />
          <button type="submit">Save</button>
          <br />
        </form>
      </div>
    </main>
  );
}
