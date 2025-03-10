import React, { useState } from 'react';
import GameSetup from './components/GameSetup';
import GamePlay from './components/GamePlay';
import './App.css'
function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [settings, setSettings] = useState(null);

    const startGame = (gameSettings) => {
        setSettings(gameSettings);
        setGameStarted(true);
    };

    const restartGame = () => {
        setGameStarted(false);
        setSettings(null);
    };

    return (
        <div>
            {gameStarted ? (
                <GamePlay settings={settings} onRestart={restartGame} />
            ) : (
                <GameSetup startGame={startGame} />
            )}
        </div>
    );
}

export default App;