import React, {useState, useEffect} from 'react';
import AddNewAdminButton from "../../../utility/buttons/Button";
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Input,
  } from "reactstrap";
import { ChevronDown } from "react-feather";
import Sidebar from "../../../forms/admin-form/Admin-Staff-Form";
import classnames from "classnames";
import Select from "react-select";
import { getAllRoles } from '../../../services/apis/tautmore_manage_role_apis/manage_role_apis';
import { history } from '../../../../../history';


const statusRole = [
  {value:"Status", label:"Status", bool:null},
  {value:"Active", label:"Active", bool:true},
  {value:"InActive", label:"InActive", bool:false}
]

const AdminFilter = ({
    searchtext,
    role,
    status,
    handleSearchtext,
    handleRole,
    handleStatus,
}) => {
  
    console.log(status,role)
    const [sidebar, setSidebar] = useState(false);
    const [roleData,setRoleData]=useState([]);
    const [roleStatus, setRoleStatus]=useState([])

    const handleSidebar = (value) => {
        setSidebar(value);
    }

    useEffect(()=>{
      getAllRoles().then((res)=>{
        if(res.status === 200){
          let temp = res.data && res.data.roles;
          console.log(temp)
        let updatedArray = [{
          value: "Role",
          label: "Role",
          id:""
        }];
        temp.map((item) => {
          let obj = {
            value: item.role,
            label: item.role,
            id:item._id
          };
          updatedArray.push(obj);
        });
       
          setRoleData(updatedArray)
          console.log(updatedArray)
        }
      })
     
      setRoleStatus(statusRole)
    },[])

    const changeRole = (data)=>{
      handleRole(data.id)
      let urlPrefix = "/admin-roles";
    history.push(`${urlPrefix}?page=1`);
    }

    const changeStatus = (data)=>{
      console.log(data)
      handleStatus(data.bool)
      let urlPrefix = "/admin-roles";
      history.push(`${urlPrefix}?page=1`);
    }

    const handleSearchtextFilter = (value) =>{
      console.log(value)
      if(value.length >= 3){
        handleSearchtext(value);
        let urlPrefix = "/admin-roles";
        history.push(`${urlPrefix}?page=1`);
      }
      else if(value.length === 0){
        handleSearchtext(value);
      }
    }
  

    return (
    <div>
      <AddNewAdminButton
        button_title=" Add New"
        onClick={() => handleSidebar(true, true)}
      />

      <div className="data-list-header d-flex justify-content-between flex-wrap datalistAdmin">
        <div className="actions-right rp-manageSchool-head-main d-flex flex-wrap mt-sm-0 mt-2">
          <div className="filter-section custom-filtersection">
            <Input
              type="text"
              placeholder="Search by name"
              onChange={(e) => handleSearchtextFilter(e.target.value)}
            />
          </div>
          <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head mr-1 d-md-block d-none">
            {/* <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50 adminfilterSpan">
              {role ? role : "Role"}
              </span>
              <ChevronDown size={16} />
            </DropdownToggle>
            <DropdownMenu className="customadmindropdown" tag="div" right>
              <DropdownItem 
                onClick={() => handleRole("")}
              >
                Role
              </DropdownItem>

              <DropdownItem 
                onClick={() => handleRole("data-operator")}
              >
                data-operator
              </DropdownItem>

              <DropdownItem 
                onClick={() => handleRole("executive")}
              >
                executive
              </DropdownItem>
              
            </DropdownMenu> */}
            <Select
              className="subconcept-select"
              classNamePrefix="select"
              value={role.role}
              onChange={changeRole}
              options={roleData}
              placeholder="Role"
            ></Select>
          </UncontrolledDropdown>
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
        </div>
      </div>
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
          onClick={() => handleSidebar(false)}
       />
    </div>
    )
}

export default AdminFilter
