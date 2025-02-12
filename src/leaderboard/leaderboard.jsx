import React from 'react';

export function Leaderboard() {
  return (
    
    <main>
      <div className="content-container">
        <div className="leaderboard-section">
          <img src="crown.jpg" width="150" height="100" alt="Crown" />
          <h2>FRIENDS LEADERBOARD</h2>
          <h4>My Progress</h4>
          <div style={{ paddingBottom: "10%" }}>
            <progress value="80" max="100" style={{ width: "100%", height: "40px", appearance: "none" }}>
              <span>60%</span>
            </progress>
          </div>
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
    </main>

  );
}