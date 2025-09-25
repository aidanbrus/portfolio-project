// navbar for the website
// last line is if I want a separate page for boring stuff like private policy and the like

import React from 'react';

export default function navbar() {
  return (
    <nav style={{ position: 'sticky', top: 0, backgroundColor: '#222', padding: '1rem', color: '#fff' }}>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><a href="#home" style={{ color: 'white' }}>Home</a></li>
        <li><a href="#bio" style={{ color: 'white' }}>Bio</a></li>
        <li><a href="#projects" style={{ color: 'white' }}>Projects</a></li>
        <li><a href="/privacy.html" style={{ color: 'white' }}>Privacy Policy</a></li>
      </ul>
    </nav>
  );
}