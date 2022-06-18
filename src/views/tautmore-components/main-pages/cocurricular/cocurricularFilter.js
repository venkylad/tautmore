import React , {useState, useEffect} from "react";
import { ChevronDown } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Button
} from "reactstrap";
import "./cocurricular.scss";
import { history } from "../../../../history";
import Select from "react-select";

const statusRole = [
  {value:"All", label:"All", bool:'All'},
  {value:"Scheduled", label:"Scheduled", bool:true},
  {value:"Not Scheduled", label:"Not Scheduled", bool:false}
]

const CoCurricularFilter = ({handleSearch,handleScheduled}) => {

  const [roleStatus, setRoleStatus] = useState([]) 

  const handleSearchtext = (data) => {
    if (data.length >= 3) {
      handleSearch(data);
      let urlPrefix = "/co-curricular";
      history.push(`${urlPrefix}?page=1`);
    } else if (data.length === 0) {
      handleSearch(data);
    }
  };

  const changeStatus = (data)=>{
    handleScheduled(data.bool)
    let urlPrefix = "/co-curricular";
    history.push(`${urlPrefix}?page=1`);
  }

  useEffect(()=>{
    setRoleStatus(statusRole)
  },[])
  return (
    <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistClasses">
      <div className="actions-right rp-manageSchool-head-main-Classes d-flex flex-wrap mt-sm-0 mt-2">
        <div
          className="classesfilter-section customClass-filtersection"
          style={{ marginRight: "15px" }}
        >
          <Input
            type="text"
            placeholder="Search by batch"
            onChange={(e) => handleSearchtext(e.target.value)}
          />
        </div>
        <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={roleStatus.value}
              onChange={changeStatus}
              options={roleStatus}
              placeholder="Status"
            ></Select>
          </UncontrolledDropdown>


        <div>
          <Button
            type="submit"
            //   color="dark"
            className="tautmore-manage-school_submit"
            style={{'fontSize':'16px'}}
            onClick={()=> history.push('/add-cocurricular-batch')}
          >
            Create Batch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoCurricularFilter;
