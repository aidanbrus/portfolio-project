// navbar for the website
// last line is if I want a separate page for boring stuff like private policy and the like

// import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

// new navbar code
export default function Navbar({mode, layoutStyle, visNavbar, prog}) {
  let navPos = 0;
  // let navWid = 0;
  if (prog<0.00326) {
    // navWid = 65.25 + (34.75/0.00326)*prog
    navPos = (-200/0.00326)*prog;
  }
  if (prog>=0.00326 && prog<0.05 || prog>=0.987 && prog<0.999) {
    navPos = -200;
  }
 // console.log(visNavbar);

  if (layoutStyle === 'wide' || layoutStyle === 'medium' && prog<0.05) {
    return (
      <div 
        className={`navbar ${mode} ${layoutStyle} ${visNavbar ? 'visible' : ''}`}
        style={{
          transform: `translateY(${navPos}px) translateX(-50%)`,
        }}
      >
        <>
          <a href='#'>Performance</a>
          <a href='#'>Methods</a>
          <a href='#'>About</a>
          <a href='#'>Bio</a>
          <button className='hamburger'>☰</button>
        </>
      </div>
    )
  } else if (layoutStyle === 'wide' || layoutStyle === 'medium' && prog>=0.05) {
    return (
      <div 
        className={`navbar ${mode} ${layoutStyle} ${visNavbar ? 'visible' : ''}`}
      >
        <>
          <a href='#'>Performance</a>
          <a href='#'>Methods</a>
          <a href='#'>About</a>
          <a href='#'>Bio</a>
          <button className='hamburger'>☰</button>
        </>
      </div>
    )
  } else if (layoutStyle === 'skinny' || layoutStyle === 'weird' && prog<0.05){
    return (
      <div 
        className={`navbar ${mode} ${layoutStyle} ${visNavbar ? 'visible' : ''}`}
        style={{
          transform: `translateY(${navPos}px) translateX(-50%)`,
        }}
      >
        <>
          <a href='#'>Performance</a>
          <a href='#'>Methods</a>
          <button className='hamburger'>☰</button>
        </>
      </div>
    )
  } else {
    return (
      <div 
        className={`navbar ${mode} ${layoutStyle} ${visNavbar ? 'visible' : ''}`}
      >
        <>
          <a href='#'>Performance</a>
          <a href='#'>Methods</a>
          <button className='hamburger'>☰</button>
        </>
      </div>
    )
  }

}