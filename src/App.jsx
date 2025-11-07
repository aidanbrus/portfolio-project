import React from 'react';
import Navbar from './components/navbar.jsx';
import TrackScene from './components/trackScene.jsx';
import layoutStatus from './utils/layoutManager.js';
import { useState, useEffect } from 'react';
import './App.css';
import './index.css';

export default function App() {
  //const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [layout, setLayout] = useState('wide');
  const [navMode, setNavMode] = useState('gantry');
  const [aspect, setAspectRatio] = useState(window.innerWidth/window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const {aspectRatio, layoutMode} = layoutStatus(window.innerWidth, window.innerHeight);
      setLayout(layoutMode)
      setAspectRatio(aspectRatio)
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar mode={navMode} layoutStyle={layout} />
      <TrackScene setNavMode={setNavMode} layoutStyle={layout} camAspect={aspect} />
    </>
  );
  
}
