import React from "react";

export const classesData = [
  {
    grade: "4",
    subjects: "Maths",
    teacher: "lokesh",
    status: "ongoing",
    date: "Aug 20, 2021",
    Time: "12:30 PM",
  },
  {
    grade: "4",
    subjects: "science",
    teacher: "lokesh",
    status: "scheduled",
    date: "Aug 25, 2021",
    Time: "12:30 PM",
  },
  {
    grade: "4",
    subjects: "Maths",
    teacher: "lokesh",
    status: "ongoing",
    date: "Aug 20, 2021",
    Time: "12:30 PM",
  },
  {
    grade: "4",
    subjects: "science",
    teacher: "lokesh",
    status: "scheduled",
    date: "Aug 25, 2021",
    Time: "12:30 PM",
  },
];

export const examsData = [
    {
        subject:"mathematics",
        grade:"4",
        examType:"Annual Olympiad",
        date: "Aug 25, 2021",
        Time: "12:30 PM",
    },
    {
        subject:"mathematics",
        grade:"4",
        examType:"Annual Olympiad",
        date: "Aug 25, 2021",
        Time: "12:30 PM",
    },
    {
        subject:"mathematics",
        grade:"4",
        examType:"Annual Olympiad",
        date: "Aug 25, 2021",
        Time: "12:30 PM",
    },
    {
        subject:"mathematics",
        grade:"4",
        examType:"Half Yearly Olympiad",
        date: "Aug 25, 2021",
        Time: "12:30 PM",
    },
]

export const discountData = [
    {
        code:"TAUT50",
        amt:"50 %",
        Expiry:"22 Aug, 2022"
    },
    {
        code:"TAUT50",
        amt:"50 %",
        Expiry:"22 Aug, 2022"
    },
    {
        code:"TAUT50",
        amt:"50 %",
        Expiry:"22 Aug, 2022"
    },
    {
        code:"TAUT50",
        amt:"50 %",
        Expiry:"22 Aug, 2022"
    },
]

export const classDataColumn = () => [
    {
        name: "Subject",
        selector: "Subject",
        width:"250px",
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.subjects}
          </p>
        ),
      },
  {
    name: "Grade",
    selector: "Grade",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        Grade {row.grade}
      </p>
    ),
  },
  
  {
    name: "Teacher",
    selector: "Teacher",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.teacher}
      </p>
    ),
  },
  {
    name: "Date",
    selector: "Date",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0 customChapter"
        data-tag="allowRowEvents"
      >
        {row.date} | {row.Time}
      </p>
    ),
  },
  {
    name: "Status",
    selector: "status",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.status === "ongoing" ? (
          <span className="badge-active">
            <span className="badge-dot-active"></span>Ongoing
          </span>
        ) :  (
          <span className="badge-leave">
            <span className="badge-dot-leave"></span>Scheduled
          </span>
        ) }
      </p>
    ),
  },
];

export const examsDataColumn = () => [
    {
        name: "Subject",
        selector: "Subject",
        width:"150px",
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
    name: "Grade",
    selector: "Grade",
    width:"100px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        Grade {row.grade}
      </p>
    ),
  },
  
  {
    name: "Exam Type",
    selector: "Exam Type",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.examType}
      </p>
    ),
  },
  {
    name: "Date",
    selector: "Date",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0 customChapter"
        data-tag="allowRowEvents"
      >
        {row.date} <br/> {row.Time}
      </p>
    ),
  }
];

export const discountDataColumn = () => [
    {
        name: "code",
        selector: "code",
        width:"150px",
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.code}
          </p>
        ),
      },
  {
    name: "amount",
    selector: "amount",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
         {row.amt}
      </p>
    ),
  },
  
  {
    name: "Expiry",
    selector: "Expiry",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.Expiry}
      </p>
    ),
  },
];



