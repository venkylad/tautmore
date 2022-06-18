import React, { useState, useEffect } from "react";
import { bool, object, func } from "prop-types";
import { Label, FormGroup, Button, Spinner } from "reactstrap";
import { Formik, Field, Form } from "formik";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import "./ManageBoardForm.scss";
import {
  addClass,
  editClass,
  getAllBoard,
} from "../../services/apis/manage-class-board-subject/manage-api";

const DataListSidebar = ({
  isEditAble,
  show,
  classData,
  title,
  handleSidebar,
  setRefresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [allBoardList, setAllBoardList] = useState([]);

  console.log(classData, "ddd");

  useEffect(() => {
    getAllBoard().then((response) => {
      if (response?.status === 200) {
        const boardData = response?.data?.boards?.map((division) => {
          return {
            id: division._id,
            value: division.name,
            label: division.name,
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
      division: [],
      board: obj.board?.id,
      school_id: null,
    };

    if (show?.state === "edit") {
      const value = {
        id: classData?._id,
        class: formData,
      };
      editClass(value).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          toast.success("Class Edited Successfully");
          handleSidebar(false);
          setRefresh(true);
          console.log(response, "res");
        }
      });
    } else {
      setIsLoading(true);
      addClass(formData).then((response) => {
        if (response.status === 200) {
          setIsLoading(false);
          toast.success("Class Created Successfully");
          handleSidebar(false, "");
          setRefresh(true);
        }
      });
    }
  };

  const formSchema_manage_class = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    // division: Yup.object().required("Division is Required"),
    board: Yup.object().required("Board is Required"),
    // school_id: Yup.object().required("School is Required"),
  });

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: classData?.name || "",
          board: classData?.board
            ? {
                id: classData?.board?._id,
                value: classData?.board?.name,
                label: classData?.board?.name,
              }
            : "",
        }}
        validationSchema={formSchema_manage_class}
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
          // console.log(values);
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
                      ? "UPDATE CLASS DATA"
                      : "ADD NEW CLASS"}
                  </h4>
                  <X
                    size={20}
                    className="cursor-pointer"
                    onClick={() => handleSidebar(false, "")}
                  />
                </div>

                <PerfectScrollbar
                  className="data-list-fields px-2 mt-2"
                  // options={{ wheelPropagation: false }}
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
                        {errors.board}
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
    </>
  );
};

DataListSidebar.proptType = {
  data: object.isRequired,
  loadData: func.isRequired,
  isEditAble: bool.isRequired,
};

export default DataListSidebar;
