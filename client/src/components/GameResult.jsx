import React from 'react';
import './GameResult.css';

function GameResult({ score, totalQuestions, onRestart }) {
    const winThreshold = totalQuestions / 2;
    const gameWon = score > winThreshold;

    return (
        <div className="game-result-container">
            <h2>Game Over!</h2>
            {gameWon ? (
                <p>Congratulations! You Win!</p>
            ) : (
                <p>Better luck next time! You Lose.</p>
            )}
            <p>Your score: {score} / {totalQuestions}</p>
            <button onClick={onRestart}>Restart Game</button>
        </div>
    );
}

export default GameResult;