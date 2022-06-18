import React from "react";
import "./style.scss";
import TestHeader from "./TestHeader";
import QuestionAnswerWrapper from "./QuestionAnswerWrapper";
import AnswerExplanation from "./AnswerExplanation";
import { findKeyByValue } from "../../forms/question-form/questionHelper";

const QuestionPreview = ({ queDetails }) => {
  console.log(queDetails, "quedetails@@@");
  return (
    <div
      className={`pt-4 pb-4 px-3 test-container background-on-success question-preview-main`}
    >
      <TestHeader
        classVal={queDetails?.class}
        difficulty={queDetails?.difficulty}
        subjectName={queDetails?.subjectName}
        chapter={queDetails?.chapter}
        concept={queDetails?.concept}
        solutionType={queDetails?.solutionType}
        moduleType={queDetails?.moduleType}
        questionType={findKeyByValue(queDetails?.solutionType)}
      />
      <QuestionAnswerWrapper
        description={queDetails?.description}
        options={queDetails?.options}
        solutionIndex={queDetails?.solutionIndex || []}
        queDetails={queDetails}
        questionOrientaion={queDetails?.questionOrientaion}
        questionType={findKeyByValue(queDetails?.solutionType)}
        showOptions={findKeyByValue(queDetails?.solutionType) !== "passage"}
      />
      {findKeyByValue(queDetails?.solutionType) === "passage" &&
        queDetails?.passageQuestions?.map((item, i) => (
          <QuestionAnswerWrapper
            key={item?._id}
            qIndex={i + 1}
            solutionIndex={item?.solutionIndex}
            description={item?.description}
            options={item?.options}
            showOptions
          />
        ))}
      <AnswerExplanation
        solutionDescription={queDetails?.solutionDescription}
        solutionDescriptionImage={queDetails?.solutionDescriptionImage}
      />
    </div>
  );
};

export default QuestionPreview;
