import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import './GameSetup.css';

function GameSetup({ startGame }) {
  const [numberOfQuestions, setNumberOfQuestions] = useState('10');
  const questionType = useRef('multiple');
  const questionDifficulty = useRef('medium');
  const questionCategory = useRef('');
  // commenting this part out for now, not working, goal is to make it so that what user selected will have a border around it
  // const [selectedButton, setSelectedButton] = useState('notSelected');

  const changeNumberOfQuestions = (event) => {
    setNumberOfQuestions(parseInt(event.target.value));
  };

  const changeQuestionType = (type) => {
    questionType.current = type;
    // setSelectedButton = "selected";
  };

  const changeDifficulty = (difficulty) => {
    questionDifficulty.current = difficulty;
    // setSelectedButton = "selected";
  };

  const handleStartGame = () => {
    const gameSettings = {
      amount: numberOfQuestions,
      type: questionType.current,
      difficulty: questionDifficulty.current,
      category: questionCategory.current.value,
    };

    console.log("Game Settings:", gameSettings);

    if (startGame) {
      startGame(gameSettings);
    }
  };

  return (
    <div className="game-setup-container">
      <h2>Game Setup</h2>
      {/* number of questions slider */}
      <div className="number-of-questions-div">
        <label>Number of Questions: {numberOfQuestions}</label>
        {/* <br /> */}
        <input
          type="range"
          id="numQuestions"
          min="3"
          max="15"
          value={numberOfQuestions}
          onChange={changeNumberOfQuestions}
        />
      </div>

      {/* question type, multiple choice / true false */}
      <div className="question-type-div">
        <button 
          onClick={() => changeQuestionType('multiple')}
          // className={questionType === 'boolean' ? 'selected' : ''}
        >
          Multiple Choice
        </button>
        <button 
          onClick={() => changeQuestionType('boolean')}
          // className={questionType === 'boolean' ? 'selected' : ''}
        >
          True/False
        </button>
      </div>

      {/* difficulty levels: easy, medium, hard */}
      <div className="difficulty-div">
        <button 
          onClick={() => changeDifficulty('easy')}
          // className={questionDifficulty === 'easy' ? 'selected' : ''}
        >
          Easy
        </button>
        <button 
          onClick={() => changeDifficulty('medium')}
          // className={questionDifficulty === 'medium' ? 'selected' : ''}
        >
          Medium
        </button>
        <button 
          onClick={() => changeDifficulty('hard')}
          // className={questionDifficulty === 'easy' ? 'selected' : ''}
        >
          Hard
        </button>
      </div>

      <div className="category-div">
        <select ref={questionCategory}>
          <option value=''>Any Category</option>
          <option value='9'>General Knowledge</option>
          <option value='10'>Entertainment: Books</option>
          <option value='11'>Entertainment: Film</option>
          <option value='12'>Entertainment: Music</option>
          <option value='13'>Entertainment: Musical & Theaters</option>
          <option value='14'>Entertainment: Television</option>
          <option value='15'>Entertainment: Video Games</option>
          <option value='16'>Entertainment: Board Games</option>
          <option value='17'>Science & Nature</option>
          <option value='18'>Science: Computers</option>
          <option value='19'>Science: Mathematics</option>
          <option value='20'>Mythology</option>
          <option value='21'>Sports</option>
          <option value='22'>Geography</option>
          <option value='23'>History</option>
          <option value='24'>Politics</option>
          <option value='25'>Art</option>
          <option value='26'>Celebreties</option>
          <option value='27'>Animals</option>
          <option value='28'>Vehicles</option>
          <option value='29'>Entertainment: Cosmics</option>
          <option value='30'>Science: Gadgets</option>
          <option value='31'>Entertainment: Japanese Anime & Manga</option>
          <option value='32'>Entertainment: Cartoon & Animations</option>
        </select>
      </div>

      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
}

export default GameSetup;