import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import ConfirmationModal from "./ConfirmationModal";
import { Edit, Trash } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import { history } from "../../../../../history";

const ActionButton = ({
  name,
  type,
  handler,
  id,
  deleteQuestion,
  selectedQuestion,
  clearDeletedQuestion,
}) => {
  const [showModal, setShowModal] = useState(false);

  const buttonClass =
    type === "delete"
      ? "list-button d-flex  align-items-center delete-btn-admin"
      : "list-button d-flex  align-items-center status-btn-admin";

  const buttonIcon =
    type === "delete" ? <Trash size={15} /> : <Edit size={15} />;

  return (
    <div className="manage-button">
      <Button
        disabled={!selectedQuestion?.length > 0}
        size="md"
        className={buttonClass}
        onClick={() => setShowModal(true)}
      >
        {buttonIcon}
        <span className="tautmore-admin-add-btn">{name}</span>
      </Button>
      <ConfirmationModal
        modal={showModal}
        name={name}
        handleConfirm={handler}
        setModal={setShowModal}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  deleteQuestion: state.questions.deleteQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
