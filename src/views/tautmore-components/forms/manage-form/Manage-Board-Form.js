import React, { useState } from "react";
import { bool, object, func } from "prop-types";
import { Label, FormGroup, Button, Spinner } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import "./ManageBoardForm.scss";
import {
  addBoard,
  editBoard,
} from "../../services/apis/manage-class-board-subject/manage-api";

// const type = [{ value: "Board", label: "board" }];

const DataListSidebar = ({
  show,
  title,
  handleSidebar,
  boardData,
  setRefresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleAddSubmit = (obj) => {
    let formData = {
      name: obj.name,
      description: obj.description,
      type: "board",
      logo: "board-logo",
    };

    if (show?.state === "edit") {
      const value = {
        id: boardData?._id,
        board: {
          name: obj.name,
          description: obj.description,
          logo: "board-logo",
        },
      };
      setIsLoading(true);
      editBoard(value).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          toast.success("Board Updated Successfully");
          handleSidebar(false, "");
          setRefresh(true);
        }
      });
    } else {
      setIsLoading(true);
      addBoard(formData).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          toast.success("Board Created Successfully");
          handleSidebar(false);
          setRefresh(true);
        }
      });
    }
  };

  const formSchema_board = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    description: Yup.string().required("Description is Required"),
    type: Yup.string(),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: boardData?.name || "",
          description: boardData?.description || "",
          logo: "",
          type: boardData?.type
            ? { value: boardData?.type, label: boardData?.type }
            : "",
        }}
        validationSchema={formSchema_board}
        onSubmit={(data) => handleAddSubmit(data, title)}
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
                  show: show?.status,
                })}
              >
                <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
                  <h4>
                    {show?.state === "edit"
                      ? "UPDATE BOARD DATA"
                      : "ADD NEW BOARD"}
                  </h4>
                  <X
                    size={20}
                    className="cursor-pointer"
                    onClick={() => handleSidebar(false, "")}
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
                      Board name
                    </Label>
                    <Field
                      type="text"
                      className={`form-control tautmore-input-style ${
                        errors.name && touched.name && "is-invalid"
                      }`}
                      name="name"
                      value={values.name}
                      placeholder="Board Name"
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
                      for="data-name"
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
                      id="data-desc"
                    />
                    {errors.description && touched.description ? (
                      <div className="rp-manage-school_error-message mt-25">
                        {errors.description}
                      </div>
                    ) : null}
                  </FormGroup>

                  {/* <FormGroup>
                    <Label
                      for="data-category"
                      className="rp-manage-school-input-title"
                    >
                      Logo
                    </Label>

                    <Button
                      className="ml-1 rp-manage-school_cancel"
                      color="dark"
                      outline
                      onClick={() => handleSidebar(false)}
                    >
                      Upload
                    </Button>
                  </FormGroup> */}

                  {/* <FormGroup>
                    <Label
                      for="data-category"
                      className="rp-manage-school-input-title"
                    >
                      Type
                    </Label>

                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      defaultValue={type[0]}
                      name="type"
                      value={values.type}
                      onChange={(e) => {
                        setFieldValue("type", e);
                      }}
                      options={type}
                    />
                    {errors.type && touched.type ? (
                      <div className="mt-25 ml-25 rp-manage-school_error-message">
                        {errors.type}
                      </div>
                    ) : null}
                  </FormGroup> */}
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
                        {show?.state === "edit" ? "Update" : "Submit"}
                      </span>
                    )}
                  </Button>
                  <Button
                    className="ml-1 rp-manage-school_cancel"
                    color="dark"
                    outline
                    onClick={() => handleSidebar(false, "")}
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
};

DataListSidebar.proptType = {
  boardData: object.isRequired,
  data: object.isRequired,
  loadData: func.isRequired,
  isEditAble: bool.isRequired,
};

export default DataListSidebar;
