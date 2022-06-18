import React, { useEffect, useState } from "react";
import "./Operator.scss";
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
} from "reactstrap";
import { history } from "../../../../../../history";
import Select from "react-select";
import { array, func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import {
  getUniqueSubjects,
  getAllGrades,
  getSubjectsByClass,
  getChapterBySubjct,
  getConceptsByChapter,
  getSubconceptsByConcept,
} from "../../../../../../redux/actions/questions";
import { questioTypesRawData } from "../../../../forms/question-form/mockData/data";
import * as admin_api from "../../../../services/apis/tautmore_staffs_apis/tautmore_staffs";
import AddNewAdminButton from "../../../../utility/buttons/Button";
import { Button } from "reactstrap";


const QuestiosOpActions = ({
  subject,
  setSubject,
  text,
  handleText,
  examType,
  setExamType,
  classSearch,
  selectedSubConcept,
  handlesubConcept,
  uploadedBy,
  setUploadedBy,
  questionType,
  setQuestionType,
  difficulty,
  setDifficulty,
  chapter,
  handleChapter,
  concept,
  handleConcept,
  handleTautmoreId,
  tautmoreId,
  handleClassSearch,
  activeTab,
  startDate,
  handleStartDate,
  endDate,
  handleEndDate,
  allGrade,
  getUniqueSubjects,
  getSubjectsByClass,
  getAllGrades,
  allSubject,
  getChapterBySubjct,
  getConceptsByChapter,
  getSubconceptsByConcept,
  allChapter,
  allConcept,
  allSubConcept,
  status,
  setStatus,
  totalQuestion
}) => {

  const [allAdmin, setAllAdmin] = useState([]);


  const statusOption = [
    { value: '', label: 'Status' },
    { value: true, label: 'Active' },
    { value: false, label: 'In-Active' },
  ];

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

  const toggleModal = () => {
    history.push("/manage-question/add-question");
    localStorage.removeItem("Editpagedata");
  };
  const clearFilter = (val) => {
    setQuestionType("");
    setExamType("");
    setDifficulty("");
    handleClassSearch("");
    setSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    setUploadedBy("");
    handleText("");
    handleTautmoreId("");
    handleStartDate("");
    handleEndDate("");
    setStatus("");
    localStorage.removeItem('opfilter');
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const handleQuestionType = (val) => {
    setQuestionType(val);
    setExamType("");
    setDifficulty("");
    handleClassSearch("");
    setSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    setUploadedBy("");
    handleText("");
    handleStartDate("");
    handleEndDate("");
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const handleDifficulty = (val) => {
    setDifficulty(val);
    setQuestionType("");
    setExamType("");
    handleClassSearch("");
    setSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    handleText("");
    handleStartDate("");
    handleEndDate("");
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };


  const handlechangeClass = (data) => {
    setSubject("");
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("")
    handleStartDate("");
    handleEndDate("");
    handleClassSearch(data);
    getSubjectsByClass({ classId: data.id });
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };

  const handleExamType = (val) => {
    setSubject("");
    handleClassSearch("")
    setExamType(val);
    setQuestionType("");
    setDifficulty("");
    handleClassSearch("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    handleText("");
    handleStartDate("");
    handleEndDate("");
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const changeSubject = (subject) => {
    setSubject(subject);
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    handleStartDate("");
    handleEndDate("");
    getChapterBySubjct({ subjectId: subject.id });
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const changeChapter = (data) => {
    handleChapter(data);
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handleConcept("");
    handlesubConcept("");
    handleStartDate("");
    handleEndDate("");
    getConceptsByChapter({ chapterId: data.id });
  };

  const changeConcept = (data) => {
    handleConcept(data);
    setUploadedBy("");
    handleText("");
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    handlesubConcept("");
    handleStartDate("");
    handleEndDate("");
    getSubconceptsByConcept({ conceptId: data.id });
  };

  const changeSubConcept = (data) => {
    handlesubConcept(data);
    setDifficulty("");
    setQuestionType("");
    // setExamType("");
    setUploadedBy("");
    handleText("");
    handleStartDate("");
    handleEndDate("");
  };
  const handleUploadedBy = (value) => {
    setUploadedBy(value);
    setQuestionType("");
    setExamType("");
    setDifficulty("");
    handleClassSearch("");
    setSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    handleText("");
    handleStartDate("");
    handleEndDate("");
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };
  const handleInputChange = (input) => {
    input.preventDefault();
    setQuestionType("");
    setExamType("");
    setDifficulty("");
    handleClassSearch("");
    setSubject("");
    handleChapter("");
    handleConcept("");
    handlesubConcept("");
    setUploadedBy("");
    handleStartDate("");
    handleEndDate("");
    let urlPrefix = "/operator-questions";
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
    handleStartDate("");
    handleEndDate("");
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=1`);
  };

  // const statusChange = (data) => {
  //   setStatus(data);
  // };

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
  const filterDropdown = [
    {
      value: classSearch,
      onChange: handlechangeClass,
      options: classData(allGrade),
      placeholder: "Class",
    },
    {
      value: subject,
      onChange: changeSubject,
      options: structureData(allSubject),
      placeholder: "Subject",
    },
    {
      value: chapter,
      onChange: changeChapter,
      options: structureData(allChapter),
      placeholder: "Chapter",
    },
    {
      value: concept,
      onChange: changeConcept,
      options: structureData(allConcept),
      placeholder: "Topic",
    },
    {
      value: selectedSubConcept,
      onChange: changeSubConcept,
      options: structureData(allSubConcept),
      placeholder: "Sub Topic",
    },
  ]
  return (
    <div>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <AddNewAdminButton
            button_title="Add Question"
            onClick={() => toggleModal()}
          />
        </Col>
        <Col sm="4" className="AdminTotal-users">
          <div className="totalusersAdmin">
            <h4>Total Questions:</h4>
            <h2 className="rp-manage-school-header-title">{totalQuestion}</h2>
          </div>
        </Col>
      </Row>
      {/* <AddNewAdminButton
        button_title="Add Question"
        onClick={() => toggleModal()}
      /> */}
      <Row className="bottomSpace">
        <Col sm="3">
          <div className="discountfilter-section custom-filtersection">
            <form onSubmit={(e) => handleInputChange(e)}>
              <Input
                type="text"
                placeholder="Search by name"
                name="search-text"
                value={text}
                onChange={(e) => handleText(e.target.value)}
              />
            </form>
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
        <Col sm="6">
          {activeTab === "2" ?
            <div className="form-inline discountfilter-section custom-filtersection">
              <Label>From</Label>
              <Input type="date"
                name="from-date"
                value={startDate}
                onChange={(e) => handleStartDate(e.target.value)}
              />
              <Label>To</Label>
              <Input type="date"
                name="to-date"
                value={endDate}
                onChange={(e) => handleEndDate(e.target.value)}
              />
            </div>
            : ""}
        </Col>

      </Row>
      <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistQuestion">
        <div className="actions-right rp-manageSchool-head-main-Opquest d-flex flex-wrap mt-sm-0 mt-2">

          {/* { console.log("questioTypesRawData",questioTypesRawData)} */}
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
              {questionType ? questionType : "QuestionType"}
              {/* </span> */}
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
                  {item?.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>


          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
              {examType ? examType : "ExamType"}
              {/* </span> */}
              <ChevronDown size={15} />
            </DropdownToggle>
            <DropdownMenu
              className="customadmindropdown"
              tag="div"
              right
            >
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

          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              {/* <span className="align-middle mx-50 adminfilterOpquestSpan"> */}
              {difficulty ? difficulty : "Difficulty"}
              {/* </span> */}
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
          {filterDropdown.map((field, i) => {
            return (
              <UncontrolledDropdown key={i} className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
                <Select
                  className="subconcept-select"
                  classNamePrefix="select"
                  value={field.value}
                  onChange={field.onChange}
                  options={field.options}
                  placeholder={field.placeholder}
                ></Select>
              </UncontrolledDropdown>
            );
          })}

          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={classSearch}
              onChange={handlechangeClass}
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
          </UncontrolledDropdown> */}

          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none">
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
                  <DropdownItem key={admin.name} tag="a" onClick={() => handleUploadedBy(admin)}>
                    {admin?.name}
                  </DropdownItem>
                ))}
            </DropdownMenu>
          </UncontrolledDropdown> */}

          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Opquest mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50 adminfilterOpquestSpan">
                {status ? status : "Status"}
              </span>
              <ChevronDown size={15} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdownOpquest" tag="div" right>
              <DropdownItem tag="a" onClick={() => setStatus(true)}>Active</DropdownItem>
              <DropdownItem tag="a" onClick={() => setStatus(false)}>In-Active</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={statusOption.label}
              onChange={(e) => setStatus(e.value)}
              options={statusOption}
              placeholder="Status"
            />
          </UncontrolledDropdown>
          <Button.Ripple
            onClick={() => clearFilter()}
            className="list-button d-flex  align-items-center add-new-btn-admin"
          >
            <span className="tautmore-admin-add-btn">Clear Filter</span>
          </Button.Ripple>
          {/* <AddNewAdminButton
              button_title="Clear Filter"
              onClick={() => clearFilter()}
            /> */}
        </div>
      </div>
    </div>
  );

};
QuestiosOpActions.proptTypes = {
  subject: string.isRequired,
  subjectlist: array.isRequired,
  allGrade: array.isRequired,
  modalForm: string.isRequired,
  handleText: func.isRequired,
  handleTautmoreId: func.isRequired,
  getUniqueSubjects: func.isRequired,
  difficulty: string.isRequired,
  selectedSubConcept: shape({
    name: string.isRequired,
    _id: string.isRequired,
  }),
  uploadedBy: shape({
    name: string.isRequired,
    _id: string.isRequired,
  }),
  subConcepts: array.isRequired,
  handlesubConcept: func.isRequired,
  handleSubject: func.isRequired,
  handleDifficulty: func.isRequired,
  handleUploadedBy: func.isRequired,

};

const mapStateToProps = (state) => ({
  subjectlist: state.questions.subject,
  allGrade: state.questions.allGrade,
  allSubject: state.questions.allSubjects,
  allChapter: state.questions.chapters,
  allConcept: state.questions.concepts,
  allSubConcept: state.questions.allSubconcepts,
});
const mapDispatchToProps = (dispatch) => ({
  getUniqueSubjects: () => dispatch(getUniqueSubjects()),
  getAllGrades: (data) => dispatch(getAllGrades(data)),
  getSubjectsByClass: (data) => dispatch(getSubjectsByClass(data)),
  getChapterBySubjct: (data) => dispatch(getChapterBySubjct(data)),
  getConceptsByChapter: (data) => dispatch(getConceptsByChapter(data)),
  getSubconceptsByConcept: (data) => dispatch(getSubconceptsByConcept(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestiosOpActions);
