import React, { useState, useEffect } from "react";
import "./QuestionDetails.scss";
import { toast, ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import {
  Col,
  Row,
  Media,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import { Edit, ChevronLeft, Trash } from "react-feather";
import { formschema_decline_question } from "../../utility/schema/Fields_Schema";
import moment from "moment";
import schoologo from "../../../../assets/img/profile/user-uploads/user-01.jpg";
import * as question_api from "../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { findKeyByValue } from "../../forms/question-form/questionHelper";
import QuestionOptions from "./QuestionLanding-Options";
import { history } from "../../../../history";
import data from "../../forms/question-form/mockData/data";
import {
  getQuestionDetails,
  deleteQuestionbyId,
} from "../../../../redux/actions/questions";
import DeletePopup from "../../main-pages/question-list/DeletePopup";

const QuestionLanding = ({
  userData,
  getQuestionDetails,
  deleteQuestionbyId,
  deleteQuestion,
  clearDeletedQuestion,
}) => {
  const [questionDetailsData, setQuestionData] = useState("");
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { id } = useParams();

  useEffect(() => {
    question_api.getQuestionById(id).then((response) => {
      if (response.data?.statusCode === 200) {
        const data = response?.data?.response;
        setQuestionData(data);

        const requestObj = {
          questionId: id,
          admin: userData?.id,
        };

        question_api.blockQuestion(requestObj);
      }
    });
  }, []);

  useEffect(() => {
    if (deleteQuestion?.statusCode === 200) {
      setDeleteModal(false);
      history.push("/uploaded-questions/");
    }
    // else if (deleteQuestion === "error") {
    //   toast.error("Error in deleting!");
    //   clearDeletedQuestion();
    // }
  });

  const declineQuestion = (data) => {
    question_api
      .declineQuestion(data)
      .then((response) => {
        if (response.data?.statusCode === 200) {
          toggle();
          toast.success("Question Declined Successfully");
          history.push("/uploaded-questions");
        }
      })
      .catch((response) => {
        if (response === "Error") {
          toast.error(response);
        }
      });
  };

  const releaseQuestion = (data) => {
    const requestObj = {
      questionId: id,
      admin: userData?.id,
    };
    question_api
      .releaseQuestion(requestObj)
      .then((response) => {
        if (response.data?.statusCode === 200) {
          toast.success("Question released Successfully");
          history.push("/uploaded-questions");
        }
      })
      .catch((response) => {
        if (response === "Error") {
          toast.error(response);
        }
      });
  };

  const approveQuestion = () => {
    const requestObj = {
      questionId: id,
      admin: userData?.id,
    };
    question_api.approveQuestion(requestObj).then((response) => {
      if (response.data?.statusCode === 200) {
        toast.success("Question Approved Successfully");
        history.push("/uploaded-questions");
      }
    });
  };

  const questionMappingData = (details) => {
    const classId = details?.classIds;
    const mapData = details?.syllabusMapping;
    let classMapData = mapData?.filter(
      (item) => item?.["class"]?._id === classId?.[0]
    );
    const classBoardMapData = classMapData;
    classMapData = classMapData?.map((data) => ({
      id: data?.["class"]._id,
      value: `${data?.["class"]?.name}_${data?.["board"]?.name}`,
      label: `${data?.["class"]?.name}_${data?.["board"]?.name}`,
    }));
    if (classBoardMapData) {
      const [questionMap] = classBoardMapData;
      return { ...questionMap, classMapData };
    } else return {};
  };

  const reviewHistory = questionDetailsData?.reviewHistory;

  const qMapData = questionMappingData(questionDetailsData);
  const classTextHelper = (text) => {
    const filterText = text?.map((str) => {
      if (parseInt(str) === 1) {
        return `${str}st`;
      } else if (parseInt(str) === 2) {
        return `${str}nd`;
      } else if (parseInt(str) === 3) {
        return `${str}rd`;
      } else if (parseInt(str) > 4) {
        return `${str}th`;
      } else return str;
    });
    return filterText.join(", ");
  };

  const landingPage = () => {
    history.push("/uploaded-questions/");
  };

  console.log(qMapData?._id, "qMapData id");

  const editPageData = () => {
    history.push(`/manage-question/${questionDetailsData?._id}`);
    getQuestionDetails(questionDetailsData);
    localStorage.setItem("Editpagedata", JSON.stringify(questionDetailsData));
  };

  const handleDeleteQuestion = () => {
    deleteQuestionbyId(questionDetailsData?._id);
  };

  return (
    <div>
      <div className="header-container">
        <Row>
          <Col sm="5">
            <p className="question-details-csq">
              Class {classTextHelper([qMapData?.["class"]?.name])}
              <span> |</span>
              {questionDetailsData?.subjectName
                ? questionDetailsData?.subjectName
                : ""}
              <span> |</span>
              {qMapData ? qMapData?.["chapter"]?.name : ""}
              <span> | </span>
              {qMapData ? qMapData?.["concept"]?.name : ""}
              <span> | </span>
              {questionDetailsData?.subConcept
                ? questionDetailsData?.subConcept?.name
                : ""}
            </p>
          </Col>

          <Col sm="7" className="question-details-edit">
            <Button
              className="add-new-btn-admin back-btn"
              onClick={landingPage}
            >
              <ChevronLeft size={16} />
              <span className="tautmore-admin-add-btn">Back</span>
            </Button>

            {userData?.access?.["edit-question"] && (
              <Button
                size="md"
                className="list-button  add-new-btn-admin 111 edit-btn"
                onClick={editPageData}
              >
                <Edit size={15} />
                <span className="tautmore-admin-add-btn">Edit Question</span>
              </Button>
            )}

            {userData?.access?.["delete-question"] && (
              <>
                <Button
                  size="md"
                  className="list-button  delete-new-btn-admin 111"
                  onClick={() => setDeleteModal(true)}
                >
                  <Trash size={15} />
                  <span className="tautmore-admin-add-btn">
                    Delete Question
                  </span>
                </Button>
                <DeletePopup
                  modal={deleteModal}
                  toggle={handleDeleteQuestion}
                  setModal={setDeleteModal}
                  id={questionDetailsData?._id}
                />
              </>
            )}
          </Col>

          <Col>
            <Media className="question-details-profile">
              <Media
                className="rounded-circle"
                object
                src={schoologo}
                height="34"
                width="34"
                alt="profile image"
              />

              <Media body>
                <Media heading className="admin-name-title">
                  <p className="question-details-addedby">
                    Question added by {questionDetailsData?.uploadedBy?.name}
                    <span>|</span>
                    {/* December 10, 2021 */}
                    {moment(questionDetailsData?.createdAt).format("LL")}
                  </p>
                </Media>
              </Media>
            </Media>
          </Col>
        </Row>
      </div>

      <div className="question-details-Info">
        <p className="question-details-marks">
          {questionDetailsData?.score}
          <span>Marks</span>
        </p>

        <p className="question-details-marks">
          {questionDetailsData?.timeToSolve} Sec <span>Estimated Time</span>
        </p>
        <p className="question-details-marks">
          {questionDetailsData?.difficulty} <span>Difficulty</span>
        </p>
      </div>

      <div className="question-display">
        <p className="question-desc">
          <span>Question Type: </span>
          <span className="desc">
            {questionDetailsData?.solutionType?.length
              ? findKeyByValue(questionDetailsData?.solutionType)
              : ""}
          </span>
        </p>
        <p className="question-desc">
          <span>Exam Type: </span>
          <span className="desc">
            {questionDetailsData?.moduleType
              ? questionDetailsData?.moduleType
              : ""}
          </span>
        </p>
      </div>

      {findKeyByValue(questionDetailsData?.solutionType) === "passage" ? (
        <>
          <div className="adminDetailsCard">
            <Row>
              <Col md="12">
                <h2 className="question-details-queHead" contenteditable>
                  {ReactHtmlParser(questionDetailsData?.description)}
                </h2>
              </Col>
            </Row>
          </div>
          {questionDetailsData?.passageQuestions?.map((item) => (
            <QuestionOptions
              mainData={item}
              qtype={
                questionDetailsData?.solutionType?.length &&
                findKeyByValue(questionDetailsData?.solutionType)
              }
            />
          ))}
        </>
      ) : (
        <QuestionOptions
          mainData={questionDetailsData}
          qtype={
            questionDetailsData?.solutionType?.length &&
            findKeyByValue(questionDetailsData?.solutionType)
          }
        />
      )}

      {(questionDetailsData?.solutionDescription ||
        questionDetailsData?.solutionDescriptionImage) && (
        <div className="adminDetailsCard">
          <Row>
            <Col md="12">
              <h4 className="question-details-queHead">Solution Description</h4>
              <span className="tm-solution-description">
                {ReactHtmlParser(questionDetailsData?.solutionDescription)}
              </span>
              <br />
              {/* {questionDetailsData?.solutionDescriptionImage ? (
                  <img
                    className="solution-media"
                    src={questionDetailsData?.solutionDescriptionImage}
                    alt="solution-description"
                  />
                ) : (
                  ""
                )} */}
            </Col>
          </Row>
        </div>
      )}

      {reviewHistory &&
        reviewHistory.some(
          (reviewHistory) => reviewHistory.status == "DECLINED"
        ) && (
          <div className="adminDetailsCard decline">
            <h3>Reason for decline</h3>
            {reviewHistory &&
              reviewHistory.map((data, index) => {
                if (data.status !== "DECLINED") {
                  return null;
                } else {
                  return <p>{data?.comments}</p>;
                }
              })}
          </div>
        )}

      <div className="questionActionsBtn">
        <Button
          className="questionApproveBtn"
          color="primary"
          onClick={approveQuestion}
        >
          Approve
        </Button>
        <Button className="questionApproveBtn" color="danger" onClick={toggle}>
          Decline
        </Button>
        <Button
          className="questionApproveBtn"
          color="primary"
          onClick={releaseQuestion}
        >
          Release
        </Button>
      </div>

      <Modal
        isOpen={modal}
        toggle={toggle}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={toggle}>Reason for Decline</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize
            initialValues={{
              questionId: id || "",
              admin: userData && userData?.id ? userData.id : "",
              comments: data?.comments || "",

              // questionId: id ? id : "",
              // admin: userData && userData?.id ? userData.id : "",
              // comments: comments ? comments : ""
            }}
            validationSchema={formschema_decline_question}
            onSubmit={(data) => declineQuestion(data)}
          >
            {({ errors, touched, values, handleSubmit, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Input
                    value={values.comments}
                    type="textarea"
                    name="comments"
                    id="data-comments"
                    rows="3"
                    placeholder="Commet here"
                    onChange={handleChange}
                  />
                  {errors.comments && touched.comments ? (
                    <div className="rp-manage-school_error-message mt-25">
                      {errors.comments}
                    </div>
                  ) : null}
                </FormGroup>
                <Button type="submit" color="primary">
                  Save
                </Button>{" "}
              </Form>
            )}
          </Formik>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Accept
          </Button>{" "}
        </ModalFooter> */}
      </Modal>
      {/* <ToastContainer draggable={false} /> */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  userData: state.auth.login?.userData,
  deleteQuestion: state.questions.deleteQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionDetails: (data) => dispatch(getQuestionDetails(data)),
  deleteQuestionbyId: (id) => dispatch(deleteQuestionbyId(id)),
  clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionLanding);
