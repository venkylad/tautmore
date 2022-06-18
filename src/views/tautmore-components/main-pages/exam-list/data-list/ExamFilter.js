import React, { useEffect, useState } from 'react'

import {
  ChevronDown,
} from "react-feather"
import { history } from "../../../../../history";
import {
  UncontrolledDropdown,
  Input
} from "reactstrap";
import Select from "react-select";
import { getAllClass } from '../../../services/apis/tautmore_exams_apis/tautmore_exams_apis';
import { getAllSubject } from '../../../services/apis/tautmore_exams_apis/tautmore_exams_apis';


const ExamFilter = ({
  searchtext,
  handleSearchtext,
  classFilter,
  handleClassFilter,
  subject,
  handleSubjectFilter
}) => {

  const [allGrade, setAllGrade] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const handleSearchtextFilter = (value) =>{
    if(value.length >= 3){
      handleSearchtext(value)
    let urlPrefix = "/regular-exams";
    history.push(`${urlPrefix}?page=1`);
    }
    else if(value.length === 0){
      handleSearchtext(value)
    }
  }

  // const classData = (value) => {
  //   const data = value.map((item) => ({
  //     value: item.name + "_" + item.board.name,
  //     label: item.name + "_" + item.board.name,
  //     id: item?._id,
  //   }));
  //   return data;
  // };

  const changeClass = (data) => {
   console.log(data)
   handleClassFilter(data);
   handleSubjectFilter("");
   getSubjectByClass({ classId: data.id })
   let urlPrefix = "/regular-exams";
    history.push(`${urlPrefix}?page=1`);
  };

  const changeSubject = (data)=>{
    console.log(data)
    handleSubjectFilter(data)
    let urlPrefix = "/regular-exams";
    history.push(`${urlPrefix}?page=1`);
  }

  const getSubjectByClass = async (data) => {
    try{
      const res = await getAllSubject(data);
      if(res.status == 200){
        let temp = res.data ? res.data.data : "";
        let updatedArray = [{
          value: "Subject",
          label: "Subject",
          id:""
        }];
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
    }catch(errors){
      console.log(errors);
    }
  }

  const getAllClassGrades = async () =>{
    try{
      const res = await getAllClass();
      if(res.status === 200){
        let temp = res.data ? res.data.data : "";
        let updatedArray = [{
          value: "Class",
          label: "Class",
          id:""
        }];
        temp.map((item) => {
          let obj = {
            value: item.name + "_" + item.board.name,
            label: item.name + "_" + item.board.name,
            id: item?._id,
          };
          updatedArray.push(obj);
        });
        setAllGrade(updatedArray);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
      getAllClassGrades();
  },[])

  return (
    <div>
      <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistExam">
          <div className="actions-right rp-manageSchool-headExam-main d-flex flex-wrap mt-sm-0 mt-2">
            

            {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50 adminfilterSpan">Subject</span>
                <ChevronDown size={15} />
              </DropdownToggle>
              <DropdownMenu className="customadmindropdown" tag="div" right>
                <DropdownItem tag="a">Maths</DropdownItem>
                <DropdownItem tag="a">Science</DropdownItem>
                <DropdownItem tag="a">Social</DropdownItem>
                <DropdownItem tag="a">English</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
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

            <div className="filter-section-exam custom-filterexamsection">
              <Input
                type="text"
                placeholder="Search by name"
                onChange={(e) => handleSearchtextFilter(e.target.value)}
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default ExamFilter;
