import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getAllClass,
    getAllSubject,
  } from "../../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import { formschema_map_zoom } from "../../../utility/schema/Fields_Schema";
import {
    Card,
    CardBody,
    Col,
    Row,
    FormGroup,
    Label,
    Button,
  } from "reactstrap";
  import Select from "react-select";
  import '../../payments/PaymentsMain.scss';
  import { history } from "../../../../../history";
  import { getUnassignedTeacher, mapZoomToTeacher } from "../../../services/apis/zoom-api/zoom_api";
import { toast } from "react-toastify";

const ZoomDetails = () => {
  const params = useParams();
  const [grade, setGrade] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teacher, setTeacher] = useState([])

  const handleAddSubmit = (obj) =>{
      let formData = {
        teacher:obj.teacher.id,
        zoomUser:params.id
      }

      mapZoomUsers(formData)
  }

  const mapZoomUsers = async (formData) =>{
    try{
        const res = await mapZoomToTeacher(formData)
        if(res.status === 200){
            toast.success("Successfully Mapped zoom user to teacher")
            history.push('/zoom-users')
        }
    }catch(error){
        toast.error(error.response.data.message)
    }
  }

  console.log(params.id);
  const getAllClassList = async () => {
    try {
      const res = await getAllClass();
      if (res.status === 200) {
        let temp = res.data && res.data.data;
        let updatedArray = [];
        temp.map((item) => {
          let obj = {
            value: item.name,
            label: item.name,
            id: item._id,
          };
          updatedArray.push(obj);
        });
        setGrade(updatedArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSubjectList = async (e) => {
    try {
      const res = await getAllSubject({ classId: e.id });
      let temp = res.data && res.data.data;
      let updatedArray = [];
      temp.map((item) => {
        let obj = {
          value: item.name,
          label: item.name,
          id: item._id,
        };
        updatedArray.push(obj);
      });
      setSubjects(updatedArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubject = (e) => {
    getAllSubjectList(e);
  };

  const getTeachers = async (e) =>{
    const params = {
        subject:e.id
    }
    try{
        const res = await getUnassignedTeacher(params)
        if (res.status === 200) {
            let temp = res.data && res.data.data;
            let updatedArray = [];
            temp.map((item) => {
              let obj = {
                value: item.fullName,
                label: item.fullName,
                id: item._id,
              };
              updatedArray.push(obj);
            });
            setTeacher(updatedArray);
          }
    }catch(error){
        console.log(error)
    }
  }

  const handleTeachers = (e) =>{
      getTeachers(e);
  }

  useEffect(() => {
    getAllClassList();
  }, []);

  return (
    <div>
      <h4 className="rp-manage-school-header-title">Assign zoom host to Teacher</h4>
      <Card>
        <CardBody>
            <Formik
            enableReinitialize
            initialValues={{
                grade: "",
              subjects: "",
                teacher: "",
            }}
            validationSchema={formschema_map_zoom}
            onSubmit={(values) => handleAddSubmit(values)}
            >{({
                errors,
              touched,
              handleChange,
              values,
              setFieldValue,
              handleSubmit,
            }) =>{
                return(
                    <Form onSubmit={handleSubmit}>
                        <Row>
                    <Col sm="6">
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
                            setFieldValue("subjects", "");
                            setFieldValue("teacher", "")
                            handleSubject(e);
                          }}
                          options={grade}
                        />
                        {errors.grade && touched.grade ? (
                          <div className="mt-25 ml-25 rp-manage-school_error-message">
                            {errors.grade}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup>
                        <Label
                          for="data-category"
                          className="rp-manage-school-input-title"
                        >
                          Teacher
                        </Label>

                        <Select
                          className="React tautmore-admin-selectbox"
                          classNamePrefix="select"
                        //   defaultValue={grade[0]}
                          name="grade"
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

                      <Col sm="6">
                      <FormGroup>
                        <Label
                          for="data-category"
                          className="rp-manage-school-input-title"
                        >
                          subjects
                        </Label>

                        <Select
                          className="React tautmore-admin-selectbox"
                          classNamePrefix="select"
                          name="subjects"
                          options={subjects}
                          value={values.subjects}
                        //   isMulti
                          onChange={(e) => {
                            setFieldValue("subjects", e);
                            setFieldValue("teacher", "")
                            handleTeachers(e);
                          }}
                        />
                        {errors.subjects && touched.subjects ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.subjects}
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
                      ADD
                    </Button>
                    
                      <Button
                        className="ml-1 rp-manage-school_cancel"
                        color="dark"
                        outline
                        onClick={() => history.push('/zoom-users')}
                      >
                        Cancel
                      </Button>
                  </div>
                    </Form>
                )
            }}

            </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default ZoomDetails;
