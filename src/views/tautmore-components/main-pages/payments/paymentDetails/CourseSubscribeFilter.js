import React, {useState, useEffect} from "react";
import { UncontrolledDropdown } from "reactstrap";
import { getAllClass } from '../../../services/apis/tautmore_exams_apis/tautmore_exams_apis';
import { getAllSubject } from '../../../services/apis/tautmore_exams_apis/tautmore_exams_apis';
import Select from "react-select";
import "../PaymentsMain.scss";
import { history } from "../../../../../history";
import { Input } from "reactstrap";

const CourseSubscribeFilter = ({
    searchtext,
    handleSearchtext,
  subClass,
  handleSubClassFilter,
  subSubject,
  handleSubSubjectFilter,
  id
}) => {
  const [allGrade, setAllGrade] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const changeClass = (data) => {
    console.log(data);
    handleSubClassFilter(data);
    handleSubSubjectFilter("")
    getSubjectByClass({ classId: data.id });
    let urlPrefix = `/payments-details/${id}`;
    history.push(`${urlPrefix}?page=1`);
  };

  const changeSubject = (data) => {
    console.log(data);
    handleSubSubjectFilter(data);
    let urlPrefix = `/payments-details/${id}`;
    history.push(`${urlPrefix}?page=1`);
  };

  const handleSearchtextFilter = (value) =>{
    if(value.length >= 3){
      handleSearchtext(value)
    let urlPrefix = `/payments-details/${id}`;
    history.push(`${urlPrefix}?page=1`);
    }
    else if(value.length === 0){
      handleSearchtext(value)
    }
  }

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
            value={subClass}
            onChange={changeClass}
            options={allGrade}
            placeholder="Class"
          ></Select>
        </UncontrolledDropdown>

        <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
          <Select
            className="subconcept-select"
            classNamePrefix="select"
            value={subSubject}
            onChange={changeSubject}
            options={subjectList}
            placeholder="Subject"
          ></Select>
        </UncontrolledDropdown>
        <div className="filter-section custom-filtersection">
            <Input
              type="text"
              placeholder="Search by name"
              onChange={(e) => handleSearchtextFilter(e.target.value)}
            />
          </div>
      </div>
    </div>
  );
};

export default CourseSubscribeFilter;
