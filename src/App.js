import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const checkAnswers = function (questionObject, selectedAnswer) {
    const allQuestionsCopy = list.map(function (listElement) {
      if (listElement === questionObject) {
        const questionCopy = { ...questionObject };
        questionCopy.isAnswered = true;
        if (selectedAnswer === questionObject.correct_answer) {
          console.log((questionCopy.answeredCorrectly = true));
        } else {
          console.log((questionCopy.answeredCorrectly = false));
        }
        return questionCopy;
      } else {
        return listElement;
      }
    });
    setList(allQuestionsCopy);
  };

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((json) => {
        console.log("insideFetch results", json.results);
        setList(json.results);
      });
  }, []);

  return (
    <div className="App">
      <h1>Quiz</h1>
      {list.map((question, index) => {
        console.log(question);
        const allAnswers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        shuffleArray(allAnswers);
        return (
          <div key={index} className="question">
            <p>{question.question}</p>
            {question.answeredCorrectly && <p>Correct!✌️</p>}
            {question.answeredCorrectly === false && <p>Wrong❌</p>}
            {question.isAnswered !== true &&
              allAnswers.map((option) => {
                return (
                  <button onClick={() => checkAnswers(question, option)}>
                    {option}
                  </button>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
