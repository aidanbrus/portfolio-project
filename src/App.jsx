import React from 'react';
import Navbar from './components/navbar.jsx';
import TrackScene from './components/trackScene.jsx';
import layoutStatus from './utils/layoutManager.js';
import { useState, useEffect } from 'react';
import './styles/App.css'
import './styles/index.css';

export default function App() {
  const [navbarVis, setNavbarVis] = useState(false);
  const [layout, setLayout] = useState('wide');
  const [navMode, setNavMode] = useState('loading');
  const [aspect, setAspectRatio] = useState(window.innerWidth/window.innerHeight);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth, 
    height: window.innerHeight
  });
  const [navProg, setNavProg] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const {aspectRatio, layoutMode} = layoutStatus(window.innerWidth, window.innerHeight);
      setLayout(layoutMode)
      setAspectRatio(aspectRatio)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar mode={navMode} layoutStyle={layout} visNavbar={navbarVis} prog={navProg}/>
      <TrackScene setNavMode={setNavMode} layoutStyle={layout} camAspect={aspect} sizeWindow={windowSize} setVisNavbar={setNavbarVis} setProgNav={setNavProg}/>
    </>
  );
  
}
