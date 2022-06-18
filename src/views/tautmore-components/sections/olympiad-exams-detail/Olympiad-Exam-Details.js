import React, { useEffect, useState } from "react";
import "../exam-and-tests-detail/ExamAndTestDetails.scss";
import {
  getOlympiadExamInfo,
  getQuestionInOlymExam,
  getOlympiadExistingQue,
  updateOlympiadExamStatus,
} from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import { useParams } from "react-router-dom";
import "../../../../assets/scss/pages/data-list.scss";
import { Button, Row, Col } from "reactstrap";
import { history } from "../../../../history";
import Sidebar from "../../forms/olympiad-form/Olympiad-Add-Exam";
import * as Icon from "react-feather";
import { CustomInput } from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink, Input } from "reactstrap";
import classnames from "classnames";
import AccordionMargin from "./OlympiadExamQuestionsTab";
import { Plus } from "react-feather";
import moment from "moment";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import { ToastContainer, toast } from "react-toastify";

const OlympiadExamDetails = (props) => {
  const [examData, setExamsData] = useState([]);
  const params = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const [loader, setLoader] = useState(true);
  const [questionsInExam, setQuestionsInExam] = useState([]);
  const [resultText, setResultText] = useState("Searching for content..");
  const [totalPage, setTotalPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState(false);
  const [localData, setLocalData] = useState({});
  const [sidebar, setSidebar] = useState(false);
  const [subjectData, setSubjectData] = useState([])

  const getOlympiadExamDet = async () => {
    try {
      const res = await getOlympiadExamInfo({ examId: params.id });
      if (res.status === 200) {
        const updatedData = res?.data?.data;
        localStorage.setItem("Olympiadtotalmarks", updatedData.totalMarks);
        let subjectsList = [];
        for (const [key, value] of updatedData.subject.entries()) {
          subjectsList = [
            ...subjectsList,
            {
              value: updatedData.subjectName[key],
              label: updatedData.subjectName[key],
              id: value,
            },
          ];
        }
        setSubjectData(subjectsList)
        setExamsData(updatedData);
        setStatus(updatedData.active);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    getQuesInExam();
  }, [searchText]);

  const handleQuestionAdd = (name, id) => {
    // history.push(`/add-questions-to-exam/${params.id}`,
    // state : { subjectName: examData.subjectName, subjectId: examData.subject})
    props.history.push({
      pathname: `/add-questions-to-olympiad/${params.id}`,
      state: { name: name, id: id },
    });
  };

  const getQuesInExam = async () => {
    try {
      const data = {
        examId: params.id,
        page_no: 1,
        searchText: searchText,
      };
      const res = await getQuestionInOlymExam(data);
      console.log(res);
      const Quedata = res?.data?.data[0]?.response;
      setQuestionsInExam(res?.data?.data[0]?.response);
      setTotalPage(Math.ceil(res?.data?.data[0]?.count[0]?.count / 10));
      if (!Quedata.length) {
        setResultText("No Questions found");
      } else {
        setResultText("");
      }
    } catch (error) {
      console.log(error);
      setResultText("No Questions found");
    }
  };

  const examList = () => {
    localStorage.removeItem("selectedOlympiadQuedata");
    localStorage.removeItem("Olympiadtotalmarks");
    history.push("/olympiad-exams");
  };

  const handleText = (val) => {
    setSearchText(val);
  };

  const handleSidebar = (value) => {
    // this.setState({ sidebar: value });
    setSidebar(value);
  };

  const handleAdminStatus = async (id, status) => {
    try {
      const res = await updateOlympiadExamStatus({
        examId: id,
        status: status,
      });
      console.log(res);
      if (res.status === 200) {
        console.log(status);
        toast.success(`Exam is ${status ? "enabled" : "disabled"}`);
        setStatus(status);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const renderCustomView = () => {
    if (localData?.access?.["delete-exam"] == true) {
      return (
        <div className="custom-switch-dark-cust">
          <span className="mb-0 switch-label">Disable</span>
          <CustomInput
            className="custom-switch-dark  mr-1 mb-2"
            type="switch"
            // id="dark"
            // name="switch"
            id={`"dark"-${examData._id}`}
            name={`${examData._id}`}
            onChange={() => handleAdminStatus(examData._id, !status)}
            inline
            checked={status}
          />
        </div>
      );
    }
  };

  const getExistingQue = async () => {
    try {
      const res = await getOlympiadExistingQue({ examId: params.id });
      if (res.status === 200) {
        const Array = [];
        res.data.data.map((item) => {
          Array.push({
            id: item._id,
            questionExist: true,
            marks: item.score,
          });
        });
        localStorage.setItem("selectedOlympiadQuedata", JSON.stringify(Array));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let localInfo = JSON.parse(localStorage.getItem("tautmore-user"));
    setLocalData(localInfo);
    getOlympiadExamDet();
    getExistingQue();
  }, []);
  return (
    <div>
      {!loader ? (
        <div className={`data-list ${"list-view"}`}>
          <Row className="ml-0 mr-0 mb-3">
            <Col sm="6">
              <h4 className="rp-manage-school-header-title">
                {examData?.subjectName?.map((sub, i) => {
                  return (
                    <div key={i}>
                      <span>{sub} </span>
                      <br />
                    </div>
                  );
                })}
              </h4>
              <div className="examQuestDeatails">
                <h3>class {examData.className}</h3>
                <div>
                  <Icon.Clock size={24} className="" />
                  <label className="">{examData.totalTime} mins</label>
                </div>
                <div>
                  <Icon.Book size={24} className="" />
                  <label className="">
                    {examData.questions ? examData.questions.length : 0} quest.
                  </label>
                </div>
                <div>
                  <Icon.CheckCircle size={24} className="" />
                  <label className="">{examData.totalMarks} Marks</label>
                </div>
              </div>
            </Col>

            <Col sm="6">
              <Row>
                <Col sm="12">
                  <Button
                    className="admin-details-delete back"
                    outline
                    onClick={examList}
                  >
                    Back
                  </Button>
                  {localData?.access?.["edit-exam"] == true ? (
                    <Button
                      className="admin-details-edit 1111"
                      onClick={() => {
                        handleSidebar(true);
                      }}
                    >
                      Edit Exam
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm="12">{renderCustomView()}</Col>
              </Row>
            </Col>
          </Row>

          <Nav tabs className="nav-justified  examsAndTestTabInside">
            <NavItem>
              <NavLink
                className={`teacher-nav-link ${
                  activeTab === "1" ? "active" : ""
                }`}
                onClick={() => setActiveTab("1")}
              >
                Exam info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={`teacher-nav-link ${
                  activeTab === "2" ? "active" : ""
                }`}
                onClick={() => setActiveTab("2")}
              >
                Questions
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div className="MainLayoutExamDet">
                <Row className="ExamDetInfoMD">
                  <Col sm="3">
                    <h3>Exam Type</h3>
                    <h1>{examData.examType}</h1>
                  </Col>
                  <Col>
                    <h3>Exam Date</h3>
                    <h1>
                      {moment(examData.startDate).format("D")}th of every month
                    </h1>
                  </Col>
                </Row>
                <div className="ExamDetInfoD">
                  <h3>Description</h3>
                  <p>{examData.description}</p>
                </div>

                <div className="ExamDetInfoI">
                  <h3>Instuctions</h3>
                  <ul>
                    <li>{examData.instructions}</li>
                  </ul>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <Row className="examQuestLayout">
                <Col sm="6">
                  {localData?.access?.["map-questions-to-exam"] == true ? (
                    <Button
                      className="admin-details-addQuest 1111"
                      onClick={() => {
                        handleQuestionAdd(
                          examData.subjectName,
                          examData.subject
                        );
                      }}
                    >
                      <Plus height="18" width="18" />
                      <span className="tautmore-admin-add-btn">
                        Add Question
                      </span>
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
                <Col sm="6">
                  <div className="data-list-header d-flex justify-content-between flex-wrap datalistExamQuestion">
                    <div className="actions-left d-flex flex-wrap queExamSearch">
                      <div className="filter-section custom-filtersection">
                        <Input
                          type="text"
                          placeholder="Search title"
                          onChange={(e) => handleText(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-center w-100">
                <h3 className="">{resultText}</h3>
              </div>
              {questionsInExam ? (
                <AccordionMargin
                  questionsInExam={questionsInExam}
                  subjectName={examData.subjectName}
                  subject={examData.subject}
                />
              ) : (
                ""
              )}
              {questionsInExam.length === 0 ? (
                ""
              ) : (
                <ReactPaginate
                  previousLabel={<ChevronLeft size={15} />}
                  nextLabel={<ChevronRight size={15} />}
                  breakLabel="..."
                  breakClassName="break-me"
                  pageCount={totalPage}
                  containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
                  activeClassName="active"
                />
              )}
            </TabPane>
          </TabContent>
          {sidebar ? (
        <div
          className={`data-list ${
            props.thumbView ? "thumb-view" : "list-view"
          }`}
        >
          <Sidebar
            isEditAble
            show={sidebar}
            data={examData}
            loadData={getOlympiadExamDet}
            handleSidebar={handleSidebar}
            title={"EDIT"}
            subjectData={subjectData}
          />
          <div
            className={classnames("data-list-overlay", {
              show: sidebar,
            })}
            onClick={() => handleSidebar(false)}
          />
        </div>
      ) : null}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default OlympiadExamDetails;
