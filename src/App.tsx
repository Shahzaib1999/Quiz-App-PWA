import React, { useEffect, useState } from "react";

import "./App.css";
import QuizCard from "./Components/QuizCard/QuizCard";

import { getQuiz } from "./services/quiz_service";
import { QuestionType } from "./Types/quiz_types";

function App() {
  const [myQuiz, setMyQuiz] = useState<QuestionType[]>([]);
  let [currentQuiz, setCurrentQuiz] = useState(0);
  let [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quiz: QuestionType[] = await getQuiz();
      setMyQuiz(quiz);
    };
    fetchQuiz();
  }, [showResult]);

  const onSubmit = (e: React.FormEvent<EventTarget>, ans: string) => {
    e.preventDefault();

    if (ans === myQuiz[currentQuiz].correct_answer) {
      setScore(++score);
    }
    if (myQuiz.length - 1 === currentQuiz) {
      setShowResult(true);
    } else {
      setCurrentQuiz(++currentQuiz);
    }
  };

  const onRestart = () => {
    setShowResult(false);
    setCurrentQuiz(0);
    setMyQuiz([]);
    setScore(0);
  };

  if (!myQuiz.length) {
    return <h1 className="loading">Loading...</h1>;
  }
  if (showResult) {
    return (
      <div className="App">
        <div className="resultCardWrapper">
          <h1>Result</h1>
          <p>
            Your final score is {score} out of {myQuiz.length}
          </p>
          <button onClick={onRestart}>Restart</button>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <div className="titleWrapper">
        <p>
          {"<"} Quiz <b>App</b> {"/>"}
        </p>
      </div>
      <QuizCard
        totalQuestions={myQuiz.length}
        currentQuestion={currentQuiz}
        question={myQuiz[currentQuiz].question}
        options={myQuiz[currentQuiz].options}
        score={score}
        callback={onSubmit}
      />
    </div>
  );
}

export default App;
