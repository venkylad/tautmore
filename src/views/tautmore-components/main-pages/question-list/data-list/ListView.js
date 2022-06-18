import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import ListViewConfig from "./DataListConfig";
import queryString from "query-string";
import * as question_api from "../../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import "./DataList.scss";
import { toast } from "react-toastify";
import QuestionFilter from "./QuestionFilter";
import { questionTypesData } from "../../../forms/question-form/mockData/data";
import Spinner from "../../../../../components/@vuexy/spinner/Loading-spinner";

const ListView = ({ location, deleteQuestion, clearDeletedQuestion }) => {
  const allFilters = JSON.parse(localStorage.getItem("filter")) || "";

  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(false);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [text, setText] = useState(allFilters.SearchText ? allFilters.SearchText : "");
  const [classSearch, setClassSearch] = useState(allFilters.Class ? allFilters.Class : "");
  const [subject, setSubject] = useState(allFilters.subject ? allFilters.subject : "");
  const [examType, setExamType] = useState(allFilters.examType ? allFilters.examType : "");

  const [questionType, setQuestionType] = useState(allFilters.questionType ? allFilters.questionType : "");
  const [difficulty, setDifficulty] = useState(allFilters.difficulty ? allFilters.difficulty : "");
  const [chapter, setChapter] = useState(allFilters.chapter ? allFilters.chapter : "");
  const [concept, setConcept] = useState(allFilters.concept ? allFilters.concept : "");
  const [selectedSubConcept, setSelectedSubConcept] = useState(allFilters.selectedSubConcept ? allFilters.selectedSubConcept : "");
  const [uploadedBy, setUploadedBy] = useState(allFilters.uploadedBy ? allFilters.uploadedBy : "");
  const [tautmoreId, setToutmoreId] = useState(allFilters.tautmoreId ? allFilters.tautmoreId : "");

  const [questionData, setQuestionData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [clearSelectedQuestion, setClearSelectedQuestion] = useState([]);

  const paginateData = queryString.parse(location.search);
  const [resultText, setResultText] = useState("Searching for content..");

  useEffect(() => {
    setLoading(true);
    setQuestionData([]);
    setSelectedQuestion([]);
    setResultText("Searching for content..");
    let filterObject = {
      examType: examType,
      SearchText: text,
      Class: classSearch,
      subject: subject,
      chapter: chapter,
      concept: concept,
      difficulty: difficulty,
      selectedSubConcept: selectedSubConcept,
      questionType: questionType,
      uploadedBy: uploadedBy,
      tautmoreId:tautmoreId

      // status: status
    }
    localStorage.setItem('filter', JSON.stringify(filterObject));
    question_api
      .getAllQuestionsByPaginate({
        moduleType: examType,
        // questionId: parseInt(text),
        searchText: text,
        tautmoreId:tautmoreId,
        classId: classSearch?.id,
        subject: subject?.id,
        chapter: chapter?.id,
        concept: concept?.id,
        difficulty: difficulty,
        subConceptId: selectedSubConcept?.id,
        uploadedBy: uploadedBy?._id,
        page_no: paginateData?.page ? paginateData.page : 1,
        questionType: questionTypesData?.[questionType],
      })
      .then((response) => {
        if (response.data?.statusCode === 200) {
          const data = response?.data?.response;
          setLoading(false);
          setTotalPage(Math.ceil(response.data?.count / 10));
          setTotalQuestion(response.data?.count);
          setQuestionData(data);
          if (!data.length) {
            setResultText("No Questions found");
          }
        }
      })
      .catch((err) => {
        setResultText("No Questions found");
        setTotalQuestion(true);
      });
  }, [
    tautmoreId,
    text,
    subject,
    difficulty,
    uploadedBy,
    paginateData.page,
    selectedSubConcept,
    deleteQuestion.statusCode,
    deleteQuestion,
    clearDeletedQuestion,
    examType,
    questionType,
    clearSelectedQuestion,
    classSearch,
    chapter,
    concept,
  ]);

  useEffect(() => {
    if (deleteQuestion?.statusCode === 200) {
      // toast.success("Question deleted successfully!");
      clearDeletedQuestion();
    } else if (deleteQuestion === "error") {
      toast.error("Error in deleting!");
      clearDeletedQuestion();
    }
  }, [clearDeletedQuestion, deleteQuestion]);
  const renderFilter = () => (
    <QuestionFilter
      text={text}
      tautmoreId={tautmoreId}
      handleTautmoreId={setToutmoreId}
      selectedQuestion={selectedQuestion}
      setSelectedQuestion={setClearSelectedQuestion}
      selectedSubConcept={selectedSubConcept}
      subject={subject}
      chapter={chapter}
      difficulty={difficulty}
      uploadedBy={uploadedBy}
      questionType={questionType}
      examType={examType}
      handleText={setText}
      handlesubConcept={setSelectedSubConcept}
      handleSubject={setSubject}
      setDifficulty={setDifficulty}
      setUploadedBy={setUploadedBy}
      setQuestionType={setQuestionType}
      setExamType={setExamType}
      classSearch={classSearch}
      handleClassSearch={setClassSearch}
      handleChapter={setChapter}
      concept={concept}
      handleConcept={setConcept}
    />
  );

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Manage Questions</h4>
        </Col>
        <Col sm="4" className="AdminTotal-users">
          <div className="totalusersAdmin">
            <h4>Total Questions:</h4>
            <h2 className="rp-manage-school-header-title">{totalQuestion}</h2>
          </div>
        </Col>
      </Row>
      {totalQuestion !== false ? (
        <Row>
          <Col sm="12">
            <ListViewConfig
              loading={loading}
              resultText={resultText}
              totalPage={totalPage}
              questionData={questionData}
              renderFilters={renderFilter}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              parsedFilter={queryString.parse(location.search)}
            />
          </Col>
        </Row>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  deleteQuestion: state.questions.deleteQuestion,
  totalquestion: state.questions.totalQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
