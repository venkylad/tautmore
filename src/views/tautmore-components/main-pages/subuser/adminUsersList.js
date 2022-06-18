import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  Input,
  Row,
  // UncontrolledDropdown,
} from "reactstrap";
import * as Icon from "react-feather";
import Table from "../../utility/table";
import { Link, useHistory } from "react-router-dom";
import { userList } from "./mockdata";
import { getAllRoles } from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";
import RoleCreation from "./roleCreation";
import "./user-style.scss";
import classnames from "classnames";
import DataTable from "react-data-table-component";
import "../../../../assets/scss/pages/data-list.scss";
import RoleActions from "./RoleActions";



const AdminUsersList = () => {
  const history = useHistory();
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [value,setValue]=useState('')
  

  const rowClickHandler = (row) => {
    console.log(row.role)
    console.log("Clicked row: => ", row);
    history.push(`/adminUsers/${row._id}`)
  };

  useEffect(()=>{
    // getAllRoles().then((resp)=>{
    //   if(resp.status == 200){
    //     const allRoles = resp?.data?.roles;
    //     setData(allRoles)
    //   }
    // })
    loadData()
  },[])

  const loadData = () => {
    getAllRoles().then((resp)=>{
      if(resp.status == 200){
        const allRoles = resp?.data?.roles;
        setData(allRoles)
      }
    })
  }

  const setSearchVal =(val)=>{
    console.log(val)
    setSearchInput(val)
    if (searchInput !== '') {
    const filteredData=data.filter((item) => {
      return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
  })
  setFilteredResults(filteredData)
}
else{
  setFilteredResults(data)
}
  }

  // function accessHelper(text){
  //   console.log(text)
  // }


  
  const tableColumns = [
    {
      name: "role",
      selector: "role",
      minWidth: "220px",
      cell: (row) => (
        <p
          title={row.role}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.role}
        </p>
      ),
    },
    {
      name: "No. of Users",
      selector: "No. of Users",
      width:"220px",
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.adminCount}
        </p>
      ),
    },
    {
      name: "Access Type",
      selector: "Access Type",
      width:"520px",
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
          title={Object.keys(row.access).filter(key => row.access[key]).join(", ")}
        >
          {Object.keys(row.access).filter(key => row.access[key]).join(", ")}
          
        </p>
      ),
    },
    {
      name: "",
      // width:"220px",
      selector: (row) => (
        <Link
          to={`/adminUsers/${row._id}`}
          className="teacher-deatail-view"
        >
          View Details
        </Link>
       
      ),
    },
    {
      cell: (row) => (
        <RoleActions
          row={row}
          loadData={loadData}
        />
      ),
    },
    
  ];
  
  
  return (
    <React.Fragment>
      {/* {data} */}
       <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8" className="teacher-heading">
          <h4>Admin Roles</h4>
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
            <h4>{data.length?data.length : ''}</h4>
            <h2>Total Roles</h2>
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
          <Icon.Plus size="20" className="add-new-icon" /> Add new role
        </Button>
      </div>
      <Row className="mt-3">
        <Col sm="12" md="12">
          <div className="data-list-header d-flex justify-content-between flex-wrap datalistAdmin">
            <div className="actions-right rp-manageSchool-head-main d-flex  flex-wrap mt-sm-0 mt-2">
              <div className="filter-section custom-filtersection">
                <Input type="text" onChange={e => setSearchVal(e.target.value)} placeholder="Search by role" />
              </div>
              {/* <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
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
                  
                  >
                    Item 1
                  </DropdownItem>

                  <DropdownItem
                  
                  >
                    Item 2
                  </DropdownItem>

                  <DropdownItem
                 
                  >
                    Item 3
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
                <DropdownToggle
                  color=""
                  className="sort-dropdown studentfilter-btn"
                >
                  <span className="align-middle mx-50 adminfilterSpan">
                    Type
                  </span>
                  <Icon.ChevronDown size={16} />
                </DropdownToggle>
                <DropdownMenu className="customadmindropdown" tag="div" right>
                  <DropdownItem
                  
                  >
                    Item 1
                  </DropdownItem>
                  <DropdownItem
                  
                  >
                    Item 2
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </div>
          </div>
        </Col>
        
      </Row>
      <DataTable
        columns={tableColumns}
        data={searchInput.length ? filteredResults : data}
        onRowClicked={rowClickHandler}
        // rowsPerPage={5}
        // parentClassName="teacher-table-container"
        // tableClassName="teacher-table"
        // shouldPaginate={true}
        noHeader
        responsive
        pointerOnHover
      />
      <RoleCreation show={formOpen}  onClose={() => setFormOpen(false)} loadData={loadData}/>
      <div
              className={classnames("data-list-overlay", {
                show: formOpen,
              })}
              onClick={() => setFormOpen(false)}
            />
            </div>
    </React.Fragment>
    
  );
};

export default AdminUsersList;
