import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import * as Icon from "react-feather";
import { getAllTeacherAction } from "../../../../../redux/actions/manage-teacher/index";
import { connect } from "react-redux";
import './teacherDetails.scss';
import { useEffect } from "react";

const Details = ({
  name,
  email,
  phoneNumber,
  country,
  state,
  salary,
  qualification,
  university,
  grade,
  timings,
  experience,
  subjects,
  upload
}) => {
  // const timeData = timings?.map((item) => ({
  //     monday: item.monday.toString().split(',').map((data) => '' + Number(data.split("-")[0].split(":")[0]) + data.slice(-2)),
  //     tuesday: item.tuesday.toString().split(',').map((data) => '' + Number(data.split("-")[0].split(":")[0]) + data.slice(-2)),
  //     wednesday: item.wednesday.toString().split(',').map((data) => '' + Number(data.split("-")[0].split(":")[0]) + data.slice(-2)),
  //     thursday: item.thursday.toString().split(',').map((data) => '' + Number(data.split("-")[0].split(":")[0]) + data.slice(-2)),
  //     friday: item.friday.toString().split(',').map((data) => '' + Number(data.split("-")[0].split(":")[0]) + data.slice(-2)),
  //     saturday: item.saturday.toString().split(',').map((data) => '' + Number(data.split("-")[0].split(":")[0]) + data.slice(-2)),
  // }));

  const timeData = timings?.map((item) => {
    console.log(item, "timings times data")
    return ({
      monday: item.monday.toString().split(",").map(data => data.replace(' AM', '').replace('0', '').replace(' 0', ' ')),
      tuesday: item.tuesday.toString().split(",").map(data => data.replace(' AM', '').replace('0', '').replace(' 0', ' ')),
      wednesday: item.wednesday.toString().split(",").map(data => data.replace(' AM', '').replace('0', '').replace(' 0', ' ')),
      thursday: item.thursday.toString().split(",").map(data => data.replace(' AM', '').replace('0', '').replace(' 0', ' ')),
      friday: item.friday.toString().split(",").map(data => data.replace(' AM', '').replace('0', '').replace(' 0', ' ')),
      saturday: item.saturday.toString().split(",").map(data => data.replace(' AM', '').replace('0', '').replace(' 0', ' '))    })
    });

  const renderGrades =() => {
    if(!grade){
      return null
    }

    return grade?.map((item)=>item.name).toString()
  }

  const [update,setUpdate] = useState('')

  useEffect(()=>{
    setUpdate('true')

    },[name,
  email,
  phoneNumber,
  country,
  state,
  salary,
  qualification,
  university,
  grade,
  timings,
  experience,
  subjects,
  upload])

  const renderSubjects = () =>{
    if(!subjects){
      return null
    }

    return subjects.map((item)=>item.name).toString()
  }


  const renderDocumentsList = () => {
  

    if(upload.length === 0){
      return <h4>No uploaded Files</h4>
    }

    if(typeof(upload) === 'object'){
      return upload.map((item)=><div><Icon.FileText size="20" className="mr-2" /> <a href={item.url} target="_blank">{item.name}</a></div> )
    }

    if(typeof(upload) === "string"){
      return <h4>No uploaded Files</h4> 
    }

   
    return null
    

    
  }
  
  return (
    <div className="detail-bottom">
      <Row>
        <Col sm="12" md="12" lg="3" xl="3">
          <div className="detail-heading">PERSONAL</div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Name</p>
          <div className="detail-content">{name}</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">DOB</p>
          <div className="detail-content">16/04/1980</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Country & State</p>
          <div className="detail-content">
            {country?.country_label},{state?.state_label}
          </div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Email ID</p>
          <div className="detail-content">{email}</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Phone Number</p>
          <div className="detail-content">{phoneNumber}</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Monthly Salary</p>
          <div className="detail-content">USD {salary?.monthlySalary}</div>
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
          <div className="detail-content">{qualification?.qualificationName}</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">University</p>
          <div className="detail-content">{university?.universityName}</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Education Certificate</p>
          <div className="detail-content view-box">
            {renderDocumentsList()}
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
          <div className="detail-content">
            {renderSubjects()}
            {/* Grade 4 ({subjects?.toString()}), Grade 5 ({subjects?.toString()}) */}
          </div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Timings</p>
          {/* {displayTimeSlots()} */}
          
          {timeData?.map((data, i, arr) => {
            return (
              <div className="day-time mr-3">
                Mon 
                <div className="detail-content ">({`${data?.monday.toString().replaceAll(',', ', ')}`})</div>
                Tue
                <div className="detail-content ">({`${data?.tuesday.toString().replaceAll(',', ', ')}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
                Wed 
                <div className="detail-content ">({`${data?.wednesday.toString().replaceAll(',', ', ')}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
                Thu 
                <div className="detail-content ">({`${data?.thursday.toString().replaceAll(',', ', ')}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
                Fri
                <div className="detail-content ">({`${data?.friday.toString().replaceAll(',', ', ')}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
                Sat
                <div className="detail-content ">({`${data?.saturday.toString().replaceAll(',', ', ')}` + `${!arr.length - 1 === i ? ',' : ''}`})</div>
              </div>
            )
          }
          )
          }
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Past teaching experience</p>
          <div className="detail-content">{experience}</div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  teachers: state.adminTeacher.allTeachers,
  selectedTeacher: state.adminTeacher.selectedTeacher,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTeachers: () => dispatch(getAllTeacherAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
