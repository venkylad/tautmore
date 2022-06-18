import React from "react";

const DragAndDropAnswer = ({ questionDetailsData, questionType }) => {
  console.log(questionDetailsData, "data");
  return (
    <div className="drag-and-drop-que-part">
      {questionType !== "scrambled-and-unscrambled" && (
        <div>
        {/* <div className="drag-item-index-main">
          {questionDetailsData?.options?.map((item, i) => (
            <div className="drag-item-index">
                  <span>{i + 1}</span>
                </div>
          ))}
        </div> */}

        <div className="object-container">
          {questionDetailsData?.options?.map((item, i) => (
              <div className="drag-item">
              <div className="drag-item-index">
                <span>{i + 1}</span>
              </div>
              <div className="drag-item-sub">
                {item?.text && (
                  <span className="horizontal-text">{item?.text}</span>
                )}
                {item?.image && <img src={item?.image} alt="option_image"></img>}
              </div>
            </div>
            
          ))}
          </div>
        </div>
      )}
      {questionDetailsData?.questionOrientaion === "horizontal" && (
        <div className="preview-table-main">
          <table className="drag-detail-table horizontal">
            <thead>
              <th>Statement</th>
              {questionDetailsData?.statement?.length > 0 &&
                questionDetailsData?.statement?.map((option, key) => {
                  return (
                    <td>
                      <div className="horizontal-cell">
                        <span className="opti">
                          {String.fromCharCode(key + 65)}.
                        </span>
                        <div className="hori-text-img">
                          {option?.text && (
                            <span className="horizontal-text">
                              {option?.text}
                            </span>
                          )}
                          {option?.image && (
                            <img src={option?.image} alt="option_image"></img>
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
                {questionDetailsData?.statement?.length > 0 &&
                  questionDetailsData?.statement?.map((option, key) => {
                    return (
                      <td>
                        <div className="horizontal-cell">
                          <span className="opti">{key + 1}. </span>
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
        <table className="drag-detail-table vertical">
          <thead>
            <th>Statement</th>
            <th>Options</th>
          </thead>
          <tbody>
            {questionDetailsData?.statement?.length > 0 &&
              questionDetailsData?.statement?.map((option, key) => {
                return (
                  <tr>
                    <td className="left-part">
                      <div className="vertical-cell">
                        <span className="opti">
                          {String.fromCharCode(key + 65)}.
                        </span>
                        {option?.text && (
                          <span className="vertical-text">{option?.text}</span>
                        )}
                        {option?.image && (
                          <img src={option?.image} alt="option_image"></img>
                        )}
                      </div>
                    </td>
                    <td className="right-part">
                      <div className="vertical-cell">
                        <span className="opti">{key + 1}. </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DragAndDropAnswer;
