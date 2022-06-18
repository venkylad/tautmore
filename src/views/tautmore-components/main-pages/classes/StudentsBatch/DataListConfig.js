import React, { useState } from 'react';
//import {SelectedStudents, SelectedStudentsColumn} from './mockdata';
import DataTable from "react-data-table-component";
import "../../../../../assets/scss/pages/data-list.scss";
import * as Icon from "react-feather";
import { CustomInput } from "reactstrap";
import { Check } from "react-feather";


const DataListConfig = ({studentData, selectedStudentList, setSelectedStudentList, setStudentListError}) =>{

  const changeStudent = (id) => {
    selectedStudentList.length === 0 ? setStudentListError(true) : setStudentListError(false);
    if(selectedStudentList.indexOf(id) > -1){
        const filteredValues = selectedStudentList.filter((val) => val !== id);
        setSelectedStudentList([...filteredValues]);
    }
    else {
        setSelectedStudentList([...selectedStudentList, id]);
    }
  };

  console.log(selectedStudentList, 'selectedStudent from data list');

  const SelectedStudentsColumn = () => [
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
      name: "Time Zone",
      selector: "Time Zone",
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
      name: "No. of classes Remaining",
      selector: "No. of classes Remaining",
      // minWidth: "180px",
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.remainingclasses}
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
      return (
          <div className="data-list-action data-list-viewDetails">
          <CustomInput
            className="custom-check-dark mr-1 mb-2"
            type="checkbox"
            defaultChecked={selectedStudentList?.includes(row.row.id) ? 'checked' : ''}
            icon={<Check className="vx-icon" size={20} />}
            id={row.row.name + row.row.id}
            name={row.row.name + row.row.id}
            onChange={() => changeStudent(row.row.id)}
          />
        </div>
      );
    };

    
    return(
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={SelectedStudentsColumn()}
          data={studentData}
          noHeader
          responsive
          pointerOnHover
        />
        {/* <ToastContainer draggable={false} /> */}
      </div>
    )
}

export default DataListConfig;