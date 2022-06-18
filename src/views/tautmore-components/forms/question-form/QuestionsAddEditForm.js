import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { Row, Col, FormGroup, Label } from "reactstrap";
import QuestionWrapper from "./QuestionWrapper";
import { Formik, Form } from "formik";
import "../Addquestion.scss";
import InputField from "./InputField";
import ExplanationAnswer from "./ExplanationAnswer";
import Button from "./Button";
import { connect } from "react-redux";
import {
  getSubconceptBySubject,
  loadQuestionDifficulty,
  getAllGrades,
  getSubjectsByClass,
  getChapterBySubjct,
  getConceptsByChapter,
  getSubconceptsByConcept,
  getGradessBySubconcept,
  getChaptersAndConcepts,
} from "../../../../redux/actions/questions";
import Select from "react-select";
import {
  structurQuestionData,
  destructureQuestionData,
  findSolutionIndex,
  findKeyByValue,
  structurePassageData,
  descructureDifficultyLevel,
  descructureDifficultyType,
  destructureDragAndDrop,
  structureDragAndDrop,
  checkDragDropSnunscramble,
} from "./questionHelper";
import { initValues } from "./mockData/questionInitialValues";
import {
  difficultyOrderData,
  difficultyTypeData,
  questioTypesRawData,
  examTypeData,
  defaultOption,
  orentationType,
} from "./mockData/data";
import { formSchema_manage_question } from "../../utility/schema/Fields_Schema";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-classic-with-mathtype";
import MyCustomUploadAdapterPlugin from "./uploadCustomPlugin";
import { Editor } from "@tinymce/tinymce-react";
import { clientUrl } from "../../services/api-fetch/Axios";
import AddPopup from "./AddPopup";

const Questions_Add_Edit_Form = (props) => {
  const questiondetail = JSON.parse(localStorage.getItem("Editpagedata")) || "";

  const syllabusMapping = questiondetail?.syllabusMapping?.[0];
  const [selectedSub, setSelectedSub] = useState("");
  const [questiontype, setQuestiontype] = useState(
    questiondetail ? findKeyByValue(questiondetail.solutionType) : "Select"
  );

  const [difficultyLevel, setDifficultyLevel] = useState(
    questiondetail
      ? descructureDifficultyLevel(questiondetail.difficulty)?.levelBase
      : "Select"
  );

  const [difficultyType, setDifficultyType] = useState(
    questiondetail
      ? descructureDifficultyType(questiondetail.difficulty)
      : "Select"
  );

  const [difflevel, setDifflevel] = useState(
    questiondetail
      ? descructureDifficultyLevel(questiondetail.difficulty)?.level
      : "Select"
  );

  const [allDifficulty, setAllDifficulty] = useState(
    questiondetail ? questiondetail.difficulty : []
  );
  const [examtype, setExamtype] = useState(
    questiondetail ? questiondetail.moduleType : "Select"
  );

  const [fillblank, setFillblank] = useState(
    questiondetail ? questiondetail.fillInTheBlankSolution : ""
  );

  const [expimg, setExpimg] = useState(
    questiondetail ? questiondetail.solutionDescriptionImage : ""
  );

  const [quebodyval, setQuebodyval] = useState(
    questiondetail ? questiondetail?.description : ""
  );
  const [questionDetails, setQuestionDetails] = useState(
    questiondetail ? questiondetail?.passageQuestions?.[0]?.description: ""
  );

  const [explanationAnsText, setExplanationAnsText] = useState(
    questiondetail ? questiondetail?.solutionDescription : ""
  );

  const [passageTitle, setPassageTitle] = useState(
    questiondetail?.description ? questiondetail.description : ""
  );

  const [passageTitleError, setPassageTitleError] = useState(false);

  const [optionItems, setOptionItems] = useState(
    !checkDragDropSnunscramble(questiontype)
      ? questiondetail
        ? structurQuestionData(
            questiondetail.options,
            questiondetail.solutionIndex
          )
        : defaultOption()
      : questiondetail
      ? structureDragAndDrop(
          questiondetail.statement,
          questiondetail.options,
          questiondetail.solutionIndex
        )
      : []
  );

  const allGradeList = props.allGradeList;

  const allSubjectList = props.allSubjectList;

  const chapters = props.chapters;

  const concepts = props.concepts;

  const subConcepts = props.subConcepts;

  const gradeBySubconcept = props.gradeBySubconcept;

  const [inputset, setInputset] = useState({
    qtitle: questiondetail ? questiondetail.title : "",
    marks: questiondetail ? questiondetail.score : "",
    tautmoreId: questiondetail ? questiondetail.tautmoreId : "",
    explanationans: questiondetail ? questiondetail.solutionDescription : "",
    timing: questiondetail ? questiondetail.timeToSolve : "",
  });

  const [queBodyError, setQueBodyError] = useState(false);

  const [fillInBlankError, setFillInBlankError] = useState(false);

  const [solutionIdxError, setSolutionIdxError] = useState(false);

  const [noOptionError, setNoOptionError] = useState(false);

  const [formikData, setFormikData] = useState();

  const [passageCounter, setPassageCounter] = useState(
    questiondetail?.passageQuestions
      ? structurePassageData(questiondetail?.passageQuestions)
      : []
  );

  const [classBoardsList, setClassBoardsList] = useState([]);

  const [subjectList, setSubjectList] = useState([]);

  const [chapterList, setChapterList] = useState([]);

  const [conceptList, setConceptList] = useState([]);

  const [subConceptList, setSubConceptList] = useState([]);

  const [gradeBySubconList, setGradeBySubconList] = useState([]);

  const [selectedGradeData, setSelectedGradeData] = useState([]);

  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    if (!allGradeList.length) {
      props.getAllGrades();
    }
  }, [props, allGradeList]);

  useEffect(() => {
    let array = [];
    allGradeList?.length > 0 &&
      allGradeList.map((item) => {
        array.push({
          value: item?.name + "_" + item?.board?.name,
          label: item?.name + "_" + item?.board?.name,
          id: item?._id,
        });
        setClassBoardsList(array);
      });
  }, [props, allGradeList]);

  const isEdit = window.location.href.indexOf("add-question") === -1;

  useEffect(() => {
    if (
      window.location.href.indexOf("add-question") === -1 &&
      !allSubjectList?.length
    ) {
      let class_id = syllabusMapping?.class?._id;
      props.getSubjectsByClass({ classId: class_id });
    } else {
      let array = [];
      allSubjectList?.length > 0 &&
        allSubjectList.map((item) => {
          array.push({ value: item.name, label: item.name, id: item?._id });
          setSubjectList(array);
          return null;
        });
    }
  }, [props, allSubjectList, syllabusMapping?.class?._id]);

  useEffect(() => {
    if (
      window.location.href.indexOf("add-question") === -1 &&
      !chapters?.length
    ) {
      let subject_id = syllabusMapping?.subject;
      props.getChapterBySubjct({ subjectId: subject_id });
    } else {
      let array = [];
      chapters?.length > 0 &&
        chapters.map((item) => {
          array.push({ value: item.name, label: item.name, id: item?._id });
          setChapterList(array);
          return null;
        });
    }
  }, [props, chapters, syllabusMapping?.subject]);

  useEffect(() => {
    if (
      window.location.href.indexOf("add-question") === -1 &&
      !concepts?.length
    ) {
      let chapter_id = syllabusMapping?.chapter?._id;
      props.getConceptsByChapter({ chapterId: chapter_id });
    } else {
      let array = [];
      concepts?.length > 0 &&
        concepts.map((item) => {
          array.push({ value: item.name, label: item.name, id: item?._id });
          setConceptList(array);
          return null;
        });
    }
  }, [props, concepts, syllabusMapping?.chapter?._id]);

  useEffect(() => {
    if (
      window.location.href.indexOf("add-question") === -1 &&
      !subConcepts?.length
    ) {
      let concept_id = syllabusMapping?.concept?._id;
      props.getSubconceptsByConcept({ conceptId: concept_id });
    } else {
      let array = [];
      subConcepts?.length > 0 &&
        subConcepts.map((item) => {
          array.push({
            value: item.name,
            label: item.name,
            id: item?._id,
          });
          setSubConceptList(array);
          return null;
        });
    }
  }, [props, subConcepts, syllabusMapping?.concept?._id]);

  useEffect(() => {
    if (isEdit && !props.chapterAndConcept.length) {
      const filteredGrades = gradeBySubconcept?.filter(
        (item) => item?._id !== questiondetail?.classIds?.[0]
      );

      filteredGrades?.length > 0 &&
        filteredGrades.map((item) => {
          const obj = {
            id: item?._id,
            label: item?.name + "_" + item?.board?.name,
            subjectId: item?.subjectId,
            subConceptId: questiondetail?.subConcept?._id,
          };
          props.getChaptersAndSubConcept(obj, props.chapterAndConcept);
        });
    }
  }, [gradeBySubconcept, isEdit, props, questiondetail?.classIds, questiondetail?.subConcept?._id]);

  useEffect(() => {
    if (
      window.location.href.indexOf("add-question") === -1 &&
      !gradeBySubconcept?.length
    ) {
      let subConcept_id = questiondetail?.subConcept?._id;
      props.getGradessBySubconcept({ subConceptId: subConcept_id });
    } else {
      let array = [];
      gradeBySubconcept?.length > 0 &&
        gradeBySubconcept.map((item) => {
          array.push({
            value: item.name + "_" + item.board?.name,
            label: item.name + "_" + item.board?.name,
            id: item?._id,
            subjectId: item?.subjectId,
          });
          setGradeBySubconList(array);
          return null;
        });
    }
  }, [props, gradeBySubconcept, questiondetail?.subConcept?._id]);

  useEffect(() => {
    if (!props.difficultyLevels?.data) {
      props.loadDifficulties();
    }
    if (difficultyType === "low") {
      const difficulties = props.difficultyLevels?.data?.["lowDifficulty"];
      const d = difficulties?.[difficultyLevel];
      const data = d?.map((data) => ({ value: data, label: data, id: data }));
      setAllDifficulty(data);
    }
    if (difficultyType === "medium") {
      const difficulties = props.difficultyLevels?.data?.["mediumDifficulty"];
      const d = difficulties?.[difficultyLevel];
      const data = d?.map((data) => ({ value: data, label: data, id: data }));
      setAllDifficulty(data);
    }
    if (difficultyType === "high") {
      const difficulties = props.difficultyLevels?.data?.["highDifficulty"];
      const d = difficulties?.[difficultyLevel];
      const data = d?.map((data) => ({ value: data, label: data, id: data }));
      setAllDifficulty(data);
    }
  }, [difficultyLevel, difficultyType, props]);

  const changeFillblank = (e) => {
    setFillblank(e.target.value);
  };

  const handleAddSubmit = (data) => {
    // console.log('data ', data)
    setFormikData(data);
  };

  const changePassage = () => {
    const passageData = {
      id: uuid(),
      index: passageCounter.length,
      description: "",
      options: defaultOption(),
      solutionIndex: [],
      // addOptionError: "",
      // queBodyError: "",
    };
    setPassageCounter([...passageCounter, passageData]);
  };

  const handlePassageQuestionInput = (id, data) => {
    const filteredData =
      passageCounter.length &&
      passageCounter?.map((item) => {
        if (item.id === id) {
          return { ...item, description: data };
        }
        return item;
      });
    setPassageCounter(filteredData);
  };

  const handlePassageOption = (id, data) => {
    const filteredData =
      passageCounter?.length &&
      passageCounter.map((item) => {
        if (item.id === id) {
          return { ...item, options: data };
        }
        return item;
      });
    setPassageCounter(filteredData);
  };

  const passageQuestion = () =>
    passageCounter?.length &&
    passageCounter?.map((item) => {
      const obj = {
        description: item?.description,
        options: item?.options?.length && destructureQuestionData(item.options),
        solutionIndex:
          item?.options?.length && findSolutionIndex(item?.options),
      };
      return obj;
    });

  const removePassageQuestion = (value) => {
    const filteredQuestion = passageCounter?.filter(
      (item) => item.id !== value
    );
    setPassageCounter(filteredQuestion);
  };

  const selectQuestionType = (val, setFieldValue) => {
    setFieldValue("question_type", val);
    setQuestiontype(val?.value);
  };

  const changeDifficultyType = (val, setFieldValue) => {
    setFieldValue("difficulty_type", val);
    setDifficultyType(val?.value);
  };

  const changeExamtype = (val) => {
    setExamtype(val);
  };

  const changeDifflevel = (val, setFieldValue) => {
    setFieldValue("difficulty_level", val);
    setDifflevel(val?.value);
  };

  const changeClassBoard = (data, setFieldValue) => {
    props.getSubjectsByClass({ classId: data.id });
    setFieldValue("class_board", data);
    setFieldValue("subject", "");
    setFieldValue("chapter", "");
    setFieldValue("concept", "");
    setFieldValue("sub_concept", "");
    setFieldValue("grade_subconcept", "");
  };

  const changeSubject = (data, setFieldValue) => {
    props.getChapterBySubjct({ subjectId: data.id });

    var result = allSubjectList.find((obj) => {
      return obj._id === data.id;
    });
    setSelectedSub(result.name);
    setFieldValue("subject", data);
    setFieldValue("chapter", "");
    setFieldValue("concept", "");
    setFieldValue("sub_concept", "");
    setFieldValue("grade_subconcept", "");
  };

  const changeChapter = (data, setFieldValue) => {
    props.getConceptsByChapter({ chapterId: data.id });
    setFieldValue("chapter", data);
    setFieldValue("concept", "");
    setFieldValue("sub_concept", "");
    setFieldValue("grade_subconcept", "");
  };

  const changeConcept = (data, setFieldValue) => {
    props.getSubconceptsByConcept({ conceptId: data.id });
    setFieldValue("concept", data);
    setFieldValue("sub_concept", "");
    setFieldValue("grade_subconcept", "");
  };

  const changeSubconcept = (data, setFieldValue) => {
    props.getGradessBySubconcept({ subConceptId: data.id });
    setFieldValue("sub_concept", data);
    setFieldValue("grade_subconcept", "");
  };

  const handleDifficultyLevel = (val, setFieldValue) => {
    setFieldValue("difficulty_order", val);
    setDifficultyLevel(val?.value);

    if (difficultyType === "low") {
      const difficulties = props.difficultyLevels?.data?.["lowDifficulty"];
      const d = difficulties?.[val?.value];
      const data = d?.map((data) => ({ value: data, label: data, id: data }));
      setAllDifficulty(data);
    }
    if (difficultyType === "medium") {
      const difficulties = props.difficultyLevels?.data?.["mediumDifficulty"];
      const d = difficulties?.[val?.value];
      const data = d?.map((data) => ({ value: data, label: data, id: data }));
      setAllDifficulty(data);
    }
    if (difficultyType === "high") {
      const difficulties = props.difficultyLevels?.data?.["highDifficulty"];
      const d = difficulties?.[val?.value];
      const data = d?.map((data) => ({ value: data, label: data, id: data }));
      setAllDifficulty(data);
    }
  };

  const changeGradeBySub = (data, setFieldValue, subConceptId, item) => {
    setFieldValue("grade_subconcept", data);
    // console.log(subConceptList, data, item, "list");

    if (item?.action === "remove-value") {
      const { removedValue } = item;
      console.log(removedValue, props.chapterAndConcept, "opt");
      const filteredData = props.chapterAndConcept?.filter(
        (item) => item?.data?.id !== removedValue?.id
      );
      props.dispatch({
        type: "GET_CHAPTER_AND_CONCEPT",
        payload: filteredData,
      });
    } else if (item?.action === "clear") {
      props.dispatch({
        type: "GET_CHAPTER_AND_CONCEPT",
        payload: [],
      });
    } else {
      const { option } = item;
      const obj = {
        id: option?.id,
        label: option?.label,
        subjectId: option?.subjectId,
        subConceptId: subConceptId,
      };

      console.log(obj, "obj");
      props.getChaptersAndSubConcept(obj, props.chapterAndConcept);
    }

    let array = [];
    data?.length > 0 &&
      data !== null &&
      data.map((item) => {
        array.push(item?.id);
        setSelectedGradeData(array);
      });
  };

  const dragDropData = destructureDragAndDrop(optionItems);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initValues(questiondetail)}
        validationSchema={formSchema_manage_question}
        onSubmit={(data) => handleAddSubmit(data)}
        validator={() => ({})}
      >
        {({
          errors,
          touched,
          values,
          handleSubmit,
          handleChange,
          setFieldValue,
          resetForm,
        }) => {
          return (
            <div className="add-question-main">
              <Form className="question-form" onSubmit={handleSubmit}>
                <Row className="row-main">
                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <InputField
                        labelfor="data-marks"
                        labelname="Tautmore Id"
                        name="tautmoreId"
                        id="tautmoreId"
                        value={values.tautmoreId}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Tautmore Id"
                      />
                      {errors.tautmoreId && touched.tautmoreId ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.tautmoreId}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-type">Exam type</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="exam_type"
                        value={values.exam_type}
                        options={examTypeData}
                        onChange={(e) => setFieldValue("exam_type", e)}
                      ></Select>
                      {errors.exam_type && touched.exam_type ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.exam_type}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  {console.log('values.exam_type',values.exam_type)}

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-concept">Class & Board </Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="class_board"
                        value={values.class_board}
                        options={classBoardsList}
                        onChange={(e) => changeClassBoard(e, setFieldValue)}
                      ></Select>
                      {errors.class_board && touched.class_board ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.class_board}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-concept">Subject</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="subject"
                        value={values.subject}
                        options={subjectList}
                        onChange={(e) => changeSubject(e, setFieldValue)}
                      ></Select>
                      {errors.subject && touched.subject ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.subject}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-concept">Chapter</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="chapter"
                        value={values.chapter}
                        options={chapterList}
                        onChange={(e) => changeChapter(e, setFieldValue)}
                      ></Select>
                      {errors.chapter && touched.chapter ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.chapter}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-concept">Topic</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="concept"
                        value={values.concept}
                        options={conceptList}
                        onChange={(e) => changeConcept(e, setFieldValue)}
                      ></Select>
                      {errors.concept && touched.concept ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.concept}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-concept">Sub Topic</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="sub_concept"
                        value={values.sub_concept}
                        options={subConceptList}
                        onChange={(e) => changeSubconcept(e, setFieldValue)}
                      ></Select>
                      {errors.sub_concept && touched.sub_concept ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.sub_concept}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-concept">
                        Do you want to map mulptiple class?
                      </Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="grade_subconcept"
                        value={values.grade_subconcept}
                        options={gradeBySubconList?.filter(
                          (item) => item?.id !== values?.class_board?.id
                        )}
                        onChange={(e, d) =>
                          changeGradeBySub(
                            e,
                            setFieldValue,
                            values?.sub_concept?.id,
                            d
                          )
                        }
                        isMulti={true}
                      ></Select>
                      {props.chapterAndConcept?.length > 0 &&
                        values.grade_subconcept?.length > 0 && (
                          <table className="class-list-table">
                            <thead>
                              <th>Class Board</th>
                              <th>Chapter</th>
                              <th>Concept</th>
                            </thead>
                            <tbody>
                              {props.chapterAndConcept.map((data) => (
                                <tr>
                                  <td>{data?.data?.label}</td>
                                  <td>{data?.res?.chapter}</td>
                                  <td>{data?.res?.concept}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      {errors.grade_subconcept && touched.grade_subconcept ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.grade_subconcept}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  {values.exam_type?.value !== 'exams' && 
                  (
                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-difficulty">Difficulty Order</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="difficulty_order"
                        value={values.difficulty_order}
                        options={difficultyOrderData}
                        onChange={(e) =>
                          handleDifficultyLevel(e, setFieldValue)
                        }
                      ></Select>
                      {errors.difficulty_order && touched.difficulty_order ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.difficulty_order}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  )
                }
                  {values.exam_type?.value !== 'exams' && 
                  (

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-difficulty">Difficulty Type</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="difficulty_type"
                        value={values.difficulty_type}
                        options={difficultyTypeData}
                        onChange={(e) => changeDifficultyType(e, setFieldValue)}
                      ></Select>
                      {errors.difficulty_type && touched.difficulty_type ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.difficulty_type}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  )}

                  {values.exam_type?.value !== 'exams' && 
                  (
                  <Col sm={6} xs={12} className="diff-level">
                    <FormGroup>
                      <Label for="data-difficulty">Difficulty level</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="difficulty_level"
                        value={values.difficulty_level}
                        options={allDifficulty}
                        onChange={(e) => changeDifflevel(e, setFieldValue)}
                      ></Select>
                      {errors.difficulty_level && touched.difficulty_level ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.difficulty_level}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  )}

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-subject">Question type</Label>

                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="question_type"
                        value={values.question_type}
                        options={questioTypesRawData}
                        onChange={(e) => selectQuestionType(e, setFieldValue)}
                      ></Select>
                      {errors.question_type && touched.question_type ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.question_type}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  {/* <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-type">Exam type</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="exam_type"
                        value={values.exam_type}
                        options={examTypeData}
                        onChange={(e) => setFieldValue("exam_type", e)}
                      ></Select>
                      {errors.exam_type && touched.exam_type ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.exam_type}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col> */}
                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <Label for="data-difficulty">Question Alignment</Label>
                      <Select
                        className="subconcept-select"
                        classNamePrefix="select"
                        name="question_alignment"
                        value={values.question_alignment}
                        options={orentationType}
                        onChange={(e) => setFieldValue("question_alignment", e)}
                      ></Select>
                      {errors.question_alignment &&
                      touched.question_alignment ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.question_alignment}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <InputField
                        labelfor="data-timing"
                        labelname="Time to solve (Sec)"
                        name="time_to_solve"
                        id="data-time"
                        value={values.time_to_solve}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Time to solve"
                      />
                      {errors.time_to_solve && touched.time_to_solve ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.time_to_solve}
                          {console.log("time_to_solve", errors.time_to_solve)}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>

                  <Col sm={6} xs={12}>
                    <FormGroup>
                      <InputField
                        labelfor="data-marks"
                        labelname="Marks"
                        name="marks"
                        id="data-marks"
                        value={values.marks}
                        handleChange={handleChange}
                        type="text"
                        placeholder="Marks"
                      />
                      {errors.marks && touched.marks ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.marks}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Col>
                </Row>

                {questiontype !== "passage" && (
                  <QuestionWrapper
                   //quebodyval={questionDetails}
                    quebodyval={quebodyval}
                    questionDetails={questionDetails}
                    setQuestionDetails={setQuestionDetails}
                    setQuebodyval={setQuebodyval}
                    queBodyError={queBodyError}
                    questiontype={questiontype}
                    optionItems={optionItems}
                    setOptionItems={setOptionItems}
                    questiondetail={questiondetail}
                    solutionIdxError={solutionIdxError}
                    noOptionError={noOptionError}
                    fillblank={fillblank}
                    changeFillblank={changeFillblank}
                    fillInBlankError={fillInBlankError}
                    selectedSub={selectedSub}
                  />
                )}

                {questiontype === "passage" && (
                  <div className="row-main row">
                    <div className="col-12">
                      <div className="passage-main">
                        <div>
                          <label>Title</label>
                          {
                            /* <CKEditor
                            className="form-control ckeditor-comp"
                            style={{
                              border: "1px solid #D9D9D9",
                              padding: "0.7rem 0.7rem",
                              backgroundColor: "#fff",
                              backgroundClip: "padding-box",
                              borderRadius: "5px",
                              flex: "1",
                              width: "100% !important",
                              ":active": {
                                outline: "none !important",
                                border: "1px solid red !important",
                                boxShadow: "0 0 10px #719ECE",
                              },
                            }}
                            type="inline"
                            editor={ClassicEditor}
                            config={{
                              extraPlugins: [MyCustomUploadAdapterPlugin],
                              toolbar: {
                                items: [
                                  "heading",
                                  "MathType",
                                  "ChemType",
                                  "|",
                                  "bold",
                                  "italic",
                                  "link",
                                  "bulletedList",
                                  "numberedList",
                                  "imageUpload",
                                  "mediaEmbed",
                                  "insertTable",
                                  "blockQuote",
                                  "undo",
                                  "redo",
                                  "uploadImage",
                                ],
                              },
                              image: {
                                // You need to configure the image toolbar, too, so it uses the new style buttons.
                                toolbar: [
                                  "imageTextAlternative",
                                  "|",
                                  "imageStyle:alignLeft",
                                  "imageStyle:full",
                                  "imageStyle:alignRight",
                                ],

                                styles: [
                                  // This option is equal to a situation where no style is applied.
                                  "full",

                                  // This represents an image aligned to the left.
                                  "alignLeft",

                                  // This represents an image aligned to the right.
                                  "alignRight",
                                ],
                              },
                            }}
                            data={passageTitle}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setPassageTitle(data);
                            }}
                          /> */
                            <Editor
                              apiKey="u9fzm8p2l3qt4b1k1vwv6gktzge0ynqu3c7nuxdyo2hroawd"
                              // initialValue={quebodyval !== "" ? quebodyval.toString() : ""}
                              value={passageTitle}
                              init={{
                                external_plugins: {
                                  tiny_mce_wiris: `https://www.wiris.net/demo/plugins/tiny_mce/plugin.js`,
                                },
                                height: 300,
                                menubar: true,
                                config: {},

                                images_upload_base_path: `${clientUrl}/api/image/upload`,
                                images_upload_credentials: true,
                                image_title: false,
                                statusbar: false,
                                paste_data_images: true,
                                paste_as_text: true,

                                plugins: [
                                  "advlist autolink lists link image charmap print preview anchor",
                                  "searchreplace visualblocks code fullscreen",
                                  "insertdatetime media table paste image code help wordcount",
                                ],

                                toolbar:
                                  "undo redo | formatselect | " +
                                  "tiny_mce_wiris_formulaEditor  tiny_mce_wiris_formulaEditorChemistry |" +
                                  "bold italic textsize textcolor backcolor image | alignleft aligncenter " +
                                  "alignright alignjustify | bullist numlist outdent indent | ",
                                // "undo redo | formatselect | " +
                                // "tiny_mce_wiris_formulaEditor  tiny_mce_wiris_formulaEditorChemistry |" +
                                // "bold italic underline image | alignright alignjustify alignleft aligncenter  |" +
                                // "fontselect fontsizeselect forecolor backcolor | " +
                                // " bullist numlist outdent indent |",

                                automatic_uploads: true,
                                file_picker_types: "image",
                                file_picker_callback: function (
                                  cb,
                                  value,
                                  meta
                                ) {
                                  var input = document.createElement("input");
                                  input.setAttribute("type", "file");
                                  input.setAttribute("accept", "image/*");
                                  var url = `${clientUrl}/api/image/upload`;
                                  var xhr = new XMLHttpRequest();
                                  xhr.open("POST", url, true);
                                  input.onchange = function () {
                                    var file = this.files[0];
                                    var reader = new FileReader();
                                    xhr.onload = function () {
                                      if (
                                        xhr.readyState === 4 &&
                                        xhr.status === 200
                                      ) {
                                        // File uploaded successfully
                                        var response = JSON.parse(xhr.response);
                                        console.log(response, file);
                                        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                                        var url = response?.response;
                                        // console.log(url)
                                        // Create a thumbnail of the uploaded image, with 150px width
                                        cb(url, { title: file.name });
                                      }
                                    };

                                    reader.onload = function () {
                                      xhr.setRequestHeader(
                                        "content-type",
                                        "application/json"
                                      );
                                      const dateString = new Date().getTime();
                                      var base64 = reader.result;
                                      let reqData = {
                                        file_name:
                                          dateString +
                                          "_" +
                                          file.name.split(".")[0],
                                        base64_file: base64,
                                      };
                                      reqData = JSON.stringify(reqData);
                                      xhr.send(reqData);
                                    };
                                    reader.readAsDataURL(file);
                                  };

                                  input.click();
                                },
                                images_dataimg_filter: function (img) {
                                  return img.hasAttribute("internal-blob");
                                },
                                images_upload_handler: (
                                  blobInfo,
                                  success,
                                  failure
                                ) => {
                                  var reader = new FileReader();
                                  var url = `${clientUrl}/api/image/upload`;
                                  var xhr = new XMLHttpRequest();
                                  xhr.open("POST", url, true);
                                  xhr.setRequestHeader(
                                    "content-type",
                                    "application/json"
                                  );
                                  const dateString = new Date().getTime();
                                  var base64 =
                                    "data:" +
                                    blobInfo.blob().type +
                                    ";base64," +
                                    blobInfo.base64();
                                  let reqData = {
                                    file_name: dateString,
                                    base64_file: base64,
                                  };
                                  reqData = JSON.stringify(reqData);
                                  xhr.send(reqData);
                                  xhr.onload = function () {
                                    if (
                                      xhr.readyState === 4 &&
                                      xhr.status === 200
                                    ) {
                                      var response = JSON.parse(xhr.response);
                                      var url = response?.response;
                                      success(url);
                                    }
                                  };

                                  reader.readAsDataURL(blobInfo.blob());
                                },
                              }}
                              // onEditorChange={(e) => {
                              //   const data = e;
                              //   setQuebodyval(data);
                              // }}
                              onEditorChange={(e) => {
                                const data = e;
                                setPassageTitle(data);
                              }}
                            />
                          }
                          {passageTitleError && (
                            <div className="rp-manage-school_error-message mt-25">
                              Title is required!
                            </div>
                          )}
                        </div>
                        {passageCounter.map((data, index) => {
                          return (
                               <QuestionWrapper
                              removePassageQuestion={removePassageQuestion}
                              passageCounter={passageCounter}
                              quebodyval={data}
                              setQuebodyval={setPassageCounter}
                              questionDetails={questionDetails}
                              setQuestionDetails={setQuestionDetails}
                              handlePassageQuestionInput={
                                handlePassageQuestionInput
                              }
                              handlePassageOption={handlePassageOption}
                              queBodyError={queBodyError}
                              questiontype={questiontype}
                              optionItems={data?.options}
                              setOptionItems={setOptionItems}
                              questiondetail={questiondetail}
                              solutionIdxError={solutionIdxError}
                              noOptionError={noOptionError}
                              fillblank={fillblank}
                              changeFillblank={changeFillblank}
                              fillInBlankError={fillInBlankError}
                              index={index}
                            />
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => changePassage()}
                          className="add-passage-btn"
                        >
                          Add Question
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <ExplanationAnswer
                  explanationAnsText={explanationAnsText}
                  setExplanationAnsText={setExplanationAnsText}
                  expimg={expimg}
                  setExpimg={setExpimg}
                  selectedSub={selectedSub}
                  questiondetail={questiondetail}
                />
                <Button
                  id={questiondetail?._id}
                  orentationType={orentationType}
                  questiontype={questiontype}
                  difficulty_level={`${difficultyType}_${difflevel}`}
                  exam_type={examtype}
                  solutionIndex={
                    !checkDragDropSnunscramble(questiontype)
                      ? findSolutionIndex(optionItems)
                      : dragDropData?.["solution"]
                  }
                  question_body={quebodyval}
                  explanationans={explanationAnsText}
                  expimg={expimg}
                  options={
                    !checkDragDropSnunscramble(questiontype)
                      ? destructureQuestionData(optionItems)
                      : dragDropData?.["options"]
                  }
                  statement={dragDropData?.["statements"]}
                  fillintoblank={fillblank}
                  optionItems={optionItems}
                  setOptionItems={setOptionItems}
                  setQueBodyError={setQueBodyError}
                  formikData={values}
                  setFillInBlankError={setFillInBlankError}
                  questiondetail={questiondetail}
                  setSolutionIdxError={setSolutionIdxError}
                  setNoOptionError={setNoOptionError}
                  passageQuestions={passageQuestion()}
                  passageTitle={passageTitle}
                  passageCounter={passageCounter}
                  setPassageCounter={setPassageCounter}
                  selectedGradeData={selectedGradeData}
                  setPassageTitleError={setPassageTitleError}
                  difficultyType={difficultyType}
                  mainDifflevel={difflevel}
                  setAddModal={setAddModal}
                />
              </Form>
            </div>
          );
        }}
      </Formik>
      <AddPopup
        addModal={addModal}
        setAddModal={setAddModal}
        setQuebodyval={setQuebodyval}
        setQuestionDetails={setQuestionDetails}
        setOptionItems={setOptionItems}
        setExplanationAnsText={setExplanationAnsText}
        setExpimg={setExpimg}
        defaultOption={defaultOption()}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  questiondetail: state.questions.questionDetails,
  difficultyLevels: state.questions?.questionDifficulties,
  subconceptlist: state.questions.subconcept,
  allGradeList: state.questions.allGrade,
  allSubjectList: state.questions.allSubjects,
  chapters: state.questions.chapters,
  concepts: state.questions.concepts,
  subConcepts: state.questions.allSubconcepts,
  gradeBySubconcept: state.questions.gradeBySubconcept,
  chapterAndConcept: state.questions.chapterAndConcept,
});

const mapDispatchToProps = (dispatch) => ({
  getSubconceptBySubject: (data) => dispatch(getSubconceptBySubject(data)),
  loadDifficulties: () => dispatch(loadQuestionDifficulty()),
  getAllGrades: () => dispatch(getAllGrades()),
  getSubjectsByClass: (data) => dispatch(getSubjectsByClass(data)),
  getChapterBySubjct: (data) => dispatch(getChapterBySubjct(data)),
  getConceptsByChapter: (data) => dispatch(getConceptsByChapter(data)),
  getSubconceptsByConcept: (data) => dispatch(getSubconceptsByConcept(data)),
  getGradessBySubconcept: (data) => dispatch(getGradessBySubconcept(data)),
  getChaptersAndSubConcept: (data, prevData) =>
    dispatch(getChaptersAndConcepts(data, prevData)),
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Questions_Add_Edit_Form);
