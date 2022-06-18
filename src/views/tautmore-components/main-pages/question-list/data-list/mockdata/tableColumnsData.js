import React from "react";
import QuestionAction from "../QuestionActions";
import { CustomInput } from "reactstrap";
import { renderText } from "../../../../sections/question-details/textHelper";
import { findKeyByValue } from "../../../../forms/question-form/questionHelper";
import { v4 as uuid } from "uuid";

export const columnsData = (handleQuestionSelect) => [
  {
    name: "Select",
    selector: "checkbox",
    minWidth: "80px",
    cell: (row) => (
      <p
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
      </p>
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
    minWidth: "140px",
    maxWidth: "280px",
    cell: (row) => (
      <p
        title={renderText(row.description)}
        className="text-truncate admindatarow text-bold-500 mb-0 desc-cell"
        data-tag="allowRowEvents"
      >
        {renderText(row.description)}
      </p>
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
        {row.addedBy?.[0]?.name}
      </p>
    ),
  },
  {
    name: "Status",
    selector: "difficulty",
    cell: (row) => (
      <p
        title={row.status}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.active ? 'Active' : 'Inactive'}
      </p>
    ),
  },
];


export const questioTypesRawData = [
  {
    id: uuid(),
    // name: "Multiscalerating",
    // value: "multiscalerating",
    name: "Choose the correct answer",
    value: "choose-the-correct-answer",
  },
  {
    id: uuid(),
    name: " Statement and support",
    value: "statement-and-support",
  },
  {
    id: uuid(),
    name: "Drag and drop",
    value: "drag-and-drop",
  },
  {
    id: uuid(),
    name: "Two columns option",
    value: "two-columns-option",
  },
  {
    id: uuid(),
    name: "Open-ended questions",
    value: "open-ended-questions",
  },
  {
    id: uuid(),
    name: "Passage",
    value: "passage",
  },
  {
    id: uuid(),
    name: "Error findings",
    value: "error-findings",
  },
  {
    id: uuid(),
    name: "Multiple",
    value: "multi",
  },
  {
    id: uuid(),
    name: "Match the following",
    value: "match-the-following",
  },
  {
    id: uuid(),
    name: "Selecting the word/sentence",
    value: "selecting-the-word-sentence",
  },
  {
    id: uuid(),
    name: " Scrambled & Unscrambled",
    value: "scrambled-and-unscrambled",
  },
];