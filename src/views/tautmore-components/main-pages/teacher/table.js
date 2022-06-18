import Table from "../../utility/table";
import React from "react";

const TableView = ({ tableColumns, teacherList, rowClickHandler }) => {
  return (
    <React.Fragment>
      <Table
        columns={tableColumns}
        data={teacherList}
        onRowClicked={rowClickHandler}
        rowsPerPage={5}
        parentClassName="teacher-table-container"
        tableClassName="teacher-table"
        shouldPaginate={true}
      />
    </React.Fragment>
  );
};

export default TableView;
