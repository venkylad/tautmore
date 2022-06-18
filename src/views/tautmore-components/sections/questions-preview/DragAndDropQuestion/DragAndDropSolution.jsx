import React from "react";
import { structureDragAndDrop } from "../../question-details/mockData/questionDetailData";

const DragAndDropSolution = ({ questionDetailsData }) => {
  const dragData = structureDragAndDrop(
    questionDetailsData?.statement,
    questionDetailsData?.options,
    questionDetailsData?.solutionIndex
  );
  return (
    <div className="drag-and-drop-que-part">
      <div className="object-container">
        <h3>Solution</h3>
      </div>
      {questionDetailsData?.questionOrientaion === "horizontal" && (
        <div className="preview-table-main">
          <table className="drag-detail-table horizontal">
            <thead>
              <th>Statement</th>
              {dragData?.length > 0 &&
                dragData?.map((item, key) => {
                  return (
                    <td>
                      <div className="horizontal-cell">
                        <span className="opti">
                          {String.fromCharCode(key + 65)}.
                        </span>
                        <div className="hori-text-img">
                          {item?.text && (
                            <span className="horizontal-text">
                              {item?.text}
                            </span>
                          )}
                          {item?.image && (
                            <img src={item?.image} alt="option_image"></img>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
            </thead>
            <tbody>
              <tr>
                <th>Options</th>
                {dragData?.length > 0 &&
                  dragData?.map((item, key) => {
                    return (
                      <td>
                        <div className="horizontal-cell">
                          <span className="opti">{key + 1}. </span>
                          <div className="hori-text-img">
                            {item?.statementText && (
                              <span className="horizontal-text">
                                {item?.statementText}
                              </span>
                            )}
                            {item?.statementImage && (
                              <img
                                src={item?.statementImage}
                                alt="option_image"
                              ></img>
                            )}
                          </div>
                        </div>
                      </td>
                    );
                  })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {questionDetailsData?.questionOrientaion === "vertical" && (
        <div>
        <table className="drag-detail-table vertical">
          <thead>
            <th>Statement</th>
            <th>Options</th>
          </thead>
          <tbody>
            {dragData?.length > 0 &&
              dragData?.map((item, key) => {
                return (
                  <tr>
                    <td className="left-part">
                      <div className="vertical-cell">
                        <span className="opti">
                          {String.fromCharCode(key + 65)}.
                        </span>
                        {item && (
                          <span className="vertical-text">{item?.text}</span>
                        )}
                        {item?.image  && (
                          <img src={item?.image} alt="option_image"></img>
                        )}
                      </div>
                    </td>
                    <td className="right-part">
                      <div className="vertical-cell">
                        <span className="opti">{key + 1} . </span>
                        {item?.statementText && (
                          <span className="vertical-cell vertical-text">
                            {item?.statementText}
                          </span>
                        )}
                        {item?.statementImage && (
                          <img
                            src={item?.statementImage}
                            alt="option_image"
                          ></img>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default DragAndDropSolution;
