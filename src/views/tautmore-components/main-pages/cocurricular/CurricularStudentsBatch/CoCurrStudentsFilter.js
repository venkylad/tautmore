import React from "react";
import { Input } from "reactstrap";
import { history } from "../../../../../history";

const CoCurrStudentsFilter = ({handleSearchText}) => {

    const setSearchText = (data) =>{
        if (data.length >= 3) {
            handleSearchText(data);
            let urlPrefix = "/co-curricular-students-batch";
            history.push(`${urlPrefix}?page=1`);
          } else if (data.length === 0) {
            handleSearchText(data);
          }
    }
  return (
    <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistClasses">
      <div className="actions-right rp-manageSchool-head-main-Classes d-flex flex-wrap mt-sm-0 mt-2">
      <div
          className="classesfilter-section customClass-filtersection">
          <Input
            type="text"
            placeholder="Search by name"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CoCurrStudentsFilter;
