import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import * as Icon from "react-feather";
import ApprovalModal from "./teacherDetails/approvalModal";
import {
  getTeacherByIdAction,
  approveTeacherAction,
  declineTeacherAction,
} from "../../../../redux/actions/manage-teacher/index";
import * as teacher_api from "../../../tautmore-components/services/apis/manage-teacher/manage-teacher-api";
import { toast } from "react-toastify";


import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Approval = ({
  match,
  teacher,
  getTeacherById,
  approveTeacher,
  declineTeacher,
  approval,
  denial
}) => {

  const [monthlySalary, setMonthlySalary] = useState("");
  const [incentives, setIncentives] = useState("");
  const [teacherDetails, setTeacherDetails] = useState([{ name: " " }]);

  const history = useHistory();
  useEffect(()=>{
    getTeacherById(match.params.applicationId);
  },[match.params.applicationId])


  useEffect(()=>{
    if (teacher.data) {
          setTeacherDetails(teacher.data);
        }
  },[teacher])
 
  const [openModal, setOpenModal] = useState(false);

  const onApproveClick = () => {
    teacher_api.updateTeacherbyId(match.params.applicationId, {
      salary:monthlySalary,
      incentives,
      active:true
    })
    // const response = teacher_api.approveTeacher(match.params.applicationId);
    // // console.log(response,"On teacher Approve")
    // teacher_api.approveTeacher(match.params.applicationId)
    // .then((response)=>{
    //   if(response?.status === "success"){
    //     toast.success("Successfully added");
    //     console.log(response,"response from approveTeacher>>>")
    //   } 
    // })
    approveTeacher(match.params.applicationId);
    setOpenModal(false);
    toast.success("Added Successfully")
    history.push("/teacher")
  };

  const renderGrades =() => {
    if(!teacherDetails?.grade){
      return null
    }

    return teacherDetails?.grade?.map((item)=>item.name).toString()
  }

//   useEffect(()=>{

//     if(!denial.length){
//         return null
//     }

//     if(denial?.status === 'success'){
//       toast.success("Application denied.")
//     }

// },[denial])


  // console.log(denial,"on Deny response")

  // const startTime = (t) => {
  //   return t.map(ele => {
  //     return ele.toString().slice(0, 8)
  //   })
  // }


  const renderSubjects = () =>{
    if(!teacherDetails?.subject){
      return null
    }

    return teacherDetails?.subject.map((item)=>item.name).toString()
  }

  const onDisApproveClick = () => {
    declineTeacher(match.params.applicationId);
  };

  // const renderDocumentsList = () => {
  //   if(!teacherDetails){
  //     return null
  //   }
  //   if(teacherDetails?.upload?.length > 0){
  //         return teacherDetails?.upload?.map((item)=><div><Icon.FileText size="20" className="mr-2" /> <a href={item.url} target="_blank">{item.name}</a></div> )
  //   }
  //   if(typeof(teacherDetails?.upload) === "string"){
  //     return null
  //   }

  //   return '';
  //   // return teacherDetails?.upload?.map((item)=><div><Icon.FileText size="20" className="mr-2" /> <a href={item.url} target="_blank">{item.name}</a></div> )
  // }

  const [ind, setInd] = React.useState(false)

  const startTime = (t) => {
    return t.map(ele => {
      if (ele.includes("PM")) {
        setInd(true)
      }
      return `${parseInt(ele)} ${ind ? "PM" : "AM"}`
    })
  }

  // const renderTimeSlots = () => {
  //   console.log('teacher detail time slot', teacherDetails?.timeslot);
  //   if (!teacherDetails?.timeslot) {
  //     return null
  //   }
  //   return teacherDetails?.timeslot?.map((data, i, arr) => {

  //     const mon = startTime(data?.monday)
  //     const tue = startTime(data?.tuesday)
  //     const wed = startTime(data?.wednesday)
  //     const thu = startTime(data?.thursday)
  //     const fri = startTime(data?.friday)
  //     const sat = startTime(data?.saturday)

  //     return (
  //       <div className="day-time">
  //         <div className="detail-content ">Mon ({`${mon}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
  //         <div className="detail-content ">Tue ({`${tue}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
  //         <div className="detail-content ">Wed ({`${wed}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
  //         <div className="detail-content ">Thu ({`${thu}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
  //         <div className="detail-content ">Fri ({`${fri}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
  //         <div className="detail-content ">Sat ({`${sat}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
  //       </div>
  //     )
  //   })
  // }


  return (
    <Container fluid className="detail-wrapper">
      <div className="detail-top">
        <Row>
          <Col sm="8" className="teacher-heading">
            <h4>New teacher needs approval</h4>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Col>
        </Row>
      </div>

      <div className="detail-bottom">
        <Row>
          <Col sm="12" md="12" lg="3" xl="3">
            <div className="detail-heading">PERSONAL</div>
          </Col>
        </Row>
        <Row>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Name</p>
            <div className="detail-content">{teacherDetails?.fullName}</div>
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">DOB</p>
            <div className="detail-content">16/04/1980</div>
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Country & State</p>
            <div className="detail-content">
              {teacherDetails?.country?.country_label},{teacherDetails?.state?.state_label}
            </div>
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Email ID</p>
            <div className="detail-content">{teacherDetails?.emailID}</div>
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Phone Number</p>
            <div className="detail-content">{teacherDetails?.phoneNumber}</div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12" lg="3" xl="3">
            <div className="detail-heading">EDUCATION</div>
          </Col>
        </Row>
        <Row>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Qualification</p>
            <div className="detail-content">
              {teacherDetails?.qualification?.qualificationName}
            </div>
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">University</p>
            <div className="detail-content">{teacherDetails?.university?.universityName}</div>
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Education Certificate</p>
            <div className="detail-content view-box">
              {/* {renderDocumentsList()} */}
              {/* <Icon.FileText size="20" className="mr-2" /> View Doc */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12" lg="3" xl="3">
            <div className="detail-heading">APPLIED FOR</div>
          </Col>
        </Row>
        <Row>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Grade</p>
            <div className="detail-content">{renderGrades()}</div>
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Subjects</p>
            {/* <div className="detail-content">
              Grade 4 (Math), Grade 5 (Science, Math)
            </div> */}
            <div className="detail-content">
              {renderSubjects()}
              {/* {teacherDetails?.grade?.name} ({teacherDetails?.subject?.name}),{" "}
              {teacherDetails?.grade?.name} ({teacherDetails?.subject?.name}) */}
            </div>
          </Col>

          
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Timings</p>
          {/* {renderTimeSlots()} */}
            {/* 
            <div className="detail-content ">Mon (9:00AM-4:00PM)</div>
            <div className="detail-content ">Tue (9:00AM-4:00PM)</div>
            <div className="detail-content ">Wed (9:00AM-4:00PM)</div> */}
          </Col>
          <Col sm="6" md="6" lg="4" xl="4" className="my-1">
            <p className="detail-subheading">Past teaching experience</p>
            <div className="detail-content">
              {teacherDetails?.teaching_experience}
            </div>
          </Col>
        </Row>
      </div>
      <div className="mt-4">
        <Row className="d-flex align-items-center justify-content-center">
          <Col sm={12} md={3}></Col>
          <Col
            sm={12}
            md={3}
            className="d-flex align-items-center justify-content-end"
          >
            <Button
              active={false}
              color="primary"
              outline
              size="lg"
              className="btn-decline mx-2 mb-2 w-100"
              onClick={onDisApproveClick}
            >
              DECLINE
            </Button>
          </Col>
          <Col
            sm={12}
            md={3}
            className="d-flex align-items-center justify-content-start"
          >
            <Button
              active={true}
              color="primary"
              outline
              size="lg"
              className="btn-approve mx-2 mb-2 w-100"
              onClick={() => setOpenModal(true)}
            >
              APPROVE
            </Button>
            <ApprovalModal
              open={openModal}
              onclose={(value) => setOpenModal(value)}
              teacherName={teacherDetails?.fullName}
              setMonthlySalary={setMonthlySalary}
              setIncentives={setIncentives}
              onApprove={onApproveClick}
            />
          </Col>
          <Col sm={12} md={3}></Col>
        </Row>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  teacher: state.adminTeacher.selectedTeacher,
  approval: state.adminTeacher.approveTeacher,
  denial: state.adminTeacher.declineTeacher

});

const mapDispatchToProps = (dispatch) => ({
  getTeacherById: (id) => dispatch(getTeacherByIdAction(id)),
  approveTeacher: (id) => dispatch(approveTeacherAction(id)),
  declineTeacher: (id) => dispatch(declineTeacherAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Approval);
