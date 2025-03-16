import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogin() {
    createAuth('PUT');
  }

  function handleRegister() {
    createAuth('POST');
  }

  async function createAuth(method) {
    const res = await fetch('/api/auth', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid: username, password }), // Fixed variable name
    });

    await res.json();
    if (res.ok) {
      navigate('/profile');
    } else {
      alert('Authentication failed');
    }
  }

  return (
    <main className="page-content">
      <div id="logo-section">
        <img src="paddle.png" width="150" height="150" alt="Paddleboard Logo" />
      </div>

      <div id="header-section">
        <h2>START EXPLORING</h2>
      </div>

      <div id="form-section">
        <form>
          <label htmlFor="adventure-id">Adventure ID:</label>
          <br />
          <input 
            type="text" 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="paddleboardgurrrl" 
            required 
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="***********" 
            required 
          />
          <br /><br />
          <button type="button" disabled={!(username && password)} onClick={handleLogin}>
            Dive In
          </button>
          <br />
          <button type="button" disabled={!(username && password)} onClick={handleRegister}>
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
