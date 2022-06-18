import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { object } from "prop-types";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "../DataList.scss";
import "./Operator.scss";
import { toast } from "react-toastify";
import classnames from "classnames";
import DataListConfig from "./AllQuestDataList";
import DataListDeclinedConfig from "./DeclinedQuestDataList";
import QuestiosOpActions from "./QuestionOpActions";
import queryString from "query-string";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../../../../../components/@vuexy/spinner/Loading-spinner";
import { questionTypesData } from "../../../../forms/question-form/mockData/data";
import * as question_api from "../../../../services/apis/tautmore_questions_library_apis/all_question_library_apis";

const OperatorMain = ({
  location,
  userData,
  deleteQuestion,
  clearDeletedQuestion,
}) => {
  const allFilters = JSON.parse(localStorage.getItem("opfilter")) || "";
  const [activeTab, setActiveTab] = useState(
    allFilters.activeTab ? allFilters.activeTab : "1"
  );
  const [declinedQuestionData, setDeclinedQuestionData] = useState([]);
  const [uploadedQuestionData, setUploadedQuestionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [totalDQPage, setTotalDQPage] = useState(0);
  const [text, setText] = useState(
    allFilters.SearchText ? allFilters.SearchText : ""
  );
  const [tautmoreId, setToutmoreId] = useState(
    allFilters.tautmoreId ? allFilters.tautmoreId : ""
  );
  const [classSearch, setClassSearch] = useState(
    allFilters.Class ? allFilters.Class : ""
  );
  const [subject, setSubject] = useState(
    allFilters.subject ? allFilters.subject : ""
  );
  const [examType, setExamType] = useState(
    allFilters.examType ? allFilters.examType : ""
  );

  const [questionType, setQuestionType] = useState(
    allFilters.questionType ? allFilters.questionType : ""
  );
  const [difficulty, setDifficulty] = useState(
    allFilters.difficulty ? allFilters.difficulty : ""
  );
  const [chapter, setChapter] = useState(
    allFilters.chapter ? allFilters.chapter : ""
  );
  const [concept, setConcept] = useState(
    allFilters.concept ? allFilters.concept : ""
  );
  const [selectedSubConcept, setSelectedSubConcept] = useState(
    allFilters.selectedSubConcept ? allFilters.selectedSubConcept : ""
  );
  const [uploadedBy, setUploadedBy] = useState(
    allFilters.uploadedBy ? allFilters.uploadedBy : ""
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [totalQuestion, setTotalQuestion] = useState(false);
  const [totalDeclinedQuestion, setTotalDeclinedQuestion] = useState(false);
  const paginateData = queryString.parse(location.search);
  const [resultText, setResultText] = useState("Searching for content..");
  const [resultTextAllQue, setResultTextAllQue] = useState(
    "Searching for content.."
  );
  const [status, setStatus] = useState(
    allFilters.status ? allFilters.status : ""
  );

  useEffect(() => {
    setLoading(true);
    setDeclinedQuestionData([]);
    setUploadedQuestionData([]);
    setResultText("Searching for content..");
    setResultTextAllQue("Searching for content..");
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
      status: status,
      tautmoreId: tautmoreId,
      activeTab: activeTab,
    };
    localStorage.setItem("opfilter", JSON.stringify(filterObject));
    const requestObject = {
      moduleType: examType,
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
      startDate: "",
      endDate: "",
      page_no: paginateData?.page ? paginateData.page : 1,
      status: status,
    };

    question_api
      .getDeclinedQuestions({
        ...requestObject,
        startDate: startDate,
        endDate: endDate,
        uploadedBy: userData?.id,
      })
      .then((response) => {
        if (response.data?.statusCode === 200) {
          const data = response?.data?.data?.questions;
          setDeclinedQuestionData(data);
          setLoading(false);
          setTotalDQPage(Math.ceil(response.data?.count / 10));
          setTotalDeclinedQuestion(data?.length);
          if (!data?.length) {
            setResultText("No question found!");
          }
        }
      })
      .catch((err) => {
        setTotalDeclinedQuestion(true);
        setResultText("No Questions found");
        console.error(err, "err1");
      });

    question_api
      .getUploadedQuestions(requestObject)
      .then((response) => {
        if (response.data?.statusCode === 200) {
          const data = response?.data?.response;
          setUploadedQuestionData(data);
          setLoading(false);
          setTotalPage(Math.ceil(response.data?.count / 10));
          setTotalQuestion(response.data?.count);
          if (!data?.length) {
            setResultTextAllQue("No question found!");
          }
        }
      })
      .catch((err) => {
        setResultTextAllQue("No Questions found");
        console.error(err, "err11");
        setTotalQuestion(true);
      });
  }, [
    activeTab,
    tautmoreId,
    text,
    subject,
    paginateData.page,
    examType,
    classSearch,
    chapter.id,
    concept.id,
    difficulty,
    selectedSubConcept.id,
    questionType,
    selectedSubConcept,
    uploadedBy,
    startDate,
    endDate,
    status,
    userData.id,
    deleteQuestion.statusCode,
    deleteQuestion,
    clearDeletedQuestion,
    chapter,
    concept,
  ]);
  useEffect(() => {
    if (deleteQuestion?.statusCode === 200) {
      toast.success("Question deleted successfully!");
      clearDeletedQuestion();
    } else if (deleteQuestion === "error") {
      toast.error("Error in deleting!");
      clearDeletedQuestion();
    }
  }, [clearDeletedQuestion, deleteQuestion]);

  return (
    <div>
      <div>
        <QuestiosOpActions
          text={text}
          handleText={setText}
          tautmoreId={tautmoreId}
          handleTautmoreId={setToutmoreId}
          subject={subject}
          setSubject={setSubject}
          examType={examType}
          setExamType={setExamType}
          classSearch={classSearch}
          handleClassSearch={setClassSearch}
          selectedSubConcept={selectedSubConcept}
          handlesubConcept={setSelectedSubConcept}
          uploadedBy={uploadedBy}
          setUploadedBy={setUploadedBy}
          questionType={questionType}
          setQuestionType={setQuestionType}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          chapter={chapter}
          handleChapter={setChapter}
          concept={concept}
          handleConcept={setConcept}
          startDate={startDate}
          handleStartDate={setStartDate}
          endDate={endDate}
          handleEndDate={setEndDate}
          activeTab={activeTab}
          setStatus={setStatus}
          status={status}
          totalQuestion={
            activeTab === "1" ? totalQuestion : totalDeclinedQuestion
          }
        />
      </div>
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
            Declined Questions
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {totalQuestion !== false ? (
            <DataListConfig
              uploadedQuestionData={uploadedQuestionData}
              loading={loading}
              resultText={resultTextAllQue}
              totalPage={totalPage}
              parsedFilter={queryString.parse(location.search)}
            />
          ) : (
            <Spinner />
          )}
        </TabPane>
        <TabPane tabId="2">
          {totalDeclinedQuestion !== false ? (
            <DataListDeclinedConfig
              declinedQuestionData={declinedQuestionData}
              loading={loading}
              resultText={resultText}
              totalPage={totalDQPage}
              parsedFilter={queryString.parse(location.search)}
            />
          ) : (
            <Spinner />
          )}
        </TabPane>
      </TabContent>
      {/* <DiscountDataList></DiscountDataList> */}
    </div>
  );
};

OperatorMain.propTypes = {
  userData: object.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.auth.login?.userData,
  deleteQuestion: state.questions.deleteQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(OperatorMain);
