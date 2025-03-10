import React from 'react';
import './GameResult.css';

function GameResult({ score, totalQuestions, onRestart }) {
  const winThreshold = totalQuestions / 2;
  const gameWon = score > winThreshold;

  return (
    <div className="game-result-container">
      {/* Displaying the correct message */}
      <div className="win-lose-message">
      <h2>Game Over!</h2>
        {gameWon ? (
          <h2>Congratulations! You Win!</h2>
        ) : (
          <h2>Better luck next time! You Lose.</h2>
        )}

        <h2>Your score: {score} / {totalQuestions}</h2>
      </div>

      <div className="restart-game-div">
        <button onClick={onRestart}>Restart Game</button>
      </div>
    </div>
  );
}

export default GameResult;