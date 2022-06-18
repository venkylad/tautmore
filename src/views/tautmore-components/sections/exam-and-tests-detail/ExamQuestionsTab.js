import React, { useEffect, useState } from "react";
import {
  Collapse,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
} from "reactstrap";
// import classnames from "classnames"
import { ChevronDown, Delete, Edit } from "react-feather";
import { findKeyByValue } from "../../forms/question-form/questionHelper";
import { renderText } from "../question-details/textHelper";
import ExamQuestionOptions from "../exam-and-tests-detail/Exam-Que-Options";
import "./ExamAndTestDetails.scss";
import { useParams } from "react-router-dom";
import { history } from "../../../../history";
// import { accordionMargin } from "./CollapseSourceCode"

const AccordionMargin = (props) => {
  console.log(props);
  const [collapseID, setCollapseID] = useState("");
  const params = useParams();

  const toggleCollapse = (collapseID, prevState) => {
    setCollapseID(prevState.collapseID !== collapseID ? collapseID : "");
  };

  const handleAddEditQuestion = (name, id) => {
    // history.push(`/add-questions-to-exam/${params.id}`,
    // state : { subjectName: examData.subjectName, subjectId: examData.subject})
    history.push({
      pathname: `/add-questions-to-exam/${params.id}`,
      state: { name: name, id: id },
    });
  };

  const accordionMarginItems = props.questionsInExam.map((collapseItem) => {
    return (
      <div className="collapse-margin" key={collapseItem._id}>
        <Card
          key={collapseItem._id}
          onClick={() => toggleCollapse(collapseItem._id, collapseID)}
        >
          <CardHeader className="examandTestCollapseBA">
            <div className="questAccordion">
              <Col sm="8">
                <h1>Question</h1>
                <CardTitle className="lead collapse-title collapsed">
                  {renderText(collapseItem.description)}
                </CardTitle>
              </Col>
              <Col sm="4">
                <h1>Score</h1>
                <CardTitle className="lead collapse-title collapsed">
                  {collapseItem.score}
                </CardTitle>
              </Col>
            </div>
            <ChevronDown size={15} className="collapse-icon" />
          </CardHeader>
          {console.log(collapseItem._id === collapseID)}
          {console.log(collapseItem._id)}
          {console.log(collapseID)}
          <Collapse isOpen={collapseItem._id === collapseID}>
            <CardBody className="questExamAccorBorder">
              <Row>
                <Col md="12">
                  <h1>Answers</h1>
                  {findKeyByValue(collapseItem?.solutionType) === "passage" ? (
                    <>
                      {collapseItem?.passageQuestions?.map((item, i) => (
                        <ExamQuestionOptions key={i}
                          mainData={item}
                          qtype={
                            collapseItem?.solutionType?.length &&
                            findKeyByValue(collapseItem?.solutionType)
                          }
                        />
                      ))}
                    </>
                  ) : (
                    <ExamQuestionOptions
                      mainData={collapseItem}
                      qtype={
                        collapseItem?.solutionType?.length &&
                        findKeyByValue(collapseItem?.solutionType)
                      }
                    />
                  )}
                  {/* {collapseItem.answers.map((ans,key)=>{
                      return(
                        <ListGroup key={key}>
                            <ListGroupItem key={key} className={
                                collapseItem.solutionIndex.map((value)=>
                                    value === key
                                    ? "list-group-item-success question_l"
                                    : " question_l"
                                )
                            }>
                            <div className="questionHtlm">
              {String.fromCharCode(key + 65)} <span className="opti"> . </span>{" "}
              
                <span>{ans}</span>
              
            </div>
                            </ListGroupItem>
                        </ListGroup>
                      )
                  })} */}
                </Col>
                <Col md="12">
                  <div className="examQuestionEditDele">
                    {props.subjectName ? (
                      <Button
                        className="examDelEdit 1111"
                        onClick={() => {
                          handleAddEditQuestion(props.subjectName, props.subject);
                        }}
                      >
                        <Edit height="18" width="18" />
                        <span className="tautmore-admin-add-btn">
                          Edit / Replace
                        </span>
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Collapse>
        </Card>
      </div>
    );
  });

  useEffect(() => {}, []);

  return (
    <div className="vx-collapse collapse-icon accordion-icon-rotate">
      {accordionMarginItems}
    </div>
  );
};
export default AccordionMargin;
