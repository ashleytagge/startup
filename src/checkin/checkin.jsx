import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
  
    // Grab the user's input for backend
    const location = e.target.Location.value;
    const activity = e.target.activity.value;

  
    try {
      // Fetch the current user data from the backend
      const response = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        const user = await response.json(); // Parse the user data from the response
  
        // Get existing locations and activities (from the backend data)
        let updatedLocations = user.locations || [];
        let updatedActivities = user.activities || [];
  
        // Add the new location and activity to the lists
        updatedLocations.push(location);
        updatedActivities.push(activity);
  
        // Update the user data on the backend (including the new location and activity)
        const updateResponse = await fetch('/api/user/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            locations: updatedLocations,
            activities: updatedActivities,
            progress: user.progress, // Keep the user's progress intact
            score: user.score, // Keep the user's score intact
          }),
        });
  
        if (updateResponse.ok) {
          const updatedUser = await updateResponse.json(); // Parse updated user data
          console.log('Updated user data:', updatedUser);
  
          // Navigate to the next page
          navigate('/treasure');
        } else {
          console.error('Failed to update user data');
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
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
