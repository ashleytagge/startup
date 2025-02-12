import React from 'react';

export function Login() {
  return (
    
<main>
      <div id="logo-section">
        {/* Paddleboard Image to go above the header text on login page */}
        <img src="paddle.png" width="150" height="150" alt="Paddleboard Logo" />
      </div>

      <div id="header-section">
        <h2>START EXPLORING</h2>
      </div>

      <div id="form-section">
        <form action="map.html" method="get">
          <label for="adventure-id">Adventure ID:</label>
          <br />
          <input type="text" id="adventure-id" name="adventure_id" placeholder="paddleboardgurrrl" required />
          <br /><br />
          <label for="password">Password:</label>
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