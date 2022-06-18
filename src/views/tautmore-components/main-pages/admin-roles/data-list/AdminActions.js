import React, { useEffect, useState } from "react";
import { CustomInput } from "reactstrap";
import { Trash } from "react-feather";
import * as admin_api from "../../../services/apis/tautmore_staffs_apis/tautmore_staffs";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { deleteAdmin } from "../../../../../redux/actions/admin";
import DeletePopup from "../../question-list/DeletePopup";

const AdminActions = (props) => {
  const { row } = props;
  const [status, setStatus] = useState(row.active);
  const [modal, setModal] = useState(false);
  const [localData,setLocalData]=useState({});
  

  const handleAdminStatus = (id, status) => {
    admin_api.setAdminStatus(id, status).then((res) => {
      if (res.status === 200) {
        toast.success(`User is ${status ? "enabled" : "disabled"}`);
        setStatus(status);
      }
    });
  };

  useEffect(()=>{
     let localInfo = JSON.parse(localStorage.getItem('tautmore-user'));
     setLocalData(localInfo);
  },[])

  const toggle = (id) => {
    console.log(id)
    props.deleteAdmin(id);
    setModal(!modal);
  };

  const renderCustomView = (access,role) =>{
    if(access?.["delete-executive"] || (access?.["delete-data-operator"] && role === "data-entry-operator")){
      return <><CustomInput
      className="custom-switch-dark mr-1 mb-2"
      type="switch"
      id={`"dark"-${row._id}`}
      name={`${row.name}-${row._id}`}
      onChange={() => handleAdminStatus(row._id, !status)}
      inline
      checked={status}
    />
    <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => setModal(!modal)}
        />
    </>
    }
  }
  

  return (
    
    <div className="data-list-action">
      {/* <pre>{JSON.stringify(props.adminAccess,null,2)}</pre>
      <pre>{JSON.stringify(props.adminAccess,null,2)}</pre> */}
      {renderCustomView(localData.access,row.role)}
       

      <DeletePopup
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        id={props.row._id}
      />
    </div>
  );
};



const mapStateToProps = (state) => ({
  adminAccess: state.auth.login?.userData?.access,
});
const mapDispatchToProps = (dispatch) => ({
  deleteAdmin: (id) => dispatch(deleteAdmin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminActions);
