import classNames from "classnames";
// import * as Icon from "react-feather";
import React, { useState } from "react";
import { X, User } from "react-feather";
import { Button, Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
const ListingViewDetail = ({ show, onClose, student }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/student/${student.id}`);
  };

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

              <Col sm="12" md="12" lg="12" xl="12" className="text-center">
                <h4>Johnathan Doe</h4>
              </Col>
              <Col sm="12" md="12" lg="12" xl="12" className="text-center">
                <h4>CT-190001</h4>
              </Col>

              <Col sm="6" md="6" lg="6" xl="6" className="text-center">
                <Button color="primary" className="listing-viewbtn">
                  View Details
                </Button>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6" className="text-center">
                <Button
                  className="listing-editbtn"
                  outline
                  color="dark"
                  onClick={handleClick}
                >
                  Edit Profile
                </Button>
              </Col>
            </Row>
          </div>

          <div className="listing-bottom">
            <Row>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="performance-heading"
              >
                <h4>Performance Tracking</h4>
              </Col>
              <Col sm="12" md="12" lg="12" xl="12">
                <div className="d-flex justify-content-between align-item-center mt-1">
                  <div>Syllabus completion</div>
                  <div className="syllabus-percent">70%</div>
                </div>

                <div className="outerprogress-completion">
                  <div className="innerprogress-completion"></div>
                </div>
              </Col>
              <Col sm="12" md="12" lg="12" xl="12">
                <div className="d-flex justify-content-between align-item-center mt-1">
                  <div>Overall Performance</div>
                  <div className="average-progress">Average</div>
                </div>

                <div className="outerprogress-perform">
                  <div className="innerprogress-perform"></div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="detaillist-heading"
              >
                <h4>Details</h4>
              </Col>

              <Col sm="12" md="12" lg="12" xl="12" className="">
                <Row>
                  <Col sm="6" md="6" lg="6" xl="6">
                    <div>Class & Section</div>
                  </Col>
                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    className="detailstudent-answer"
                  >
                    <h5>8th</h5>
                  </Col>
                </Row>
              </Col>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                // className="d-flex justify-content-between align-items-center"
              >
                <Row>
                  <Col sm="6" md="6" lg="6" xl="6">
                    <div>Subjects</div>
                  </Col>
                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    className="detailstudent-answer"
                  >
                    <h5>All</h5>
                  </Col>
                </Row>
              </Col>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                // className="d-flex justify-content-between align-items-center"
              >
                <Row>
                  <Col sm="6" md="6" lg="6" xl="6">
                    <div>Date of birth</div>
                  </Col>
                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    className="detailstudent-answer"
                  >
                    <h5>19/11/200</h5>
                  </Col>
                </Row>
              </Col>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                // className="d-flex justify-content-between align-items-center"
              >
                <Row>
                  <Col sm="6" md="6" lg="6" xl="6">
                    <div>Date of joining</div>
                  </Col>
                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    className="detailstudent-answer"
                  >
                    <h5>02/04/2012</h5>
                  </Col>
                </Row>
              </Col>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                // className="d-flex justify-content-between align-items-center"
              >
                <Row>
                  <Col sm="6" md="6" lg="6" xl="6">
                    <div>Contact Info.</div>
                  </Col>
                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    className="detailstudent-answer"
                  >
                    <div>
                      <h5>+91-9876543210</h5>
                      <p>(Doe Jonathan)</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                // className="d-flex justify-content-between align-items-center"
              >
                <Row>
                  <Col sm="6" md="6" lg="6" xl="6">
                    <div>Parent/Guardian's name</div>
                  </Col>
                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    className="detailstudent-answer"
                  >
                    <div>
                      <h5>Doe Johnathan</h5>
                      <p>(Father)</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                // className="d-flex justify-content-between align-items-center"
              >
                <Row>
                  <Col sm="6" md="6" lg="6" xl="6">
                    <div>Residential Address</div>
                  </Col>
                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    xl="6"
                    className="detailstudent-answer"
                  >
                    <h5>
                      #34-A, 1st block, 22nd cross, Jayanagar 4th
                      block,Bengaluru-12
                    </h5>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ListingViewDetail;
