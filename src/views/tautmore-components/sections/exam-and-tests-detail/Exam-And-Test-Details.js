import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "reactstrap";
import "./ExamAndTestDetails.scss";
import * as Icon from "react-feather";
import { CustomInput } from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink, Input } from "reactstrap";
import classnames from "classnames";
import AccordionMargin from "../exam-and-tests-detail/ExamQuestionsTab";
import { Plus } from "react-feather";
import { useParams } from "react-router-dom";
import moment from "moment";
import { history } from "../../../../history";
import Sidebar from "../../forms/exams-form/Exam-Add-Form";
import "../../../../assets/scss/pages/data-list.scss";
import {
  getExamInfo,
  getQuestionsInExam,
  getExistingQuestions
} from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import { updateExamStatus } from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";

const ExamAndTestsDetail = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [examData, setExamsData] = useState([]);
  const [status, setStatus] = useState(false);
  const params = useParams();
  const [sidebar, setSidebar] = useState(false);
  const [questionsInExam, setQuestionsInExam] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [resultText, setResultText] = useState("Searching for content..");
  const [localData, setLocalData] = useState({});
  const [loader, setLoader] = useState(true);


  const getExamDetails = async () => {
    try {
      const res = await getExamInfo({ examId: params.id });
      if (res.status === 200) {
        const updatedData = res.data.data;
        localStorage.setItem('totalmarks', updatedData.totalMarks)
        setExamsData(updatedData);
        setStatus(updatedData.active);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExistingQue = async() => {
    try{
      const res = await getExistingQuestions({ examId: params.id })
      if(res.status === 200){
        const Array = [];
        res.data.data.map((item) =>{
          Array.push({
            id:item._id,
            questionExist:true,
            marks:item.score
          })
        })
        localStorage.setItem('selectedQuedata', JSON.stringify(Array));
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleAdminStatus = async (id, status) => {
    try {
      const res = await updateExamStatus({
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
      toast.error(error.message);
    }
  };

  const handleQuestionAdd = (name, id) => {
    // history.push(`/add-questions-to-exam/${params.id}`,
    // state : { subjectName: examData.subjectName, subjectId: examData.subject})
    props.history.push({
      pathname: `/add-questions-to-exam/${params.id}`,
      state: { name: name, id: id },
    });
  };

  const handleSidebar = (value) => {
    // this.setState({ sidebar: value });
    setSidebar(value);
  };

  const renderCustomView = (localData) => {
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

  const getQuesInExam = async () => {
    try {
      const data = {
        examId: params.id,
        page_no: 1,
        searchText: searchText,
      };
      const res = await getQuestionsInExam(data);
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
    localStorage.removeItem('selectedQuedata');
    localStorage.removeItem('totalmarks');
    history.push("/regular-exams");
  };

  const handleText = (val) => {
    setSearchText(val);
  };

  useEffect(() => {
    let localInfo = JSON.parse(localStorage.getItem("tautmore-user"));
    setLocalData(localInfo);
    getExamDetails();
    getExistingQue();
  }, []);

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    getQuesInExam();
  }, [searchText]);

  return (
    <div>
      {!loader ? (
    <div className={`data-list ${"list-view"}`}>
     
        <Row className="ml-0 mr-0 mb-3">
          <Col sm="6">
            <h4 className="rp-manage-school-header-title">
              {examData.subjectName}
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
              <Col sm="12">{renderCustomView(localData)}</Col>
            </Row>
          </Col>
        </Row>
      

      <Nav tabs className="nav-justified  examsAndTestTabInside">
        {/* <div className="examInner-nav-bottom-border"></div> */}
        <NavItem>
          <NavLink
            // className={classnames({
            //   active: this.state.active === "1",
            // })}
            // onClick={() => {
            //   this.toggle("1");
            // }}
            className={`teacher-nav-link ${activeTab === "1" ? "active" : ""}`}
            onClick={() => setActiveTab("1")}
          >
            Exam info
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            // className={classnames({
            //   active: this.state.active === "2",
            // })}
            // onClick={() => {
            //   this.toggle("2");
            // }}
            className={`teacher-nav-link ${activeTab === "2" ? "active" : ""}`}
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
                {/* <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus at viverra metus, id imperdiet mi. Etiam mattis
                    augue ac risus molestie laoreet. Duis nulla orci, tincidunt
                    vitae arcu sed, hendrerit convallis lorem.
                  </li> */}
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
                    handleQuestionAdd(examData.subjectName, examData.subject);
                  }}
                >
                  <Plus height="18" width="18" />
                  <span className="tautmore-admin-add-btn">Add Question</span>
                </Button>
              ) : (
                ""
              )}
            </Col>
            <Col sm="6">
              <div className="data-list-header d-flex justify-content-between flex-wrap datalistExamQuestion">
                {/* Search by question title */}
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
              //  forcePage={
              //    props.parsedFilter.page
              //      ? parseInt(props.parsedFilter.page - 1)
              //      : 0
              //  }
              //  onPageChange={(page) => {
              //    handlePagination(page);
              //  }}
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
            loadData={getExamDetails}
            handleSidebar={handleSidebar}
            title={"EDIT"}
          />
          <div
            className={classnames("data-list-overlay", {
              show: sidebar,
            })}
            onClick={() => handleSidebar(false)}
          />
        </div>
      ) : null}
      {/* <ToastContainer draggable={false} /> */}
    </div>
    ) : (
      <Spinner />
    )}
    </div>
  );
};

export default ExamAndTestsDetail;
