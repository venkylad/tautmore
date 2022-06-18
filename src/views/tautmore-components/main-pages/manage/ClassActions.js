import React from "react";
import { Trash, Edit } from "react-feather";
import { connect } from "react-redux";
import { deleteClass } from "../../services/apis/manage-class-board-subject/manage-api";
import { getClassByidAction } from "../../../../redux/actions/manage-cbs/index";
import { toast } from "react-toastify";

const ClassActions = (props) => {
  const handleDeleteClass = (id) => {
    deleteClass({ id: id }).then((response) => {
      if (response.status === 200) {
        props.setRefresh(true);
        toast.success("Class deleted successfully!");
      }
    });
  };

  const handleEditClass = (id) => {
    props.getClass({ class_id: id });
    props.setSidebar({ status: true, state: "edit" });
  };

  return (
    <>
      <div className="data-list-action">
        <Edit
          className="cursor-pointer"
          size={20}
          onClick={() => handleEditClass(props.row._id)}
        />
      </div>
      <div className="data-list-action">
        <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => handleDeleteClass(props.row._id)}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getClass: (data) => dispatch(getClassByidAction(data)),
});

export default connect(null, mapDispatchToProps)(ClassActions);
