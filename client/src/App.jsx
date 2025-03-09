import React, { useState } from 'react'
import './App.css'
import GameSetup from './components/GameSetup'
import GamePlay from './components/GamePlay'
import GameResult from './components/GameResult'

function App() {
  return (
      <div>
        <GameSetup />
        <GamePlay />
        <GameResult />
      </div>
  )
}

export default App;
