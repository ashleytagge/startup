import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target['adventure-id'].value;
    const password = e.target['password'].value;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.setItem('currentUser', username);
        clearLocalStorage();
        navigate('/map');
      } else if (response.status === 401) {
        alert('Incorrect username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Manually grab input values using document.getElementById OR e.currentTarget.form
    const username = document.getElementById('adventure-id').value;
    const password = document.getElementById('password').value;
  
    if (!username || !password) {
      alert('Please enter a username and password.');
      return;
    }
  
    try {
      const response = await fetch('/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      if (response.ok) {
        localStorage.setItem('currentUser', username);
        clearLocalStorage();
        navigate('/map');
      } else if (response.status === 409) {
        alert('User already exists. Try a different username.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  

  const clearLocalStorage = () => {
    localStorage.removeItem('locations');
    localStorage.removeItem('activities');
    localStorage.removeItem('images');
    localStorage.removeItem('newPoints');
    localStorage.removeItem('progress');
    localStorage.removeItem('points');
    localStorage.removeItem('friends');
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
          <button type="button" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </main>
  );
}

export function getCurrentUser() {
  return localStorage.getItem('currentUser');
}

