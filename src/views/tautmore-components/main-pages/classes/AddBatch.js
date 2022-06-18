import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import React, {useState, useEffect, useRef} from "react";
import { Card, CardBody, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { formscheme_add_batch } from "../../utility/schema/Fields_Schema";
import Select from "react-select";
import './classes.scss';
import {getAllClass, getAllSubject} from '../../services/apis/tautmore_exams_apis/tautmore_exams_apis';
import { history } from "../../../../history";
import { allTeachers, timezoneList } from "../../../../redux/actions/online-class/Index";
import * as question_api from "../../services/apis/manage-class-board-subject/manage-api";
import ListView from "./StudentsBatch/ListView";

const AddBatch = ({allTeachers, getAllTeacher, timezoneList, getTimezoneList}) => {
    const [formikData,setFormikData] = useState([
      {
        batchname: "",
        boardname: "",
        grade: "",
        subject: "",
        teacher: "",
        timezone: "",
      }
    ]);
    const [studentList,setStudentList] = useState(false);
    const [grade,setGrade] = useState([]);
    const [subject, setSubject] = useState([]);
    const [selectedTimeZone,setSelectedTimeZone] = useState('')
    console.log(selectedTimeZone,"selectedTimeZone");
    const [boardOption, setBoardOption] = useState([
      {id: '', value: '', label: ''}
    ]);
    const [teacherOption, setTeacherOption] = useState([
      {id: '', value: '', label: ''}
    ]);
    const [timezonOption, setTimezonOption] = useState([
      {value: '', label: ''}
    ]);
    const [selectedGrade,setSelectedGrade] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    useEffect(() => {
      question_api
        .getAllBoard()
        .then((response) => {
          const boardData = response?.data?.boards.map((data) => ({
            id: data?._id,
            value: data?.name,
            label: data?.name,
          }));
          setBoardOption(boardData);
        })
        .catch((err) => {
        })
    }, []);
      useEffect(()=>{
        getAllClassList();
        timezoneList();
      },[]);

      // useEffect(()=>{
      //   if(selectedGrade !== '' && selectedSubject !== '' && selectedTimeZone !== '' ) {
      //     const data = {
      //       grade: selectedGrade,
      //       subject: selectedSubject,
      //       timezone: selectedTimeZone
      //     };
         
      //     allTeachers(data);
      //   }
      // },[selectedGrade, selectedSubject]);

      const onTimeZoneSelect = (e) => {
        console.log(selectedTimeZone,"From function")
       
                            allTeachers({
                              grade: selectedGrade,
                              subject: selectedSubject,
                              timezone: e.value
                            });

      }

      useEffect(()=>{
        if(getAllTeacher?.data){
          const teacherData = getAllTeacher?.data?.map((data) => ({
            id: data?._id,
            value: data?.fullName,
            label: data?.fullName,
          }));
          setTeacherOption(teacherData);
        };
      },[getAllTeacher]);

      useEffect(()=>{
        if(getTimezoneList?.data){
          const teacherData = getTimezoneList?.data?.map((data) => ({
            value: data,
            label: data,
          }));
          setTimezonOption(teacherData);
        };
      },[getTimezoneList]);

      const getAllClassList = async () =>{
        try{
          const res = await getAllClass();
        if(res.status === 200){
          let temp = res.data && res.data.data;
          let updatedArray = [];
          temp.map((item)=>{
            let obj = {
              value : item.name,
              label : item.name,
              id : item._id
            }
            updatedArray.push(obj)
          });
          setGrade(updatedArray)
        }
        }catch(error){
          console.log(error)
        }
        
      }

      const getAllSubjectList = async (e) =>{
        try{
          const res = await getAllSubject({classId:e.id})
          let temp = res.data && res.data.data;
          let updatedArray = [];
          temp.map((item)=>{
            let obj = {
              value : item.name,
              label : item.name,
              id : item._id
            }
            updatedArray.push(obj);
          })
          setSubject(updatedArray);
        }
        catch(error){
          console.log(error);
        }
    
      }

      const handleSubject = (e) => {
        getAllSubjectList(e)
    }

      
  const handleSubmit = (data) => {
    setFormikData(data);
    setStudentList(true);
    //history.push('/students-batch')
  };

  // const nextBatch = (data) => {
  //   console.log(data, 'data next batch');
  //   setFormikData(data);
  //   setStudentList(true);
  // };

  console.log(selectedSubject, selectedGrade, "Selected Subjects and grades" )

  return (
    <div>
      {!studentList ?(
      <>
      <h4 className="rp-manage-school-header-title">Add Batch</h4>
      <Card>
        <CardBody>
          <Formik
            enableReinitialize
            initialValues={{
              batchname: formikData?.batchname,
              boardname: formikData?.boardname,
              grade: formikData?.grade,
              subject: formikData?.subject,
              teacher: formikData?.teacher,
              timezone: formikData?.timezone,
            }}
            validationSchema={formscheme_add_batch}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({
              errors,
              touched,
              handleChange,
              values,
              setFieldValue,
              handleSubmit,
            }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label
                          for="data-name"
                          className="rp-manage-school-input-title"
                        >
                          Batch Name
                        </Label>
                        <Field
                          type="text"
                          className={`form-control tautmore-input-style ${
                            errors.batchname &&
                            touched.batchname &&
                            "is-invalid"
                          }`}
                          name="batchname"
                          value={values.batchname}
                          placeholder="Batch Name"
                          onChange={handleChange}
                          id="data-name"
                        />
                        {errors.batchname && touched.batchname ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.batchname}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Grade
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        defaultValue={grade[0]}
                        name="grade"
                        value={values.grade}
                        onChange={(e) => {
                          setFieldValue("grade", e);
                          setFieldValue("subject", "")
                          handleSubject(e);
                          setSelectedGrade(e.id);
                        }}
                        options={grade}
                      />
                      {errors.grade && touched.grade ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.grade}
                        </div>
                      ) : null}
                    </FormGroup>

                      {/* Paste below here */}

                      <FormGroup >
                        <Label
                          for="data-category"
                          className="rp-manage-school-input-title"
                        >
                          Timezone
                        </Label>

                        <Select
                          className="React tautmore-admin-selectbox"
                          classNamePrefix="select"
                          name="timezone"
                          options={timezonOption}
                          value={values.timezone}
                        //   isMulti
                          onChange={(e)=>{
                            setFieldValue("timezone", e)
                            onTimeZoneSelect(e)

                          }}
                        />
                        {errors.timezone && touched.timezone ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.timezone}
                        </div>
                      ) : null}
                      </FormGroup>


                    
                    </Col>

                    <Col sm="6">
                    <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Select Board
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        defaultValue={boardOption[0]}
                        name="boardname"
                        value={values.boardname}
                        onChange={(e) => {
                          setFieldValue("boardname", e);
                        }}
                        options={boardOption}
                      />
                      {errors.boardname && touched.boardname ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.boardname}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup >
                        <Label
                          for="data-category"
                          className="rp-manage-school-input-title"
                        >
                          Subjects
                        </Label>

                        <Select
                          className="React tautmore-admin-selectbox"
                          classNamePrefix="select"
                          name="subject"
                          options={subject}
                          value={values.subject}
                        //   isMulti
                          onChange={(e) => {
                            setFieldValue("subject", e);
                            setSelectedSubject(e.id);
                          }}
                        />
                        {errors.subject && touched.subject ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.subject}
                        </div>
                      ) : null}
                      </FormGroup>

                      {/* Paste below here */}

                      <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Select Teacher
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        defaultValue={teacherOption[0]}
                        name="teacher"
                        value={values.teacher}
                        onChange={(e) => {
                          setFieldValue("teacher", e);
                        }}
                        options={teacherOption}
                      />
                      {errors.teacher && touched.teacher ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.teacher}
                        </div>
                      ) : null}
                    </FormGroup>

                 

                    </Col>
                  </Row>
                  <div className="data-list-sidebar-footer px-2 d-flex justify-content-center align-items-center mt-1">
                    <Button
                      type="submit"
                      //onClick={() => nextBatch(values)}
                      //   color="dark"
                      className="tautmore-manage-school_submit"
                      // disabled={loader}
                    >
                      Next
                    </Button>
                     <Button
                      className="ml-1 rp-manage-school_cancel"
                      color="dark"
                      outline
                      onClick={()=>history.push('/classes')}
                    >
                      Cancel
                    </Button> 
                  </div>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
      </>):(
        <ListView 
          setStudentList={setStudentList} 
          selectedGrade={selectedGrade}
          selectedSubject={selectedSubject}
          formikData={formikData}
        />
      )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  getAllTeacher: state.onlineClass.allTeachers,
  getTimezoneList: state.onlineClass.timezoneList,
});

const mapDispatchToProps = (dispatch) => ({
  allTeachers: (data) => dispatch(allTeachers(data)),
  timezoneList: () => dispatch(timezoneList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBatch);