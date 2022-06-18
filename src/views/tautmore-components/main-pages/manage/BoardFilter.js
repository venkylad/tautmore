import React from "react";
import AddNewButton from "../../utility/buttons/Button";
import { Input } from "reactstrap";
import Sidebar from "../../forms/manage-form/Manage-Board-Form";
import classnames from "classnames";

const AdminFilter = ({
  handleSearchtext,
  setRefresh,
  sidebar,
  setSidebar,
  boardData,
}) => {
  const handleSidebar = (value, state) => {
    setSidebar({ status: value, state: state });
  };

  return (
    <div>
      <AddNewButton
        button_title="Add New"
        onClick={() => handleSidebar(true, "add")}
      />

      <div className="data-list-header d-flex justify-content-between flex-wrap datalistAdmin">
        <div className="actions-right rp-manageSchool-head-main d-flex flex-wrap mt-sm-0 mt-2">
          <div className="filter-section custom-filtersection">
            <Input
              type="text"
              placeholder="Search by board name"
              onChange={(e) => handleSearchtext(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Sidebar
        show={sidebar}
        boardData={boardData}
        handleSidebar={handleSidebar}
        title={"ADD"}
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

export default AdminFilter;
