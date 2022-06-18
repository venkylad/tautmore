import React, { useState } from "react";
import { CustomInput } from "reactstrap";
import { deleteQuestionbyId } from "../../../../../../redux/actions/questions";
import { Trash } from "react-feather";
import { object, func } from "prop-types";
import { connect } from "react-redux";
import * as question_api from "../../../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import { toast } from "react-toastify";
import DeletePopup from "../../DeletePopup";


const QuestionActions = ({ row, deleteQuestion, adminAccess }) => {
  const [status, setStatus] = useState(row.active);
  const [modal, setModal] = useState(false);


  const handleQuestionStatus = (id, status) => {
    question_api.setQuestionStatus(id, status).then((res) => {
      if (res.status === 200) {
        setStatus(status);
        toast.success(`Question is ${status ? "enabled" : "disabled"}`);
      }
    });
  };
  const toggle = (id) => {
    deleteQuestion(id);
    setModal(!modal);
  };

  return (
    <div className="data-list-action">
      {/* <CustomInput
        className="custom-switch-dark mr-1 mb-2"
        type="switch"
        id={`"dark"-${row._id}`}
        name={`${row.name}-${row._id}`}
        onChange={() => handleQuestionStatus(row._id, !status)}
        inline
        checked={status}
      /> */}
      {adminAccess?.["delete-question"] && (
        <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => setModal(!modal)}
        />
      )}
      <DeletePopup
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        id={row._id}
      />

    </div>
  );
};

QuestionActions.propTypes = {
  adminAccess: object.isRequired,
  deleteQuestion: func.isRequired,
};

const mapStateToProps = (state) => ({
  adminAccess: state.auth.login?.userData?.access,
});
const mapDispatchToProps = (dispatch) => ({
  deleteQuestion: (id) => dispatch(deleteQuestionbyId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionActions);


// export default QuestionActions;
