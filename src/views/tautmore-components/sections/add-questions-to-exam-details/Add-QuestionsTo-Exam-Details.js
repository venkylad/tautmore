import React from "react";
import { object } from "prop-types";
import { renderText } from "../question-details/textHelper";
import { Col, Row, Button, Media } from "reactstrap";
import schoologo from "../../../../assets/img/profile/user-uploads/user-01.jpg";
import "../question-details/QuestionDetails.css";
import { Edit, ChevronLeft } from "react-feather";
import { getQuestionById } from "../../services/apis/tautmore_questions_library_apis/all_question_library_apis";
import QuestionOptions from "./Question-Options";
import { history } from "../../../../history";
import {
  getQuestionDetails,
//   editQuestion,
//   deleteQuestionbyId,
} from "../../../../redux/actions/questions";
// import DeleteButton from "./DeleteButton";
import { connect } from "react-redux";
import moment from "moment";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { questionMappingData } from "../../helpers/helper";
import { findKeyByValue } from "../../forms/question-form/questionHelper";
import PreviewPopup from "../questions-preview/PreviewPopup";
class QuestionDetails extends React.Component {
  state = {
    questionDetailsData: {},
    // deleteModal: false,
    showPreview: false,
  };
  componentDidMount() {
      
    let question_id = this.props.match.params.id;

    getQuestionById(question_id).then((res) => {
      if (res.status === 200) {
        this.setState({ questionDetailsData: res.data?.response });
        // if (
        //   this.props.editquestiondata?.statusCode === 200 &&
        //   Object.keys(this.state.questionDetailsData).length !== 0
        // ) {
        //   toast.success("Question Upated Successfully");
        //   this.props.editQuestion();
        // }
      }
    });
  }

//   editPage = () => {
//     const data = this.state.questionDetailsData;
//     this.props.getQuestionDetails(data);
//     history.push(`/manage-question/${data._id}`);
//     localStorage.setItem("Editpagedata", JSON.stringify(data));
//   };

//   handleDeleteModal = (val) => {
//     this.setState({ deleteModal: val });
//   };

  listPage = (name, id) => {
    if (localStorage.getItem("backPageUrl")) {
        let backPageUrl = localStorage.getItem("backPageUrl");
        this.props.history.push({
            pathname: `/add-questions-to-exam/${backPageUrl}`,
            state: { name: name, id: id },
          });
        // history.push(`/add-questions-to-exam/${backPageUrl}`);
        localStorage.removeItem("backPageUrl");
      } 
    //   else {
    //     history.push(`/questions-listing/`);
    //   }
   
  };

//   deleteQuestion = () => {
//     const data = this.state.questionDetailsData;
//     this.props.deleteQuestionbyId(data._id);
//   };

  handlePreview = (val) => {
    this.setState({ showPreview: val });
  };

  questionMappingData = (details) => {
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
  qMapData = this.questionMappingData(this.state.questionDetailsData);
  classTextHelper = (text) => {
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

  render() {
    const { questionDetailsData } = this.state;
    const { adminAccess } = this.props;
    const qMapData = questionMappingData(questionDetailsData);

    // const reviewHistory = questionDetailsData?.reviewHistory;

    return Object.keys(questionDetailsData).length !== 0 ? (
      <div>
        <div className="header-container">
          <Row>
            <Col sm="5">
              {questionDetailsData?.title && (
                <h1>{questionDetailsData.title}</h1>
              )}
              {questionDetailsData?.concept && (
                <h3>{questionDetailsData.concept?.name}</h3>
              )}
              <p className="question-details-csq">
                Class {this.classTextHelper([qMapData?.["class"]?.name])}{" "}
                <span> | </span>
                {questionDetailsData?.subjectName
                  ? questionDetailsData?.subjectName
                  : ""}
                <span> | </span>
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
                onClick={() => this.setState({ showPreview: true })}
              >
                <span className="tautmore-admin-add-btn">Preview</span>
              </Button>

              <Button
                className="add-new-btn-admin back-btn"
                onClick={()=>this.listPage(questionDetailsData.subjectName, questionDetailsData.syllabusMapping[0].subject)}
              >
                <ChevronLeft size={16} />
                <span className="tautmore-admin-add-btn">Back</span>
              </Button>
              {/* {adminAccess?.["edit-question"] && (
                <Button
                  size="md"
                  className="list-button  add-new-btn-admin 111 edit-btn"
                  onClick={this.editPage}
                >
                  <Edit size={15} />
                  <span className="tautmore-admin-add-btn">Edit Question</span>
                </Button>
              )} */}
              {/* {adminAccess?.["delete-question"] && (
                <DeleteButton
                  modal={this.state.deleteModal}
                  toggle={this.deleteQuestion}
                  setModal={this.handleDeleteModal}
                  id={questionDetailsData._id}
                />
              )} */}
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
                      Question added by {questionDetailsData?.uploadedBy?.name}{" "}
                      <span>|</span>{" "}
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
            {questionDetailsData?.score} <span>Marks</span>
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
                  <h2 className="question-details-queHead" >
                    {renderText(questionDetailsData?.description)}
                  </h2>
                </Col>
              </Row>
            </div>
            {questionDetailsData?.passageQuestions?.map((item, key) => (
              <QuestionOptions
                key={key + 1}
                passageQuestionIndex={key + 1}
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
        {/* <ToastContainer draggable={false} /> */}
        {(questionDetailsData?.solutionDescription ||
          questionDetailsData?.solutionDescriptionImage) && (
          <div className="adminDetailsCard">
            <Row>
              <Col md="12">
                <h4 className="question-details-queHead">
                  Solution Description
                </h4>
                <span className="tm-solution-description">
                  {renderText(questionDetailsData?.solutionDescription)}
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
        {/* {reviewHistory &&
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
          )} */}

        <div className="question-details-Info">
          <p className="question-details-marks"></p>
        </div>
        <PreviewPopup
          isDetailPage
          modal={this.state.showPreview}
          setModal={this.handlePreview}
          queDetails={{
            ...questionDetailsData,
            chapter: qMapData?.["chapter"]?.name,
            concept: qMapData?.["concept"]?.name,
            class: `${qMapData?.class?.name}_${qMapData?.board?.name}`,
          }}
        />
      </div>
    ) : (
      <Spinner />
    );
  }
}

QuestionDetails.propTypes = {
//   adminAccess: object.isRequired,
  questionDetails: object.isRequired,
};

const mapStateToProps = (state) => ({
//   deleteQuestion: state.questions.deleteQuestion,
//   adminAccess: state.auth.login?.userData?.access,
  questiondetails: state.questions.questionDetails,
//   editquestiondata: state.questions.editQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionDetails: () => dispatch(getQuestionDetails()),
//   editQuestion: () => dispatch(editQuestion()),
//   deleteQuestionbyId: (id) => dispatch(deleteQuestionbyId(id)),
//   clearDeletedQuestion: () => dispatch({ type: "CLEAR_DELETE_QUESTION" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
