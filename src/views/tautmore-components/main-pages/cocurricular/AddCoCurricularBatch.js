import { Formik, Form, Field } from "formik";
import React, {useState, useEffect} from "react";
import { Card, CardBody, Row, Col, FormGroup, Label, Button } from "reactstrap";
import { formscheme_add_coCurricular_batch } from "../../utility/schema/Fields_Schema";
import Select from "react-select";
import './cocurricular.scss';
import {getAllClass, getTimeZone} from '../../services/apis/tautmore_exams_apis/tautmore_exams_apis';
import { history } from "../../../../history";
import { getActivities, getCoCurrTeacher} from "../../services/apis/co_curricular_apis/co-curricular-apis";
import * as question_api from "../../services/apis/manage-class-board-subject/manage-api";
// import ListView from "../../../tautmore-components/main-pages/cocurricular/CurricularStudentsBatch/ListView";

// const teacher = [
//     { value: "loki", label: "loki" },
//     { value: "puru", label: "puru" },
// ]

// const boardname = [
//     { value: "ICSE", label: "ICSE" },
//     { value: "CBSE", label: "CBSE" },
// ]

const AddCoCurricularBatch = () => {
  // const [formikData,setFormikData] = useState([
  //   {
  //     batchname: "",
  //     boardname: "",
  //     grade: "",
  //     activity: "",
  //     teacher: "",
  //     timezone: "",
  //   }
  // ]);
  // const [studentList,setStudentList] = useState(false);
    const [grade,setGrade] = useState([]);
    const [activity, setActivity] = useState([]);
    const [boardOption, setBoardOption] = useState([
      {id: '', value: '', label: ''}
    ]);
    const [teacher, setTeacher] = useState([
    ]);
    const [timezonOption, setTimezonOption] = useState([
      {value: '', label: ''}
    ]);
    const [selectedGrade,setSelectedGrade] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedTimezone, setSelectedTimeZone] = useState('');

    useEffect(()=>{
        getAllClassList();
        getAllActivityList();
        getAllTimeZone();
      },[])

    useEffect(()=>{
      getTeachersData(); 
    },[selectedGrade,selectedActivity,selectedTimezone])

    const getTeachersData = async () =>{
      if(selectedGrade && selectedActivity && selectedTimezone ){
        const params = {
          grade:selectedGrade,
          activity:selectedActivity,
          timezone:selectedTimezone.value
        }
        try{
          const res = await getCoCurrTeacher(params)
          const teacherList = res?.data?.data?.map((data) => ({
            value: data.fullName,
            label: data.fullName,
            id:data._id
          }));
          setTeacher(teacherList)
        }catch(error){
          console.log(error)
        }
      }
    }

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

      const getAllTimeZone = async () =>{
        try{
          const res = await getTimeZone();
          console.log(res)
          const timeZoneList = res?.data?.data?.map((data) => ({
            value: data,
            label: data,
          }));
          
            setTimezonOption(timeZoneList)
          
        }catch(error){
          console.log(error)
        }
      }

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

      const getAllActivityList = async (e) =>{
        try{
          const res = await getActivities()
          let temp = res.data && res.data.data;
          let updatedArray = [];
          temp.map((item)=>{
            let obj = {
              value : item.activityName,
              label : item.activityName,
              id : item._id
            }
            updatedArray.push(obj);
          })
          setActivity(updatedArray);
        }
        catch(error){
          console.log(error);
        }
    
      }

    //   const handleSubject = (e) => {
    //     getAllSubjectList(e)
    // }

    const backToBatchList = () =>{
      history.push('/co-curricular')
      localStorage.removeItem('batchData')
    }

      
  const handleSubmit = (data) => {
    // setStudentList(true);
    localStorage.setItem('batchData', JSON.stringify(data));
  //  localStorage.setItem('cocurrStudents',JSON.stringify([]))
    history.push('/co-curricular-students-batch')
  };
  return (
    <div>
      {/* {!studentList ? ( */}
        <>
           <h4 className="rp-manage-school-header-title">Add Co-Curricular Batch.</h4>
      <Card>
        <CardBody>
          <Formik
            enableReinitialize
            initialValues={{
              batchname: '',
              boardname:  '',
              grade:  '',
              activity:  '',
              timezone:  '',
              teacher:  '',
            }}
            validationSchema={formscheme_add_coCurricular_batch}
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
                          setSelectedGrade(e.id);
                          setFieldValue("teacher", '')
                        }}
                        options={grade}
                      />
                      {errors.grade && touched.grade ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.grade}
                        </div>
                      ) : null}
                    </FormGroup>

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
                            // onTimeZoneSelect(e)
                            setSelectedTimeZone(e)
                            setFieldValue("teacher", '')
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
                        // defaultValue={boardOption[0]}
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
                          Activities
                        </Label>

                        <Select
                          className="React tautmore-admin-selectbox"
                          classNamePrefix="select"
                          name="activity"
                          options={activity}
                          value={values.activity}
                        //   isMulti
                          onChange={(e) => {
                            setFieldValue("activity", e);
                            setSelectedActivity(e.id);
                            setFieldValue("teacher", '')
                          }}
                        />
                        {errors.activity && touched.activity ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.activity}
                        </div>
                      ) : null}
                      </FormGroup>

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
                        // defaultValue={teacher[0]}
                        name="teacher"
                        value={values.teacher}
                        onChange={(e) => {
                          setFieldValue("teacher", e);
                        }}
                        options={teacher}
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
                     onClick={()=> backToBatchList()}
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
        </>
      {/* ) : (
        <ListView
        setStudentList={setStudentList}
        selectedGrade={selectedGrade}
        selectedActivity={selectedActivity}
        formikData={formikData}></ListView>
      )} */}
    </div>
  );
};

export default AddCoCurricularBatch;
