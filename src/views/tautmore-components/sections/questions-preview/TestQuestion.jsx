import React from "react";
import { object, string } from "prop-types";
import { renderText } from "../question-details/textHelper";
import DragAndDropQuestion from "./DragAndDropQuestion/DraggAndDropQuestion";

const TestQuestion = ({ qIndex, description, queDetails }) => {
  console.log(queDetails, 'queDetails from test questions')
return (
  <div className="row">
    <div className="col-12">
      <div className="question-box">
        <h4>{qIndex ? `${qIndex}. Question:` : "Question title:"}</h4>
        <h2>
          <span>{renderText(description)}</span>
        </h2>
        <DragAndDropQuestion questionDetailsData={queDetails} />
      </div>
    </div>
  </div>
)};

TestQuestion.propTypes = {
  quesData: object.isRequired,
  qIndex: string.isRequired,
};
export default TestQuestion;
