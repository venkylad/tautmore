import React from "react";
// import ExamAndTestAddQueActions from "../Exam-And-Test-DragandDropActions";
import ExamAndTestViewDetails from "../Olympiad-Exam-ViewDetails";
import { renderText } from "../../question-details/textHelper";
// import { Link } from "react-router-dom";
import { history } from "../../../../../history";
import { findKeyByValue } from "../../../forms/question-form/questionHelper";

const renderViewDetails = (row) =>{
    // localStorage.setItem("backPageolympiadUrl", window.location.href.split("/").pop());
    // history.push(`/add-questions-to-olympiad-details/${row._id}`)
  }
const ViewDetails = ({row}) =>{
  // console.log(row)
  

  
  return(
    <div>
        <a style={{color:'#7367f0'}} onClick={()=>renderViewDetails(row)}>View Details</a>
      </div>
  )
}

export const columnsData = (handleQuestionSelect) => [
  // {
  //   cell: (row) => {
  //     return (
  //       <ExamAndTestAddQueActions
  //         row={row}
  //         // loadData={this.loadData}
  //         // deleteRow={this.handleDelete}
  //       />
  //     );
  //   },
  // },
  {
    name: "Id",
    selector: "id",
    minWidth: "140px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.id}
      </p>
    ),
  },
  {
    name: "Tautmore id",
    selector: "Tautmore id",
    minWidth: "120px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.tautmoreId}
      </p>
    ),
  },

  {
    name: "Chapter",
    selector: "Chapter",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.chapterName}
      </p>
    ),
  },

  // {
  //   name: "subConcept",
  //   selector: "subConcept",
  //   minWidth: "120px",
  //   cell: (row) => (
  //     <p
  //       title={row.subConcept.name}
  //       className="text-truncate admindatarow text-bold-500 mb-0"
  //       data-tag="allowRowEvents"
  //     >
  //       {row.subConcept.name}
  //     </p>
  //   ),
  // },
  {
    name: "Description",
    selector: "Description",
    minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {renderText(row.description)}
      </p>
    ),
  },
  {
    name: "Question Type",
    selector: "questionType",
    minWidth: "180px",
    cell: (row) => (
      <p
        title={findKeyByValue(row.solutionType)}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {findKeyByValue(row.solutionType)}
      </p>
    ),
  },
  {
    name: "Difficulty",
    selector: "difficulty",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.difficultyLevel}
      </p>
    ),
  },
  {
    name: "Added by",
    selector: "addedBy",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.addedBy.name}
      </p>
    ),
  },
  {
    name: "Score",
    selector: "score",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.score}
      </p>
    ),
  },
  {
    cell: (row) => <ViewDetails row={row}/>
  },
  {
    cell: (row) => (
      <div className="data-list-action">
        <ExamAndTestViewDetails row={row} handleQuestionSelect={handleQuestionSelect}/>
      </div>
    )
  },
];


