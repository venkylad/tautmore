import React, { useEffect, useState } from "react";
import { string, func, object } from "prop-types";
import { checkIcon } from "./icons";
import { renderText } from "../question-details/textHelper";
import {
  findKeyByValue,
  checkDragDropSnunscramble,
  structureDragAndDrop,
} from "../../forms/question-form/questionHelper";

const AnswerOption = ({
  item,
  solutionType,
  isSelect,
  questionType,
  questionDetailsData,
  index,
}) => {
  const [dragData, setDragData] = useState([]);
  const [correctValue, setCorrectValue] = useState([]);
  const [MainData, setData] = useState({});
  console.log(questionDetailsData, "questionDetailsData");
  useEffect(() => {
    if (checkDragDropSnunscramble(findKeyByValue(solutionType))) {
      setDragData(
        structureDragAndDrop(
          questionDetailsData?.statement,
          questionDetailsData?.options,
          questionDetailsData?.solutionIndex
        )
      );
    } else {
      setData(questionDetailsData);
    }
    setCorrectValue(questionDetailsData?.solutionIndex);
  }, [questionDetailsData, solutionType]);

  // const optionClass = selectAnswer?.text === item?.text && 'select-answer';
  // selectAnswer.filter((order) => order.value === item.value).length &&
  // " select-answer";


  let renderAnswer = null;
  switch (questionType) {
    case "drag-and-drop":
      renderAnswer = (
        <table className="drag-detail-table">
          <thead>
            <th colspan="2">Statement</th>
            <th colspan="2">Options</th>
          </thead>
          <tbody>
            {dragData?.length > 0 &&
              dragData?.map((option, key) => {
                return (
                  <tr>
                    <td>
                      {option?.image ? (
                        <img src={option?.image} alt="option_image"></img>
                     
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>
                      {option?.text ? (
                        <span>{option?.text}</span>
                      ) : (
                        <span>No text</span>
                      )}
                    </td>
                    <td>
                      {option?.statementImage ? (
                        <img
                          src={option?.statementImage}
                          alt="option_image"
                        ></img>
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>
                      {option?.statementText ? (
                        <span>{option?.statementText}</span>
                      ) : (
                        <span>No text</span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      );
      break;
    default:
      renderAnswer = (
        <div
          className={` ${
            isSelect && "select-answer"
          } option-wrapper-tile-type d-flex align-items-center justify-content-between p-4`}
        >
          {/* {console.log("correctValue", correctValue, item?.index,item?.image)} */}
          <button type="button">
            <div className="op-main">
          {String.fromCharCode(index + 65)} <span className="opti"> . </span>
            {/* {item?.image && (
              // <div className="questionHtlm-left">
              <div className={item?.image?"questionHtlm-left-img":"questionHtlm-left"}>
                <img src={item?.image} alt="option_image"></img>
              </div>
            )} */}
            {/* {item?.text !== "" && ( */}
            {item?.imageElement !== "" && (
              // <div className="questionHtlm-right">
              // <div className={item?.image ? "questionHtlm-right-text":"questionHtlm-right"}>
              <div className={"questionHtlm-right"}>
                {/* <span>{option?.text}</span> */}
                {/* <span>{renderText(item?.text)}</span> */}
                <span>{renderText(item?.imageElement)}</span>
              </div>
            )}
            {/* <span>{ReactHtmlParser(item?.text)}</span> */}
            {/* <div className="icon--check-wrapper d-flex align-items-center justify-content-center"> */}
            <div className={item?.text ? "icon--check-wrapper d-flex align-items-center justify-content-center":"icon--check-wrapper-notext d-flex align-items-center justify-content-center"}>
              {checkIcon()}
            </div>
            </div>
          </button>
        </div>
      );
  }
  return renderAnswer;
};

AnswerOption.propTypes = {
  item: object.isRequired,
  selectAnswer: string.isRequired,
  handleSelectOption: func.isRequired,
  ansType: string.isRequired,
};
AnswerOption.defaultProps = {
  selectAnswer: "",
};
export default AnswerOption;
