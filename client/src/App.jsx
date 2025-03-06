import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameSetup from './components/GameSetup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <GameSetup />
      </div>
    </>
  )
}

export default App;
