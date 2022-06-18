import React from "react";
import DragAndDropAnswer from "./DragAndDropAnswer";
import DragAndDropSolution from "./DragAndDropSolution";
import { findKeyByValue } from "../../../forms/question-form/questionHelper";
import { checkDragDropSnunscramble } from "../../../forms/question-form/questionHelper";

const DraggAndDropQuestion = ({ questionDetailsData }) => {
  const questionType = findKeyByValue(questionDetailsData?.solutionType);

  if (!checkDragDropSnunscramble(questionType)) return null;
  return (
    <div>
      <DragAndDropAnswer
        questionDetailsData={questionDetailsData}
        questionType={questionType}
      />
      <DragAndDropSolution questionDetailsData={questionDetailsData} />
    </div>
  );
};

export default DraggAndDropQuestion;
