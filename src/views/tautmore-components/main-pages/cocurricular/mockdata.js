import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./cocurricular.scss";
import { Trash } from "react-feather";
import DeletePopup from "../question-list/DeletePopup";
import { deleteBatch } from "../../services/apis/co_curricular_apis/co-curricular-apis";
import { toast } from "react-toastify";

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

export const classDataColumn = (loadBatchList) => [
  {
    name: "Batch",
    selector: "Batch",
    minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.batchName}
      </p>
    ),
  },
  {
    name: "Board",
    selector: "Board",
    minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.boardInfo.name}
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
        {row.gradeInfo.name}
      </p>
    ),
  },
  {
    name: "Activities",
    selector: "Activities",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.activityInfo.activityName}
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
        {row.teacherInfo.fullName}
      </p>
    ),
  },
  {
    name: "Students",
    selector: "Students",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0 customChapter"
        data-tag="allowRowEvents"
      >
        {row.numOfStudents}
      </p>
    ),
  },
  {
    cell: (row) => {
      return <ActionsComponent row={row} loadBatchList={loadBatchList} />;
    },
  },
];

const ActionsComponent = ({ row, loadBatchList }) => {
  const [modal, setModal] = useState(false);

  const toggle = async (id) => {
    console.log(id)
    try{
      const res = await deleteBatch({batch:id});
    if(res.status === 200){
      toast.success("Batch is deleted successfully");
      loadBatchList()
    }
    }catch(error){
      toast.error(error.response.data.message);
    }
    
    // props.deleteAdmin(id);
    // setModal(!modal);
  };

  return (
    <div className="data-list-action data-list-viewDetails">
      <div>
        {row.isScheduled === true ? (
          <Link to={`/co-curricular-batch-details/${row._id}`}>
            View Schedule
          </Link>
        ) : (
          <Link to={`/co-curricular-batch-details/${row._id}`}>Schedule</Link>
        )}
        <Trash
          className="cursor-pointer"
          size={20}
          onClick={() => setModal(!modal)}
        />

        <DeletePopup
          modal={modal}
          toggle={toggle}
          setModal={setModal}
          id={row._id}
        />
      </div>
    </div>
  );
};
