import { QuizType, QuestionType } from "../Types/quiz_types";

const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const getQuiz = async () => {
  const api = await fetch(
    "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
  );
  let { results } = await api.json();
  const quiz: QuestionType[] = results.map((quesObj: QuizType) => {
    return {
      question: quesObj.question,
      answer: quesObj.correct_answer,
      options: shuffleArray(
        quesObj.incorrect_answers.concat(quesObj.correct_answer)
      ),
      correct_answer: quesObj.correct_answer,
    };
  });
  return quiz
};
