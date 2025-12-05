import React from 'react';
import Navbar from './components/navbar.jsx';
import TrackScene from './components/trackScene.jsx';
import layoutStatus from './utils/layoutManager.js';
import { useState, useEffect } from 'react';
import './styles/App.css'
import './styles/index.css';
import camPoints from './panelMidpoint.json' with {type: 'json'};

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
  const [camPhase, setCamPhase] = useState(0);
  const [group, setGroup] = useState([0, 1]);

  const panelInstances = camPoints.length;

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

    // console.log(camPhase);
    if (camPhase === 1 || camPhase === 2) {
      setNavbarVis(false);
    } else if (camPhase === 3 && navProg < 0.987) {
      setNavbarVis(true);
    } else if (camPhase === 3 && navProg >= 0.987 && navProg < 0.999) {
      setNavbarVis(false);
    } else if (camPhase === 3 && navProg >= 0.999) {
      setNavbarVis(true);
    }

    const panelSpacing = 1/(panelInstances-1);
    const start = 0.5*panelSpacing;
    const end = 1-(0.5*panelSpacing);

    if (navProg<start) {
        setGroup([0, 1]);
    } else if (navProg>end) {
        setGroup([panelInstances-1, panelInstances]);
    } else {
        const currentID = Math.ceil(navProg/panelSpacing);
        setGroup([currentID-1, currentID, currentID+1]);
    }

    // console.log(navbarVis);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [camPhase, navProg]);

  return (
    <>
      <Navbar 
        mode={navMode} 
        layoutStyle={layout} 
        visNavbar={navbarVis} 
        prog={navProg}
      />
      <TrackScene 
        setNavMode={setNavMode} 
        layoutStyle={layout} 
        camAspect={aspect} 
        sizeWindow={windowSize}  
        setProgNav={setNavProg}
        setCamPhase={setCamPhase}
        panelGroup={group}
      />
    </>
  );
  
}
