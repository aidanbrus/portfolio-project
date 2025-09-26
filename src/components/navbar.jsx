// navbar for the website
// last line is if I want a separate page for boring stuff like private policy and the like

import React from 'react';
import { useState, useEffect } from 'react';
import '../index.css';

function Navbar() {
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    
    const handleScroll = () => {
      setShrunk(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${shrunk ? "shrunk" : ""}`}>
      <ul>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </ul>
    </nav>
  );
}

export default Navbar;
