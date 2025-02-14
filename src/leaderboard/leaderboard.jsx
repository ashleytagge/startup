import React from 'react';
import './leaderboard.css';

export function Leaderboard() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Friend request sent!"); // You can replace this with your desired logic
  };

  return (
    <main>
      <div className="content-container">
        <div className="leaderboard-section">
          <h2>FRIENDS LEADERBOARD</h2>
          <h4>Badge Progress:</h4>
          <div style={{ paddingBottom: '10%' }}>
            <progress value="80" max="100" style={{ width: '100%', height: '20px', appearance: 'none' }}>
              <span>60%</span>
            </progress>
          </div>
          <div className="tables">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>paddleboardgurrrl</td>
                  <td>350</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>spenytagg6</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>ComsoDaCougar</td>
                  <td>50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="friends-list-section">
          <table>
            <thead>
              <tr>
                <th>Friends List</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Spenytagg6</td>
              </tr>
              <tr>
                <td>CosmoDaCougar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Friend Form */}
<div id="form-section">
  <form onSubmit={handleSubmit}>
    <label htmlFor="add-friend">Friend's ID:</label>
    <br />
    <input type="text" id="add-friend" name="friend-name" placeholder="bestfriend4ever" required />
    <br /><br />
    <div id="add-friend-button">
    <button type="submit">Add Friend</button>
    </div>
  </form>
</div>
    </main>
  );
}
