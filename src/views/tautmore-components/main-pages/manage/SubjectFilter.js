import React from "react";
import AddNewAdminButton from "../../utility/buttons/Button";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
} from "reactstrap";
import { ChevronDown } from "react-feather";

import Sidebar from "../../forms/manage-form/Manage-Subject-Form";
import classnames from "classnames";

const AdminFilter = ({
  searchtext,
  handleSearchtext,
  sidebar,
  setSidebar,
  setRefresh,
  classdataList,
  classfilter,
  subjectData,
  setClassfilter,
}) => {
  const handleSidebar = (value, type) => {
    setSidebar({ status: value, state: type });
  };

  return (
    <div>
      <AddNewAdminButton
        button_title=" Add New"
        onClick={() => handleSidebar(true, "add")}
      />

      <div className="data-list-header d-flex justify-content-between flex-wrap datalistAdmin">
        <div className="actions-right rp-manageSchool-head-main d-flex flex-wrap mt-sm-0 mt-2">
          <div className="filter-section custom-filtersection">
            <Input
              type="text"
              value={searchtext}
              placeholder="Search by subject name"
              onChange={(e) => handleSearchtext(e.target.value)}
            />
          </div>
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50 adminfilterSpan">
                {classfilter ? classfilter?.name : "Select Class"}
              </span>
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem onClick={() => setClassfilter("")}>
                Select
              </DropdownItem>
              {classdataList?.map((item) => (
                <DropdownItem onClick={() => setClassfilter(item)}>
                  {item?.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <Sidebar
        subjectData={subjectData}
        show={sidebar}
        handleSidebar={handleSidebar}
        setRefresh={setRefresh}
        title={"ADD"}
      />
      <div
        className={classnames("data-list-overlay", {
          show: sidebar?.status,
        })}
        onClick={() => handleSidebar(false, "")}
      />
    </div>
  );
};

export default AdminFilter;
