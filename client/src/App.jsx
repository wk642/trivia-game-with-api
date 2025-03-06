import React, { useState } from 'react'
import './App.css'
import GameSetup from './components/GameSetup'
import GamePlay from './components/GamePlay'

function App() {
  return (

      <div>
        <GameSetup />
        <GamePlay />
      </div>

  )
}

export default App;
