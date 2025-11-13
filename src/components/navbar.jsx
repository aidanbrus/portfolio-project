// navbar for the website
// last line is if I want a separate page for boring stuff like private policy and the like

// import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

// new navbar code
export default function Navbar({mode, layoutStyle, visNavbar}) {
  if (layoutStyle === 'wide' || layoutStyle === 'mobileWide') {
    return (
      <div className={`navbar ${mode} ${layoutStyle} ${visNavbar ? 'visible' : ''}`}>
        <>
          <a href='#'>Performance</a>
          <a href='#'>Methods</a>
          <a href='#'>About</a>
          <a href='#'>Bio</a>
          <button className='hamburger'>☰</button>
        </>
      </div>
    )
  } else {
    return (
      <div className={`navbar ${mode} ${layoutStyle} ${visNavbar ? 'visible' : ''}`}>
        <>
          <a href='#'>Performance</a>
          <a href='#'>Methods</a>
          <button className='hamburger'>☰</button>
        </>
      </div>
    )
  }

}