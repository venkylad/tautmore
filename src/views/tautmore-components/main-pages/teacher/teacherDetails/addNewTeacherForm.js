import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { X } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import { registerTeacher } from "../../../services/apis/manage-teacher/manage-teacher-api";
import "react-toastify/dist/ReactToastify.css";
import ct, { getTimezone } from 'countries-and-timezones';
import Select from "react-select";
import {
  getAllCountriesAction,
  getAllStatesAction,
  getAllUniversitiesAction,
  getAllQualificationsAction,
  getAllTimeSlotsAction,
  getAllGradesAction,
  getAllCocurricularAction,
  getAllTeacherAction,
  verifyEmailTeacherAction,
  sendOtpTeacherAction,
  approveTeacherAction

} from "../../../../../redux/actions/manage-teacher/index";
import { connect } from "react-redux";

import { Row, Col, Button, FormGroup, Label } from "reactstrap";
const AddNewTeacherForm = ({
  show,
  onClose,
  getAllCountries,
  countries,
  allGrades,
  timeSlots,
  getAllGrades,
  qualificationsList,
  getAllQualifications,
  universitiesList,
  getAllUniversities,
  getAllTimeSlots,
  getAllStatesAction,
  statesList,
  coCurricular,
  fetchCoCurricularActivities,
  verifyEmailTeacher,
  sendOtpTeacher,
  verifyEmailTeacherRes,
  sendOtpTeacherRes,
  registerTeacherRes,
  approveTeacher
  
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [university, setUniversity] = useState("");
  const [country, setCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [coCurricularAct, setcoCurricularAct] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const [experience, setExperience] = useState("");
  const [timeMon, setTimeMon] = useState([]);
  const [timeTue, setTimeTue] = useState([]);
  const [timeWed, setTimeWed] = useState([]);
  const [timeThurs, setTimeThurs] = useState([]);
  const [timeFri, setTimeFri] = useState([]);
  const [timeSat, setTimeSat] = useState([]);
  const [monthlySal, setMonthlySalary] = useState("");
  const [yearlySal, setYearlySal] = useState("");
  const [incentives, setIncentives] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    phone: false,
    country: false,
    state: false,
    gradesList: false,
    subjects: false,
    category: false,
    qualificationTeacher: false,
    universityTeacher: false,
    subjectValTeacher: false,
    gradeValTeacher: false,
    cocurricularActivities: false,
    pastExperienceTeacher: false,
    timeSlotMondayTeacher: false,
    timeSlotTuesdayTeacher: false,
    timeSlotWednesdayTeacher: false,
    timeSlotThursdayTeacher: false,
    timeSlotFridayTeacher: false,
    timeSlotSaturdayTeacher: false,
    salary:false
  });


  //Check Validations

  const validationCheck = () => {
    if (name === "") {
      setValidation((prevPerson) => ({ ...prevPerson, name: true }));
    } else {
      setValidation((prevPerson) => ({ ...prevPerson, name: false }));
    }
    if (coCurricularAct.length === 0) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        cocurricularActivities: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        cocurricularActivities: false,
      }));
    }
    if (emailRegex.test(email)) {
      setValidation((prevPerson) => ({ ...prevPerson, email: false }));
    } else {
      setValidation((prevPerson) => ({ ...prevPerson, email: true }));
    }
    if (phone === "" || phone.length < 10) {
      setValidation((prevPerson) => ({ ...prevPerson, phone: true }));
    } else {
      setValidation((prevPerson) => ({ ...prevPerson, phone: false }));
    }
    if (qualification === "") {
      setValidation((prevPerson) => ({
        ...prevPerson,
        qualificationTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        qualificationTeacher: false,
      }));
    }
    if (university === "") {
      setValidation((prevPerson) => ({
        ...prevPerson,
        universityTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        universityTeacher: false,
      }));
    }
    if (country === "") {
      setValidation((prevPerson) => ({ ...prevPerson, country: true }));
    } else {
      setValidation((prevPerson) => ({ ...prevPerson, country: false }));
    }
    if (selectedState === "") {
      setValidation((prevPerson) => ({ ...prevPerson, state: true }));
    } else {
      setValidation((prevPerson) => ({ ...prevPerson, state: false }));
    }
    if (gradesList.length === 0) {
      setValidation((prevPerson) => ({ ...prevPerson, gradeValTeacher: true }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        gradeValTeacher: false,
      }));
    }
    if (formSubjects.length === 0) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        subjectValTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        subjectValTeacher: false,
      }));
    }
    if (experience === "") {
      setValidation((prevPerson) => ({
        ...prevPerson,
        pastExperienceTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        pastExperienceTeacher: false,
      }));
    }
    if (timeMon.length < 1) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotMondayTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotMondayTeacher: false,
      }));
    }
    if (timeTue.length < 1) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotTuesdayTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotTuesdayTeacher: false,
      }));
    }

    if (timeWed.length < 1) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotWednesdayTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotWednesdayTeacher: false,
      }));
    }
    if (timeThurs.length < 1) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotThursdayTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotThursdayTeacher: false,
      }));
    }
    if (timeFri.length < 1) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotFridayTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotFridayTeacher: false,
      }));
    }
    if (timeSat.length < 1) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotSaturdayTeacher: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        timeSlotSaturdayTeacher: false,
      }));
    }

    if (monthlySal === "" && yearlySal === "" ) {
      setValidation((prevPerson) => ({
        ...prevPerson,
        salary: true,
      }));
    } else {
      setValidation((prevPerson) => ({
        ...prevPerson,
        salary: false,
      }));
    }
    // if (yearlySal === "") {
    //   setValidation((prevPerson) => ({
    //     ...prevPerson,
    //     yearlySal: true,
    //   }));
    // } else {
    //   setValidation((prevPerson) => ({
    //     ...prevPerson,
    //     yearlySal: false,
    //   }));
    // }
  };

  const [loading,setLoading] = useState('false')




  const OnAddTeacherClick = () => {
    setLoading('true')
    validationCheck();
    if (validation.name === false) {

      registerTeacher(formData).then((res)=>{
        if (res.data.status === "success"){
          toast.success("Teacher successfully Registered");
          setLoading('Success')
          onClose()


        }
      }).catch((err)=>{
        if(err.response.data.details.keyPattern.hasOwnProperty('emailID')){
          toast.error("Please try another email");
          setLoading('Error');

        }})
    }

  };

  const [countryList, setCountryList] = useState([{ value: 1, label: "" }]);

  useEffect(() => {
    if (!countries?.data) {
      getAllCountries();
    }
    if (countries?.data?.length > 0) {
      const cdata = countries?.data.map((data) => ({
        id:data._id,
        value: data.country_label,
        label: data.country_label,
        code: data.country_code,
      }));
      setCountryList(cdata);
    }
  }, [countries, getAllCountries]);


  const [subjectOptions1, setSubjectOption1] = useState([  
    { value: 1, label: "" },
  ]);

  const [subjectOptions2, setSubjectOption2] = useState([  
    { value: 1, label: "" },
  ]);

  const [states, setStates] = useState([{ value: 1, label: "" }]);

  useEffect(() => {
    if (!statesList?.data) {
      getAllStatesAction(country.code);
    }
    if (statesList?.data?.length > 0) {
      const cdata = statesList?.data.map((data) => ({
        id:data._id,
        value: data.state_label,
        label: data.state_label,
        state_code: data.state_code,
      }));
      setStates(cdata);
    }
  }, [statesList, country, getAllStatesAction]);      



  const [coActivityValue, setcoActivityValue] = useState([
    { value: 1, label: "" },
  ]);

  useEffect(() => {
    if (!coCurricular?.data) {
      fetchCoCurricularActivities();
    }
    if (coCurricular?.data?.length > 0) {
      const cdata = coCurricular?.data.map((data) => ({
        id:data._id,
        value: data.activityName,
        label: data.activityName,
      }));
      setcoActivityValue(cdata);
    }
  }, [coCurricular, fetchCoCurricularActivities]);

  const [gradeValue, setGradeValue] = useState({ value: 1, label: "" });

  useEffect(() => {
    if (!allGrades?.data) {
      getAllGrades();
    }
    if (allGrades?.data?.length > 0) {
      const gdata = allGrades?.data.map((data) => ({
        value: data._id,
        label: "Grade " + data.name,
      }));
      setGradeValue(gdata);
    }
  }, [allGrades, getAllGrades]);

  const [qualification1, setQualification1] = useState([
    { value: 1, label: "" },
  ]);

  useEffect(() => {
    if (!qualificationsList?.data) {
      getAllQualifications();
      
    }
    if (qualificationsList?.data?.length > 0) {
      const cdata = qualificationsList?.data.map((data) => ({
        id:data._id,
        value: data.qualificationName,
        label: data.qualificationName,
      }));
      setQualification1(cdata);
    }
  }, [getAllQualifications, qualificationsList]);

  const [universities, setUniversities] = useState([{ value: 1, label: "" }]);

  useEffect(() => {
    if (!universitiesList?.data) {
      getAllUniversities();
    }
    if (universitiesList?.data?.length > 0) {
      const cdata = universitiesList?.data.map((data) => ({
        id:data._id,
        value: data.universityName,
        label: data.universityName,
      }));
      setUniversities(cdata);
    }
  }, [getAllUniversities, universitiesList]);

  const [timeslots, setTimeslots] = useState({ value: 1, label: "" });

  useEffect(() => {
    if (!timeSlots?.data) {
      getAllTimeSlots();
    }
    if (timeSlots?.data?.length > 0) {
      const gdata = timeSlots?.data.map((data) => ({
        value: data.value,
        label: data.value,
      }));
      setTimeslots(gdata);
    }
  }, [getAllTimeSlots, timeSlots]);

  const labelsOnly = (array) => {
    if (array) {
      const labels = array?.map((item) => item.value);
      return labels.toString();
    }
  };

  const timeSlotMonday = labelsOnly(timeMon);
  const timeSlotTuesday = labelsOnly(timeTue);
  const timeSlotWednesday = labelsOnly(timeWed);
  const timeSlotThursday = labelsOnly(timeThurs);
  const timeSlotFriday = labelsOnly(timeFri);
  const timeSlotSaturday = labelsOnly(timeSat);

  const onEmailChange = (email) => {

    setEmail(email)

    if(emailRegex.test(email)){
      verifyEmailTeacher(email)
    }

  }

  const onPhoneChange = (val) => {
    setPhone(val);

    if(phone.length > 9){
      const data = {
        phoneNumber: val,
    };
    sendOtpTeacher(data);
    }

  }


  const handleGrade = (e) => {
    setGradesList(e);
  };

  const [gradeOneName,setGradeOneName] = useState('')

  useEffect(()=>{

    if(gradesList[0]){
      setGradeOneName(gradesList[0].label)

      fetch(
        'https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/subjects-by-class',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ classId: gradesList[0].value }),
        },
    )
    .then((response) =>  response.json())
    .then((data) => {
        const cdata = data?.data?.map((item) => ({
            value: item._id,
            label: item.name,
        }));
        setSubjectOption1(cdata);
    })
     
    }

  },[gradesList])

  const [showSubjects2,setShowsubjects2] = useState(false)
  const [gradeTwoName,setGradeTwoName] = useState('')

  useEffect(()=>{

    if(gradesList[1]){
      setShowsubjects2(true)
      setGradeTwoName(gradesList[1].label)
      fetch(
        'https://lbbhqlqib3.execute-api.us-east-1.amazonaws.com/development/api/syllabus/subjects-by-class',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ classId: gradesList[1].value }),
        },
    )
    .then((response) =>  response.json())
    .then((data) => {

        const cdata = data?.data?.map((item) => ({
            value: item._id,
            label: item.name,
        }));
        setSubjectOption2(cdata);
    })
    }

  },[gradesList])

  const getIdOnly = (obj) => {
    return obj.forEach((item) => item.value);
  };

  const cocurricularActivitiesList = getIdOnly(coCurricularAct);

  const getGrades = () => {
    if(gradesList[1]){
      return [gradesList[0]?.value,gradesList[1]?.value]
    }
    return [gradesList[0]?.value]
  }

  const [formSubjects,setFormSubjects] = useState([])

  const [selectedTimeZone, setSelectedTimeZone] = useState('');
  const [timeZoneList, setTimeZoneList] = useState([]);

  useEffect(() => {
    const ZoneList = ct.getTimezonesForCountry(country?.code);
    if (ZoneList?.length > 0) {
        const cdata = ZoneList.map((item) => ({
            label: item?.name,
            value: item?.name,
            key: item?.name,
        }));

        setTimeZoneList(cdata);
    }
}, [country?.code]);

console.log(selectedTimeZone, "Seleced Time Zone")


  const getTimezone = (value) => {
    if(value === 'Asia/Kolkata'){
      return "Asia/Calcutta"
    }
  }


  const formData = {
    country: country.id,
    state: selectedState.id,                            
    fullName: name,
    emailID: email,            
    phoneNumber: phone,
    qualification: qualification,
    university: university,
    upload: {url:"xyz",name:"No files"},
    grade: getGrades(),
    subject: formSubjects,
    co_curricular: cocurricularActivitiesList,
    incentives: incentives,
    timezone: getTimezone(selectedTimeZone.value),
    salary: monthlySal || yearlySal,
    teaching_experience: experience,
    timeslot: {
      monday: [timeSlotMonday],
      tuesday: [timeSlotTuesday],
      wednesday: [timeSlotWednesday],
      thursday: [timeSlotThursday],
      friday: [timeSlotFriday],
      saturday: [timeSlotSaturday],
    },
  };

  console.log(formData, "Form Data");



  return (
    <div
      className={classNames("teacher-form-wrapper data-list-sidebar", {
        show: show,
      })}
    >
      <ToastContainer draggable={false} />
      <Row className="teacher-form">
        <Col sm="12" md="12" lg="12" xl="12" className="teacherform-heading">
          <div className="d-flex justify-content-between align-items-center atfHeading">
            <div>Add new teacher</div>
            <div onClick={onClose}>
              <X size="20" />
            </div>
          </div>
        </Col>
        <Col sm="12" md="12" lg="12" xl="12" className="teacherform-body">
          <Row>
            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Teachername"
                >
                  Name*
                </Label>

                <input
                  name="Teachername"
                  type="text"
                  className="form-control tautmore-input-style"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              {validation.name && (
                <span className="error-msg">Name is required.</span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <Row>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="Country"
                    >
                      Country*
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      // defaultValue={role[0]}
                      name="Country"
                      // value={values.role}
                      onChange={(e) => {
                        setCountry(e);
                      }}
                      options={countryList}
                    />
                  </FormGroup>
                  {validation.country && (
                    <span className="error-msg">Country is required.</span>
                  )}
                </Col>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="State"
                    >
                      State*
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      // defaultValue={role[0]}
                      name="State"
                      // value={values.role}
                      onChange={(e) => {
                        setSelectedState(e);
                      }}
                      options={states}
                    />
                  </FormGroup>
                  {validation.state && (
                    <span className="error-msg">State is required.</span>
                  )}
                </Col>
              </Row>
            </Col>


            <Col sm="12" md="12" lg="12" xl="12">
              <Row>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="Timezone"
                    >
                      Time zone*
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      // defaultValue={role[0]}
                      name="Timezone"
                      // value={values.role}
                      onChange={(e) => {
                        setSelectedTimeZone(e);
                      }}
                      options={timeZoneList}
                    />
                  </FormGroup>
                  {validation.country && (
                    <span className="error-msg">Country is required.</span>
                  )}
                </Col>
                <Col sm="6" md="6" lg="6" xl="6">
                  {/* <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="State"
                    >
                      State*
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      // defaultValue={role[0]}
                      name="State"
                      // value={values.role}
                      onChange={(e) => {
                        setSelectedState(e);
                      }}
                      options={states}
                    />
                  </FormGroup> */}
               
                </Col>
              </Row>
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <Row>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="Qualification"
                    >
                      Qualification*
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      // defaultValue={role[0]}
                      name="Qualification"
                      // value={values.role}
                      onChange={(e) => {
                        setQualification(e.id);
                      }}
                      options={qualification1}
                    />
                  </FormGroup>
                  {validation.qualificationTeacher && (
                    <span className="error-msg">
                      Qualification is required.
                    </span>
                  )}
                </Col>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="University"
                    >
                      University*
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      // defaultValue={role[0]}
                      name="University"
                      // value={values.role}
                      onChange={(e) => {
                        setUniversity(e.id);
                      }}
                      options={universities}
                    />
                  </FormGroup>
                  {validation.universityTeacher && (
                    <span className="error-msg">University is required.</span>
                  )}
                </Col>
              </Row>
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <Row>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="EmailID"
                    >
                      Email ID*
                    </Label>
                    <input
                      type="EmailID"
                      name="DateofJoining"
                      className="form-control tautmore-input-style"
                      onChange={(e) => onEmailChange(e.target.value)}
                    />
                  </FormGroup>
                  {validation.email && (
                    <span className="error-msg">Email is required.</span>
                  )}

{verifyEmailTeacherRes?.data === 'userExist' && (
                    <span className="error-msg">Email not available.</span>
                  )}

{verifyEmailTeacherRes?.statusCode === '410' && (
                    <span className="error-msg">Email not available.</span>
                  )}
                </Col>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="PhoneNumber"
                    >
                      Phone Number*
                    </Label>
                    <input
                      type="tel"
                      name="PhoneNumber"
                      className="form-control tautmore-input-style"
                      onChange={(e) => onPhoneChange(e.target.value)}
                    />
                  </FormGroup>
                  {validation.phone && (
                    <span className="error-msg">Phone is required.</span>
                  )}

                  

                  
                </Col>
              </Row>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Teacherfor(Grades)"
                >
                  Teacher for (Grades)*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    name="Teacherfor(Grades)"
                    onChange={(e) => {
                      handleGrade(e);
                    }}
                    options={gradeValue}
                  />
                </div>
              </FormGroup>
              {validation.gradeValTeacher && (
                <span className="error-msg">Grades are required.</span>
              )}
            </Col>
            <Col sm="12" md="12" lg="12" xl="12">
            <FormGroup>
              
                                   
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="Subjects"
                  >
               {`Please select subjects for ${gradeOneName} grade`} 
                  </Label>
                  <div className="custom-multi-select">
                    <Select
                      isMulti
                      className="React tautmore-admin-selectbox, basic-multi-select"
                      classNamePrefix="select"
                      name="Subjects"
                      onChange={(e) => {
                        // setSubjects([...subjects, e]);
                        setFormSubjects([...formSubjects,e[0].value])
                      }}
                      options={subjectOptions1}
                    />
                  </div>
                  

              
                
              
                  {validation.subjectValTeacher && (
                <span className="error-msg">Subjects are required.</span>
              )}
                
              </FormGroup>


              { showSubjects2 && 
              
              <FormGroup>
              
                                   
              <Label
                className="rp-manage-school-input-title"
                htmlFor="Subjects"
              >
               {`Please select subjects for ${gradeTwoName} grade*`} 
              </Label>
              <div className="custom-multi-select">
                <Select
                  isMulti
                  className="React tautmore-admin-selectbox, basic-multi-select"
                  classNamePrefix="select"
                  name="Subjects"
                  onChange={(e) => {
                    // setSubjects([...subjects, e]);
                    setFormSubjects([...formSubjects,e[0].value])

                  }}
                  options={subjectOptions2}
                />
              </div>
              {validation.subjectValTeacher && (
            <span className="error-msg">Subjects are required.</span>
          )}
            
          </FormGroup>}
              {/* <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Subjects"
                >
                  Subjects*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Subjects"
                    // value={values.role}
                    onChange={(e) => {
                      setSubjects(e);
                    }}
                    options={subjectOptions}
                  />
                </div>
              </FormGroup> */}
              {/* {validation.subjectValTeacher && (
                <span className="error-msg">Subjects are required.</span>
              )} */}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Subjects"
                >
                  Co-Curricular Activities*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    name="CoCurricular"
                    onChange={(e) => {
                      setcoCurricularAct(e);
                    }}
                    options={coActivityValue}
                  />
                </div>
              </FormGroup>
              {validation.cocurricularActivities && (
                <span className="error-msg">
                  Cocurricular activities are required.
                </span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <Row>
                <Col sm="12" md="12" lg="12" xl="12">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="Experience"
                    >
                      Experience*
                    </Label>

                    <input
                      type="radio"
                      name="DateofJoining"
                      style={{
                        height: 10,
                        margin: "0px 10px 0px 20px",
                      }}
                      onChange={() => setExperience("Yes")}
                    />

                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="Experience"
                    >
                      Yes
                    </Label>

                    <input
                      type="radio"
                      name="DateofJoining"
                      style={{
                        height: 10,
                        margin: "0px 10px 0px 20px",
                      }}
                      onChange={() => setExperience("No")}
                    />

                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="Experience"
                    >
                      No
                    </Label>
                  </FormGroup>
                  {validation.pastExperienceTeacher && (
                    <span className="error-msg">
                      Past experience is required.
                    </span>
                  )}
                </Col>
              </Row>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Timings"
                >
                  Timings (Monday)*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Timings"
                    // value={timeslots.value}
                    onChange={(e) => setTimeMon(e)}
                    options={timeslots}
                  />
                </div>
              </FormGroup>
              {validation.timeSlotMondayTeacher && (
                <span className="error-msg">Select atleat five timeslots.</span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Timings"
                >
                  Timings (Tuesday)*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Timings"
                    // value={values.role}
                    onChange={(e) => {
                      setTimeTue(e);
                    }}
                    options={timeslots}
                  />
                </div>
              </FormGroup>
              {validation.timeSlotTuesdayTeacher && (
                <span className="error-msg">Select atleat five timeslots.</span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Timings"
                >
                  Timings (Wednesday)*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Timings"
                    // value={values.role}
                    onChange={(e) => {
                      setTimeWed(e);
                    }}
                    options={timeslots}
                  />
                </div>
              </FormGroup>
              {validation.timeSlotWednesdayTeacher && (
                <span className="error-msg">Select atleat five timeslots.</span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Timings"
                >
                  Timings (Thursday)*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Timings"
                    // value={values.role}
                    onChange={(e) => {
                      setTimeThurs(e);
                    }}
                    options={timeslots}
                  />
                </div>
              </FormGroup>
              {validation.timeSlotThursdayTeacher && (
                <span className="error-msg">Select atleat five timeslots.</span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Timings"
                >
                  Timings (Friday)*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Timings"
                    // value={values.role}
                    onChange={(e) => {
                      setTimeFri(e);
                    }}
                    options={timeslots}
                  />
                </div>
              </FormGroup>
              {validation.timeSlotFridayTeacher && (
                <span className="error-msg">Select atleat five timeslots.</span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <FormGroup>
                <Label
                  className="rp-manage-school-input-title"
                  htmlFor="Timings"
                >
                  Timings (Saturday)*
                </Label>
                <div className="custom-multi-select">
                  <Select
                    isMulti
                    className="React tautmore-admin-selectbox, basic-multi-select"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Timings"
                    // value={values.role}
                    onChange={(e) => {
                      setTimeSat(e);
                    }}
                    options={timeslots}
                  />
                </div>
              </FormGroup>
              {validation.timeSlotSaturdayTeacher && (
                <span className="error-msg">Select atleat five timeslots.</span>
              )}
            </Col>

            <Col sm="12" md="12" lg="12" xl="12">
              <Row>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="MonthlySalary"
                    >
                      Monthly Salary*
                    </Label>
                    <input
                      type="number"
                      name="MonthlySalary"
                      className="form-control tautmore-input-style"
                      onChange={(e) => setMonthlySalary(e.target.value)}
                    />
                  </FormGroup>
                  {/* {validation.monthlySal && (
                    <span className="error-msg">
                      Monthly salary is required.
                    </span>
                  )} */}
                </Col>
                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="YearlySalary"
                    >
                      Yearly Salary*
                    </Label>
                    <input
                      type="number"
                      name="YearlySalary"
                      className="form-control tautmore-input-style"
                      onChange={(e) => setYearlySal(e.target.value)}
                    />
                  </FormGroup>
               
                </Col>


                {validation.salary && (
                    <span className="error-msg">
                      Please provide monthly or yearly .
                    </span>
                  )} 

                <Col sm="6" md="6" lg="6" xl="6">
                  <FormGroup>
                    <Label
                      className="rp-manage-school-input-title"
                      htmlFor="Incentives"
                    >
                      Incentives (%)
                    </Label>
                    <input
                      type="number"
                      name="YearlySalary"
                      className="form-control tautmore-input-style"
                      onChange={(e) => setIncentives(e.target.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col
          sm="12"
          md="12"
          lg="12"
          xl="12"
          className="mt-2 teacherform-buttons d-flex justify-content-around align-items-center"
        >
          <div className="mr-3">
            <Button
              color="primary"
              className="teach-addteach-btn"
              onClick={() => OnAddTeacherClick()}
            >
              { loading === 'true' ? "Registering" : ""}
              { loading === 'false' ? "Add Teacher" : ""}
              { loading === "Success" ? "Success" : ""}
              { loading === "Error" ? "Add Teacher" : ""}

            </Button>
          </div>
          <div>
            <Button
              color="black"
              className="teacher-cancel-btn"
              outline
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  countries: state.adminTeacher.countries,
  allGrades: state.adminTeacher.grades,
  timeSlots: state.adminTeacher.timeSlots,
  qualificationsList: state.adminTeacher.qualifications,
  universitiesList: state.adminTeacher.universities,
  statesList: state.adminTeacher.states,
  coCurricular: state.adminTeacher.cocurricular,
  teachers: state.adminTeacher.allTeachers,
  verifyEmailTeacherRes: state.adminTeacher.verifyEmailTeacher,
  sendOtpTeacherRes: state.adminTeacher.sendOtpTeacher,
  registerTeacherRes : state.adminTeacher.registerTeacher

});

const mapDispatchToProps = (dispatch) => ({
  getAllCountries: () => dispatch(getAllCountriesAction()),
  getAllGrades: () => dispatch(getAllGradesAction()),
  getAllQualifications: () => dispatch(getAllQualificationsAction()),
  getAllUniversities: () => dispatch(getAllUniversitiesAction()),
  getAllTimeSlots: () => dispatch(getAllTimeSlotsAction()),
  getAllStatesAction: (code) => dispatch(getAllStatesAction(code)),
  fetchCoCurricularActivities: () => dispatch(getAllCocurricularAction()),
  getAllTeachers: () => dispatch(getAllTeacherAction()),
  verifyEmailTeacher : (data) => dispatch(verifyEmailTeacherAction(data)),
  sendOtpTeacher : (data) => dispatch(sendOtpTeacherAction(data)),
  approveTeacher : (data) => dispatch(approveTeacherAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTeacherForm);
