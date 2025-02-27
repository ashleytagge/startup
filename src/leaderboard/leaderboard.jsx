import React, { useState, useEffect } from 'react';
import './leaderboard.css';

export function Leaderboard() {

  const [leaderboard, setLeaderboard] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const storedFriends = JSON.parse(localStorage.getItem('friends')) || [];
    setLeaderboard(storedLeaderboard);
    setFriends(storedFriends);
  }, []);

  useEffect(() => {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [leaderboard, friends]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let randomScore = Math.floor(Math.random() * 10) + 1; 
    const newScore = randomScore * 100;

    const newFriend = {
      name: friendName,
      score: newScore, //Friends total points a random generated number for now to show implementation :)
    };

    //if they aren't already friends add friend. prevent duplicates.

    if (!friends.includes(newFriend.name)) {
      setFriends([...friends, newFriend.name]);

      const newLeaderboard = [...leaderboard];
      newLeaderboard.push(newFriend);
      newLeaderboard.sort((a, b) => b.score - a.score); 

      setLeaderboard(newLeaderboard);
      alert("Friend added to leaderboard!");
    } else {
      alert("This person is already in your friends list.");
    }

    setFriendName('');
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
