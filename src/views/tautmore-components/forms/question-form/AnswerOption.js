import React, { useState } from "react";
import { string } from "prop-types";
import { Row, Col, Label } from "reactstrap";
import AnsweroptionCommon from "./AnsweroptionCommon";
import { v4 as uuid } from "uuid";

const AnswerOption = ({
  options,
  handleOptions,
  questiontype,
  solutionIdxError,
  noOptionError,
  quebodyval,
  selectedSub,
  questiondetail
}) => {
  const [dragItem, setDragItem] = useState();
  // console.log("dragItem",dragItem);

  const addOption = (event) => {
    event.preventDefault();
    const optionData = {
      id: uuid(),
      index: options?.length,
      name: "option 1",
      text: "",
      image: "",
      value: "",
      error: "",
      checked: false,
      solutionIdxError: "",
      statementImage: "",
      statementText: "",
    };
    handleOptions([...options, optionData]);
  };

  return (
    <Row className="row-main">
      <Col>
        {questiontype === "drag-and-drop" && <Label>Create table</Label>}
        <div
          className={`answer-option-menu ${options?.length > 0 ? "active" : ""
            }`}
        >
          {questiontype !== "drag-and-drop" && (
            <Label for="data-answer">
              Answer Options (Select the right answer)
            </Label>
          )}
          {options?.map((option, idx) => (
            <AnsweroptionCommon
              data={option}
              key={option?.id}
              index={idx}
              questiontype={questiontype}
              handleOptions={handleOptions}
              options={options}
              dragItem={dragItem}
              handleDragItem={setDragItem}
              selectedSub={selectedSub}
              questiondetail={questiondetail}
            />
          ))}
        </div>
        {questiontype !== "passage" &&
          questiontype !== "drag-and-drop" &&
          solutionIdxError && (
            <div className="rp-manage-school_error-message mt-25 right-answer">
              Please select the right answer
            </div>
          )}
        {questiontype === "passage" && (
          <div className="rp-manage-school_error-message mt-25 right-answer">
            {options.solutionIdxError}
          </div>
        )}
        <div className={`add-option active`}>
          <button onClick={addOption}>+</button>
          {questiontype !== "drag-and-drop" ? "Add new option" : "Add new row"}
        </div>
        {questiontype !== "passage" && noOptionError && (
          <div className="rp-manage-school_error-message mt-25">
            Please add option
          </div>
        )}
        {questiontype === "passage" && (
          <div className="rp-manage-school_error-message mt-25">
            {quebodyval.addOptionError}
          </div>
        )}
      </Col>
    </Row>
  );
};

AnswerOption.propTypes = {
  questiontype: string.isRequired,
};

export default AnswerOption;
