import React, {useState, useEffect} from "react";
import {
    UncontrolledDropdown,
    Input,
  } from "reactstrap";
  import { history } from "../../../../history";
//   import "./DiscountsMain.scss";
  import Select from "react-select";
  import "../../../../assets/scss/pages/data-list.scss";

  const statusRole = [
    {value:"All", label:"All", bool:"all"},
    {value:"Assigned", label:"Assigned", bool:true},
    {value:"Not Assigned", label:"Not Assigned", bool:false}
  ]

const ZoomFilter = ({
    searchtext,
    handleSearchtext,
    handleTeacherAssign
}) => {

    const [roleStatus, setRoleStatus]=useState([])

    const handleZoomSearchtext = (data) => {
        console.log(data)
        if (data.length >= 3) {
          handleSearchtext(data);
          let urlPrefix = "/zoom-users";
          history.push(`${urlPrefix}?page=1`);
        } else if (data.length === 0) {
          handleSearchtext(data);
        }
      };

      const changeStatus = (data)=>{
        handleTeacherAssign(data.bool)
        let urlPrefix = "/zoom-users";
        history.push(`${urlPrefix}?page=1`);
      }
    
      useEffect(()=>{
        setRoleStatus(statusRole)
      },[])

  return (
    <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistzoom">
      <div className="actions-right rp-manageSchool-head-main-zoom d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-zoom mr-1 d-md-block d-none">
          <Select
            className="subconcept-select"
            classNamePrefix="select"
            value={statusRole.value}
            onChange={changeStatus}
            options={statusRole}
            placeholder="Status"
          ></Select>
        </UncontrolledDropdown>

        <div className="zoomfilter-section custom-filtersection">
          <Input
            type="text"
            placeholder="Search by name"
            onChange={(e) => handleZoomSearchtext(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ZoomFilter;
