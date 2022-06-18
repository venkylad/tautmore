import React, { Component } from "react";
import { Label, FormGroup, Button, Row, Col, Spinner } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Select from "react-select";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formschema_exam_tests } from "../../utility/schema/Fields_Schema";
import "./ExamForm.scss";
import { editExam, getAllClass, addExam, getAllSubject, getTimeZone, getExamTypes } from "../../services/apis/tautmore_exams_apis/tautmore_exams_apis";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import moment from "moment";


// const examtype = [
//   { value: "weekly", label: "weekly" },
//   { value: "monthly", label: "monthly" },
//   { value: "quarterly", label: "quarterly" },
//   { value: "half-yearly", label: "half-yearly" },
//   { value: "annually", label: "annually" },
//   { value: "olympiad-half-yearly", label: "olympiad-half-yearly" },
//   { value: "olympiad-annually", label: "olympiad-annually" },
// ];

class DataListSidebar extends Component {
  state = {
    isLoading: false,
    classData: [],
    subject : [],
    time:[],
    examtype:[],
  };

  async getAllGrades () {
   try{
     const res = await getAllClass();
     console.log(res);
      if(res.status === 200){
        let temp = res.data && res.data.data;
        let updatedArray = [];
            temp.map((item) => {
          let obj = {
            // value: item.name + "_" + item.board.name,
            // label: item.name + "_" + item.board.name,
            // id:item._id
            value: item.name,
            label: item.name,
            id:item._id
          };
          updatedArray.push(obj);
        });

        this.setState({
          classData: updatedArray,
        });
      }
   }catch(errors){
     console.log(errors)
   }
    
  }

  async getTimeZoneData(){
    try{
      const res = await getTimeZone();
      console.log(res)
      const timeZoneList = res?.data?.data?.map((data) => ({
        value: data,
        label: data,
      }));
      this.setState({
        time:timeZoneList
      })
    }catch(error){
      console.log(error)
    }
  }

  async getSubjectList(e){
    console.log(e);
    try {
      const res = await getAllSubject({classId:e.id});
      if(res.status === 200){
        let temp = res.data && res.data.data;
        let updatedArray = [];
            temp.map((item) => {
          let obj = {
            value: item.name,
            label: item.name,
            id:item._id
          };
          updatedArray.push(obj);
        });

        this.setState({
          subject:updatedArray
        })
      }
    } catch (error) {
      
    }
  }

  handleClass(e){
    // this.setState({
    //   subject:""
    // })
    this.getSubjectList(e)
  }

  async getExamTypeList(grade,e){
    try{
      const params = {
        grade:grade.id,
        subject:e.id
      }
      const res = await getExamTypes(params);
      const examTypeArr = res?.data?.data?.map((data) => ({
        value: data,
        label: data,
      }));
      this.setState({
        examtype:examTypeArr
      })
    }catch(error){
      console.log(error)
    }
  }

  handleExamType(grade,e){
    this.getExamTypeList(grade,e)
  }

  componentDidMount(){
      this.getAllGrades()
      this.getTimeZoneData()
      console.log(this.props.data)
  }

  async addExamData(formData){
    console.log(formData)
    try{
      const res = await addExam(formData);
      if(res.status === 200){
        toast.success("Exam Added Successfully")
        this.props.handleSidebar(false);
        this.props.loadData();
      }
    }catch(error){
      console.log(error);
    }
  }

  async editExamData(formData){
    try{
      const res = await editExam(formData)
      if(res.status === 200){
        toast.success("Exam Data Updated Successfully")
        this.props.loadData();
        this.props.handleSidebar(false);
      }
    }catch(error){
      console.log(error);
    }
  }

  setDate(date){
    var date = new Date(date);
    return moment(date.setDate(date.getDate() + 7)).format('YYYY-MM-DD');
  }

  setMonth(date){
    var date = new Date(date);
    return moment(date.setDate(date.getDate() + 29)).format('YYYY-MM-DD');
  }

  //   componentDidUpdate () {
  //     if (this.props.addadmin?.statusCode === 200) {
  //       this.props.handleSidebar(false);
  //     }

  //     if (this.props.editadmin?.statusCode === 200) {
  //       this.props.handleSidebar(false);
  //       this.setState({ isLoading: false });
  //       toast.success("Admin Data Edited Successfully");
  //       this.props.clearEditadmin();
  //     }else if (this.props.editadmin === "error") {
  //       toast.error("Error in Edit admin!");
  //       this.props.clearEditadmin();
  //     }
  //   }
  handleAddSubmit = (obj) => {
    const { isEditAble } = this.props;
    console.log(obj);
    let localId=JSON.parse(localStorage.getItem('tautmore-user'))
    let formData = {
      name:obj.examname,
      description:obj.description,
      class:obj.classData.id,
      subject:obj.subject.id,
      subjectName:obj.subject.value,
      totalMarks:obj.totalmarks,
      totalTime:obj.totalexamtime,
      examType:obj.examtype.value,
      startDate:obj.examdate,
      endDate:obj.enddate,
      // startTime:obj.time,
      timezone:obj.time.value,
      instructions:obj.instructions,
      addedBy:localId.id
    };

    
    if(isEditAble){
      // console.log("editable")
      let editFormData = {
        examId: this.props.data._id,
        name:obj.examname,
        description:obj.description,
        class:obj.classData.id,
        subject:obj.subject.id,
        subjectName:obj.subject.value,
        totalMarks:obj.totalmarks,
        totalTime:obj.totalexamtime,
        examType:obj.examtype.value,
        startDate:obj.examdate,
        endDate:obj.enddate,
        // startTime:obj.time,
        timezone:obj.time.value,
        instructions:obj.instructions,
        addedBy:localId.id
      }
  
      this.editExamData(editFormData)
    }else{
      this.addExamData(formData);
    }
    

    // this.setState({ isLoading: true });
    // if (isEditAble) {
    //   const value = {
    //     id: this.props.data && this.props.data._id,
    //     admin: formData,
    //   }
    //   this.props.editAdmin(value);
    // } else {
    //   this.props.addAdmin(formData);

    // }
  };

  render() {
    let { isEditAble, show, data, title, handleSidebar } = this.props;
    let { classData, subject, time, examtype } = this.state;
    const { isLoading } = this.state;
    return (
      <>
        <Formik
          enableReinitialize
          //   initialValues={{
          //     name: data?.name || "",
          //     role: data?.role ? { value: data?.role, label: data?.role } : "",
          //     email: data?.email || "",
          //     phone: data?.phone.toString(),
          //     password: "",
          //     repassword: "",
          //   }}
          initialValues={{
            examname: data?.name || "",
            description: data?.description || "",
            // role: data?.role ? { value: data?.role, label: data?.role } : "",
            classData: data?.class && data?.className
              ? { value: data?.className, label: data?.className, id: data?.class }
              : "",
            subject: data?.subject && data?.subjectName
              ? { value: data?.subjectName, label: data?.subjectName, id:data?.subject }
              : "",
            totalmarks: data?.totalMarks || "",
            totalexamtime: data?.totalTime || "",
            examtype: data?.examType
              ? { value: data?.examType, label: data?.examType }
              : "",
            examdate: data?.startDate ? moment(data?.startDate).format('YYYY-MM-DD') : "",
            enddate: data?.endDate ? moment(data?.endDate).format('YYYY-MM-DD') : "",
            // time:data?.startTime || "",
            time:data?.timezone ? { value: data?.timezone, label: data?.timezone } : "",
            instructions: data?.instructions || "",
            // phone: data?.phone.toString(),
            // password: "",
            // repassword: "",
          }}
          validationSchema={formschema_exam_tests(data)}
          onSubmit={(data, ...rest) => this.handleAddSubmit(data, title)}
        >
          {({
            errors,
            touched,
            values,
            setFieldValue,
            handleSubmit,
            handleChange,
          }) => {
            console.log(values);
            // if(values.examtype.value != 'weekly' || values.examtype.value != 'monthly'){
            //   console.log("true");
            // }else{
            //  console.log('false');
            // }
            return (
              <Form onSubmit={handleSubmit}>
                <div
                  className={classnames("data-list-sidebar", {
                    show: show,
                  })}
                >
                  <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
                    <h4>
                      {data && Object.keys(data).length !== 0
                        ? "UPDATE EXAM"
                        : "ADD EXAM"}
                    </h4>
                    <X
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleSidebar(false, true)}
                    />
                  </div>

                  <PerfectScrollbar
                    className="data-list-fields px-2 mt-2"
                    options={{ wheelPropagation: false }}
                  >
                    <FormGroup>
                      <Label
                        for="data-name"
                        className="rp-manage-school-input-title"
                      >
                        Exam Name
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.examname && touched.examname && "is-invalid"
                        }`}
                        name="examname"
                        value={values.examname}
                        placeholder="Exam Name"
                        onChange={handleChange}
                        id="data-name"
                      />
                      {errors.examname && touched.examname ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.examname}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-description"
                        className="rp-manage-school-input-title"
                      >
                        Description
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.description &&
                          touched.description &&
                          "is-invalid"
                        }`}
                        name="description"
                        value={values.description}
                        placeholder="Description"
                        onChange={handleChange}
                        id="data-description"
                      />
                      {errors.description && touched.description ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.description}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Class
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        defaultValue={classData[0]}
                        name="classData"
                        value={values.classData}
                        onChange={(e) => {
                          setFieldValue("classData", e);
                          setFieldValue("subject", "");
                          setFieldValue("examtype", "");
                          this.handleClass(e)
                        }}
                        options={classData}
                      />
                      {errors.classData && touched.classData ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.classData}
                        </div>
                      ) : null}
                    </FormGroup>

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
                        defaultValue={subject[0]}
                        name="subject"
                        value={values.subject}
                        onChange={(e) => {
                          setFieldValue("subject", e);
                          setFieldValue("examtype", "")
                          this.handleExamType(values.classData, e);
                        }}
                        options={subject}
                      />
                      {errors.subject && touched.subject ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.subject}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-totalmarks"
                        className="rp-manage-school-input-title"
                      >
                        Total Marks
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.totalmarks &&
                          touched.totalmarks &&
                          "is-invalid"
                        }`}
                        name="totalmarks"
                        value={values.totalmarks}
                        placeholder="Total Marks"
                        onChange={handleChange}
                        id="data-totalmarks"
                      />
                      {errors.totalmarks && touched.totalmarks ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.totalmarks}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-totalexamtime"
                        className="rp-manage-school-input-title"
                      >
                        Total Exam Time
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.totalexamtime &&
                          touched.totalexamtime &&
                          "is-invalid"
                        }`}
                        name="totalexamtime"
                        value={values.totalexamtime}
                        placeholder="Total Exam Time"
                        onChange={handleChange}
                        id="data-totalexamtime"
                      />
                      {errors.totalexamtime && touched.totalexamtime ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.totalexamtime}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                          <Label
                            for="data-category"
                            className="rp-manage-school-input-title"
                          >
                            Exam Type
                          </Label>

                          <Select
                            className="React tautmore-admin-selectbox"
                            classNamePrefix="select"
                            // defaultValue={examtype[0]}
                            name="examtype"
                            value={values.examtype}
                            onChange={(e) => {
                              setFieldValue("examtype", e);
                              
                            }}
                            options={examtype}
                          />
                          {errors.examtype && touched.examtype ? (
                            <div className="mt-25 ml-25 rp-manage-school_error-message">
                              {errors.examtype}
                            </div>
                          ) : null}
                        </FormGroup>

                    {/* <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Role
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        defaultValue={role[0]}
                        name="role"
                        value={values.role}
                        onChange={(e) => {
                          setFieldValue("role", e);
                        }}
                        options={role}
                      />
                      {errors.role && touched.role ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.role}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-email"
                        className="rp-manage-school-input-title"
                      >
                        Email
                      </Label>
                      <Input
                        className={`form-control tautmore-input-style ${
                          errors.email && touched.email && "is-invalid"
                        }`}
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder="Email"
                        onChange={handleChange}
                        id="data-email"
                      />
                      {errors.email && touched.email ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.email}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label
                        for="data-phone"
                        className="rp-manage-school-input-title 222"
                      >
                        Phone
                      </Label>
                      <PhoneInput
                        country={"us"}
                        className={`form-control tautmore-input-style ${
                          errors.phone && touched.phone && "is-invalid"
                        }`}
                        value={values.phone}
                        placeholder="Phone"
                        onChange={(e) => {
                          setFieldValue("phone", e);
                        }}
                      />
                      {errors.phone && touched.phone ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.phone}
                        </div>
                      ) : null}
                    </FormGroup> */}

                    
                      <FormGroup>
                          <Label
                            for="date"
                            className="rp-manage-school-input-title"
                          >
                            Start Date
                          </Label>
                          <Field
                            type="date"
                            name="examdate"
                            id="examdate"
                            // min={this.disablePastDate()}
                            value={values.examdate}
                            className={`form-control tautmore-input-style ${
                              errors.examdate &&
                              touched.examdate &&
                              "is-invalid"
                            }`}
                          />
                          {errors.examdate && touched.examdate ? (
                            <div className="rp-manage-school_error-message mt-25">
                              {errors.examdate}
                            </div>
                          ) : null}
                        </FormGroup>
                     
                      
                      {/* {(values.examtype.value === "weekly" || values.examtype.value === "monthly") ?   */}
                      <FormGroup>
                          <Label
                            for="date"
                            className="rp-manage-school-input-title"
                          >
                            End Date
                          </Label>
                          <Field
                            type="date"
                            name="enddate"
                            id="enddate"
                            // min={values.examdate}
                            max={values.examtype.value === "weekly" ? this.setDate(values.examdate) : this.setMonth(values.examdate)}
                            // min={this.disablePastDate()}
                            className={`form-control tautmore-input-style ${
                              errors.enddate &&
                              touched.enddate &&
                              "is-invalid"
                            }`}
                          />
                          {errors.enddate && touched.enddate ? (
                            <div className="rp-manage-school_error-message mt-25">
                              {errors.enddate}
                            </div>
                          ) : null}
                        </FormGroup>
                        
                       {/* : values.enddate = ""}  */}
                      
                       <FormGroup>
                      <Label
                        for="data-category"
                        className="rp-manage-school-input-title"
                      >
                        Time Zone
                      </Label>

                      <Select
                        className="React tautmore-admin-selectbox"
                        classNamePrefix="select"
                        // defaultValue={classData[0]}
                        name="time"
                        value={values.time}
                        onChange={(e) => {
                          setFieldValue("time", e);
                        }}
                        options={time}
                      />
                      {errors.time && touched.time ? (
                        <div className="mt-25 ml-25 rp-manage-school_error-message">
                          {errors.time}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* {(values.examtype.value === "quarterly" || values.examtype.value === "half-yearly" || values.examtype.value === "annually" || values.examtype.value === "olympiad-half-yearly" || values.examtype.value === "olympiad-annually") ? 
                    <FormGroup>
                          <Label
                            for="time"
                            className="rp-manage-school-input-title"
                          >
                            Start Time
                          </Label>
                          <Flatpickr
                              className="form-control"
                              placeholder="start time"
                              value={values.time}
                              name="time"
                              id="time"
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                              }}
                              // onChange={date => {
                              //   setFieldValue({ time : date });
                              // }}
                              onChange={(time, dateString) => setFieldValue("time", dateString)}
                            />
                            {errors.time && touched.time ? (
                            <div className="rp-manage-school_error-message mt-25">
                              {errors.time}
                            </div>
                          ) : null}
                        </FormGroup>
                        : values.time = ""}  */}

                    <FormGroup>
                      <Label
                        for="data-instructions"
                        className="rp-manage-school-input-title"
                      >
                        Instructions
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.instructions &&
                          touched.instructions &&
                          "is-invalid"
                        }`}
                        name="instructions"
                        value={values.instructions}
                        placeholder="Instructions"
                        onChange={handleChange}
                        id="data-instructions"
                      />
                      {errors.instructions && touched.instructions ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.instructions}
                        </div>
                      ) : null}
                    </FormGroup>
                  </PerfectScrollbar>
                  <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
                    <Button
                      type="submit"
                      //   color="dark"
                      className="tautmore-manage-school_submit"
                      // disabled={loader}
                    >
                      {isLoading ? (
                        <Spinner color="white" size="sm" />
                      ) : (
                        <span className="mr-50">
                          {isEditAble ? "Update" : "Submit"}
                        </span>
                      )}
                    </Button>
                    <Button
                      className="ml-1 rp-manage-school_cancel"
                      color="dark"
                      outline
                      onClick={() => handleSidebar(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {/* <ToastContainer draggable={false} /> */}
      </>
    );
  }
}


export default DataListSidebar;
