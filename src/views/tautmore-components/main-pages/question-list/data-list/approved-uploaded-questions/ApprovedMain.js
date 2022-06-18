import React, { useEffect, useState } from "react";
import "../DataList.scss";
import * as question_api from "../../../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import DataListQuestData from "./DataListQuestData";
import ApprovedQuestFilter from "./ApprovedQuestFilter";
import queryString from "query-string";
import Spinner from "../../../../../../components/@vuexy/spinner/Loading-spinner";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { questionTypesData } from "../../../../forms/question-form/mockData/data";


const ApprovedMain = ({ location, deleteQuestion }) => {
  const allFilters = JSON.parse(localStorage.getItem("exfilter")) || "";
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
  const [approvedQuestionData, setApprovedQuestionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
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

  useEffect(() => {
    setLoading(true);
    setApprovedQuestionData([]);
    setResultText("Searching for content..");
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
      // status: status,
    }
    localStorage.setItem('exfilter', JSON.stringify(filterObject));
    question_api
      .getApprovedQuestions({
        tautmoreId: tautmoreId,
        questionType: questionTypesData?.[questionType],
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
        startDate: startDate,
        endDate: endDate,
        page_no: paginateData?.page ? paginateData.page : 1,
      })
      .then((response) => {
        if (response.data?.statusCode === 200) {
          // console.log(response, 'res from')
          const data = response?.data?.data?.questions;
          const updatedData = data.map((item) => ({ ...item, addedBy: item.addedBy[0] }));
          setApprovedQuestionData(updatedData);
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
  }, [tautmoreId, text, subject, difficulty, uploadedBy, paginateData.page, selectedSubConcept, startDate, endDate, examType, questionType, classSearch, chapter, concept, clearSelectedQuestion, deleteQuestion.statusCode, deleteQuestion]);
  return (
    <div>

      <ApprovedQuestFilter
        questionStatus={"Approved"}
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
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setClearSelectedQuestion}
      />
      {totalQuestion !== false ? (
        <DataListQuestData
          approvedQuestionData={approvedQuestionData}
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
      {/* <ToastContainer draggable={false} />  */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  deleteQuestion: state.questions.deleteQuestion,
});

export default connect(mapStateToProps,)(ApprovedMain);


//export default ApprovedMain;
