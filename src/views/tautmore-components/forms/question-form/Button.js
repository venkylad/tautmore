import React, { useEffect, useState } from "react";
import { Row, Col, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { history } from "../../../../history";
import { editQuestion } from "../../../../redux/actions/questions";
import { addQuestion } from "../../../../redux/actions/questions";
import { getAllQuestionsList } from "../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import * as question_api from "../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { questionTypesData } from "./mockData/data";
import { checkDragDropSnunscramble } from "./questionHelper";
import PreviewPopup from "../../sections/questions-preview/PreviewPopup";
import { toast } from "react-toastify";

const Button = ({
  userData,
  subject,
  questiontype,
  difficulty_level,
  exam_type,
  expimg,
  question_body,
  explanationans,
  editQuestion,
  id,
  solutionIndex,
  addQuestion,
  options,
  editquestiondata,
  addquestiondata,
  fillintoblank,
  optionItems,
  setOptionItems,
  setQueBodyError,
  formikData,
  setFillInBlankError,
  questiondetail,
  setSolutionIdxError,
  setNoOptionError,
  passageQuebody,
  passageTitle,
  passageQuestions,
  passageCounter,
  setPassageCounter,
  marks,
  timeToSolve,
  subConcept,
  setPassageTitleError,
  setQueTypeError,
  setSubError,
  setDiffTypeError,
  difficultyType,
  setExamTypeError,
  setDiffLevelError,
  mainDifflevel,
  statement,
  selectedGradeIds,
  setGradeError,
  selectedGradeData,
  orentationType,
  isLoading,
  setAddModal,
  adminRole,
}) => {
  const [modal, setModal] = useState(false);
  const [questionData, setQuestionData] = useState();
  useEffect(() => {
    if (addquestiondata.statusCode === 200) {
      //history.push("/questions-listing");
      setAddModal(true);
      // setModal(false);
      toast.success("Question Added Successfully ");
      addQuestion();
      // window.scroll({ top: 0, behavior: 'smooth' })
    }
  }, [addQuestion, addquestiondata, setAddModal]);

  useEffect(() => {
    if (editquestiondata.statusCode === 200) {
      history.push(`/question-details/${id}`);
    }
  }, [editQuestion, editquestiondata, id]);

  const checkOptionData = () => {
    let isValidOption = true;

    const filterData = optionItems?.map((item) => {
      if (item?.text === "" && item?.image === "") {
        isValidOption = false;
        return { ...item, error: "This field is required!" };
      } else {
        return { ...item, error: "" };
      }
    });
    setOptionItems(filterData);
    return isValidOption;
  };

  const passageCounterData = () => {
    const filterDataQuebody = passageCounter?.map((data) => {
      if (data?.description === "") {
        return { ...data, queBodyError: "Question body is Required" };
      } else {
        return { ...data, queBodyError: "" };
      }
    });
    setPassageCounter(filterDataQuebody);
  };

  const passageAddoptionData = () => {
    const filterDataOption = passageCounter?.map((data) => {
      if (data?.options.length === 0) {
        return { ...data, addOptionError: "Please add option" };
      } else {
        return { ...data, addOptionError: "" };
      }
    });
    setPassageCounter(filterDataOption);
  };

  const imgsrcextract = (str) => {
    const rex = /<img[^>]+src="?([^"\s]+)"?\s*/gi;
    const imgsrces = [];
    let m;
    while ((m = rex.exec(str))) {
      imgsrces.push(m[1]);
    }
    return imgsrces;
  };

  // const passageCounterSolutionData = () => {
  //   console.log('enter solution data')
  //   const filterData = passageCounter?.map((data) => {
  //     console.log(data, 'data one');
  //      return data?.options?.map((data) => {
  //       console.log(data, 'data two');
  //       if (solutionIndex?.length === 0){
  //         return {...data, solutionIdxError: 'select right answer'}
  //       }
  //       else {
  //         return {...data, solutionIdxError: ''}
  //       }
  //     })
  //   })
  //   setPassageCounter(filterData);
  // }

  const setData = () => {
    if (questiontype === "passage") {
      passageCounterData();
      //passageCounterSolutionData();
      passageAddoptionData();
    }

    checkOptionData();
    optionItems?.length === 0
      ? setNoOptionError(true)
      : setNoOptionError(false);
    questiontype !== "passage" && question_body === ""
      ? setQueBodyError(true)
      : setQueBodyError(false);
    fillintoblank === ""
      ? setFillInBlankError(true)
      : setFillInBlankError(false);
    questiontype !== "passage" &&
      solutionIndex?.length === 0 &&
      optionItems?.length > 0
      ? setSolutionIdxError(true)
      : setSolutionIdxError(false);
    questiontype === "passage" && passageTitle === ""
      ? setPassageTitleError(true)
      : setPassageTitleError(false);

    if (
      formikData?.marks === "" ||
      formikData?.timeToSolve === "" ||
      formikData?.class_board === "" ||
      formikData?.subject === "" ||
      formikData?.chapter === "" ||
      formikData?.concept === "" ||
      formikData?.sub_concept === "" ||
      (questiontype !== "passage" && !solutionIndex.length) ||
      (questiontype !== "passage" && !question_body) ||
      (questiontype === "passage" && passageTitle === "")
    ) {
      return;
    }

    if (questiontype !== "passage") {
      for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
          return;
        }
      }
    }

    const queDetails = {
      questionId: id,
      question: {
        description: questiontype === "passage" ? passageTitle : question_body,
        descImageElement: question_body?.replace(
          /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
          ""
        ),
        descImages: imgsrcextract(question_body),
        options: options,
        questionOrientaion: formikData?.question_alignment?.value,
        moduleType: formikData?.exam_type?.value,
        solutionIndex: solutionIndex,
        fillInTheBlankSolution: fillintoblank,
        // solutionDescriptionImage: expimg,
        solutionDescription: explanationans,
        solutionDescElement: explanationans?.replace(
          /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
          ""
        ),
        solutionDescriptionImage: imgsrcextract(explanationans),
        solutionType: questionTypesData?.[formikData?.question_type?.value],
        difficulty: difficulty_level,
        score: formikData?.marks,
        timeToSolve: formikData?.time_to_solve,
        classIds: [formikData?.class_board?.id, ...selectedGradeData],
        class: formikData?.class_board?.id,
        subject: formikData?.subject?.id,
        subjectName: formikData?.subject?.value,
        chapter: formikData?.chapter?.id,
        concept: formikData?.concept?.id,
        subConcept: formikData?.sub_concept?.id,
        uploadedBy: userData?.id,
        active: true,
        passageQuestions: passageQuestions || [],
        statement: statement,
        tautmoreId: formikData?.tautmoreId,
      },
    };

    editQuestion(queDetails);
    question_api.getAllQuestionsList(1);
  };

  const addData = () => {
    if (questiontype === "passage") {
      passageCounterData();
      passageAddoptionData();
    }

    checkOptionData();
    optionItems?.length === 0
      ? setNoOptionError(true)
      : setNoOptionError(false);
    questiontype !== "passage" && question_body === ""
      ? setQueBodyError(true)
      : setQueBodyError(false);
    fillintoblank === ""
      ? setFillInBlankError(true)
      : setFillInBlankError(false);
    questiontype !== "passage" &&
      solutionIndex?.length === 0 &&
      optionItems?.length > 0
      ? setSolutionIdxError(true)
      : setSolutionIdxError(false);
    questiontype === "passage" && passageTitle === ""
      ? setPassageTitleError(true)
      : setPassageTitleError(false);

    if (
      formikData?.marks === "" ||
      formikData?.timeToSolve === "" ||
      formikData?.class_board === "" ||
      formikData?.subject === "" ||
      formikData?.chapter === "" ||
      formikData?.concept === "" ||
      formikData?.sub_concept === "" ||
      (questiontype !== "passage" &&
        !checkDragDropSnunscramble(questiontype) &&
        !solutionIndex.length) ||
      (questiontype !== "passage" && !question_body) ||
      (questiontype === "passage" && passageTitle === "")
    ) {
      return;
    }

    if (questiontype !== "passage") {
      for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
          return;
        }
      }
    }

    const data = {
      description: questiontype === "passage" ? passageTitle : question_body,
      descImageElement: question_body?.replace(
        /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
        ""
      ),
      descImages: imgsrcextract(question_body),
      moduleType: formikData?.exam_type?.value,
      options: options,
      fillInTheBlankSolution: fillintoblank,
      active: true,
      uploadedBy: userData?.id,
      solutionIndex: solutionIndex,
      solutionDescription: explanationans,
      solutionDescElement: explanationans?.replace(
        /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
        ""
      ),
      solutionDescriptionImage: imgsrcextract(explanationans),
      solutionType: questionTypesData?.[formikData?.question_type?.value],
      difficulty: difficulty_level,
      score: formikData?.marks,
      timeToSolve: formikData?.time_to_solve,
      classIds: [formikData?.class_board?.id, ...selectedGradeData],
      class: formikData?.class_board?.id,
      subject: formikData?.subject?.id,
      subjectName: formikData?.subject?.value,
      chapter: formikData?.chapter?.id,
      concept: formikData?.concept?.id,
      subConcept: formikData?.sub_concept?.id,
      solutionDescriptionImage: expimg,
      passageQuestions: passageQuestions || [],
      statement: statement,
      questionOrientaion: formikData?.question_alignment?.value,
      tautmoreId: formikData?.tautmoreId,
    };

    setModal(false);
    addQuestion(data);
    question_api.getAllQuestionsList(1);
  };

  const previewQuestion = () => {
    if (questiontype === "passage") {
      passageCounterData();
      passageAddoptionData();
    }

    checkOptionData();
    optionItems?.length === 0
      ? setNoOptionError(true)
      : setNoOptionError(false);
    questiontype !== "passage" && question_body === ""
      ? setQueBodyError(true)
      : setQueBodyError(false);
    fillintoblank === ""
      ? setFillInBlankError(true)
      : setFillInBlankError(false);
    questiontype !== "passage" &&
      solutionIndex?.length === 0 &&
      optionItems?.length > 0
      ? setSolutionIdxError(true)
      : setSolutionIdxError(false);
    questiontype === "passage" && passageTitle === ""
      ? setPassageTitleError(true)
      : setPassageTitleError(false);

    if (
      formikData?.marks === "" ||
      formikData?.timeToSolve === "" ||
      formikData?.class_board === "" ||
      formikData?.subject === "" ||
      formikData?.chapter === "" ||
      formikData?.concept === "" ||
      formikData?.sub_concept === "" ||
      (questiontype !== "passage" &&
        !checkDragDropSnunscramble(questiontype) &&
        !solutionIndex.length) ||
      (questiontype !== "passage" && !question_body) ||
      (questiontype === "passage" && passageTitle === "")
    ) {
      return;
    }

    if (questiontype !== "passage") {
      for (let i = 0; i < options.length; i++) {
        if (options[i] === "") {
          return;
        }
      }
    }

    const data = {
      description: questiontype === "passage" ? passageTitle : question_body,
      descImageElement: question_body?.replace(
        /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
        ""
      ),
      descImages: imgsrcextract(question_body),
      moduleType: formikData?.exam_type?.value,
      options: options,
      fillInTheBlankSolution: fillintoblank,
      active: true,
      uploadedBy: userData?.id,
      solutionIndex: solutionIndex,
      solutionDescription: explanationans,
      solutionDescElement: explanationans?.replace(
        /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
        ""
      ),
      solutionDescriptionImage: imgsrcextract(explanationans),
      solutionType: questionTypesData?.[formikData?.question_type?.value],
      difficulty: difficulty_level,
      score: formikData?.marks,
      timeToSolve: formikData?.time_to_solve,
      classIds: [formikData?.class_board?.id, ...selectedGradeData],
      class: formikData?.class_board?.value,
      // subject: formikData?.subject?.id,
      subjectName: formikData?.subject?.value,
      chapter: formikData?.chapter?.value,
      concept: formikData?.concept?.value,
      subConcept: formikData?.sub_concept?.id,
      solutionDescriptionImage: expimg,
      passageQuestions: passageQuestions || [],
      statement: statement,
      questionOrientaion: formikData?.question_alignment?.value,
    };
    setModal(true);
    setQuestionData(data);
  };

  const handleClick = () => {
    if (adminRole === "data-entry-operator") {
      history.push("/operator-questions");
    } else {
      history.push("/questions-listing");
    }
  };


  return (
    <Row className="row-main">
      <Col>
        <div className="update-btn-part">
          <button type="submit" className="update" onClick={previewQuestion}>
            <span> Preview</span>
          </button>
          {/* <DeletePopup modal={modal} toggle={toggle} setModal={setModal} id={id} /> */}
          {window.location.href.indexOf("add-question") !== -1 ? (
            <button type="submit" className="update" onClick={addData}>
              {isLoading ? <Spinner>Loading...</Spinner> : "Add"}
            </button>
          ) : (
            <button type="submit" className="update" onClick={setData}>
              {isLoading ? <Spinner>Loading...</Spinner> : "Update"}
            </button>
          )}
          <button type="button" className="cancel" onClick={handleClick}>
            Cancel
          </button>
        </div>
      </Col>

      <PreviewPopup
        modal={modal}
        setModal={setModal}
        addData={addData}
        setData={setData}
        queDetails={questionData}
      />
    </Row>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.login?.userData,
  dataList: state.dataList,
  editquestiondata: state.questions.editQuestion,
  addquestiondata: state.questions.questions,
  isLoading: state.questions.isAddLoading,
  adminRole: state.auth.login?.userData?.role,
});

export default connect(mapStateToProps, {
  editQuestion,
  addQuestion,
  getAllQuestionsList,
})(Button);
