import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { examPayDetails } from "../../../services/apis/payments-api/payments_api";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "../PaymentsMain.scss";
import {
  FormGroup,
  Label,
  Button,
  Col,
  Row,
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import {
  getAllClass,
  getAllSubject,
} from "../../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import Select from "react-select";
import { getAllInfoByISO } from "iso-country-currency";
import ReactFlagsSelect from "react-flags-select";
import {updateExamPayments} from '../../../services/apis/payments-api/payments_api'
import {ToastContainer, toast } from "react-toastify";
import { history } from "../../../../../history";

const EditExam = () => {
  const [editData, setEditData] = useState({});
  const [grade, setGrade] = useState([]);
  const [subject, setSubject] = useState([]);
  const params = useParams();

  const getExamPayDetails = async () => {
    const res = await examPayDetails(params.id);
    setEditData(res?.data?.data);
  };

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

  const getCurrencyData = (countryData) =>{
    let dataCountry=getAllInfoByISO(countryData);
    return dataCountry.currency;
  }

  const handleClass = (e) => {
    getSubjectByClass(e);
  };

  const getSubjectByClass = async (e) => {
    try {
      const res = await getAllSubject({ classId: e.id });
      if (res.status == 200) {
        let temp = res.data ? res.data.data : "";
        let updatedArray = [];
        temp.map((item) => {
          let obj = {
            value: item.name,
            label: item.name,
            id: item?._id,
          };
          updatedArray.push(obj);
        });
        setSubject(updatedArray);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  const addUpdatedExam = async (data) => {
    try{
        const res = await updateExamPayments(data, params.id);
        if(res.status === 200){
            toast.success("Exam Payments Edited Successfully");
            history.push(`/exam-payment-details/${params.id}`);
        }
    }catch(error){
        console.log(error)
        toast.error(error.message);
    }
  }

  const handleExamSubmit = (data) => {
    let formData={
        examType:data.examType,
        subject:data.subject.id,
        grade:data.grade.id,
        country_code:data.country,
        currency_code:data.coursecurrency,
        examPrice:Number(data. courseprice)
}
    addUpdatedExam(formData);
  };

  useEffect(() => {
    getExamPayDetails();
    getAllClassList();
  }, []);
  return editData?.examType ? (
    <div>
      <Formik
        initialValues={{
          grade: editData?.grade
            ? {
                value: editData?.grade?.name,
                label: editData?.grade?.name,
                id: editData?.grade?._id,
              }
            : "",
          subject: editData?.subject
            ? {
                value: editData?.subject?.name,
                label: editData?.subject?.name,
                id: editData?.subject?._id,
              }
            : "",
          examType: editData?.examType || "",
          country: editData?.country_code || "US",
          coursecurrency: editData?.country_code
            ? getCurrencyData(editData?.country_code)
            : getCurrencyData("US"),
          courseprice: editData?.examPrice || "",
        }}
        validationSchema={Yup.object().shape({
          grade: Yup.string().required("Grade is Required"),
          subject: Yup.string().required("Grade is Required"),
          examType: Yup.string().required("Exam Type is Required"),
        //   country: Yup.string().required("Country is Required"),
        courseprice: Yup.string().required("Exam Price is Required"),
        })}
        onSubmit={(values) => handleExamSubmit(values)}
      >
        {({
          errors,
          touched,
          values,
          setFieldValue,
          handleSubmit,
          handleChange,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
                 {/* {JSON.stringify(values,null,2)} */}
              <Card>
                <CardBody>
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
                          // defaultValue={classData[0]}
                          name="grade"
                          value={values.grade}
                          onChange={(e) => {
                            setFieldValue("grade", e);
                            setFieldValue("subject", "");
                            handleClass(e);
                          }}
                          options={grade}
                        />
                        {errors.grade && touched.grade ? (
                          <div className="mt-25 ml-25 rp-manage-school_error-message">
                            {errors.grade}
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
                          Subject
                        </Label>

                        <Select
                          className="React tautmore-admin-selectbox"
                          classNamePrefix="select"
                          // defaultValue={subject[0]}
                          name="subject"
                          value={values.subject}
                          onChange={(e) => {
                            setFieldValue("subject", e);
                          }}
                          options={subject}
                        />
                        {errors.subject && touched.subject ? (
                          <div className="mt-25 ml-25 rp-manage-school_error-message">
                            {errors.subject}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label
                          for="data-name"
                          className="rp-manage-school-input-title"
                        >
                          Exam Type
                        </Label>
                        <Field
                          type="text"
                          className={`form-control tautmore-input-style ${
                            errors.examType && touched.examType && "is-invalid"
                          }`}
                          name="examType"
                          value={values.examType}
                          placeholder="Exam Type"
                          onChange={handleChange}
                          id="data-name"
                        />
                        {errors.examType && touched.examType ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.examType}
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
                          Country
                        </Label>
                        <ReactFlagsSelect
                          selected={values.country}
                          searchable
                          name="country"
                          value={values.country}
                          //   onChange={handleChange}
                          onSelect={(e) => {
                            setFieldValue("country", e);
                            setFieldValue(
                              "coursecurrency",
                              getCurrencyData(e)
                            );
                            // setCountryCode(e)
                          }}
                          //   onSelect={(code) => setCountryCode(code)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6">
                      <FormGroup>
                        <Label
                          for="data-category"
                          className="rp-manage-school-input-title"
                        >
                          Exam Price
                        </Label>
                        <InputGroup>
                          <InputGroupAddon
                            name="coursecurrency"
                            addonType="prepend"
                          >
                            {getCurrencyData(values.country)}
                          </InputGroupAddon>
                          <Field
                            type="text"
                            className={`form-control tautmore-input-style ${
                              errors.courseprice &&
                              touched.courseprice &&
                              "is-invalid"
                            }`}
                            name="courseprice"
                            placeholder="Course price"
                            onChange={handleChange}
                            id="data-description"
                          />
                        </InputGroup>
                        {errors.courseprice && touched.courseprice ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.courseprice}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <div className="data-list-sidebar-footer px-2 d-flex justify-content-center align-items-center mt-1">
                <div>
                  <Button
                    type="submit"
                    //   color="dark"
                    className="tautmore-manage-school_submit"
                    // disabled={loader}
                  >
                    Update Exam
                  </Button>

                  <Button
                    className="ml-1 rp-manage-school_cancel"
                    color="dark"
                    outline
                      onClick={()=>  history.push(`/exam-payment-details/${params.id}`)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer draggable={false} />
    </div>
  ) : (
    ""
  );
};

export default EditExam;
