import React, { useEffect, useState} from "react";
import { Col, Row, Button } from "reactstrap";
import * as Icon from "react-feather";
import classnames from "classnames";
import RoleCreation from "./roleCreation";
import "../../../../assets/scss/pages/data-list.scss";
import { deleteRole } from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";
import { toast } from "react-toastify";
import { history } from "../../../../history";
import DeletePopup from "../question-list/DeletePopup";
import { useParams } from "react-router-dom";
import {getRoleInfo} from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";
import './user-style.scss'

const SuperAdmin = props => {
  const [formOpen, setFormOpen] = useState(false);
  const [editable,setEditable]=useState(false);
  const [modal, setModal] = useState(false);
  const params = useParams(); 
  const [roleData,setRoleData]=useState([]);

  console.log(params.id)

  const setFormState=()=>{
    setFormOpen(true);
    setEditable(true)
  }

  // const deleteRoleId = (id) =>{
  //   deleteRole({roleId:id}).then((resp)=>{
  //     if(resp.status == 200){
  //       toast.success("Role deleted successfully");
  //       setTimeout(() => {
  //         history.push('/subuser')
  //       }, 3000);
  //       // history.push('/subuser')
  //     }
  //     else{
  //       toast.error("something went wrong")
  //     }
  //   })
  // }

  const loadData = () =>{
    getRoleInfo({roleId:params.id}).then((resp)=>{
      if(resp.status === 200){
        const roleInfo = resp?.data;
        console.log(roleInfo)
        setRoleData(roleInfo.data);
        
      }
    })
  }

  useEffect(()=>{
    getRoleInfo({roleId:params.id}).then((resp)=>{
      if(resp.status === 200){
        const roleInfo = resp?.data;
        console.log(roleInfo)
        setRoleData(roleInfo.data);
        
      }
    })
  },[])

  const toggle = (id) => {
    deleteRole({roleId:id}).then((resp)=>{
      if(resp.status == 200){
        toast.success("Role deleted successfully");
        setTimeout(() => {
          history.push('/subuser')
        }, 3000);
        // history.push('/subuser')
      }
      else{
        toast.error("something went wrong")
      }
    })
  }

  const roleList = () =>{
    history.push("/subuser");
  }

  return roleData?.role?(
    <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
    <Row className="superAdmin-heading">
      <Col className="teacher-heading d-flex justify-content-between align-item-center">
        <div>
          <div className="d-flex flex-coloumn align-items-baseline">
           
            <h4>{roleData.role}</h4>
          </div>
          <h6>Roles</h6>
        </div>
        <div className="d-flex ">
          <div>
            <Button  className="role-details-edit 1111"  onClick={() => setFormState()}>Edit</Button>
          </div>
          <div>
            {roleData.adminCount == 0 ? <Button  className="role-details-delete" outline  onClick={() => setModal(!modal) }>
              Delete
            </Button>:''}
            
          </div>
          <div>
            <Button className="role-details-delete back" outline onClick={roleList}>Back</Button>
          </div>
        </div>
      </Col>
    </Row>
    <Row className="superAdmin-body">
      <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
        <p>Role</p>
        <h5>{roleData.role}</h5>
      </Col>
      <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
        <p>Access</p>
        <h5>Full Access</h5>
        <p className="fullaccess-content">
          ( {Object.keys(roleData.access).filter(key => roleData.access[key]).join(", ")})
        </p>
      </Col>
      <Col sm="12" md="4" lg="4" xl="4" className="mb-2">
        <p>No. of users</p>
        <h5>{roleData.adminCount}</h5>
      </Col>
    </Row>
    <RoleCreation show={formOpen} onClose={() => setFormOpen(false)} edit={editable} data={roleData} loadData={loadData} />
    <DeletePopup
      modal={modal}
      toggle={toggle}
      setModal={setModal}
      id={roleData._id}
    />
    <div
            className={classnames("data-list-overlay", {
              show: formOpen,
            })}
            onClick={() => setFormOpen(false)}
          />
          </div>
  ):(<> <Spinner /> </>);

};

export default SuperAdmin;
