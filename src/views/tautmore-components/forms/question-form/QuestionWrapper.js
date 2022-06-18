import React from "react";
import { string, func, object } from "prop-types";
import Questionbody from "./Questionbody";
import AnswerOption from "./AnswerOption";
import { Field } from "formik";

const QuestionWrapper = ({
  questionDetails,
  setQuestionDetails,
  quebodyval,
  setQuebodyval,
  queBodyError,
  questiontype,
  optionItems,
  setOptionItems,
  solutionIdxError,
  noOptionError,
  fillblank,
  changeFillblank,
  fillInBlankError,
  passageCounter,
  index,
  removePassageQuestion,
  handlePassageQuestionInput,
  handlePassageOption,
  selectedSub,
  questiondetail
}) => {
  // const [optionItems, setOptionItems] = useState(
  //   questiondetail
  //     ? structurQuestionData(
  //         questiondetail.options,
  //         questiondetail.solutionIndex
  //       )
  //     : []
  // );

  const handleOptions = (data) => {
    if (questiontype === "passage") {
      handlePassageOption(quebodyval?.id, data);
      console.log('handlePassageOption ', data)
    } else {
      setOptionItems(data);
      // console.log("setOptionItems",data);
    }
  };

  return (
    <div>
      <Questionbody
        removePassageQuestion={removePassageQuestion}
        questionDetails={questionDetails}
        setQuestionDetails={setQuestionDetails}
        quebodyval={quebodyval}
        setQuebodyval={
          questiontype === "passage"
            ? (data) => handlePassageQuestionInput(quebodyval?.id, data)
            : (data) => setQuebodyval(data)
        }
        queBodyError={queBodyError}
        index={index}
        questiontype={questiontype}
        passageCounter={passageCounter}
        selectedSub={selectedSub}
        questiondetail={questiondetail}
      />

      {questiontype !== "passage" && queBodyError && (
        <div className="rp-manage-school_error-message mt-25 que-body-error">
          Question body is Required
        </div>
      )}

      {questiontype === "passage" && (
        <div className="rp-manage-school_error-message mt-25 que-body-error">
          {quebodyval.queBodyError}
        </div>
      )}

      {questiontype !== "fill-in-the-blank" ? (
        <AnswerOption
          options={optionItems}
          questiontype={questiontype}
          handleOptions={handleOptions}
          solutionIdxError={solutionIdxError}
          noOptionError={noOptionError}
          quebodyval={quebodyval}
          selectedSub={selectedSub}
          questiondetail={questiondetail}
        />
      ) : (
        <div className="row row-main fill-in-the-blank">
          <div className="form-group col">
            <Field
              type="text"
              placeholder="Enter Answer"
              className="form-control"
              value={fillblank}
              onChange={changeFillblank}
              name="fill_in_the_blank"
              id="fill-blank"
            />

            {fillInBlankError && (
              <div className="rp-manage-school_error-message mt-25">
                Fill in the blank is Required
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

QuestionWrapper.propType = {
  removePassageCounter: func.isRequired,
  quebodyval: string.isRequired,
  setQuebodyval: func.isRequired,
  handlePassageQuestionInput: func.isRequired,
  handlePassageOption: func.isRequired,
  queBodyError: string.isRequired,
  questiontype: string.isRequired,
  optionItems: object.isRequired,
  setOptionItems: func.isRequired,
  solutionIdxError: string.isRequired,
  noOptionError: string.isRequired,
  fillblank: func.isRequired,
  changeFillblank: string.isRequired,
  fillInBlankError: string.isRequired,
};

export default QuestionWrapper;
