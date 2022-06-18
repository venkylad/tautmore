import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  NavLink,
  Input,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Table from "../../utility/table";
import * as Icon from "react-feather";
import { Link, useHistory } from "react-router-dom";
import AddNewTeacherForm from "./teacherDetails/addNewTeacherForm";
import "./teacher-style.scss";
import { getAllTeacherAction } from "../../../../redux/actions/manage-teacher/index";
import * as question_api from "../../../tautmore-components/services/apis/manage-teacher/manage-teacher-api";
import { connect } from "react-redux";
import Spinner from '../../../../components/@vuexy/spinner/Loading-spinner'

const Teacher = ({ getAllTeachers, teachers }) => {
  const [teacherList, setTeacherList] = useState([
    { name: "", id: " ", subject: [], status: "", extra: "" },
  ]);

  const [onBoardedTeachers, setOnBoarded] = useState([
    { name: "", id: " ", subject: [], status: "", extra: "" },
  ]);

  const [needApprovalTeachers, setneedApprovalTeachersd] = useState([
    { name: "", id: " ", subject: [], status: "", extra: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');


  useEffect(() => {
    setLoading(true);
    question_api
      .getAllTeachers({
        pageNo: 1,
        limit: 30,
        grade: '',
        subject: '',
        name: searchName,
      })
      .then((response) => {
        setLoading(false);
        const cdata = response?.data?.data?.teacherList.map((data) => ({
          id: data._id,
          name: data.fullName,
          subject: data.subject[0].name, //sailendra dash added [0] for achieve first value.
          status: data.active ? "Available" : "In class",
          onBoarded: data.onBoarded === "approved" ? "YES" : "NO",
        }));
        setTeacherList(cdata);
        if (onBoardedTeachers.length < 2) {
          const cdata2 = cdata?.filter((item) => item.onBoarded === "YES");
          setOnBoarded(cdata2);
        }
        if (needApprovalTeachers.length < 2) {
          const cdata3 = cdata?.filter((item) => item.onBoarded === "NO");
          setneedApprovalTeachersd(cdata3);
        }
      }).catch((err) => {
        console.log(err, 'err')
      })
  }, [needApprovalTeachers.length, onBoardedTeachers.length, searchName]);

  // useEffect(() => {
  //   if (!teachers?.data) {
  //     const data = {
  //       pageNo: 1,
  //       limit: 5,
  //       grade: '',
  //       subject: '',
  //       name: searchName,
  //     };  
  //     getAllTeachers(data);
  //   }
  //   if (teachers?.data?.teacherList?.length > 0) {
  //     const cdata = teachers?.data?.teacherList.map((data) => ({
  //       id: data._id,
  //       name: data.fullName,
  //       subject: data.subject,
  //       status: data.active ? "Available" : "In class",
  //       onBoarded: data.onBoarded === "approved" ? "YES" : "NO",
  //     }));
  //     setTeacherList(cdata);
  //     if (onBoardedTeachers.length < 2) {
  //       const cdata2 = cdata?.filter((item) => item.onBoarded === "YES");
  //       console.log(cdata2, "Cdata 2");
  //       setOnBoarded(cdata2);
  //     }
  //     if (needApprovalTeachers.length < 2) {
  //       const cdata3 = cdata?.filter((item) => item.onBoarded === "NO");
  //       console.log(cdata3, "Cdata 3");
  //       setneedApprovalTeachersd(cdata3);
  //     }
  //   }
  // }, [getAllTeachers, teachers, onBoardedTeachers, needApprovalTeachers]);



  const history = useHistory();
  const [activeTab, setActiveTab] = useState("2");
  const [formOpen, setFormOpen] = useState(false);

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
      name: "Subjects",
      selector: (row) => (
        // <div title={row.subject.join(", ")}>
        //   {row.subject.length > 10
        //     ? row.subject.slice(0, 10) + "..."
        //     : row.subject.join(", ")}
        // </div>
        <div title={row.subject}>
          {row.subject}
        </div>
      ),
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
              className={`status-indicator ${row.status === "Leave" ? "leave" : ""
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

  const tableApprovalColumns = [
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
      name: "Subjects",
      selector: (row) => (
        // <div title={row.subject.join(", ")}>
        //   {row.subject.length > 10
        //     ? row.subject.slice(0, 10) + "..."
        //     : row.subject.join(", ")}
        // </div>
        <div title={row.subject}>
          {row.subject}
        </div>
      ),
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
              className={`status-indicator ${row.status === "Leave" ? "leave" : ""
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
        <Link
          to={`/teacher/approval/${row.id}`}
          className="teacher-deatail-view"
        >
          View Details
        </Link>
      ),
      sortable: true,
      reorder: true,
    },
  ];

  const rowClickHandler = (row) => {
    console.log("Clicked row: => ", row);
    history.push(`/teacher/${row.id}`);
  };

  const approvalRowClickHandler = (row) => {
    console.log("Clicked row: => ", row);
    history.push(`/teacher/approval/${row.id}`);
  };

  // const handleSearch = (searchTerm) => {
  //   if (searchTerm === "" || searchTerm.length === 0) {
  //     // setTeacherList(teacherData);
  //   } else {
  //     let filteredData = teacherData.filter((teacher) =>
  //       teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     console.log(filteredData, "filteredData");
  //     // setTeacherList([...filteredData]);
  //   }
  // };
  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8" className="teacher-heading">
          <h4>Teachers</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p>
        </Col>
        <Col
          sm="4"
          className="teacher-total d-flex align-items-center justify-content-center"
        >
          <div className="total-count d-flex flex-column">
            <h4>{teacherList?.length}</h4>
            <h2>Total teachers</h2>
          </div>
        </Col>
      </Row>
      <div className="mx-1">
        <Button
          color="secondary"
          outline
          onClick={() => setFormOpen(true)}
          className="new-teacher-btn list-button d-flex align-items-center justify-content-center"
        >
          <Icon.Plus size="20" className="add-new-icon" /> Add New Teacher
        </Button>
      </div>
      <Nav tabs className="teacher-navs mt-2">
        <div className="teacher-nav-bottom-border"></div>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "1" ? "active" : ""}`}
            onClick={() => setActiveTab("1")}
          >
            All
          </NavLink>
        </NavItem>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "2" ? "active" : ""}`}
            onClick={() => setActiveTab("2")}
          >
            Onboarded
          </NavLink>
        </NavItem>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "3" ? "active" : ""}`}
            onClick={() => setActiveTab("3")}
          >
            Need approval
          </NavLink>
        </NavItem>
      </Nav>
      {!loading ?
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className="mt-2">
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
                      <Input
                        type="text"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                    </div>
                    <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
                      <DropdownToggle
                        color=""
                        className="sort-dropdown teacherfilter-btn"
                      >
                        <span className="align-middle mx-50 adminfilterSpan">
                          Subject
                        </span>
                        <Icon.ChevronDown size={16} />
                      </DropdownToggle>
                      <DropdownMenu
                        className="customadmindropdown"
                        tag="div"
                        right
                      >
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
              </Col>
            </Row>
            {/* <TableView
            tableColumns={tableColumns}
            teacherList={teacherList}
            rowClickHandler={rowClickHandler}
          /> */}
            <Table
              columns={tableColumns}
              data={teacherList}
              onRowClicked={rowClickHandler}
              rowsPerPage={5}
              parentClassName="teacher-table-container"
              tableClassName="teacher-table"
              shouldPaginate={true}
            />
          </TabPane>
          <TabPane tabId="2" className="mt-2">
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
                  <div className="actions-right rp-manageSchool-head-main d-flex flex-wrap mt-sm-0 mt-2">
                    <div className="filter-section custom-filtersection">
                      <Input
                        type="text"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                    </div>
                    <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
                      <DropdownToggle
                        color=""
                        className="sort-dropdown teacherfilter-btn"
                      >
                        <span className="align-middle mx-50 adminfilterSpan">
                          Subject
                        </span>
                        <Icon.ChevronDown size={16} />
                      </DropdownToggle>
                      <DropdownMenu
                        className="customadmindropdown"
                        tag="div"
                        right
                      >
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
              </Col>
            </Row>
            <Table
              columns={tableColumns}
              data={onBoardedTeachers}
              onRowClicked={rowClickHandler}
              rowsPerPage={5}
              parentClassName="teacher-table-container"
              tableClassName="teacher-table"
              shouldPaginate={true}
            />
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <Table
                  columns={tableApprovalColumns}
                  data={needApprovalTeachers}
                  onRowClicked={approvalRowClickHandler}
                  rowsPerPage={5}
                  parentClassName="teacher-table-container"
                  tableClassName="teacher-table"
                  shouldPaginate={true}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent> : <Spinner />
      }
      <div className="AddNewTeacherForm-div">
        <AddNewTeacherForm show={formOpen} onClose={() => setFormOpen(false)} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  teachers: state.adminTeacher.allTeachers,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTeachers: (data) => dispatch(getAllTeacherAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
