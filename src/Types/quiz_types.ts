import React from "react";

export type QuizType = {
  category: string;
  correct_answer: string;
  difficult: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionType = {
  question: string;
  answer: string;
  options: string[];
  correct_answer: string;
};

export type questionPropsType = {
  question: string;
  options: string[];
  callback: (e: React.FormEvent<EventTarget>, ans: string) => void;
  totalQuestions: number;
  currentQuestion: number;
  score: number;
};
