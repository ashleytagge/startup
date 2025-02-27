import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 

    //grab the users input for local storage
    const location = e.target.Location.value;
    const activity = e.target.activity.value;


    //existing lists
    const locations = JSON.parse(localStorage.getItem('locations')) || [];
    const activities = JSON.parse(localStorage.getItem('activities')) || [];

    //add new location and activity
    locations.unshift(location);
    activities.unshift(activity);

    //save updated lists to local storage
    localStorage.setItem('locations', JSON.stringify(locations));
    localStorage.setItem('activities', JSON.stringify(activities));

    //test functionality!!!!!!

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
          <input type="text" id="activity" name="activity" placeholder="swimming" required />
          <br /><br />
          <button type="submit">Save</button>
          <br />
        </form>
      </div>
    </main>
  );
}
