import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Checkin } from './checkin/checkin';
import { Leaderboard } from './leaderboard/leaderboard';
import { Map } from './map/map';
import { Treasure } from './treasure/treasure';
import { TreasureChest } from './treasure_chest/treasure_chest';


export default function App() {
  return (
    <BrowserRouter>
  <div className='body bg-dark text-light'>

    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-dark">
        <menu className="navbar-nav">
        <li className="nav-item">
          <NavLink className='nav-link' to='login'>AquaQuest</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className='nav-link' to='login'>Login</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className='nav-link' to='map'>Adventure Map</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className='nav-link' to='leaderboard'>Leaderboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className='nav-link' to='treasureChest'>Treasure Chest</NavLink>
        </li>
      </menu>
    </nav>
  </header>

  <Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/login' element={<Login />} />
  <Route path='/map' element={<Map />} />
  <Route path='/leaderboard' element={<Leaderboard />} />
  <Route path='/treasurechest' element={<TreasureChest />} />
  <Route path='/checkin' element={<Checkin />} />
  <Route path='/treasure' element={<Treasure />} />
  <Route path='*' element={<NotFound />} />
</Routes>

<footer className='bg-dark text-white-50' id="footer-section">
        <div className='container-fluid'>
          <span className='text-reset'>Ashley Thornton</span>
          <a className='text-reset' href='https://github.com/ashleytagge/startup/tree/main'>
            Github
          </a>
        </div>
      </footer>
</div>
</BrowserRouter>
);
}


function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
