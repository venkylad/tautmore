import React from "react";
import { ChevronDown } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Row,
  Col
} from "reactstrap";

const LiveClassesFilter = () => {
  return (
    <Row>
      <Col sm="4">
      <h4 className="rp-manage-school-header-title">Live Classes</h4>
      </Col>
      <Col sm="8">
        <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistClasses">
          <div className="actions-right rp-manageSchool-head-main-dashboard d-flex flex-wrap mt-sm-0 mt-2">
            <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-dashboard mr-1 d-md-block d-none">
              <DropdownToggle color="" className="sort-dropdown">
                <span className="align-middle mx-50 adminfilterdisSpan">
                  Subject
                </span>
                <ChevronDown size={15} />
              </DropdownToggle>
              <DropdownMenu
                className="customadmindropdowndashboard"
                tag="div"
                right
              >
                <DropdownItem tag="a">Subject</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LiveClassesFilter;
