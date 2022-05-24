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
    console.log(`You made a selection, ${selectedAnswer}`);
    if (selectedAnswer === questionObject.correct_answer) {
      console.log("You are correct");
    } else {
      console.log("You are wrong");
    }
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
      {list.map((question) => {
        console.log(question);
        const allAnswers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        shuffleArray(allAnswers);
        return (
          <div className="question">
            <p>{question.question}</p>
            {allAnswers.map((option) => {
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
