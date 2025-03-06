import React, { useRef, useState, useEffect } from 'react';
import './GameSetup.css'

function GameSetup({ onStartGame }) {
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const questionType = useRef('multiple-choice');
  const questionDifficulty = useRef('medium');

  const handleStartGame = () => {
    const gameSettings = {
      numberOfQuestions: numberOfQuestions,
      questionType: questionType.current,
      questionDifficulty: questionDifficulty.current,
    };

    console.log('Game Settings:', gameSettings);
    if (onStartGame) {
      onStartGame(gameSettings);
    }
  };

  const chanageNumberOfQuestions = (event) => {
    setNumberOfQuestions(parseInt(event.target.value, 10));
  };

  const changeQuestionType = (type) => {
    questionType.current = type;
  };

  const changeDifficulty = (difficulty) => {
    questionDifficulty.current = difficulty;
  };

  return (
    <div className="game-setup-container">
      <h2>Game Setup</h2>
      <div className="number-of-questions-div">
        <label>Number of Questions: {numberOfQuestions}</label>
        <br/>
        <input
          type="range"
          id="numQuestions"
          min="1"
          max="50"
          value={numberOfQuestions}
          onChange={chanageNumberOfQuestions}
        />
      </div>

      <div className="question-type-div">
        <label>Question Type:</label>
        <br/>
        <button onClick={() => changeQuestionType('multiple-choice')}>
          Multiple Choice
        </button>
        <button onClick={() => changeQuestionType('true-or-false')}>
          True/False
        </button>
      </div>

      <div className="difficulty-div">
        <label>Question Difficulty:</label>
        <br/>
        <button onClick={() => changeDifficulty('easy')}>
          Easy
        </button>
        <button onClick={() => changeDifficulty('medium')}>
          Medium
        </button>
        <button onClick={() => changeDifficulty('hard')}>
          Hard
        </button>
      </div>

      <div>
        <label>Question Category:</label>
        <br/>
        
      </div>

      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default GameSetup;