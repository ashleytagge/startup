import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission
    navigate('/map'); // Navigate to Map component
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
