import React from "react";
import { Link } from "react-router-dom";
import Table from "../../../utility/table";
import { teacherSalaryData } from "../mockdata";

const SalaryDetails = () => {
  const tableColumns = [
    {
      id: 1,
      name: "Emp ID",
      selector: (row) => row.empId,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "Credited On",
      selector: (row) => row.creditedOn,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "Payment Status",
      selector: (row) => (
        <p
          className={`payment-status ${
            row.status === "Processing" ? "Processing" : "Credited"
          }`}
        >
          {row.status}
        </p>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "Working Days",
      selector: (row) => row.workingDays,
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "",
      selector: (row) => (
        <Link href="#" className="teacher-deatail-view">
          View Details
        </Link>
      ),
      sortable: true,
      reorder: true,
    },
  ];
  const rowClickHandler = (row) => {
    console.log("Clicked row: => ", row);
  };

  return (
    <Table
      columns={tableColumns}
      data={teacherSalaryData}
      onRowClicked={rowClickHandler}
      rowsPerPage={5}
      parentClassName="teacher-table-container salary-table"
      tableClassName="teacher-table"
      shouldPaginate={false}
    />
  );
};

export default SalaryDetails;
