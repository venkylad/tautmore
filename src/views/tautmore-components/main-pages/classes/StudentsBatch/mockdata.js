import React from "react";
import * as Icon from "react-feather";
import { CustomInput } from "reactstrap";

export const SelectedStudents = [
  {
    id:"1",
    name: "loki",
    grade: "III",
    subject:"mathematics"
  },
  {
    id:"2",
    name: "puru",
    grade: "III",
    subject:"mathematics"
  },
  {
    id:"3",
    name: "mithun",
    grade: "III",
    subject:"mathematics"
  },
  {
    id:"4",
    name: "Sakthivel",
    grade: "III",
    subject:"mathematics"
  },
  {
    id:"5",
    name: "Raj Kumar",
    grade: "III",
    subject:"mathematics"
  },
];

export const SelectedStudentsColumn = () => [
  {
    // minWidth: "50px",
    cell: (row) => (
      <div className="image-size" data-tag="allowRowEvents">
        {row.image ? `{<img src="">}` : <Icon.User size={20} />}
      </div>
    ),
  },
  {
    name: "Name",
    selector: "Name",
    // minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.name}
      </p>
    ),
  },
  // {
  //   name: "Grade",
  //   selector: "Grade",
  //   // minWidth: "180px",
  //   cell: (row) => (
  //     <p
  //       title={row.name}
  //       className="text-truncate admindatarow text-bold-500 mb-0"
  //       data-tag="allowRowEvents"
  //     >
  //       {row.grade}
  //     </p>
  //   ),
  // },
  {
    name: "Grade",
    selector: "Grade",
    // minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.grade}
      </p>
    ),
  },
  {
    name: "Subject",
    selector: "Subject",
    // minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.subject}
      </p>
    ),
  },
  {
    cell: (row) => {
      return <ActionsComponent row={row} />;
    },
  },
];

const ActionsComponent = (row) => {
    console.log(row)
    return (
        <div className="data-list-action data-list-viewDetails">
        <CustomInput
          className="custom-check-dark mr-1 mb-2"
          type="checkbox"
          id={row.row.id}
          name={row.row.id}
        />
      </div>
    );
  };
