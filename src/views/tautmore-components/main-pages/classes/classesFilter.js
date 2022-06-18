import React from "react";
import { ChevronDown } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Button
} from "reactstrap";
import "./classes.scss";
import { history } from "../../../../history";

import Search from "../../../../assets/img/icons/search.png"

const ClassesFilter = ({batchText, handleBatchText, scheduledVal, setScheduledVal}) => {
  return (
    <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistClasses">
      <div className="actions-right rp-manageSchool-head-main-Classes d-flex flex-wrap mt-sm-0 mt-2">
        <div
          className="classesfilter-section customClass-filtersection"
          style={{ marginRight: "15px", display:"flex" }}
        >
          <div className="search-icon-and-search-bar"></div>
          <img style={{width:"20px",height:"20px",marginTop:"12px",marginRight:"10px"}} src={Search} alt="Search"></img>
          <Input
            type="text"
            placeholder="Search by batch name"
            value={batchText}
            onChange={(e) => handleBatchText(e.target.value)}
            
            // onChange={(e) => handleSearchtext(e.target.value)}
          />
        </div>
        <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Classes mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50 adminfilterdisSpan">
              {scheduledVal}
            </span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu className="customadmindropdownClasses" tag="div" right>
            <DropdownItem tag="a" onClick={() => setScheduledVal("Scheduled")}>Scheduled</DropdownItem>
            <DropdownItem tag="a" onClick={() => setScheduledVal("Not Scheduled")}>Not Scheduled</DropdownItem>
            <DropdownItem tag="a" onClick={() => setScheduledVal("All")}>All</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <div>
          <Button
            type="submit"
            //   color="dark"
            className="tautmore-manage-school_submit"
            style={{'fontSize':'16px'}}
            onClick={()=> history.push('/add-batch')}
          >
            Create Batch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassesFilter;
