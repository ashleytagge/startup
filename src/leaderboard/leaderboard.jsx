import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../login/login';
import { getCurrentUserPoints } from '../map/map';
import './leaderboard.css';

export function Leaderboard() {

  const [currentUser, setCurrentUser] = useState('');
  const [currentUserPoints, setCurrentUserPoints] = useState(0);
  const [leaderboard, setLeaderboard] = useState([
    { name: currentUser, score: currentUserPoints }
  ]);
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');

  // Fetch user data from the backend when the component loads
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/user/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const user = await response.json();
          setCurrentUserPoints(user.score);
          setCurrentUser(user.username);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
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
            <progress value={currentUserPoints} max="2500" style={{ width: '100%', height: '20px', appearance: 'none' }}>
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
                    <td>{currentUser}</td>
                    <td>{currentUserPoints}</td>
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

      {/* Add Friend Form */}
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