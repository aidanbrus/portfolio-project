// navbar for the website
// last line is if I want a separate page for boring stuff like private policy and the like

import React, { useState, useEffect } from 'react';
import '../index.css';

// function Navbar({ visible }) {
//   const [shrunk, setShrunk] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setShrunk(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className={`Navbar ${visible ? "visible" : ""} ${shrunk ? "shrunk" : ""}`}>
//       <ul>
//         <li><a href="#about">About</a></li>
//         <li><a href="#bio">Bio</a></li>
//         <li><a href="#projects">Projects</a></li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;

// new navbar code for css2d objects
export default function Navbar() {
  const div = document.createElement('div');
  div.className = 'navbar';
  div.innerHTML = `
    <nav>
      <a href="#">Bio</a> |
      <a href="#">Projects</a>
    </nav>  
  `;
  return div;
}
