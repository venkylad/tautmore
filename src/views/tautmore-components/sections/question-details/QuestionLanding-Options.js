import React, { useState, useEffect } from "react";
import { Col, Row, ListGroupItem, ListGroup } from "reactstrap";
// import ReactDOM from "react-dom";
// import MathJax from "react-mathjax-preview";
import ReactHtmlParser from "react-html-parser";
import { structureDragAndDrop } from "./mockData/questionDetailData";
import { checkDragDropSnunscramble } from "../../forms/question-form/questionHelper";
import './QuestionDetails.scss';

const QuestionOptions = (props) => {
    const [correctValue, setCorrectValue] = useState([]);
    const [MainData, setData] = useState({});
    const [dragData, setDragData] = useState([]);

    useEffect(() => {
        // window.MathJax || document.write('<script src="//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML"><\/script>');
        // if (window.MathJax) {
        //   window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub, ReactDOM.findDOMNode(this)]);
        // }
        if (checkDragDropSnunscramble(props.qtype)) {
            setDragData(
                structureDragAndDrop(
                    props.mainData?.statement,
                    props.mainData?.options,
                    props.mainData?.solutionIndex
                )
            );
        } else {
            setData(props.mainData);
        }
        setCorrectValue(props.mainData?.solutionIndex);
    }, [props.mainData, props.qtype]);
    const renderOptions = !checkDragDropSnunscramble(props.qtype) ? (
        MainData &&
        MainData?.options &&
        MainData?.options.map((option, key) => {
            return (
                <ListGroup key={key}>
                    {/* {clickedValue == option.id?
                <> */}
                    <ListGroupItem
                        key={key}
                        className={
                            correctValue?.length &&
                            correctValue?.map((value) =>
                                value === key
                                    ? "list-group-item-success question_l"
                                    : " question_l"
                            )
                        }
                    // onClick={()=>handleClick(option.id)}
                    >
                        <div className="questionHtlm">
                            {String.fromCharCode(key + 65)} <span className="opti"> . </span>{" "}
                            {/* {option?.image && (
                                <div className="questionHtlm-left">
                                    <img src={option?.image} alt="option_image"></img>
                                </div>
                            )} */}
                            {option?.imageElement !== "" && (
                                <div className="questionHtlm-right">
                                    <span id='option-world-break' >{ReactHtmlParser(option?.imageElement)}</span>
                                </div>
                            )}
                        </div>
                        {/* {option.id} <span> | </span> {option.value} */}
                    </ListGroupItem>
                    {/* </>
              :
                <ListGroupItem className="question_l" 
                          onClick={()=>handleClick(option.id)}>
                            {option.id} <span id="id"> | </span> {option.value}
                </ListGroupItem>
              } */}
                </ListGroup>
            );
        })
    ) : (
        <table className="drag-detail-table">
            <thead>
                <th colspan="2">Statement</th>
                <th colspan="2">Options</th>
            </thead>
            <tbody>
                {dragData?.length > 0 &&
                    dragData?.map((option, key) => {
                        return (
                            <tr>
                                <td>
                                    {option?.image ? (
                                        <img src={option?.image} alt="option_image"></img>
                                    ) : (
                                        <span>No file found</span>
                                    )}
                                </td>
                                <td>
                                    {option?.text ? (
                                        <span>{option?.text}</span>
                                    ) : (
                                        <span>No text found</span>
                                    )}
                                </td>
                                <td>
                                    {option?.statementImage ? (
                                        <img src={option?.statementImage} alt="option_image"></img>
                                    ) : (
                                        <span>No file found</span>
                                    )}
                                </td>
                                <td>
                                    {option?.statementText ? (
                                        <span>{option?.statementText}</span>
                                    ) : (
                                        <span>No text found</span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
    const mainData = props.mainData ? props.mainData : [];

    return (
        <div className="adminDetailsCard">
            <Row>
                <Col md="12">
                    {/* <h5 className="question-text">{MainData.name ? MainData.name : "No question to display"}</h5> */}
                    <h6 className="question-detail-head">Question</h6>
                    <h2 className="question-details-queHead">
                        {/* <MathJax math={String.raw`${mainData?.description}`} /> */}
                        <div className="question-desc">
                            {ReactHtmlParser(mainData?.description)}
                        </div>
                    </h2>
                    <div className="divider">
                        <div className="divider-text" />
                    </div>
                    <h6 className="question-detail-head">Answer</h6>
                    <div className="profile-details">
                        <Row>
                            {mainData?.solutionType === "fill-in-the-blank" ? (
                                <Col md="6">
                                    {" "}
                                    <h2 className="question-details-queHead">
                                        {mainData?.fillInTheBlankSolution}
                                    </h2>
                                </Col>
                            ) : (
                                <Col md="6">{renderOptions}</Col>
                            )}

                            {/* <Col md="6">
                          {renderLabel}
                        </Col> */}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default QuestionOptions;
