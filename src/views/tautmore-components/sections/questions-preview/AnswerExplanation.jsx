import React from "react";
import { string } from "prop-types";
import { renderText } from "../question-details/textHelper";

const AnswerExplanation = ({
  solutionDescription,
  solutionDescriptionImage,
}) => {
  let result;
  // if (solutionDescriptionImage || solutionDescription) {
  if (solutionDescription) {
    result = (
      <div className="row">
        <div className="col-12">
          <div className="explanation-box">
            <h4>Explanation:</h4>
            {solutionDescription && (
              <h2>
                <span>{renderText(solutionDescription)}</span>
              </h2>
            )}
            {/* {solutionDescriptionImage && (
              <img
                className="description-image"
                src={solutionDescriptionImage}
                alt="solution_description"
              />
            )} */}
          </div>
        </div>
      </div>
    );
  } else {
    result = null;
  }
  return result;
};

AnswerExplanation.propTypes = {
  solutionDescription: string.isRequired,
  solutionDescriptionImage: string.isRequired,
};
export default AnswerExplanation;
