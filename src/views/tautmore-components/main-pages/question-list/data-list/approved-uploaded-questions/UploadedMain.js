import React, { useEffect, useState } from "react";
import "../DataList.scss";
import * as question_api from "../../../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import DataListUploadedData from "./DataListUploadedData";
import ApprovedQuestFilter from "./ApprovedQuestFilter";
import queryString from "query-string";
import Spinner from "../../../../../../components/@vuexy/spinner/Loading-spinner";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { questionTypesData } from "../../../../forms/question-form/mockData/data";

const UploadedMain = ({
  location,
  deleteQuestion,
  clearDeletedQuestion,
  auth,
}) => {
  const allFilters = JSON.parse(localStorage.getItem("exfilter")) || "";
  const [activeTab, setActiveTab] = useState(allFilters.activeTab ? allFilters.activeTab : "1");
  const [uploadedQuestionData, setUploadedQuestionData] = useState([]);
  const [myQuestionData, setmyQuestionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [text, setText] = useState(allFilters.SearchText ? allFilters.SearchText : "");
  const [classSearch, setClassSearch] = useState(allFilters.Class ? allFilters.Class : "");
  const [subject, setSubject] = useState(allFilters.subject ? allFilters.subject : "");
  const [examType, setExamType] = useState(allFilters.examType ? allFilters.examType : "");
  const [tautmoreId, setToutmoreId] = useState(allFilters.tautmoreId ? allFilters.tautmoreId : "");

  const [questionType, setQuestionType] = useState(allFilters.questionType ? allFilters.questionType : "");
  const [difficulty, setDifficulty] = useState(allFilters.difficulty ? allFilters.difficulty : "");
  const [chapter, setChapter] = useState(allFilters.chapter ? allFilters.chapter : "");
  const [concept, setConcept] = useState(allFilters.concept ? allFilters.concept : "");
  const [selectedSubConcept, setSelectedSubConcept] = useState(allFilters.selectedSubConcept ? allFilters.selectedSubConcept : "");
  const [uploadedBy, setUploadedBy] = useState(allFilters.uploadedBy ? allFilters.uploadedBy : "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [examType, setExamType] = useState("");
  // const [questionType, setQuestionType] = useState("");
  // const [text, setText] = useState();
  // const [subject, setSubject] = useState("");
  // const [classSearch, setClassSearch] = useState("");
  // const [uploadedBy, setUploadedBy] = useState("");
  const [totalQuestion, setTotalQuestion] = useState(false);
  const paginateData = queryString.parse(location.search);
  const [resultText, setResultText] = useState("Searching for content..");
  // const [difficulty, setDifficulty] = useState("");
  // const [chapter, setChapter] = useState("");
  // const [concept, setConcept] = useState("");
  // const [selectedSubConcept, setSelectedSubConcept] = useState("");

  const [selectedQuestion, setSelectedQuestion] = useState([]);
  const [clearSelectedQuestion, setClearSelectedQuestion] = useState([]);

  // console.log(uploadedQuestionData, 'u');

  useEffect(() => {
    if (activeTab === "1") {
      setLoading(true);
      setSelectedQuestion([]);
      setUploadedQuestionData([]);
      setResultText("Searching for content..");
      question_api
        .getUploadedQuestions({
          moduleType: examType,
          // questionId: parseInt(text),
          searchText: text,
          tautmoreId: tautmoreId,
          classId: classSearch?.id,
          subject: subject?.id,
          chapter: chapter?.id,
          concept: concept?.id,
          difficulty: difficulty,
          subConceptId: selectedSubConcept?.id,
          uploadedBy: uploadedBy?._id,
          questionType: questionTypesData?.[questionType],
          startDate: startDate,
          endDate: endDate,
          page_no: paginateData?.page ? paginateData.page : 1,
        })
        .then((response) => {
          if (response.data?.statusCode === 200) {
            // console.log(response, "data from upload main que");
            const data = response?.data?.response;
            const updatedData = data.map((item) => ({ ...item, addedBy: item.addedBy[0] }));
            setUploadedQuestionData(updatedData);
            setLoading(false);
            setTotalPage(Math.ceil(response.data?.count / 10));
            setTotalQuestion(response.data?.count);
            if (!data.length) {
              setResultText("No question found!");
            }
          }
        })
        .catch((err) => {
          setResultText("No Questions found");
          setTotalQuestion(true);
          console.error(err, "err1");
        });
    }
    let filterObject = {
      examType: examType,
      SearchText: text,
      tautmoreId: tautmoreId,
      Class: classSearch,
      subject: subject,
      chapter: chapter,
      concept: concept,
      difficulty: difficulty,
      selectedSubConcept: selectedSubConcept,
      questionType: questionType,
      uploadedBy: uploadedBy,
      activeTab: activeTab
    }
    localStorage.setItem('exfilter', JSON.stringify(filterObject));
  }, [
    tautmoreId,
    text,
    subject,
    difficulty,
    uploadedBy,
    paginateData.page,
    selectedSubConcept,
    startDate,
    endDate,
    examType,
    questionType,
    classSearch,
    chapter,
    concept,
    clearSelectedQuestion,
    deleteQuestion.statusCode,
    deleteQuestion,
    clearDeletedQuestion,
    activeTab,
  ]);

  useEffect(() => {
    if (activeTab === "2") {
      setLoading(true);
      setSelectedQuestion([]);
      setmyQuestionData([]);
      setResultText("Searching for content..");
      question_api
        .getMyUploadedQuestions({
          page_no: paginateData?.page ? paginateData.page : 1,
          reviewedBy: auth?.id,
          moduleType: examType,
          subject: subject?.id,
          searchText: text,
          uploadedBy: uploadedBy?._id,
          startDate: startDate,
          endDate: endDate,
        })
        .then((response) => {
          // console.log(response, "my questions");
          if (response.data?.statusCode === 200) {
            const data = response?.data?.data?.questions;
            setmyQuestionData(data);
            setLoading(false);
            setTotalPage(Math.ceil(response?.data?.data?.count / 10));
            setTotalQuestion(response?.data?.data?.count);
            if (!data.length) {
              setResultText("No question found!");
            }
          }
        })
        .catch((err) => {
          setResultText("No Questions found");
          setTotalQuestion(true);
          console.error(err, "err1");
        });
    }
  }, [
    text,
    subject,
    difficulty,
    uploadedBy,
    paginateData.page,
    selectedSubConcept,
    startDate,
    endDate,
    examType,
    questionType,
    classSearch,
    chapter,
    concept,
    clearSelectedQuestion,
    deleteQuestion.statusCode,
    deleteQuestion,
    clearDeletedQuestion,
    activeTab,
    auth.id,
  ]);

  useEffect(() => {
    if (deleteQuestion?.statusCode === 200) {
      toast.success("Question deleted successfully!");
      setSelectedQuestion([]);
      clearDeletedQuestion();
    }
  }, [clearDeletedQuestion, deleteQuestion.statusCode]);

  return (
    <div>
      <ApprovedQuestFilter
        questionStatus={"Uploaded"}
        tautmoreId={tautmoreId}
        handleTautmoreId={setToutmoreId}
        text={text}
        selectedSubConcept={selectedSubConcept}
        subject={subject}
        chapter={chapter}
        difficulty={difficulty}
        uploadedBy={uploadedBy}
        questionType={questionType}
        examType={examType}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setUploadedBy={setUploadedBy}
        setExamType={setExamType}
        handleText={setText}
        handleSubject={setSubject}
        setDifficulty={setDifficulty}
        setQuestionType={setQuestionType}
        classSearch={classSearch}
        handleClassSearch={setClassSearch}
        handleChapter={setChapter}
        concept={concept}
        handleConcept={setConcept}
        handlesubConcept={setSelectedSubConcept}
        activeTab={activeTab}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setClearSelectedQuestion}
      />

      <Nav tabs className="questionsTab">
        <div className="payments-nav-bottom-border"></div>
        <NavItem>
          <NavLink
            className={classnames(`${activeTab === "1" ? "active" : ""}`)}
            onClick={() => {
              setActiveTab("1");
            }}
          >
            All Questions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames(`${activeTab === "2" ? "active" : ""}`)}
            onClick={() => {
              setActiveTab("2");
            }}
          >
            My Questions
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {totalQuestion !== false ? (
            <DataListUploadedData
              uploadedQuestionData={uploadedQuestionData}
              loading={loading}
              resultText={resultText}
              totalPage={totalPage}
              parsedFilter={queryString.parse(location.search)}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
            />
          ) : (
            <Spinner />
          )}
        </TabPane>

        <TabPane tabId="2">
          {totalQuestion !== false ? (
            <DataListUploadedData
              uploadedQuestionData={myQuestionData}
              loading={loading}
              resultText={resultText}
              totalPage={totalPage}
              parsedFilter={queryString.parse(location.search)}
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
            />
          ) : (
            <Spinner />
          )}
        </TabPane>
      </TabContent>
    </div>
  );
};

const mapStateToProps = (state) => ({
  deleteQuestion: state.questions.deleteQuestion,
  auth: state.auth.login.userData,
});

const mapDispatchToProps = (dispatch) => ({
  clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadedMain);
