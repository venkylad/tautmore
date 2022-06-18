import React, { useEffect, useState } from "react";
import AddNewAdminButton from "../../utility/buttons/Button";
import {
  UncontrolledDropdown,
  Input,
} from "reactstrap";
import Sidebar from "../../forms/discount-form/Discount-Add-Edit";
import { history } from "../../../../history";
import "./DiscountsMain.scss";
import classnames from "classnames";
import Select from "react-select";
import "../../../../assets/scss/pages/data-list.scss";


const statusRole = [
  {value:"", label:"Status"},
  {value:"active", label:"Active"},
  {value:"expired", label:"Expired"},
  // {value:"expired", label:"Expired"}
]

const DiscountFilter = ({
  searchtext,
  handleSearchtext,
  handleStatus,
  loadData
}) => {
  const [sidebar, setSidebar] = useState(false);
  const [roleStatus, setRoleStatus]=useState([])

  const handleSidebar = (value) => {
    console.log(value);
    setSidebar(value);
  };

  const handleDiscountSearchtext = (data) => {
    if (data.length >= 3) {
      handleSearchtext(data);
      let urlPrefix = "/discounts";
      history.push(`${urlPrefix}?page=1`);
    } else if (data.length === 0) {
      handleSearchtext(data);
    }
  };

  const changeStatus = (data)=>{
    handleStatus(data.value)
    let urlPrefix = "/discounts";
    history.push(`${urlPrefix}?page=1`);
  }

  useEffect(()=>{
    setRoleStatus(statusRole)
  },[])

  return (
    <div>
      <AddNewAdminButton
        button_title=" Create New Coupon"
        onClick={() => handleSidebar(true, true)}
      />

      <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistdiscount">
        <div className="actions-right rp-manageSchool-head-main-dis d-flex flex-wrap mt-sm-0 mt-2">
          {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-dis mr-1 d-md-block d-none">
            <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50 adminfilterdisSpan">
                Expiry
              </span>
              <ChevronDown size={15} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdowndis" tag="div" right>
              <DropdownItem tag="a">1 Month</DropdownItem>
              <DropdownItem tag="a">2 Months</DropdownItem>
              <DropdownItem tag="a">3 Months</DropdownItem>
              <DropdownItem tag="a">4 Months</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}

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

          <div className="discountfilter-section custom-filtersection">
            <Input
              type="text"
              placeholder="Search by Code"
              onChange={(e) => handleDiscountSearchtext(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* {sidebar ? (
          <div
            
          >
            <Sidebar
              show={sidebar}
              isEditAble={false}
              handleSidebar={handleSidebar}
              title={"ADD"}
            />

            <div
              className={classnames("data-list-overlay", {
                show: sidebar,
              })}
              onClick={() => this.handleSidebar(false)}
            />
          </div>
        ) : null} */}
         <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <Sidebar
        show={sidebar}
        isEditAble={false}
        handleSidebar={handleSidebar}
        title={"ADD"}
        loadData={loadData}
      />

      <div
        className={classnames("data-list-overlay", {
          show: sidebar,
        })}
        onClick={() => handleSidebar(false)}
      />
      </div>
    </div>
  );
};

export default DiscountFilter;
