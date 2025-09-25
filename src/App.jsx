import React from 'react'
import Navbar from './components/navbar.jsx'
import TrackScene from './components/trackScene.jsx'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <section id="home">
        <TrackScene />
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
  )
}

export default App
