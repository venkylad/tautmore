import React from "react";
import { array, string } from "prop-types";
import AnswerOption from "./AnswerOption";
import { checkDragDropSnunscramble } from "../../forms/question-form/questionHelper";

const TestAnswerWrapper = ({
  options,
  ansType,
  solutionIndex,
  questionType,
  questionOrientaion
}) => {
  if (checkDragDropSnunscramble(questionType)) return null;

  return (
    <div className="row">
      <div className="col-12">
        <span className="answer-title pt-4">Select your answer</span>
        <div className={`question-options-wrapper ${ansType} ${questionOrientaion}`}>
          {options?.map((item, i) => ((item?.text !== "" || item?.image!=="")  &&
            <AnswerOption
              index={i}
              key={item?.id}
              item={item}
              ansType={ansType}
              questionType={questionType}
              isSelect={solutionIndex?.includes(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

TestAnswerWrapper.propTypes = {
  options: array.isRequired,
  solutionIndex: array.isRequired,
  questionOrientaion:string.isRequired
};

export default TestAnswerWrapper;
