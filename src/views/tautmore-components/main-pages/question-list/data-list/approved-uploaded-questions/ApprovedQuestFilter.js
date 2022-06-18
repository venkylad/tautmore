import React, { useState, useEffect } from "react";
import "../operator/Operator.scss";
import { history } from "../../../../../../history";
import * as admin_api from "../../../../services/apis/tautmore_staffs_apis/tautmore_staffs";
import { toast } from "react-toastify";
import { ChevronDown } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Row,
  Col,
  Label,
  Button,
} from "reactstrap";
import Select from "react-select";
import { array, func, string } from "prop-types";
import { connect } from "react-redux";
import {
  getUniqueSubjects,
  getAllGrades,
  getSubjectsByClass,
  getChapterBySubjct,
  getSubconceptsByConcept,
  getConceptsByChapter,
} from "../../../../../../redux/actions/questions";
import { questioTypesRawData } from "../mockdata/tableColumnsData";
import ActionButton from "../ActionButton";
import * as question_api from "../../../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import { deleteQuestionbyId } from "../../../../../../redux/actions/questions";

const ApprovedQuestFilter = ({
  subject,
  setSubject,
  handleText,
  examType,
  setExamType,
  getUniqueSubjects,
  subjectlist,
  questionStatus,
  text,
  classSearch,
  handleClassSearch,
  allGrade,
  getSubjectsByClass,
  getAllGrades,
  allSubject,
  uploadedBy,
  setUploadedBy,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  questionType,
  difficulty,
  chapter,
  allChapter,
  concept,
  allConcept,
  allSubConcept,
  selectedSubConcept,
  getChapterBySubjct,
  setDifficulty,
  setQuestionType,
  handleSubject,
  handleChapter,
  handleConcept,
  handlesubConcept,
  getSubconceptsByConcept,
  getConceptsByChapter,
  activeTab,
  adminAccess,
  selectedQuestion,
  setSelectedQuestion,
  deleteQuestion,
  deleteQuestionList,
  clearDeletedQuestion,
  handleTautmoreId,
  tautmoreId,
}) => {
  const [allAdmin, setAllAdmin] = useState([]);
  const clearFilter = (val) => {
    setQuestionType("");
    setExamType("");
    setDifficulty("");
    handleClassSearch("");
    handleSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    setUploadedBy("");
    handleText("");
    handleTautmoreId("");

    
    localStorage.removeItem('exfilter');
    let urlPrefix =
    questionStatus === "Approved"
      ? "/approved-questions"
      : "/uploaded-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const handleTautmoreIdChange = (input) => {
    input.preventDefault();
    setQuestionType("");
    setExamType("");
    setDifficulty("");
    handleText("");
    handleClassSearch("");
    setSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    setUploadedBy("");
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const handleDifficulty = (val) => {
    setDifficulty(val);
    setQuestionType("");
    setExamType("");
    handleClassSearch("");
    handleSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    handleText("");
    let urlPrefix =
      questionStatus === "Approved"
        ? "/approved-questions"
        : "/uploaded-questions";
    history.push(`${urlPrefix}?page=1`);
  }

  const changeClass = (data) => {
    handleClassSearch(data);
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handleSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    getSubjectsByClass({ classId: data.id });
    let urlPrefix =
      questionStatus === "Approved"
        ? "/approved-questions"
        : "/uploaded-questions";
    history.push(`${urlPrefix}?page=1`);
  }

  const handleQuestionType = (val) => {
    setQuestionType(val);
    setExamType("");
    setDifficulty("");
    handleClassSearch("");
    handleSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    setUploadedBy("");
    handleText("");
    let urlPrefix =
      questionStatus === "Approved"
        ? "/approved-questions"
        : "/uploaded-questions";
    history.push(`${urlPrefix}?page=1`);
  }

  const changeChapter = (data) => {
    handleChapter(data);
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handleConcept("");
    handlesubConcept("");
    getConceptsByChapter({ chapterId: data.id });
  }

  const changeConcept = (data) => {
    handleConcept(data);
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handlesubConcept("");
    getSubconceptsByConcept({ conceptId: data.id });
  }

  const changeSubConcept = (data) => {
    handlesubConcept(data);
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    setUploadedBy("");
    handleText("");
  }

  const structureData = (conceptData) => {
    const data = conceptData?.map((item) => ({
      value: item?.name,
      label: item?.name,
      id: item?._id,
    }));
    return data;
  };

  const classData = (value) => {
    const data = value.map((item) => ({
      value: item.name + "_" + item.board.name,
      label: item.name + "_" + item.board.name,
      id: item?._id,
    }));
    return data;
  };

  const handleUploadedBy = (value) => {
    setUploadedBy(value);
    setQuestionType("");
    setExamType("");
    setDifficulty("");
    handleClassSearch("");
    handleSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    handleText("");
    let urlPrefix =
      questionStatus === "Approved"
        ? "/approved-questions"
        : "/uploaded-questions";
    history.push(`${urlPrefix}?page=1`);
  };

  // const handlechangeClass = (data) => {
  //   setExamType("");
  //   setSubject("");
  //   handleClassSearch(data);
  //   getSubjectsByClass({ classId: data.id });
  //   let urlPrefix =
  //     questionStatus === "Approved"
  //       ? "/approved-questions"
  //       : "/uploaded-questions";
  //   history.push(`${urlPrefix}?page=1`);
  // };

  const handleExamType = (val) => {
    setExamType(val);
    setQuestionType("");
    setDifficulty("");
    handleClassSearch("");
    handleSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    handleText("");
    let urlPrefix =
      questionStatus === "Approved"
        ? "/approved-questions"
        : "/uploaded-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const changeSubject = (subject) => {
    handleSubject(subject);
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    getChapterBySubjct({ subjectId: subject.id });
    let urlPrefix =
      questionStatus === "Approved"
        ? "/approved-questions"
        : "/uploaded-questions";
    history.push(`${urlPrefix}?page=1`);
  };

  useEffect(() => {
    admin_api.getAdminList().then((res) => {
      setAllAdmin(res.data?.response);
    });
  }, []);

  useEffect(() => {
    getAllGrades();
  }, [getAllGrades]);

  useEffect(() => {
    getUniqueSubjects();
  }, [getUniqueSubjects]);

  useEffect(() => {
    if(deleteQuestionList?.statusCode === 200) {
      setSelectedQuestion([]);
      toast.success("Question deleted successfully!");
      clearDeletedQuestion();
    }
  }, [clearDeletedQuestion, deleteQuestionList, setSelectedQuestion]);
  

  const handleQuestionStatus = (status) => {
    question_api.setQuestionStatus(selectedQuestion, status).then((res) => {
      if (res.status === 200) {
        setSelectedQuestion([]);
        toast.success(`Question is ${status ? "enabled" : "disabled"}`);
      }
    });
  };

  const handleDelete = () => {
    deleteQuestion(selectedQuestion);
  };

  return (
    <div>
      <Row className="bottomSpace">
        <Col sm="12">
        <div className="button-group approved-btn-group">
          {adminAccess?.["review-question"] && (
            <div className="listing-manage-button-group">
              <ActionButton
                name="Activate"
                type="status"
                selectedQuestion={selectedQuestion}
                handler={() => handleQuestionStatus(true)} // modal={this.state.deleteModal}
                // toggle={this.deleteQuestion}
                // setModal={this.handleDeleteModal}
                id={12}
              />
              <ActionButton
                name="Deactivate"
                type="status"
                selectedQuestion={selectedQuestion}
                handler={() => handleQuestionStatus(false)}
                // modal={this.state.deleteModal}
                // toggle={this.deleteQuestion}
                // setModal={this.handleDeleteModal}
                id={12}
              />
              <ActionButton
                name="Delete"
                type="delete"
                selectedQuestion={selectedQuestion}
                handler={handleDelete}
                // modal={this.state.deleteModal}
                // toggle={this.deleteQuestion}
                // setModal={this.handleDeleteModal}
                id={12}
              />
            </div>
          )}
        </div>
        </Col>
        <Col sm="3">
          <div className="discountfilter-section custom-filtersection">
            <Input
              type="text"
              placeholder="Search by name"
              onChange={(e) => handleText(e.target.value)}
            />
          </div>
        </Col>
        <Col sm="3">
          <div className="discountfilter-section custom-filtersection">
            <form onSubmit={(e) => handleTautmoreIdChange(e)}>
              <Input
                type="text"
                placeholder="Search Tautmore Id"
                name="search-tautmoreId"
                value={tautmoreId}
                onChange={(e) => handleTautmoreId(e.target.value)}
              />
            </form>
          </div>
        </Col>
        { activeTab !== '1' &&
          <Col sm="6">
            <div className="form-inline discountfilter-section custom-filtersection">
              <Label>From</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Label>To</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </Col>
        }
      </Row>
      

      <div className="actions-right justify-content-start rp-manageSchool-head-main d-flex flex-wrap mt-sm-0 mt-2">
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {questionType ? questionType : "QuestionType"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem tag="a" onClick={() => handleQuestionType("")}>
                QuestionType
              </DropdownItem>
              {questioTypesRawData?.map((item) => (
                <DropdownItem
                  key={item?.value}
                  onClick={() => handleQuestionType(item?.value)}
                >
                  {item?.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {examType ? examType : "ExamType"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem tag="a" onClick={() => handleExamType("")}>
                Exam Type
              </DropdownItem>
              <DropdownItem onClick={() => handleExamType("brain-gym")}>
                Brain-gym
              </DropdownItem>
              <DropdownItem onClick={() => handleExamType("exams")}>
                Exams
              </DropdownItem>
              <DropdownItem onClick={() => handleExamType("assignment")}>
                Assignment
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {difficulty ? difficulty : "Difficulty"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem tag="a" onClick={() => handleDifficulty("")}>
                Difficulty
              </DropdownItem>
              <DropdownItem onClick={() => handleDifficulty("high")}>
                High
              </DropdownItem>
              <DropdownItem onClick={() => handleDifficulty("medium")}>
                Medium
              </DropdownItem>
              <DropdownItem onClick={() => handleDifficulty("low")}>
                Low
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {classSearch ? classSearch : "Class"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem tag="a" onClick={() => changeClass("")}>
                Class
              </DropdownItem>
              {allGrade?.length &&
                allGrade?.map((grade) => (
                  <DropdownItem
                    key={grade}
                    tag="a"
                    onClick={() => changeClass(grade)}
                  >
                    {grade}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown> */}

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
        
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={classSearch}
              onChange={changeClass}
              options={classData(allGrade)}
              placeholder="Class"
            ></Select>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={subject}
              onChange={changeSubject}
              options={structureData(allSubject)}
              placeholder="Subject"
            ></Select>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={chapter}
              onChange={changeChapter}
              options={structureData(allChapter)}
              placeholder="Chapter"
            ></Select>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={concept}
              onChange={changeConcept}
              options={structureData(allConcept)}
              placeholder="Topic"
            ></Select>
          </UncontrolledDropdown>

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={selectedSubConcept}
              onChange={changeSubConcept}
              options={structureData(allSubConcept)}
              placeholder="Sub Topic"
            ></Select>
          </UncontrolledDropdown>

          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {subject ? subject : "Subject"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem tag="a" onClick={() => changeSubject("")}>
                Subject
              </DropdownItem>
              {subjectlist?.length &&
                subjectlist?.map((subject) => (
                  <DropdownItem
                    key={subject}
                    tag="a"
                    onClick={() => changeSubject(subject)}
                  >
                    {subject}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown> */}
          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={selectedSubConcept}
              onChange={handleChange}
              options={structureData(subconceptlist)}
              defaultInputValue={selectedSubConcept?._id}
              placeholder="Subconcept"
            ></Select>
          </UncontrolledDropdown> */}
          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {selectedSubConcept ? selectedSubConcept?.name : "Sub Concept"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem
                tag="a"
                onClick={() =>
                  handlesubConcept({ _id: "", name: "Sub Concept" })
                }
              >
                Sub Concept
              </DropdownItem>
              {subConcepts.length &&
                subConcepts?.map((concept, i) => (
                  <DropdownItem
                    key={i}
                    tag="a"
                    onClick={() => handlesubConcept(concept)}
                  >
                    {concept?.name}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown> */}

          {/* Search by difficulty level */}

          {/* Search by uploaded */}
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {uploadedBy ? uploadedBy?.name : "Uploaded By"}
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem
                tag="a"
                onClick={() =>
                  handleUploadedBy({ _id: "", name: "Uploaded By" })
                }
              >
                Uploaded By
              </DropdownItem>
              {allAdmin?.length &&
                allAdmin?.map((admin) => (
                  <DropdownItem tag="a" key={admin?.name} onClick={() => handleUploadedBy(admin)}>
                    {admin?.name}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown>
          <Button.Ripple
          onClick={() =>clearFilter()}
          className="list-button d-flex  align-items-center add-new-btn-admin"
        >
          <span className="tautmore-admin-add-btn">Clear Filter</span>
        </Button.Ripple>
        </div>

    </div>
  );
};
ApprovedQuestFilter.proptTypes = {
  subject: string.isRequired,
  subjectlist: array.isRequired,
  allGrade: array.isRequired,
  modalForm: string.isRequired,
  handleText: func.isRequired,
  getUniqueSubjects: func.isRequired,
  handleTautmoreId: func.isRequired,

};

const mapStateToProps = (state) => ({
  subjectlist: state.questions.subject,
  allGrade: state.questions.allGrade,
  allSubject: state.questions.allSubjects,
  allChapter: state.questions.chapters,
  allConcept: state.questions.concepts,
  allSubConcept: state.questions.allSubconcepts,
  adminAccess: state.auth.login?.userData?.access,
  deleteQuestionList: state.questions.deleteQuestion,
});
const mapDispatchToProps = (dispatch) => ({
  getUniqueSubjects: () => dispatch(getUniqueSubjects()),
  getAllGrades: (data) => dispatch(getAllGrades(data)),
  getSubjectsByClass: (data) => dispatch(getSubjectsByClass(data)),
  getChapterBySubjct: (data) => dispatch(getChapterBySubjct(data)),
  getConceptsByChapter: (data) => dispatch(getConceptsByChapter(data)),
  getSubconceptsByConcept: (data) => dispatch(getSubconceptsByConcept(data)),
  deleteQuestion: (id) => dispatch(deleteQuestionbyId(id)),
  clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovedQuestFilter);
