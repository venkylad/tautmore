import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import { formschema_add_course } from "../../utility/schema/Fields_Schema";
import Select from "react-select";
import ReactFlagsSelect from "react-flags-select";
import { getAllInfoByISO } from "iso-country-currency";
import "./PaymentsMain.scss";
import {
  getAllClass,
  getAllSubject,
} from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import {
  addCourse,
  editCourse,
} from "../../services/apis/payments-api/payments_api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../../../history";

// const grade = [
//   { value: "Grade 1", label: "Grade 1" },
//   { value: "Grade 2", label: "Grade 2" },
//   { value: "Grade 3", label: "Grade 3" },
// ];

// const subjects = [
//     { value: "maths", label: "maths" },
//     { value: "science", label: "science" },
//     { value: "social", label: "social" },
//   ];

const typeofdiscount = [
  { value: "percentage", label: "percentage" },
  { value: "flat", label: "flat" },
];

const AddCourse = (props) => {
  // const [selected, setSelected] = useState("US");
  // const [currency, setCurrecy] = useState(getParamByISO("US", "symbol"));
  const data = props.location.state;
  console.log(data);
  const [grade, setGrade] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // const setCountryCode = (code) => {
  //     setSelected(code);
  //     setCurrecy(getParamByISO(code, "symbol"));
  //     console.log(code);
  //   };

  const getCurrencyData = (countryData) => {
    let dataCountry = getAllInfoByISO(countryData);
    return dataCountry.currency;
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

  const handleCancel = (id) => {
    history.push(`/payments-details/${id}`);
  };

  useEffect(() => {
    getAllClassList();
  }, []);

  const addCourseFunction = async (formData) => {
    try {
      const res = await addCourse(formData);
      if (res.status === 200) {
        toast.success("Course Payment Added Successfully");
        history.push("/course-payments");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const editCourseFunction = async (formData) => {
    try {
      const res = await editCourse(formData, data?.data?._id);
      if (res.status === 200) {
        toast.success("Course Updated Successfully");
        history.push(`payments-details/${data?.data?._id}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddSubmit = (obj) => {
    let updatedSub = [];
    obj.subjects.map((sub) => {
      updatedSub.push(sub.id);
    });

    let formData = {
      country_code: obj.country,
      grade: obj.grade.id,
      subject: updatedSub,
      per_course_price: obj.courseprice,
      discount_type: obj.typeofdiscount.value,
      discount_value: obj.discountvalue,
      currency_code: obj.coursecurrency,
    };

    if (data?.editable) {
      editCourseFunction(formData);
    } else {
      addCourseFunction(formData);
    }
  };

  return (
    <div>
      <h4 className="rp-manage-school-header-title">Course</h4>
      <Card>
        <CardBody>
          <Formik
            enableReinitialize
            initialValues={{
              grade:
                data?.data?.grade?.name && data?.data?.grade?._id
                  ? {
                      value: data?.data?.grade?.name,
                      label: data?.data?.grade?.name,
                      id: data?.data?.grade?._id,
                    }
                  : "",
              subjects: data?.data?.subject
                ? data?.data?.subject.map((sub) => ({
                    value: sub.name,
                    label: sub.name,
                    id: sub._id,
                  }))
                : "",
              // Noofclasses: "4",
              country: data?.data?.country || "US",
              coursecurrency: data?.data?.country
                ? getCurrencyData(data?.data?.country)
                : getCurrencyData("US"),
              courseprice: data?.data?.per_course_price || "",
              typeofdiscount: data?.data?.discount_type
                ? {
                    value: data?.data?.discount_type,
                    label: data?.data?.discount_type,
                  }
                : "",
              discountvalue: data?.data?.discount_value || "",
              // finalprice: "",
            }}
            validationSchema={formschema_add_course}
            onSubmit={(values) => handleAddSubmit(values)}
          >
            {({
              errors,
              touched,
              handleChange,
              values,
              setFieldValue,
              handleSubmit,
            }) => {
              console.log(values);
              return (
                <Form onSubmit={handleSubmit}>
                  {/* {JSON.stringify(values,null,2)} */}
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

                      {/* <FormGroup>
                      <Label
                        for="data-name"
                        className="rp-manage-school-input-title"
                      >
                        No. of Classes
                      </Label>
                      <Field
                        type="text"
                        className="form-control tautmore-input-style"
                        name="noofclasses"
                        value="4"
                        id="readonlyInput"
                        readOnly
                      />
                    </FormGroup> */}
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
                            setFieldValue("coursecurrency", getCurrencyData(e));
                            // setCountryCode(e)
                          }}
                          //   onSelect={(code) => setCountryCode(code)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label
                          for="data-category"
                          className="rp-manage-school-input-title"
                        >
                          Choose discount type
                        </Label>

                        <Select
                          className="React tautmore-admin-selectbox"
                          classNamePrefix="select"
                          defaultValue={typeofdiscount[0]}
                          name="typeofdiscount"
                          value={values.typeofdiscount}
                          onChange={(e) => {
                            setFieldValue("typeofdiscount", e);
                          }}
                          options={typeofdiscount}
                        />
                        {errors.typeofdiscount && touched.typeofdiscount ? (
                          <div className="mt-25 ml-25 rp-manage-school_error-message">
                            {errors.typeofdiscount}
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
                          isMulti
                          onChange={(e) => {
                            setFieldValue("subjects", e);
                          }}
                        />
                        {errors.subjects && touched.subjects ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.subjects}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup>
                        <Label
                          for="data-category"
                          className="rp-manage-school-input-title"
                        >
                          Course Price
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

                      <FormGroup>
                        <Label
                          for="data-name"
                          className="rp-manage-school-input-title"
                        >
                          Value
                        </Label>
                        <Field
                          type="text"
                          className={`form-control tautmore-input-style ${
                            errors.discountvalue &&
                            touched.discountvalue &&
                            "is-invalid"
                          }`}
                          name="discountvalue"
                          value={values.discountvalue}
                          placeholder="Discount Value"
                          onChange={handleChange}
                          id="data-name"
                        />
                        {errors.discountvalue && touched.discountvalue ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.discountvalue}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Final Price
                      </Label>
                      <InputGroup>
                        <InputGroupAddon name="coursecurrency" addonType="prepend">{currency}</InputGroupAddon>
                        <Field
                          type="text"
                          className={`form-control tautmore-input-style ${
                            errors.finalprice &&
                            touched.finalprice &&
                            "is-invalid"
                          }`}
                          name="finalprice"
                          placeholder="Final price"
                          onChange={handleChange}
                          id="data-description"
                        />
                        </InputGroup>
                        {errors.finalprice && touched.finalprice ? (
                          <div className="rp-manage-school_error-message mt-25">
                            {errors.finalprice}
                          </div>
                        ) : null}
                      
                    </FormGroup> */}
                    </Col>
                  </Row>
                  <div className="data-list-sidebar-footer px-2 d-flex justify-content-center align-items-center mt-1">
                    <Button
                      type="submit"
                      //   color="dark"
                      className="tautmore-manage-school_submit"
                      // disabled={loader}
                    >
                      {data?.editable ? "Update Course" : "Add Course"}
                    </Button>
                    {data?.editable ? (
                      <Button
                        className="ml-1 rp-manage-school_cancel"
                        color="dark"
                        outline
                        onClick={() => handleCancel(data?.data?._id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        className="ml-1 rp-manage-school_cancel"
                        color="dark"
                        outline
                        onClick={() => history.push('/course-payments')}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
      <ToastContainer draggable={false} />
    </div>
  );
};

export default AddCourse;
