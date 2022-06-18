import React from "react";
import { Link } from "react-router-dom";
import "./classes.scss";
import { Trash } from "react-feather";

export const classesData = [
  {
    batch: "Batch Name 1",
    grade: "4",
    subjects: "Maths",
    board: "Borad Name 1",
    students: "10",
    teacher: "lokesh",
    schedule: "true",
  },
  {
    batch: "Batch Name 1",
    grade: "4",
    subjects: "Maths",
    board: "Borad Name 1",
    students: "10",
    teacher: "lokesh",
    schedule: "false",
  },
  {
    batch: "Batch Name 1",
    grade: "4",
    subjects: "Maths",
    board: "Borad Name 1",
    students: "10",
    teacher: "lokesh",
    schedule: "true",
  },
  {
    batch: "Batch Name 1",
    grade: "4",
    subjects: "Maths",
    board: "Borad Name 1",
    students: "10",
    teacher: "lokesh",
    schedule: "true",
  },
  {
    batch: "Batch Name 1",
    grade: "4",
    subjects: "Maths",
    board: "Borad Name 1",
    students: "10",
    teacher: "lokesh",
    schedule: "true",
  },
];

// export const classDataColumn = () => [
//   {
//     name: "Batch",
//     selector: "Batch",
//     minWidth: "180px",
//     cell: (row) => (
//       <p
//         title={row.name}
//         className="text-truncate admindatarow text-bold-500 mb-0"
//         data-tag="allowRowEvents"
//       >
//         {row.batch}
//       </p>
//     ),
//   },
//   {
//     name: "Board",
//     selector: "Board",
//     minWidth: "180px",
//     cell: (row) => (
//       <p
//         title={row.name}
//         className="text-truncate admindatarow text-bold-500 mb-0"
//         data-tag="allowRowEvents"
//       >
//         {row.board.name}
//       </p>
//     ),
//   },
//   {
//     name: "Grade",
//     selector: "Grade",

//     cell: (row) => (
//       <p
//         title={row.name}
//         className="text-truncate admindatarow text-bold-500 mb-0"
//         data-tag="allowRowEvents"
//       >
//         {row.grade.name}
//       </p>
//     ),
//   },
//   {
//     name: "Subjects",
//     selector: "Subjects",

//     cell: (row) => (
//       <p
//         title={row.name}
//         className="text-truncate admindatarow text-bold-500 mb-0"
//         data-tag="allowRowEvents"
//       >
//         {row.subjects.name}
//       </p>
//     ),
//   },
//   {
//     name: "Teacher",
//     selector: "Teacher",

//     cell: (row) => (
//       <p
//         title={row.name}
//         className="text-truncate admindatarow text-bold-500 mb-0"
//         data-tag="allowRowEvents"
//       >
//         {row.teacher.fullName}
//       </p>
//     ),
//   },
//   {
//     name: "Students",
//     selector: "Students",

//     cell: (row) => (
//       <p
//         title={row.name}
//         className="text-truncate admindatarow text-bold-500 mb-0 customChapter"
//         data-tag="allowRowEvents"
//       >
//         {row.students}
//       </p>
//     ),
//   },
//   {
//     cell: (row) => {
//       return <ActionsComponent row={row} />;
//     },
//   },
// ];

// const ActionsComponent = (row) => {
//   return (
//     <div className="data-list-action data-list-viewDetails">
//       <div>
//         {row.row.schedule === "true" ? <Link to="/batch-details">View Schedule</Link> : <Link to="/batch-details">Schedule</Link>}
//         <Trash
//         className="cursor-pointer"
//         size={20}
//       />
//       </div>
//     </div>
//   );
// };
