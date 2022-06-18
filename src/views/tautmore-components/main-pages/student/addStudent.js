import classNames from "classnames";
// import * as Icon from "react-feather";
import React, { useState } from "react";
import Select from "react-select";

import { X, User } from "react-feather";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
const AddStudent = ({ show, onClose }) => {
  // const [selectClass, setSelectClass] = useState({});
  const role = [
    { value: "Class 1", label: "Class 1" },
    { value: "Class 2", label: "Class 2" },
  ];
  const roleSection = [
    { value: "Section 1", label: "Section 1" },
    { value: "Section 2", label: "Section 2" },
  ];
  return (
    <div
      className={classNames(
        "teacher-form-wrapper data-list-sidebar listing-wrapper",
        {
          show: show,
        }
      )}
    >
      <Row className="teacher-form">
        <Col sm="12" md="12" lg="12" xl="12" className="teacherform-heading">
          <div className="d-flex justify-content-between align-items-center atfHeading">
            <div>Student details</div>
            <div onClick={onClose}>
              <X size="20" />
            </div>
          </div>
        </Col>
        <Col sm="12" md="12" lg="12" xl="12" className="lisitingview-body">
          <div className="listing-top">
            <Row>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="d-flex justify-content-center lisiting-image"
              >
                <div>
                  <User size={60} />
                </div>
              </Col>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="d-flex justify-content-center"
              >
                <Label htmlFor="std-img" className="add-imageline">
                  Add Image
                </Label>
                <input type="file" id="std-img" name="std-img" hidden />
              </Col>
            </Row>
          </div>

          <div className="addStudent-bottom">
            <Row>
              <Col sm="12" md="12" lg="12" xl="12">
                <FormGroup>
                  <Label
                    htmlFor="name"
                    className="rp-manage-school-input-title"
                  >
                    Name
                  </Label>
                  <input
                    id="name"
                    type="text"
                    className="form-control tautmore-input-style"
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="12" lg="12" xl="12">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="idno"
                  >
                    ID no.
                  </Label>
                  <input
                    name="idno"
                    type="text"
                    className="form-control tautmore-input-style"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="DateofBirth"
                  >
                    Date of Birth
                  </Label>
                  <input
                    type="date"
                    name="DateofBirth"
                    className="form-control tautmore-input-style"
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="DateofJoining"
                  >
                    Date of Joining
                  </Label>
                  <input
                    type="date"
                    name="DateofJoining"
                    className="form-control tautmore-input-style"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="class"
                  >
                    class
                  </Label>
                  <Select
                    className="React tautmore-admin-selectbox"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="role"
                    // value={selectClass?.value}
                    // onChange={(e) => {
                    //   console.log(e);
                    //   setSelectClass(e);
                    // }}
                    options={role}
                  />
                </FormGroup>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="Section"
                  >
                    Section
                  </Label>
                  <Select
                    className="React tautmore-admin-selectbox"
                    classNamePrefix="select"
                    // defaultValue={role[0]}
                    name="Section"
                    // value={selectClass?.value}
                    // onChange={(e) => {
                    //   console.log(e);
                    //   setSelectClass(e);
                    // }}
                    options={roleSection}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="12" xl="12">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="Parent/Guardian"
                  >
                    Parent/Guardian's Name
                  </Label>
                  <input
                    type="date"
                    name="Parent/Guardian"
                    className="form-control tautmore-input-style"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-1 mb-1">
              <Col>
                <FormGroup check className="d-flex">
                  <Input
                    name="radio1"
                    type="radio"
                    className="addstudent-inputradio"
                  />
                  <Label check className="addstudent-inputlabel">
                    Father
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check className="d-flex">
                  <Input
                    name="radio1"
                    type="radio"
                    className="addstudent-inputradio"
                  />
                  <Label check className="addstudent-inputlabel">
                    Mother
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup check className="d-flex">
                  <Input
                    name="radio1"
                    type="radio"
                    className="addstudent-inputradio"
                  />
                  <Label check className="addstudent-inputlabel">
                    Guardian
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="12" xl="12">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="Contactnumber"
                  >
                    Contact number
                  </Label>
                  <input
                    type="date"
                    name="Contactnumber"
                    className="form-control tautmore-input-style"
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="12" lg="12" xl="12">
                <FormGroup>
                  <Label
                    className="rp-manage-school-input-title"
                    htmlFor="ResidentialAddress"
                  >
                    Residential Address
                  </Label>
                  <input
                    type="date"
                    name="ResidentialAddress"
                    className="form-control tautmore-input-style"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="text-center mt-3 mb-3"
              >
                <Button className="addstudent-addbtn">Add Student</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddStudent;
