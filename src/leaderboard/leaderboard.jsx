import React, { useState, useEffect } from 'react';
import { getCurrentUserPoints } from '../map/map';
import './leaderboard.css';

export function Leaderboard() {
  const [currentUser, setCurrentUser] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');

  async function fetchUser() {
    try {
      const res = await fetch('/api/user/me', {
        method: 'GET',
        credentials: 'include', // Ensures cookies (token) are sent
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.userid);
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const currentUserPoints = getCurrentUserPoints();
      setLeaderboard([{ name: currentUser, score: currentUserPoints }]);
    }
  }, [currentUser]);

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
      score: newScore, 
    };

    if (!friends.includes(newFriend.name)) {
      setFriends([...friends, newFriend.name]);

      const newLeaderboard = [...leaderboard, newFriend];
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
            <progress value={getCurrentUserPoints()} max="2500" style={{ width: '100%', height: '20px', appearance: 'none' }}>
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
                {leaderboard.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
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
              {friends.map((friend, index) => (
                <tr key={index}>
                  <td>{friend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div id="form-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="add-friend">Friend's ID:</label>
          <br />
          <input
            type="text"
            id="add-friend"
            name="friend-name"
            placeholder="bestfriend4ever"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            required
          />
          <br /><br />
          <div id="add-friend-button">
            <button type="submit">Add Friend</button>
          </div>
        </form>
      </div>
    </main>
  );
}
