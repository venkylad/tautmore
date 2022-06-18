import React, { useState, useEffect } from "react";
import { bool, object, func } from "prop-types";
import { Label, FormGroup, Button, Spinner } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Select from "react-select";
import { toast } from "react-toastify";
import "./ManageBoardForm.scss";
import "react-phone-input-2/lib/style.css";
import * as Yup from "yup";

import {
  addSubject,
  editSubject,
  getAllBoard,
  getAllClass,
} from "../../services/apis/manage-class-board-subject/manage-api";
const DataListSidebar = ({
  show,
  data,
  title,
  handleSidebar,
  setRefresh,
  subjectData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allBoardList, setAllBoardList] = useState([]);
  const [allClassList, setAllClassList] = useState([]);

  useEffect(() => {
    getAllClass().then((response) => {
      if (response?.status === 200) {
        const classData = response?.data?.data?.map((item) => {
          return {
            id: item._id,
            value: item.name,
            label: item.name,
          };
        });
        setAllClassList(classData);
      }
    });
  }, []);

  useEffect(() => {
    getAllBoard().then((response) => {
      if (response?.status === 200) {
        const boardData = response?.data?.boards?.map((board) => {
          return {
            id: board._id,
            value: board.name,
            label: board.name,
          };
        });
        setAllBoardList(boardData);
      }
    });
  }, []);

  const handleAddSubmit = (obj) => {
    console.log(obj, "obj");

    let formData = {
      name: obj.name,
      description: obj.description,
      class: obj.class.id,
      board: obj.board.id,
      logo: "",
    };

    console.log(formData, "form");

    if (show?.state === "edit") {
      const value = {
        subjectId: subjectData && subjectData._id,
        ...formData,
      };
      editSubject(value).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          toast.success("Subject updated Successfully");
          handleSidebar(false);
          setRefresh(true);
        }
      });
    } else {
      setIsLoading(true);
      addSubject(formData).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          toast.success("Subject Created Successfully");
          handleSidebar(false);
          setRefresh(true);
        }
      });
    }
  };

  const formSchema_subject = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    description: Yup.string().required("Description is Required"),
    class: Yup.object().required("Class is Required"),
    board: Yup.object().required("Board is Required"),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: subjectData?.name || "",
          description: subjectData?.description || "",
          class:
            {
              id: subjectData?.class?._id,
              value: subjectData?.class?.name,
              label: subjectData?.class?.name,
            } || "",
          board:
            {
              id: subjectData?.board?._id,
              value: subjectData?.board?.name,
              label: subjectData?.board?.name,
            } || "",
        }}
        validationSchema={formSchema_subject}
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
                      ? "UPDATE BOARD SUBJECT"
                      : "ADD NEW SUBJECT"}
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
                      placeholder="Subject name"
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
                      for="data-board"
                      className="rp-manage-school-input-title"
                    >
                      Board
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      defaultValue={allBoardList[0]}
                      name="board"
                      value={values.board}
                      onChange={(e) => {
                        setFieldValue("board", e);
                      }}
                      options={allBoardList}
                    />
                    {errors.board && touched.board ? (
                      <div className="mt-25 ml-25 rp-manage-school_error-message">
                        {errors.role}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup>
                    <Label
                      for="data-board"
                      className="rp-manage-school-input-title"
                    >
                      Class
                    </Label>
                    <Select
                      className="React tautmore-admin-selectbox"
                      classNamePrefix="select"
                      defaultValue={allClassList[0]}
                      name="class"
                      value={values.class}
                      onChange={(e) => {
                        setFieldValue("class", e);
                      }}
                      options={allClassList}
                    />
                    {errors.class && touched.class ? (
                      <div className="mt-25 ml-25 rp-manage-school_error-message">
                        {errors.class}
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
                      placeholder="Description "
                      onChange={handleChange}
                      id="data-description"
                    />
                    {errors.description && touched.description ? (
                      <div className="rp-manage-school_error-message mt-25">
                        {errors.description}
                      </div>
                    ) : null}
                  </FormGroup>
                </PerfectScrollbar>
                <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
                  <Button
                    type="submit"
                    className="tautmore-manage-school_submit"
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
      {/* <ToastContainer draggable={false} /> */}
    </>
  );
};

DataListSidebar.proptType = {
  data: object.isRequired,
  loadData: func.isRequired,
  isEditAble: bool.isRequired,
};

export default DataListSidebar;
