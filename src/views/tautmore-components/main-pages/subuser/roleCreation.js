import React, { useState } from "react";
import classNames from "classnames";
import { X } from "react-feather";
import { Row, Col, Button, FormGroup, Label } from "reactstrap";
import Switch from "react-switch";
import { Formik, Field, Form } from "formik";
import { formschema_role } from "../../utility/schema/Fields_Schema";
import { addRoles } from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { editRoles } from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";



const RoleCreation = ({ show, onClose, edit, data, loadData }) => {
  console.log(onClose,show,data)
  const [checked, setChecked] = useState(data?data.access:{
    syllabusManagement: false,
    teacherManagement: false,
    studentManagement: false,
    examsManagement: false,
    subscribptionManagement: false,
    questionManagement: false,
    adminManagement: false,
    support: false,
    // manual: false,
  });
  const handleSelect = (value, stateName) => {
    let upDatedState = { ...checked };
    upDatedState[stateName] = value;
    setChecked({ ...upDatedState });
  };

  const handleAddSubmit = (obj) => {
    console.log(obj)
    console.log(checked)

    let formData = {
      role:obj.roleName,
      access: checked
    }

    let editformData ={
      roleId:obj.id,
      role:obj.roleName,
      access: checked
    }

    if(edit == true){
      editRoles(editformData).then((resp)=>{
        if(resp.status == 200){
          toast.success("Role Updated Successfully")
          onClose();
          loadData();
        }
        else{
          toast.error("something went wrong")
        }
      })
    }else{
      addRoles(formData).then((resp)=>{
        if(resp.status == 200){
          toast.success("Role Added Successfully");
          // setChecked({
          //   syllabusManagement: false,
          //   teacherManagement: false,
          //   studentManagement: false,
          //   examsManagement: false,
          //   subscribptionManagement: false,
          //   questionManagement: false,
          //   adminManagement: false,
          //   support: false,
          //   // manual: false,
          // })
          onClose();
          loadData();
        }
      }).catch((error)=>{
        console.log(error.response.data)
        toast.error(error.response.data.message);
      })
    }

    
  }
  return (
    <>
    <Formik
      enableReinitialize
      initialValues={{
        roleName: data && data.role ? data.role : "",
        id:data && data._id ? data._id : "",
      }}
      validationSchema={formschema_role}
      onSubmit={(data,...rest) => handleAddSubmit(data)}
    >
      {({ errors, touched, values, handleSubmit, handleChange }) => (
        
        <Form onSubmit={handleSubmit}>
        <div
          className={classNames("teacher-form-wrapper data-list-sidebar", {
            show: show,
          })}
        >
          <Row>
            <Col
              sm="12"
              md="12"
              lg="12"
              xl="12"
              className="teacherform-heading"
            >
              <div className="d-flex justify-content-between align-items-center atfHeading">
                {/* {data?<div>Edit role</div>:<div>Add new role</div>} */}
                <h4>
                      {data && Object.keys(data).length !== 0
                        ? "Edit role"
                        : "Add new role"}
                    </h4>
                <div onClick={onClose}>
                  <X size="20" />
                </div>
              </div>
            </Col>
            <Col className="mt-3 mx-1">
            <FormGroup>
                    <Label
                      for="data-name"
                      className="rp-manage-school-input-title"
                    >
                      Role Name
                    </Label>
                    <Field type="hidden" name="id" value={values.id}/>
                    <Field
                      type="text"
                      className={`form-control ${
                        errors.roleName &&
                        touched.roleName &&
                        "is-invalid"
                      }`}
                      name="roleName"
                      value={values.roleName}
                      placeholder="Role Name"
                      onChange={handleChange}
                      id="data-name"
                    />
                    {errors.roleName && touched.roleName ? (
                      <div className="rp-manage-school_error-message mt-25">
                        {errors.roleName}
                      </div>
                    ) : null}
                  </FormGroup>
            </Col>
          </Row>
          <Row className="switch-wrapper">
            <Col sm="12" md="12" lg="12" xl="12" className="switchline mb-1">
              <div>
                <h3 className="roleCreaction-subHeading">
                  Manually give access to-
                </h3>
              </div>
              {/* <div>
    <Switch
      onChange={(value) => handleChange(value, "manual")}
      checked={checked.manual}
      checkedIcon={false}
      uncheckedIcon={false}
      onColor="#1AAE9F"
      offColor="#4B5C6B"
      handleDiameter={22}
    />
  </div> */}
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">Manage Syllabus</h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "syllabusManagement")}
                  checked={checked.syllabusManagement}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  onColor="#1AAE9F"
                  handleDiameter={22}
                />
              </div>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">Manage teacher</h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "teacherManagement")}
                  checked={checked.teacherManagement}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={22}
                  onColor="#1AAE9F"
                />
              </div>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">Manage student</h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "studentManagement")}
                  checked={checked.studentManagement}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={22}
                  onColor="#1AAE9F"
                />
              </div>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">
                  Manage exams
                </h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "examsManagement")}
                  checked={checked.examsManagement}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={22}
                  onColor="#1AAE9F"
                />
              </div>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">Manage subscription</h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "subscribptionManagement")}
                  checked={checked.subscribptionManagement}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={22}
                  onColor="#1AAE9F"
                />
              </div>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">Manage questions</h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "questionManagement")}
                  checked={checked.questionManagement}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={22}
                  onColor="#1AAE9F"
                />
              </div>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">Manage admin</h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "adminManagement")}
                  checked={checked.adminManagement}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={22}
                  onColor="#1AAE9F"
                />
              </div>
            </Col>
            <Col sm="12" md="12" lg="12" xl="12" className="switchline">
              <div>
                <h5 className="roleCreaction-subHeading">Support</h5>
              </div>
              <div>
                <Switch
                  onChange={(value) => handleSelect(value, "support")}
                  checked={checked.support}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={22}
                  onColor="#1AAE9F"
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col
              sm="6"
              md="6"
              lg="6"
              xl="6"
              className="text-center roleCreate-addbtn "
            >
              <Button color="primary" type="submit" className="addstudent-addbtn">
              {data && Object.keys(data).length !== 0
                        ? "Update "
                        : "Add role"}
              </Button>
            </Col>
            <Col
              sm="6"
              md="6"
              lg="6"
              xl="6"
              className="text-center roleCreate-cancelbtn"
            >
              <Button color="black" outline onClick={onClose}>
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
      )
        
        
      }
    </Formik>
    {/* <ToastContainer draggable={false} /> */}
    </>
  );
};

export default RoleCreation;
