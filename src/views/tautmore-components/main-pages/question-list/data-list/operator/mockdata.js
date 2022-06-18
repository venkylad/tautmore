import React from "react";
import { Link } from "react-router-dom";
import QuestionStatus from "./QuestionStatus";
import { renderText } from "../../../../sections/question-details/textHelper";
import { findKeyByValue } from "../../../../forms/question-form/questionHelper";

export const DeclinedQuestionsData = [
  {
    id: "451",
    subject: "science",
    title: "Newton's first law",
    declinedBy: "Rajshekar",
    date: "22/05/2021",
    status: "open",
  },
  {
    id: "452",
    subject: "science",
    title: "Newton's first law",
    declinedBy: "Raj",
    date: "22/05/2021",
    status: "Re-submitted",
  },
  {
    id: "453",
    subject: "science",
    title: "Newton's first law",
    declinedBy: "punith",
    date: "22/05/2021",
    status: "open",
  },
  {
    id: "454",
    subject: "science",
    title: "Newton's first law",
    declinedBy: "pavan",
    date: "22/05/2021",
    status: "Re-submitted",
  },
  {
    id: "455",
    subject: "science",
    title: "Newton's first law",
    declinedBy: "praveen",
    date: "22/05/2021",
    status: "open",
  },
  {
    id: "456",
    subject: "science",
    title: "Newton's first law",
    declinedBy: "manja",
    date: "22/05/2021",
    status: "Re-submitted",
  },
];

export const AllQuestionsData = [
  {
    id: "451",
    subject: "science",
    title: "Newton's first law",
    addedBy: "Rajshekar",
    date: "22/05/2021",
    status: "open",
  },
  {
    id: "452",
    subject: "science",
    title: "Newton's first law",
    addedBy: "Raj",
    date: "22/05/2021",
    status: "Re-submitted",
  },
  {
    id: "453",
    subject: "science",
    title: "Newton's first law",
    addedBy: "punith",
    date: "22/05/2021",
    status: "open",
  },
  {
    id: "454",
    subject: "science",
    title: "Newton's first law",
    addedBy: "pavan",
    date: "22/05/2021",
    status: "Re-submitted",
  },
  {
    id: "455",
    subject: "science",
    title: "Newton's first law",
    addedBy: "praveen",
    date: "22/05/2021",
    status: "open",
  },
  {
    id: "456",
    subject: "science",
    title: "Newton's first law",
    addedBy: "manja",
    date: "22/05/2021",
    status: "Re-submitted",
  },
];

export const DeclinedQuestionsColumnData = () => [
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
        title={row.subjectName}
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
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.difficulty}
      </p>
    ),
  },
  {
    name: "Description",
    selector: "desc",
    minWidth: "350px",
    maxWidth: "500px",

    cell: (row) => (
      <div
        title={renderText(row.description)}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {renderText(row.description)}
      </div>
    ),
  },
  {
    name: "Declined By",
    selector: "declinedBy",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.reviewedBy?.name}
      </p>
    ),
  },
  // {
  //   name: "Date",
  //   selector: "date",

  //   cell: (row) => (
  //     <p
  //       title={row.name}
  //       className="text-truncate admindatarow text-bold-500 mb-0"
  //       data-tag="allowRowEvents"
  //     >
  //       {row.reviewedDate}
  //     </p>
  //   ),
  // },
  // {
  //   name: "Status",
  //   selector: "status",

  //   cell: (row) => (
  //     <p
  //       title={row.name}
  //       className="text-truncate admindatarow text-bold-500 mb-0"
  //       data-tag="allowRowEvents"
  //     >
  //       {row.status}
  //     </p>
  //   ),
  // },
  {
    cell: (row) => {
      return <ActionsComponent row={row} />;
    },
  },
];

export const AllQuestionsColumnData = () => [
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
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.difficulty}
      </p>
    ),
  },
  {
    name: "Description",
    selector: "desc",
    minWidth: "350px",
    maxWidth: "500px",
    cell: (row) => (
      <div
        title={renderText(row.description)}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {renderText(row.description)}
      </div>
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
        {/* {row.addedBy} */}
        {row.addedBy?.[0]?.name}
      </p>
    ),
  },
  {
    name: "Delete",
    cell: (row) => <QuestionStatus row={row} />,
  },
  // {
  //   name: "Date",
  //   selector: "date",

  //   cell: (row) => (
  //     <p
  //       title={row.name}
  //       className="text-truncate admindatarow text-bold-500 mb-0"
  //       data-tag="allowRowEvents"
  //     >
  //       {row.createdAt}
  //     </p>
  //   ),
  // },
  // {
  //   name: "Status",
  //   selector: "status",

  //   cell: (row) => (
  //     <p
  //       title={row.name}
  //       className="text-truncate admindatarow text-bold-500 mb-0"
  //       data-tag="allowRowEvents"
  //     >
  //       {row.status}
  //     </p>
  //   ),
  // },
  {
    cell: (row) => {
      return <ActionsComponentDeclined row={row} />;
    },
  },
];

const ActionsComponent = (props) => {
  return (
    <div className="data-list-action data-list-viewDetails">
      <div>
        <Link to={`/question-details/${props?.row?._id}`}>View Details</Link>
      </div>
    </div>
  );
};

const ActionsComponentDeclined = (props) => {
  return (
    <div className="data-list-action data-list-viewDetails">
      <div>
        <Link to={`/question-details/${props?.row?._id}`}>View Details</Link>
      </div>
    </div>
  );
};
