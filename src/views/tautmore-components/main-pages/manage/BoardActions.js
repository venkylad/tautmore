import React from "react";
import { Trash, Edit } from "react-feather";
import { connect } from "react-redux";
import { deleteBoard } from "../../services/apis/manage-class-board-subject/manage-api";
import { getBoardByidAction } from "../../../../redux/actions/manage-cbs/index";
import { toast } from "react-toastify";

const AdminActions = (props) => {
  const handleDeleteBoard = (id) => {
    deleteBoard({ id: id }).then((response) => {
      if (response.status === 200) {
        props.setRefresh(true);
        toast.success("Board deleted successfully!");
      }
    });
  };

  const handleEditBoard = (id) => {
    props.getBoard({ id: id });
    props.setSidebar({ status: true, state: "edit" });
  };

  return (
    <>
      <div className="data-list-action">
        <Edit
          className="cursor-pointer"
          size={20}
          onClick={() => handleEditBoard(props.row._id)}
        />
      </div>
      <div className="data-list-action">
        <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => handleDeleteBoard(props.row._id)}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getBoard: (data) => dispatch(getBoardByidAction(data)),
});
export default connect(null, mapDispatchToProps)(AdminActions);
