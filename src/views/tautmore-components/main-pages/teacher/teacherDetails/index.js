import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import Classes from "./classes";
import Details from "./details";
import Leaves from "./leaves";
import SalaryDetails from "./salaryDetails";
import "../teacher-style.scss";
import HardDeleteModal from "./HardDeleteModal";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";



import { connect } from "react-redux";
import {
  getTeacherByIdAction,
  deleteTeacherByIdAction,

} from "../../../../../redux/actions/manage-teacher/index";
import Spinner from "../../../../../components/@vuexy/spinner/Loading-spinner";

const TeacherDetails = ({
  match,
  teacher,
  getTeacherById,
  deleteTeacherById,
  deletedTeacherRes
}) => {
  const [openModal, setOpenModal] = useState(false);


  const [teacherDetails, setTeacherDetails] = useState([{ name: " " }]);

  useEffect(()=>{
    getTeacherById(match.params.teacherId);
  },[match.params.teacherId])

  useEffect(()=>{

  

    if(deletedTeacherRes.data === 'Teacher Removed Sucessfully'){
      toast.success("Deleted Successfully")
    }
  },[deletedTeacherRes])

  console.log(deletedTeacherRes, "Delete Teacher Response")

  useEffect(()=>{
    if (teacher.data) {
          setTeacherDetails(teacher.data);
        }
  },[teacher])

  const deleteTeacherHandler = () => {
    setOpenModal(true);
    // deleteTeacherById(match.params.teacherId);
  };

  const history = useHistory();


  const confirmDelete = () => {
        deleteTeacherById(match.params.teacherId);
        history.push("/teacher");
  }

  const [activeTab, setActiveTab] = useState("1");

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8" className="teacher-heading">
          <h4 className="d-flex">
            Teacher Details
            <div className="status teacher-details-status">
              <div className={`status-indicator `}></div>
              <span>Available</span>
            </div>
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
          <p className="teacher-salary-details">Salary due in 5 days</p>
        </Col>
        <Col
          sm="4"
          className="teacher-total d-flex align-items-center justify-content-center"
        >
          <div className="total-count d-flex flex-column">
            <Button
              color="secondary"
              outline
              onClick={deleteTeacherHandler}
              className="new-teacher-btn list-button d-flex align-items-center justify-content-center"
            >
              Remove
            </Button>
          </div>
        </Col>
      </Row>
      <Nav tabs className="teacher-navs mt-2">
        <div className="teacher-nav-bottom-border"></div>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "1" ? "active" : ""}`}
            onClick={() => setActiveTab("1")}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "2" ? "active" : ""}`}
            onClick={() => setActiveTab("2")}
          >
            Classes
          </NavLink>
        </NavItem>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "3" ? "active" : ""}`}
            onClick={() => setActiveTab("3")}
          >
            Salary History
          </NavLink>
        </NavItem>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "4" ? "active" : ""}`}
            onClick={() => setActiveTab("4")}
          >
            Leave History
          </NavLink>
        </NavItem>
      </Nav>
      { teacher?.data ?
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Details
            name={teacherDetails?.fullName}
            email={teacherDetails?.emailID}
            phoneNumber={teacherDetails?.phoneNumber}
            country={teacherDetails?.country}
            state={teacherDetails?.state}
            salary={teacherDetails?.salary}
            qualification={teacherDetails?.qualification}
            university={teacherDetails?.university}
            grade={teacherDetails?.grade}
            timings={teacherDetails?.timeslot}
            experience={teacherDetails?.teaching_experience}
            subjects={teacherDetails?.subject}
            upload={teacherDetails?.upload ? teacherDetails?.upload : [] }
          />
        </TabPane>
        <TabPane tabId="2">
          <Classes
            subjects={teacherDetails?.subject}
            timings={teacherDetails?.timeslot}
            grade={teacherDetails?.grade}
          />
        </TabPane>
        <TabPane tabId="3" className="salary-table">
          <SalaryDetails />
          <HardDeleteModal
              open={openModal}
              onclose={(value) => setOpenModal(value)}
              teacherName={teacherDetails?.fullName}
              deleteTeacher={confirmDelete}
              // setMonthlySalary={setMonthlySalary}
              // setIncentives={setIncentives}
              // onApprove={onApproveClick}
            />
        </TabPane>
        <TabPane tabId="4">
          <Leaves
            id={match.params.teacherId}
          />
        </TabPane>
      </TabContent> : <Spinner />
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  teacher: state.adminTeacher.selectedTeacher,
  deletedTeacherRes : state.adminTeacher.deletedTeacher
});

const mapDispatchToProps = (dispatch) => ({
  getTeacherById: (id) => dispatch(getTeacherByIdAction(id)),
  deleteTeacherById: (id) => dispatch(deleteTeacherByIdAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetails);
