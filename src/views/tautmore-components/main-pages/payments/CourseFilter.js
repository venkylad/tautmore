import React, {useState, useEffect} from "react";
import { UncontrolledDropdown } from "reactstrap";
import "./PaymentsMain.scss";
import { getAllClass } from '../../services/apis/tautmore_exams_apis/tautmore_exams_apis';
import { getAllSubject } from '../../services/apis/tautmore_exams_apis/tautmore_exams_apis';
import Select from "react-select";
import "./PaymentsMain.scss";
import { history } from "../../../../history";

const CourseFilter = ({
  classFilter,
  handleClassFilter,
  subject,
  handleSubjectFilter,
}) => {
  const [allGrade, setAllGrade] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const changeClass = (data) => {
    console.log(data);
    handleClassFilter(data);
    handleSubjectFilter("")
    getSubjectByClass({ classId: data.id });
    let urlPrefix = "/course-payments";
    history.push(`${urlPrefix}?page=1`);
  };

  const changeSubject = (data) => {
    console.log(data);
    handleSubjectFilter(data);
    let urlPrefix = "/course-payments";
    history.push(`${urlPrefix}?page=1`);
  };

  const getSubjectByClass = async (data) => {
    try {
      const res = await getAllSubject(data);
      if (res.status == 200) {
        let temp = res.data ? res.data.data : "";
        let updatedArray = [
          {
            value: "Subject",
            label: "Subject",
            id: "",
          },
        ];
        temp.map((item) => {
          let obj = {
            value: item.name,
            label: item.name,
            id: item?._id,
          };
          updatedArray.push(obj);
        });
        setSubjectList(updatedArray);
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  const getAllClassGrades = async () => {
    try {
      const res = await getAllClass();
      if (res.status === 200) {
        let temp = res.data ? res.data.data : "";
        let updatedArray = [
          {
            value: "Class",
            label: "Class",
            id: "",
          },
        ];
        temp.map((item) => {
          let obj = {
            value: item.name ,
            label: item.name ,
            id: item?._id,
          };
          updatedArray.push(obj);
        });
        setAllGrade(updatedArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClassGrades();
  }, []);

  return (
    <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistPayments">
      <div className="actions-right rp-payments-head-main d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
          <Select
            className="subconcept-select"
            classNamePrefix="select"
            value={classFilter}
            onChange={changeClass}
            options={allGrade}
            placeholder="Class"
          ></Select>
        </UncontrolledDropdown>

        <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
          <Select
            className="subconcept-select"
            classNamePrefix="select"
            value={subject}
            onChange={changeSubject}
            options={subjectList}
            placeholder="Subject"
          ></Select>
        </UncontrolledDropdown>
      </div>
    </div>
  );
};

export default CourseFilter;
