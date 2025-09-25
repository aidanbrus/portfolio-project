import React from 'react'
import navbar from './navbar'
import trackScene from './trackScene'
import './App.css'

function App() {

  return (
    <>
      <navbar />
      <section id="home">
        <trackScene />
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
