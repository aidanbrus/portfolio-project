import React from 'react';
import Navbar from './components/navbar.jsx';
import TrackScene from './components/trackScene.jsx';
import { useState } from 'react';
import './App.css';
import './index.css';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleNavTrigger = (phase) => {
    console.log("handleNavTrigger called with phase =", phase);
    if (phase === 3) {
      setShowNavbar(true);
    }
  };

  return (
    <>
      <section id="home">
        <TrackScene navBarTrigger={handleNavTrigger} />
        {showNavbar && <Navbar visible={showNavbar} />}
      </section>
      <section id="bio">
        <h2>Bio</h2>
        <p>Some info about you here.</p>
      </section>
      <section id="projects">
        <h2>Projects</h2>
        <p>Some project info here.</p>
      </section>
    </>
  );
}

export default App
