import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

// internal database for users
const users = {};

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form from submitting an empty user

    const username = e.target['adventure-id'].value;
    const password = e.target['password'].value;

    if (!users[username]) {
      // Automatically create an account they don't have one
      users[username] = { password, friends: [] };
      console.log(`Account created for ${username}`);
    } else if (users[username].password !== password) {
      alert('Incorrect password');
      return;
    }

    localStorage.setItem('currentUser', username); 
    navigate('/map'); // Navigate to map
  };

  return (
    <main className="page-content">
      <div id="logo-section">
        <img src="paddle.png" width="150" height="150" alt="Paddleboard Logo" />
      </div>

      <div id="header-section">
        <h2>START EXPLORING</h2>
      </div>

      <div id="form-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="adventure-id">Adventure ID:</label>
          <br />
          <input type="text" id="adventure-id" name="adventure_id" placeholder="paddleboardgurrrl" required />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input type="password" id="password" name="password" placeholder="***********" required />
          <br /><br />
          <button type="submit">Dive In</button>
          <br />
          <p>If you're new, simply log in to create an account.</p>
        </form>
      </div>
    </main>
  );
}

// Access the current user and display the name on main game page
export function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

// Add a friend by their username
export function addFriend(friendUsername) {
  const currentUser = getCurrentUser();
  if (users[friendUsername] && currentUser && !users[currentUser].friends.includes(friendUsername)) {
    users[currentUser].friends.push(friendUsername);
    console.log(`${friendUsername} added as a friend!`);
  } else {
    console.log('Friend not found or already added.');
  }
}
