import React, { useState } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

import "./QuizCard.css";
import { questionPropsType } from "../../Types/quiz_types";

const QuizCard: React.FC<questionPropsType> = ({
  question,
  options,
  callback,
  currentQuestion,
  totalQuestions,
  score,
}) => {
  const [activeInd, setActiveInd] = useState(Infinity);
  const [selectedAns, setSelectedAns] = useState("");
  const opts: string[] = ["A", "B", "C", "D"];
  const handleChange = (e: any, ind: number) => {
    setActiveInd(ind);
    setSelectedAns(e);
  };
  const onSubmitHandler = (e: React.FormEvent<EventTarget>) => {
    if (!selectedAns) {
      e.preventDefault();
      return false;
    }
    setActiveInd(Infinity);
    setSelectedAns("");
    callback(e, selectedAns);
  };
  return (
    <form onSubmit={(e: React.FormEvent<EventTarget>) => onSubmitHandler(e)}>
      <div className="quizCardWrapper">
        <div className="questionWrapper">
          <div className="questionSubWrapper">
            <div className="questionNumber">
              <span className="questionNumberText">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            <div className="question">
              <p
                className="questionText"
                dangerouslySetInnerHTML={{ __html: question }}
              />
            </div>
          </div>
          <div className="answerWrapper">
            <p className="answerText">Answer</p>
            <div className="optionsWrapper">
              <div className="option">
                <div className="row">
                  {options?.map((opt: string, ind: number) => (
                    <div
                      className={ind === activeInd ? "column active" : "column"}
                      key={ind}
                      onClick={() => handleChange(opt, ind)}
                    >
                      <p className="optionsAlp">{opts[ind]})</p>
                      <p
                        className={
                          opt.length > 19 ? "options ft-14" : "options"
                        }
                        dangerouslySetInnerHTML={{ __html: opt }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="submitWrapper">
              {!selectedAns ? (
                <Tooltip
                  title="Please select a answer"
                  position="bottom"
                  arrow={true}
                >
                  <button type="submit" className="enterBtn">
                    Enter
                  </button>
                </Tooltip>
              ) : (
                <button type="submit" className="enterBtn">
                  Enter
                </button>
              )}
            </div>
            <div className="scoreWrapper">
              <p className="score">
                Score: <b> {score}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default QuizCard;
