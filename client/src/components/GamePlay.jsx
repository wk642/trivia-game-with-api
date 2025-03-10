import React, { useState, useEffect, useRef } from 'react';
import GameResult from './GameResult';
import './GamePlay.css';

function GamePlay({ settings, onRestart }) {
  // declare all the sates
  const [questionsDisplayed, setQuestionsDisplayed] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const questionsFetched = useRef(false);
  const isFetching = useRef(false);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  // hadnling the 429 error 
  async function retry429(url, maxNumberOfRetries = 3, delay = 1000) {
    let numberOfRetries = 0;
    while (numberOfRetries < maxNumberOfRetries) {
        try {
            const response = await fetch(url);
            if (response.status === 429) {
              numberOfRetries++;
                console.log(`Too Many Requests (Retry ${numberOfRetries}/${maxNumberOfRetries}). Retrying in ${delay / 1000} seconds.`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                return response;
            }
        } catch (error) {
            console.error("Fetch error:", error);
            numberOfRetries++;
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error("Max retries exceeded.");
  }
  useEffect(() => {
    const fetchQuestions = async () => {
      //maybe this is what's triggering the 429 too many attempts even when the user's setup input is not selected properly. 
      if (!settings || isFetching.current) return;
        isFetching.current = true;

        try {
          // log the settings being passed
          console.log("GamePlay settings:", settings);
          const url = `/trivia?amount=${settings.amount}&category=${settings.category}&difficulty=${settings.difficulty}&type=${settings.type}`;

          // checking the url used
          console.log("Fetching URL:", url);

          // 429 error handling 
          const response = await retry429(url);
          console.log("response", response);
          
          const responseData = await response.json();
          // kept getting error about <!DOCTYPE, checking what is actually being returned
          console.log("API response:", responseData);
          console.log("response.data", responseData.results);
          setQuestionsDisplayed(responseData.results);
          questionsFetched.current = true;
          setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Not able to get the questions", err);
        } finally {
            isFetching.current = false;
        }
      };
      if (!questionsFetched.current && questionsDisplayed === null) {
          fetchQuestions();
      }
  }, [settings]);

  // not getting text that the game can display 
  const parseHtml = (html) => {
    const parser = new DOMParser();
    const decoded = parser.parseFromString(html, 'text/html');
    return decoded.body.textContent;
  };

  // handle when asnwer is clicked
  const handleAnswerClick = (selectedAnswer) => {
    const currentQuestion = questionsDisplayed[currentQuestionIndex];
    const isCorrect = selectedAnswer === parseHtml(currentQuestion.correct_answer);

    // if answer is correct
    if (isCorrect) {
      setScore(score + 1);
      setAnswerFeedback("Correct!");
    } else {
      // incorrect
      setAnswerFeedback("Incorrect!");
    }

    // change the quesiton index
    setTimeout(() => {
      setAnswerFeedback(null);
      if (currentQuestionIndex < questionsDisplayed.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  // error handling
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (questionsDisplayed === null) {
    return <div>Loading...</div>;
  }

  // showing the game results if the game is over
  if (gameOver) {
    return (
      <GameResult
        score={score}
        totalQuestions={questionsDisplayed.length}
        onRestart={onRestart}
      />
    );
  }
  const currentQuestion = questionsDisplayed[currentQuestionIndex];


  return (
    <div className="game-container"> 
      <div className="in-game-score-div">
        <h2>Score: {score}/{questionsDisplayed.length}</h2>
      </div>

      {answerFeedback && <div className="answer-feedback">{answerFeedback}</div>}

      <div className="question-display">
        <div className="question-div">
          {parseHtml(currentQuestion.question)}
        </div>
        
        <div className="answers-div">
          {currentQuestion.type === 'multiple' ? (
            [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
            .sort(() => Math.random() - 0.5)
            .map((answer, answerIndex) => (
              <button key={answerIndex} onClick={() => handleAnswerClick(parseHtml(answer))}>
                {parseHtml(answer)}
              </button>
            ))
          ) : (
            <>
              <button onClick={() => handleAnswerClick("True")}>True</button>
              <button onClick={() => handleAnswerClick("False")}>False</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GamePlay;