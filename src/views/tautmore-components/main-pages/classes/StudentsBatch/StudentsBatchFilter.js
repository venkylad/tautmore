import React from "react";
import { Input } from "reactstrap";

const StudentsBatchFilter = ({searchText,setSearchText}) => {
  return (
    <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistClasses">
      <div className="actions-right rp-manageSchool-head-main-Classes d-flex flex-wrap mt-sm-0 mt-2">
      <div
          className="classesfilter-section customClass-filtersection">
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentsBatchFilter;
