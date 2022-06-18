import React, { useEffect } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import DeletePopup from "../../main-pages/question-list/DeletePopup";
import { Trash } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import { history } from "../../../../history";

const DeleteButton = ({
  modal,
  toggle,
  setModal,
  id,
  deleteQuestion,
  clearDeletedQuestion,
}) => {
  useEffect(() => {
    if (deleteQuestion?.statusCode === 200) {
      setModal(false);
      // toast.success("Question deleted successfully!");
      history.push("/operator-questions");
    } else if (deleteQuestion === "error") {
      toast.error("Error in deleting!");
      clearDeletedQuestion();
    }
  });
  return (
    <>
      <Button
        size="md"
        className="list-button  delete-new-btn-admin 111"
        onClick={() => setModal(true)}
      >
        <Trash size={15} />
        <span className="tautmore-admin-add-btn">Delete Question</span>
      </Button>
      <DeletePopup modal={modal} toggle={toggle} setModal={setModal} id={id} />
      {/* <ToastContainer draggable={false} /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  deleteQuestion: state.questions.deleteQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
