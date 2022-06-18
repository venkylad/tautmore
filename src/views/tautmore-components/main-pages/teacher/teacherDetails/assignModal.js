import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

import {
  getAllSubjectsAction,
  getAllTimeSlotsAction,
} from "../../../../../redux/actions/manage-teacher/index";

import Select from "react-select";
import "./teacherDetails.css";

const Assign = ({
  open,
  onclose,
  subjectsList,
  getAllSubjects,
  timeSlots,
  getAllTimeSlots,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(new Date());

  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [newSubjects, setNewSubjects] = useState("");
  const [timings, setTimings] = useState("");

  const [subjectOptions, setSubjectOption] = useState([
    { value: 1, label: "" },
  ]);

  useEffect(() => {
    if (!subjectsList?.data) {
      getAllSubjects();
    }
    if (subjectsList?.data?.length > 0) {
      const cdata = subjectsList?.data.map((data) => ({
        value: data.label,
        label: data.label,
      }));
      setSubjectOption(cdata);
    }
  }, [subjectsList, getAllSubjects]);

  const [timeslots, setTimeslots] = useState({ value: 1, label: "" });

  useEffect(() => {
    if (!timeSlots?.data) {
      getAllTimeSlots();
    }
    if (timeSlots?.data?.length > 0) {
      const gdata = timeSlots?.data.map((data) => ({
        value: data.value,
        label: data.value,
      }));
      setTimeslots(gdata);
    }
  }, [getAllTimeSlots, timeSlots]);

  return (
    <div>
      <Modal
        className="assign-modal"
        centered
        fullscreen
        size="md"
        isOpen={open}
      >
        <ModalHeader
          className="assign-header"
          toggle={() => {
            onclose(false);
          }}
        >
          Assign this teacher to a different class
        </ModalHeader>
        <ModalBody>
          <div className="modalmain">
            <div className="modal-row">
              <div>
                <input
                  className="number-input"
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Number"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div>
                {/* <select name="subject" id="subject">
                  <option value="maths">Maths</option>
                  <option value="science">Science</option>
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                </select> */}
                <Select className="assign-class" options={subjectOptions} />
              </div>
            </div>
            <div className="modal-row">
              <div>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  disabledKeyboardNavigation
                  placeholderText="Date"
                />
              </div>
              <div>
                <Select className="assign-class" options={timeslots} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="assign-footer">
          <Button color="primary">ASSIGN</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  subjectsList: state.adminTeacher.subjects,
  timeSlots: state.adminTeacher.timeSlots,
});

const mapDispatchToProps = (dispatch) => ({
  getAllSubjects: () => dispatch(getAllSubjectsAction()),
  getAllTimeSlots: () => dispatch(getAllTimeSlotsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assign);
