import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Select from "react-select";
import "../PaymentsMain.scss";
import ReactFlagsSelect from "react-flags-select";
import { getAllInfoByISO } from "iso-country-currency";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import * as Icon from "react-feather";
import { addExam } from "../../../services/apis/payments-api/payments_api";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllClass,
  getAllSubject,
} from "../../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import { history } from "../../../../../history";

// const examtype = [
//   { value: "weekly", label: "weekly" },
//   { value: "monthly", label: "monthly" },
//   { value: "quarterly", label: "quarterly" },
//   { value: "half-yearly", label: "half-yearly" },
//   { value: "annually", label: "annually" },
//   { value: "olympaid-half-yearly", label: "olympaid-half-yearly" },
//   { value: "olympaid-annually", label: "olympaid-annually" },
// ];

const AddExam = () => {
  const [grade, setGrade] = useState([]);
  const [subject, setSubject] = useState([]);

  const addExamsPayments = async (data) => {
    try {
      const res = await addExam(data);
      if (res.status === 200) {
        toast.success("Exam Payments Added Successfully");
        history.push("/exam-payments");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCurrencyData = (countryData) =>{
    let dataCountry=getAllInfoByISO(countryData);
    return dataCountry.currency;
  }

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

  const handleClass = (e) => {
    getSubjectByClass(e);
  };

  useEffect(() => {
    getAllClassList();
  }, []);

  const handleExamSubit = (data) => {
    console.log(data);
    let temp = data.exams;
    let updatedExams = [];
    temp.map((exam) => {
      let obj = {
        // examName: exam.subject.value,
        grade: exam.grade.id,
        subject: exam.subject.id,
        examType: exam.examtype,
        country_code: exam.country,
        currency_code: exam.currency,
        examPrice: Number(exam.examprice),
      };
      updatedExams.push(obj);
    });
    addExamsPayments(updatedExams);
  };

  return (
    <div>
      <Formik
        initialValues={{
          exams: [],
        }}
        validationSchema={Yup.object({
          exams: Yup.array().of(
            Yup.object().shape({
              examtype: Yup.string().required("Exam Type is required"),
              grade: Yup.string().required("Grade is required"),
              subject: Yup.string().required("Subject is required"),
              examprice: Yup.string().required("Exam Price is required"),
            })
          ),
        })}
        onSubmit={(values) => handleExamSubit(values)}>
        {({ values, setFieldValue, handleChange }) => (
          <Form>
            {/* {JSON.stringify(values, null, 2)} */}
            <FieldArray
              name="exams"
              render={(arrayHelpers) => {
                const exams = values.exams;
                return (
                  <div>
                    <div>
                      {exams && exams.length > 0
                        ? exams.map((user, index) => (
                            <div key={index}>
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
                                          // defaultValue={subject[0]}
                                          value={values.exams[index].grade}
                                          name={`exams.${index}.grade`}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `exams.${index}.grade`,
                                              e
                                            );
                                            setFieldValue(
                                              `exams.${index}.subject`,
                                              ""
                                            );
                                            handleClass(e);
                                          }}
                                          options={grade}
                                        />
                                        <ErrorMessage
                                          style={{ color: "red" }}
                                          name={`exams.${index}.grade`}
                                        />
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
                                          name={`exams.${index}.subject`}
                                          value={values.exams[index].subject}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `exams.${index}.subject`,
                                              e
                                            );
                                          }}
                                          options={subject}
                                        />
                                        <ErrorMessage
                                          style={{ color: "red" }}
                                          name={`exams.${index}.subject`}
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
                                          Exam Type
                                        </Label>
                                        {/* <Select
                                          className="React tautmore-admin-selectbox"
                                          classNamePrefix="select"
                                          // defaultValue={subject[0]}
                                          value={values.exams[index].examtype}
                                          name={`exams.${index}.examtype`}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `exams.${index}.examtype`,
                                              e
                                            );
                                          }}
                                          options={examtype}
                                        /> */}
                                        <Field
                                          className="form-control tautmore-input-style"
                                          name={`exams.${index}.examtype`}
                                          onChange={handleChange}
                                          value={values.exams[index].examtype}
                                          placeholder="Exam Type"
                                        />
                                        <ErrorMessage
                                          style={{ color: "red" }}
                                          name={`exams.${index}.examtype`}
                                        />
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
                                        {console.log(
                                          values.exams[index].country,
                                          `exams.${index}.country`
                                        )}
                                        <ReactFlagsSelect
                                          selected={values.exams[index].country}
                                          searchable
                                          name={`exams.${index}.country`}
                                          value={values.exams[index].country}
                                          onSelect={(e) => {
                                            setFieldValue(
                                              `exams.${index}.country`,
                                              e
                                            );
                                            setFieldValue(
                                              `exams.${index}.currency`,
                                              getCurrencyData(e)
                                            );
                                          }}
                                          // onSelect={(code) => setInitial(initial[index].country = code)}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                      <FormGroup>
                                        <Label
                                          for="data-category"
                                          className="rp-manage-school-input-title"
                                        >
                                          Exam Price
                                        </Label>
                                        {console.log(
                                          values.exams[index].currency,
                                          `exams.${index}.currency`
                                        )}
                                        <InputGroup>
                                          <InputGroupAddon
                                            name={`exams.${index}.currency`}
                                            addonType="prepend"
                                          >
                                            {/* {values.users[index].currency} */}
                                            {getCurrencyData(
                                              values.exams[index].country
                                            )}
                                          </InputGroupAddon>
                                          <Field
                                            className="form-control tautmore-input-style"
                                            name={`exams.${index}.examprice`}
                                            onChange={handleChange}
                                            value={
                                              values.exams[index].examprice
                                            }
                                            placeholder="Exam Price"
                                          />
                                        </InputGroup>
                                        <ErrorMessage
                                          name={`exams.${index}.examprice`}
                                        />
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                  <Button
                                    className="removeExamBtn"
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                  >
                                    <Icon.MinusCircle
                                      className="IconMinus"
                                      size={18}
                                    />
                                    Remove
                                  </Button>
                                </CardBody>
                              </Card>
                            </div>
                          ))
                        : null}
                    </div>

                    <Button
                      className="addExamBtn"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          grade: "",
                          subject: "",
                          examtype: "",
                          country: "US",
                          currency: getCurrencyData("US"),
                          examprice: "",
                        })
                      } // insert an empty string at a position
                    >
                      <Icon.PlusCircle className="IconPlus" size={18} />
                      Add Exam
                    </Button>
                    <br />
                    <br />
                    <br />
                    <div className="data-list-sidebar-footer px-2 d-flex justify-content-center align-items-center mt-1">
                      <div>
                        {exams.length ? (
                          <Button
                            type="submit"
                            //   color="dark"
                            className="tautmore-manage-school_submit"
                            // disabled={loader}
                          >
                            Add Exam
                          </Button>
                        ) : (
                          ""
                        )}
                        <Button
                          className="ml-1 rp-manage-school_cancel"
                          color="dark"
                          outline
                          onClick={()=> history.push('/exam-payments')}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </Form>
        )}
      </Formik>
      <ToastContainer draggable={false} />
    </div>
  );
};
export default AddExam;
