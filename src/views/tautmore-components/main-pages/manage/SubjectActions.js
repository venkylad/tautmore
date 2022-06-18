import React from "react";
import { Trash, Edit } from "react-feather";
import { connect } from "react-redux";
import { deleteSubject } from "../../services/apis/manage-class-board-subject/manage-api";
import { getSubjectByidAction } from "../../../../redux/actions/manage-cbs/index";
import { toast } from "react-toastify";

const AdminActions = (props) => {
  const handleDeleteSubject = (id) => {
    deleteSubject({ subjectId: id }).then((response) => {
      if (response.status === 200) {
        props.setRefresh(true);
        toast.success("Subject deleted successfully!");
      }
    });
  };

  const handleEditSubject = (id) => {
    props.getSubject({ subjectId: id });
    props.setSidebar({ status: true, state: "edit" });
  };

  return (
    <>
      <div className="data-list-action">
        <Edit
          className="cursor-pointer"
          size={20}
          onClick={() => handleEditSubject(props.row._id)}
        />
      </div>
      <div className="data-list-action">
        <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => handleDeleteSubject(props.row._id)}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getSubject: (data) => dispatch(getSubjectByidAction(data)),
});
export default connect(null, mapDispatchToProps)(AdminActions);
