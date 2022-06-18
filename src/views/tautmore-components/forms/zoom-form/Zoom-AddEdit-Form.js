import { Formik, Form, Field } from "formik";
import React, { Component } from "react";
import {
    Label,
   
    FormGroup,
    Button,
    ToastHeader,
   
  } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { formschema_zoom } from "../../utility/schema/Fields_Schema";
import './ZoomForm.scss';
import { addZoomUsers } from "../../services/apis/zoom-api/zoom_api";
import { toast } from "react-toastify";

class DataListSidebar extends Component {

    handleAddSubmit = (obj) => {
        const { isEditAble } = this.props;

        let formData = {
            email:obj.email,
            firstName:obj.firstname,
            lastName:obj.lastname
        }
        console.log(obj)

        if (isEditAble) {
            console.log("edit");
          } else {
            this.addZoomUsersData(formData);
          }
    }

    async addZoomUsersData(data) {
        try{
            const res = await addZoomUsers(data)
            if(res.status === 200){
                toast.success('User Data Added Successfully');
                this.props.handleSidebar(false);
                this.props.getZoomUsersList()
            }
        }catch(error){
            toast.error(error.message);
        }
    }
  render() {
    let { isEditAble, show, data, title, handleSidebar } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            email: data?.email || "",
            firstname: data?.firstname || "",
            lastname: data?.lastname || "",
          }}
          validationSchema={formschema_zoom(isEditAble)}
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
                        ? "Update Zoom Users"
                        : "Add New Zoom Users"}
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
                        Email
                      </Label>
                      <Field
                        type="email"
                        className={`form-control tautmore-input-style ${
                          errors.email &&
                          touched.email &&
                          "is-invalid"
                        }`}
                        name="email"
                        value={values.email}
                        placeholder="email"
                        onChange={handleChange}
                        id="data-name"
                      />
                      {errors.email && touched.email ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.email}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-name"
                        className="rp-manage-school-input-title"
                      >
                        First Name
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.firstname &&
                          touched.firstname &&
                          "is-invalid"
                        }`}
                        name="firstname"
                        value={values.firstname}
                        placeholder="first name"
                        onChange={handleChange}
                        id="data-name"
                      />
                      {errors.firstname && touched.firstname ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.firstname}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup>
                      <Label
                        for="data-name"
                        className="rp-manage-school-input-title"
                      >
                        Last Name
                      </Label>
                      <Field
                        type="text"
                        className={`form-control tautmore-input-style ${
                          errors.lastname &&
                          touched.lastname &&
                          "is-invalid"
                        }`}
                        name="lastname"
                        value={values.lastname}
                        placeholder="first name"
                        onChange={handleChange}
                        id="data-name"
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className="rp-manage-school_error-message mt-25">
                          {errors.lastname}
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
                      <span className="mr-50">
                        {isEditAble ? "Update" : "Add Users"}
                      </span>
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
      </>
    );
  }
}

export default DataListSidebar;
