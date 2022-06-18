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
import Sidebar from "../../forms/manage-form/Manage-Class-Form";
import classnames from "classnames";

const ClassFilter = ({
  searchtext,
  division,
  classData,
  handleSearchtext,
  handleBoard,
  setRefresh,
  sidebar,
  setSidebar,
}) => {
  const handleSidebar = (value, state) => {
    setSidebar({ status: value, state: state });
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
              placeholder="Search by name"
              onChange={(e) => handleSearchtext(e.target.value)}
            />
          </div>
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50 adminfilterSpan">
                {classData ? "Board" : "Board"}
              </span>
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem onClick={() => handleBoard("")}>Board</DropdownItem>
              <DropdownItem onClick={() => handleBoard("CBSC")}>
                CBSC
              </DropdownItem>
              <DropdownItem onClick={() => handleBoard("ICSC")}>
                ICSC
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <Sidebar
        show={sidebar}
        isEditAble={false}
        handleSidebar={handleSidebar}
        title={"ADD"}
        classData={classData}
        setRefresh={setRefresh}
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

export default ClassFilter;
