import React from "react";
import { string, array, number } from "prop-types";
import TestQuestion from "./TestQuestion";
import TestAnswerWrapper from "./TestAnswerWrapper";

const QuestionAnswerWrapper = ({
  showOptions,
  description,
  options,
  qIndex,
  solutionIndex,
  questionType,
  queDetails,
  questionOrientaion
}) => {
  console.log(questionType, 'questionType from ans opt');

  return (
    <div>
      <TestQuestion
        description={description}
        qIndex={qIndex}
        queDetails={queDetails}
      />
      
      {showOptions && (
        <TestAnswerWrapper
          options={options}
          queDetails={queDetails}
          questionType={questionType}
          solutionIndex={solutionIndex}
          questionOrientaion={questionOrientaion}
          ansType="selectTileType"
          quesType="optionsType"
        />
      )}
    </div>
  );
};

QuestionAnswerWrapper.propTypes = {
  qIndex: number.isRequired,
  solutionIndex: array.isRequired,
  description: string.isRequired,
  options: array.isRequired,
  questionType: string.isRequired,
  questionOrientaion:string.isRequired
};
export default QuestionAnswerWrapper;
