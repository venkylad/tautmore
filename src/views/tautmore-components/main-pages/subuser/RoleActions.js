import React, { useState } from "react";
import { CustomInput } from "reactstrap";
import { Trash } from "react-feather";
import { toast } from "react-toastify";
import { deleteRole } from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";
import { activateRoles } from "../../services/apis/tautmore_manage_role_apis/manage_role_apis";
import DeletePopup from "../question-list/DeletePopup";

const RoleActions = ({ row, loadData }) => {
  const [status, setStatus] = useState(row.active);
  const [modal, setModal] = useState(false);

//   const deleteAdmin = (id, count) => {
   
//     if (count == 0) {
//       deleteRole({ roleId: id }).then((resp) => {
//         if (resp.status == 200) {
//           toast.success("Role deleted successfully");
//         } else {
//           toast.error("something went wrong");
//         }
//       });
//     } else {
//       toast.error("deletion not possible");
//     }
//   };

  const toggle = (id) => {
      console.log(id)
    deleteRole({ roleId: id }).then((resp) => {
        if (resp.status == 200) {
          toast.success("Role deleted successfully");
          setModal(!modal);
          loadData()
        } else {
          toast.error("something went wrong");
          setModal(!modal);
        }
      });
    
  };

  const handleAdminStatus = (id, status) => {
    activateRoles({ roleId: id, active: status }).then((resp) => {
      if (resp.status === 200) {
        toast.success(`Role is ${status ? "enabled" : "disabled"}`);
        setStatus(status);
      }
    });
  };
  return (
    <div className="data-list-action">
      <CustomInput
        className="custom-switch-dark mr-1 mb-2"
        type="switch"
        color="green"
        id={`"dark"-${row._id}`}
        name={`${row.role}-${row._id}`}
        onChange={() => handleAdminStatus(row._id, !status)}
        inline
        checked={status}
      />

      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => setModal(!modal)
        }
      />

      <DeletePopup
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        id={row._id}
      />
    </div>
  );
};

export default RoleActions;
