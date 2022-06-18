import React from 'react';
import {
    Input,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
  } from "reactstrap";
import * as Icon from "react-feather";

const LeavesFilter = () => {
    return (
        <div className="data-list-header d-flex justify-content-between flex-wrap datalistAdmin">
                <div className="actions-right rp-manageSchool-head-main d-flex  flex-wrap mt-sm-0 mt-2">
                  <div className="filter-section custom-filtersection">
                    <Input 
                      type="text" 
                      placeholder="Search by name" 
                    //   value={searchName}
                    //   onChange={(e) => setSearchName(e.target.value)}
                    />
                  </div>
                  <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
                    <DropdownToggle
                      color=""
                      className="sort-dropdown teacherfilter-btn"
                    >
                      <span className="align-middle mx-50 adminfilterSpan">
                        Status
                      </span>
                      <Icon.ChevronDown size={16} />
                    </DropdownToggle>
                    <DropdownMenu
                      className="customadmindropdown"
                      tag="div"
                      right
                    >
                      <DropdownItem
                      // onClick={() => handleStatus("")}
                      >
                        Status
                      </DropdownItem>
                      <DropdownItem
                      // onClick={() => handleStatus("Active")}
                      >
                        Active
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
    )
}

export default LeavesFilter
