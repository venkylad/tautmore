import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import Assign from "./assignModal";
import { connect } from "react-redux";
import { updateTeacherAction } from "../../../../../redux/actions/manage-teacher/index";

const Classes = ({ subjects, timings }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="detail-bottom">
      <Row>
        <Col sm="12" md="12" lg="3" xl="3">
          <div className="detail-heading">GRADE 4</div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Subjects</p>
          <div className="detail-content">{subjects?.toString()}</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Timings</p>
          <div className="detail-content">Mon (9AM, 12PM)</div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="3" xl="3">
          <div className="detail-heading">GRADE 4</div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Subjects</p>
          <div className="detail-content">{subjects?.toString()}</div>
        </Col>
        <Col sm="6" md="6" lg="4" xl="4" className="my-1">
          <p className="detail-subheading">Timings</p>
          <div className="detail-content">Mon (9AM, 12PM)</div>
        </Col>
      </Row>
      <div className="mt-4">
        <Row>
          <Col className="d-flex align-items-center justify-content-center">
            <Button
              active={true}
              color="primary"
              outline
              size="lg"
              className="btn-approve mx-2"
              onClick={() => setOpenModal(true)}
            >
              Assign to class
            </Button>
            <Assign open={openModal} onclose={(value) => setOpenModal(value)} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateTeacher: (id) => dispatch(updateTeacherAction(id)),
});

export default connect(mapDispatchToProps)(Classes);
