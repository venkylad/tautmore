import React from "react";
import { Link } from "react-router-dom";
import { renderText } from "../../../../sections/question-details/textHelper";
import QuestionAction from "../QuestionActions";
import { CustomInput } from "reactstrap";
import { findKeyByValue } from "../../../../forms/question-form/questionHelper";

export const ApprovedQuestionsColumnData = () => [
  {
    name: "ID",
    selector: "id",
    minWidth: "180px",
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
    name: "Tautmore ID",
    selector: "tautmoreId",
    minWidth: "180px",
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
    name: "Subject",
    selector: "subject",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.subjectName}
      </p>
    ),
  },
  {
    name: "Description",
    selector: "desc",
    minWidth: "140px",
    maxWidth: "280px",
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
    name: "Added By",
    selector: "addedBy",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.addedBy?.[0]?.name}
      </p>
    ),
  },
  {
    name: "Date",
    selector: "date",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.createdAt}
      </p>
    ),
  },
  {
    cell: (row) => {
      return <ActionsComponent row={row} />;
    },
  },
];


export const columnsData = (handleQuestionSelect) => [
  {
    name: "Select",
    selector: "checkbox",
    minWidth: "80px",
    cell: (row) => (
      <div
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        <div className="data-list-action">
          <CustomInput
            className="custom-check-dark mr-1 mb-2"
            type="checkbox"
            id={`"check"-${row._id}`}
            name={`${row.name}-${row._id}`}
            onChange={(e) => handleQuestionSelect(e, row._id)}
            inline
            // checked={}
          />
        </div>
        {/* {row.id} */}
      </div>
    ),
  },
  {
    name: "Id",
    selector: "id",
    minWidth: "80px",
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
    name: "Tautmore ID",
    selector: "tautmoreId",
    minWidth: "180px",
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
    name: "subject",
    selector: "subjectName",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.subjectName}
      </p>
    ),
  },

  {
    name: "subConcept",
    selector: "subConcept",
    minWidth: "120px",
    cell: (row) => (
      <p
        title={row.subConcept?.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.subConcept?.name}
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
    name: "Exam Type",
    selector: "questionType",
    minWidth: "180px",
    cell: (row) => (
      <p
        title={row.moduleType}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.moduleType}
      </p>
    ),
  },

  {
    name: "Difficulty",
    selector: "difficulty",
    cell: (row) => (
      <div
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.difficulty}
      </div>
    ),
  },

  {
    name: "Description",
    selector: "desc",
    minWidth: "140px",
    maxWidth: "280px",
    cell: (row) => (
      <div
        title={renderText(row.description)}
        className="text-truncate admindatarow text-bold-500 mb-0 myque-desc"
        data-tag="allowRowEvents"
      >
        {renderText(row.description)}
      </div>
    ),
  },

  {
    name: "Added by",
    selector: "difficulty",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.addedBy?.name}
      </p>
    ),
  },
  {
    name: "Active / Inactive",
    cell: (row) => <QuestionAction row={row} />,
  },
];

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action data-list-viewDetails">
      <div>
        <Link to="#">View Details</Link>
      </div>
    </div>
  );
};
