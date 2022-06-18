import React from "react";
import { findKeyByValue } from "../../forms/question-form/questionHelper";

const TestHeader = ({
  classVal,
  subjectName,
  chapter,
  concept,
  solutionType,
  difficulty,
  moduleType
}) => (
  <div className="row">
    <div className="col-12 col-sm-12 col-md-12 mb-4 test-header-left">
      <h3 className="test-header">Question Preview</h3>
      <div className="row">
        <div className="col-md-9 col-sm-12">
          <span className="sub-links-normal 111">
            {/* Pre - kindergarten / Mathematics / Chapter 1 / */}
            {classVal} / {subjectName} / {chapter} /
          </span>
          <span className="sub-links-active"> {concept}</span>
        </div>
        {moduleType === "exams" ? '' :
        <div className="col-md-3 col-sm-12 test-header-difficulty">
          <span><span className="bold">Difficulty: </span>{difficulty}</span>
        </div>
        }
      </div>
      
    </div>
    <div className="col-12">
      <div className="questiontype-box">
        <h4>
          Question Type : <span>{findKeyByValue(solutionType)}</span>
        </h4>
      </div>
    </div>
  </div>
);

export default TestHeader;
