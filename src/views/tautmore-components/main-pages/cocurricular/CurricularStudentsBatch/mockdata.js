import React, {useState} from "react";
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

export const SelectedStudentsColumn = (handleStudentSelect, selectedStud) => [
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
        {row.studentName}
      </p>
    ),
  },
  {
    name: "Timezone",
    selector: "Timezone",
    // minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.timezone}
      </p>
    ),
  },
  {
    name: "No. of Classes Remaining",
    selector: "No. of Classes Remaining",
    // minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.cocurricularRemainingClassCount}
      </p>
    ),
  },
  {
    cell: (row) => {
      return <ActionsComponent row={row} handleStudentSelect={handleStudentSelect} selectedStud={selectedStud}/>;
    },
  },
];

const ActionsComponent = ({row, handleStudentSelect, selectedStud}) => {
  // const selQue = JSON.parse(localStorage.getItem('cocurrStudents'));
  // const val=selQue.find(e => e.id === row._id);
  // console.log(val)
  // const [status, setStatus] = useState(val?.checkedStudent);
    return (
        <div className="data-list-action data-list-viewDetails">
        <CustomInput
        className="custom-check-dark mr-1 mb-2"
        type="checkbox"
        defaultChecked={selectedStud?.includes(row._id) ? 'checked' : ''}
        id={`"check"-${row._id}`}
        name={`${row.studentName}-${row._id}`}
        onChange={(e) => handleStudentSelect(row._id)}
        inline
        // checked={status}
      />
      </div>
    );
  };
