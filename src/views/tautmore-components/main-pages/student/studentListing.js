import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as Icon from "react-feather";
import Table from "../../utility/table";
import { Link, useHistory } from "react-router-dom";
import { studentData } from "./mockData";
import "./student-style.scss";
import ListingViewDetail from "./listingViewDetail";
import AddStudent from "./addStudent";

const StudentListing = () => {
  const history = useHistory();

  const [activeTab, setActiveTab] = useState("1");
  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [student, setStudent] = useState({});
  const classesList = ["1", "2", "3", "4", "5", "6"];
  const rowClickHandler = (row) => {
    console.log("Clicked row: => ", row);
    // history.push(`/student/${row.id}`);
    setStudent(row);
    setDetailOpen(true);
  };
  const tableColumns = [
    {
      id: 2,
      name: "ID No",
      selector: (row) => (
        <div className="teacher-id">
          <Icon.User size="20" className="teacher-icon" />
          <span>{row.id}</span>
        </div>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Overall Avg.",
      selector: (row) => <div title={row.avg}>{row.avg}</div>,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "Current status",
      selector: (row) => (
        <div className="teacher-status">
          <div className="status">
            <div
              className={`status-indicator ${
                row.status === "Inactive" ? "leave" : ""
              }`}
            ></div>
            <span>{row.status}</span>
          </div>
          <span className="status-extra-text">
            {row.extra ? row.extra : ""}
          </span>
        </div>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "",
      selector: (row) => (
        <Link to={`/teacher/${row.id}`} className="teacher-deatail-view">
          View Details
        </Link>
      ),
      sortable: true,
      reorder: true,
    },
  ];
  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8" className="teacher-heading">
          <h4>Student</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
        </Col>
      </Row>
      <div className="mx-1">
        <Button
          color="secondary"
          outline
          onClick={() => setFormOpen(true)}
          className="new-teacher-btn list-button d-flex align-items-center justify-content-center"
        >
          <Icon.Plus size="20" className="add-new-icon" /> Add New Student
        </Button>
      </div>
      <Nav tabs className="teacher-navs mt-2">
        <div className="teacher-nav-bottom-border"></div>
        {classesList.map((className) => (
          <NavItem className="teacher-nav-item" key={className}>
            <NavLink
              className={`teacher-nav-link ${
                activeTab === className ? "active" : ""
              }`}
              onClick={() => setActiveTab(className)}
            >
              Class {className}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={activeTab} className="mt-2"></TabPane>
        <Row>
          <Col sm="12" md="12">
            {/* <div className="teacher-search">
                <input
                  type="text"
                  placeholder="Search Name/ID No."
                  // onChange={(e) => handleSearch(e.target.value)}
                />
                <Icon.Search size="20" className="search-icon" />
              </div> */}
            <div className="data-list-header d-flex justify-content-between flex-wrap datalistAdmin">
              <div className="actions-right rp-manageSchool-head-main d-flex  flex-wrap mt-sm-0 mt-2">
                <div className="filter-section custom-filtersection">
                  <Input type="text" placeholder="Search by name" />
                </div>
                <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
                  <DropdownToggle
                    color=""
                    className="sort-dropdown studentfilter-btn"
                  >
                    <span className="align-middle mx-50 adminfilterSpan">
                      Subject
                    </span>
                    <Icon.ChevronDown size={16} />
                  </DropdownToggle>
                  <DropdownMenu className="customadmindropdown" tag="div" right>
                    <DropdownItem
                    // onClick={() => handleRole("")}
                    >
                      Role
                    </DropdownItem>

                    <DropdownItem
                    // onClick={() => handleRole("data-operator")}
                    >
                      data-operator
                    </DropdownItem>

                    <DropdownItem
                    // onClick={() => handleRole("executive")}
                    >
                      executive
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
                  <DropdownToggle
                    color=""
                    className="sort-dropdown studentfilter-btn"
                  >
                    <span className="align-middle mx-50 adminfilterSpan">
                      Status
                    </span>
                    <Icon.ChevronDown size={16} />
                  </DropdownToggle>
                  <DropdownMenu className="customadmindropdown" tag="div" right>
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
          </Col>
        </Row>
        <Table
          columns={tableColumns}
          data={studentData}
          onRowClicked={rowClickHandler}
          rowsPerPage={5}
          parentClassName="teacher-table-container student-table"
          tableClassName="teacher-table"
          shouldPaginate={true}
        />
      </TabContent>
      <div className="AddNewTeacherForm-div">
        <AddStudent show={formOpen} onClose={() => setFormOpen(false)} />
      </div>
      <div className="AddNewTeacherForm-div">
        <ListingViewDetail
          show={detailOpen}
          onClose={() => setDetailOpen(false)}
          student={student}
        />
      </div>
    </React.Fragment>
  );
};

export default StudentListing;
