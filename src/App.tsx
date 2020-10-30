import React, { useEffect, useState } from "react";
import axios from 'axios';

import "./App.css";
import firebase from './firebase';
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


    const sendNotification = async () => {
      const messaging = firebase.messaging();
      // messaging.requestPermission()
      const token = await messaging.getToken();
      const response = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        {
          notification: {
            title: "Quiz App",
            body: "Time To Check Your IQ",
            click_action: "",
            icon: 'https://www.worldofmobileapps.co/wp-content/uploads/2017/10/512x512-1.png',
          },
          "to": token
        },
        { headers: { 'Content-Type': 'application/json', 'Authorization': 'key=AAAAsYLJ3Gg:APA91bHr8msGospratPn7KXTC_46hWvwKe0nY1z-i7xXNwAsH-zcsbJTBGx3hz0Eew9dPtDCbJcUWRQXvXo_hskrpF7kWZYYnJtSWL0TfhyhFPAr6EN5DZAF6PgmpcjANHizfj7oOYvw' } }
      );
      console.log('Response: ', response);
    }

    sendNotification()

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
