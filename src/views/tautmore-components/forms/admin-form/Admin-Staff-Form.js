import React, { Component } from "react";
import { bool, object, func } from "prop-types";
import { Label, Input, FormGroup, Button, Row, Col, Spinner } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { formSchema_rp_staffs } from "../../utility/schema/Fields_Schema";
import "./AdminForm.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { addAdmin, editAdmin } from "../../../../redux/actions/admin";
import { connect } from "react-redux";
import { getAllRoles } from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";

// const role = [
//   { value: "executive", label: "Executive" },
//   { value: "data-operator", label: "Data Operator" },
// ];

class DataListSidebar extends Component {
  state = {
    isLoading: false,
    role: [],
  };

  componentDidMount() {
    this.roleList();
  }

  async roleList() {
    try {
      let localInfo = JSON.parse(localStorage.getItem("tautmore-user"));
      const res = await getAllRoles();
      console.log(res);
      if (res.status == 200) {
        let temp = res.data && res.data.roles;
        let updatedArray = [];
        temp.map((item) => {
          let obj = {
            value: item.role,
            label: item.role,
            id: item._id,
          };
          updatedArray.push(obj);
        });
        if (localInfo.access?.["edit-executive"]) {
          this.setState({
            role: updatedArray,
          });
        }
        if (localInfo.access?.["edit-data-operator"]) {
          let newArray = [];
          newArray = updatedArray.filter((role) => {
            return role.value === "data-entry-operator";
          });
          console.log(newArray, "data");
          this.setState({
            role: newArray,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate () {

    if (this.props.addadmin?.statusCode === 200) {
      this.props.handleSidebar(false);
    }

    if (this.props.editadmin?.statusCode === 200) {
      this.props.handleSidebar(false);
      this.setState({ isLoading: false });
      toast.success("Admin Data Edited Successfully");
      this.props.clearEditadmin();
      this.props.loadData();
    }else if (this.props.editadmin === "error") {
      toast.error("Error in Edit admin!");
      this.props.clearEditadmin();
    }
  }
  handleAddSubmit = (obj) => {
    const { isEditAble } = this.props;

    let localId = JSON.parse(localStorage.getItem("tautmore-user"));

    let formData = {
      name: obj.name,
      role: obj.role.value,
      roleId: obj.role.id,
      email: obj.email,
      phone: obj.phone,
      password: obj.password,
      location: "dommlur",
      address: "shijhsijsihsi",
      created_by: localId.id,
    };

    let editFormData = {
      name: obj.name,
      role: obj.role.value,
      roleId: obj.role.id,
      email: obj.email,
      phone: obj.phone,
      location: "dommlur",
      address: "shijhsijsihsi",
      created_by: localId.id,
    };

    this.setState({ isLoading: true });
    if (isEditAble) {
      const value = {
        id: this.props.data && this.props.data._id,
        admin: editFormData,
      };
      console.log(value);
      this.props.editAdmin(value);
    } else {
      this.props.addAdmin(formData);
    }
  };

  render() {
    let { isEditAble, show, data, title, handleSidebar } = this.props;
    let { role } = this.state;

    const { isLoading } = this.state;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            name: data?.name || "",
            role: data?.roleId
              ? {
                  value: data?.roleId.role,
                  label: data?.roleId.role,
                  id: data?.roleId?._id,
                }
              : "",
            email: data?.email || "",
            phone: data?.phone.toString(),
            password: data?.password || "",
            repassword: data?.repassword || "",
          }}
          validationSchema={formSchema_rp_staffs(isEditAble)}
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
                        ? "UPDATE ADMIN DATA"
                        : "ADD NEW ADMIN"}
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
                        Name
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.name && touched.name && "is-invalid"
                        }`}
                        name="name"
                        value={values.name}
                        placeholder="Name"
                        onChange={handleChange}
                        id="data-name"
                      />
                      {errors.name && touched.name ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.name}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
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
                    </FormGroup>

                    <Row>
                      <Col lg="6" md="12">
                        <FormGroup>
                          <Label
                            for="data-password"
                            className="rp-manage-school-input-title"
                          >
                            Password
                          </Label>
                          <Input
                            className={`form-control tautmore-input-style ${
                              errors.password &&
                              touched.password &&
                              "is-invalid"
                            }`}
                            type="password"
                            value={values.password}
                            name="password"
                            placeholder="******"
                            onChange={handleChange}
                            id="data-password"
                            disabled={isEditAble}
                          />
                          {errors.password && touched.password ? (
                            <div className="mt-25 ml-25 rp-manage-school_error-message">
                              {errors.password}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>

                      <Col lg="6" md="12">
                        <FormGroup>
                          <Label
                            for="data-password"
                            className="rp-manage-school-input-title"
                          >
                            Re-enter Password
                          </Label>
                          <Input
                            className={`form-control tautmore-input-style ${
                              errors.repassword &&
                              touched.repassword &&
                              "is-invalid"
                            }`}
                            type="password"
                            value={values.repassword}
                            name="repassword"
                            placeholder="******"
                            onChange={handleChange}
                            id="data-repassword"
                            disabled={isEditAble}
                          />
                          {errors.repassword && touched.repassword ? (
                            <div className="mt-25 ml-25 rp-manage-school_error-message">
                              {errors.repassword}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </PerfectScrollbar>
                  <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
                    <Button
                      type="submit"
                      //   color="dark"
                      className="tautmore-manage-school_submit"
                      // disabled={loader}
                    >
                      {/* {isLoading ? (
                        <Spinner color="white" size="sm" />
                      ) : ( */}
                      <span className="mr-50">
                        {isEditAble ? "Update" : "Submit"}
                      </span>
                      {/* )} */}
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

DataListSidebar.proptType = {
  data: object.isRequired,
  loadData: func.isRequired,
  isEditAble: bool.isRequired,
};

const mapStateToProps = (state) => ({
  addadmin: state.admin.addadmin,
  editadmin: state.admin.editadmin,
});

const mapDispatchToProps = (dispatch) => ({
  addAdmin: (data) => dispatch(addAdmin(data)),
  editAdmin: (data) => dispatch(editAdmin(data)),
  clearEditadmin: () => dispatch({ type: "CLEAR_EDIT_ADMIN" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataListSidebar);
