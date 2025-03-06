import React, { useRef, useState, useEffect } from 'react';
import './GameSetup.css'

function GameSetup({ onStartGame }) {
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const questionType = useRef('multiple-choice');
  const questionDifficulty = useRef('medium');
  const questionCategory = useRef('any-category');

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

      <div className="category-div">
        <label>Question Category:</label>
        <br/>
        <select>
          <option>Any Category</option>
          <option>General Knowledge</option>
          <option>Entertainment: Books</option>    
          <option>Entertainment: Film</option>
          <option>Entertainment: Music</option>
          <option>Entertainment: Musical & Theaters</option>
          <option>Entertainment: Television</option>
          <option>Entertainment: Video Games</option>
          <option>Entertainment: Board Games</option>
          <option>Science & Nature</option>
          <option>Science: Computers</option>
          <option>Science: Matheetics</option>
          <option>Mythology</option>
          <option>Sports</option>
          <option>Geography</option>
          <option>History</option>
          <option>Politics</option>
          <option>Art</option>
          <option>Celebreties</option>
          <option>Animals</option>
          <option>Vehicles</option>
          <option>Entertainment: Cosmics</option>
          <option>Science: Gadgets</option>
          <option>Entertainment: Japanese Anime & Manga</option>
          <option>Entertainment: Cartoon & Animations</option>
        </select>        
      </div>

      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default GameSetup;