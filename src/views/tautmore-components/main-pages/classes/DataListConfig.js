import React, { useState, useEffect } from 'react';
import {classesData, classDataColumn} from './mockdata';
import { history } from '../../../../history';
import DataTable from "react-data-table-component";
import "../../../../assets/scss/pages/data-list.scss";
import { Trash } from "react-feather";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronsUp } from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";

const DataListConfig = ({batchData, resultText, setDeleteModel, setSelectedBatchId}) =>{
  
  const rowsPerPage = 10;
  const [curentRows, setCurrentRows] = useState(batchData.slice(0, rowsPerPage));
  
  useEffect(() => {
    setCurrentRows(batchData.slice(0, rowsPerPage));
  }, [batchData, rowsPerPage]);

  const [currentPageNo, setCurrentPageNo] = useState(0);
  const handlePageChange = (page) => {
    let startRowNo = page.selected * rowsPerPage;
    let endRowNo = startRowNo + rowsPerPage;
    setCurrentPageNo(Number(page.selected));
    // setCurrentRows(data.slice(startRowNo, endRowNo));
  };

  const batchDetailsPage = (data) => {
    history.push(`/batch-details/${data?.batchId}`);
  };

  const handleDelete = (id) => {
    setSelectedBatchId(id);
    setDeleteModel(true);
  }

  const classDataColumn = () => [
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
          {row.batch}
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
          {row.board.name}
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
          {row.grade.name}
        </p>
      ),
    },
    {
      name: "Subjects",
      selector: "Subjects",
  
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.subjects.name}
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
          {row.teacher.fullName}
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
          {row.students}
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
    console.log(row, 'row from action component');
    return (
      <div className="data-list-action data-list-viewDetails">
        <div>
          {row.row.schedule === true ? <Link to={`/batch-details/${row.row.batchId}`}>View Schedule</Link> : <Link to={`/batch-details/${row.row.batchId}`}>Schedule</Link>}
          <Trash
            className="cursor-pointer"
            size={20}
            onClick={() => handleDelete(row.row.batchId)}
          />
        </div>
      </div>
    );
  };
  

    return(
        <div className={`data-list ${"list-view"}  rp-manage-schools-main batch-detail-table`}>
          <DataTable
            columns={classDataColumn()}
            data={curentRows}
            onRowClicked= {(data) => batchDetailsPage (data)}
            noDataComponent={resultText}
            noHeader
            responsive
            pointerOnHover
            pagination={true}
            paginationComponent={() =>
                <ReactPaginate
                  previousLabel={<ChevronLeft size={15} />}
                  nextLabel={<ChevronRight size={15} />}
                  breakLabel="..."
                  breakClassName="break-me"
                  pageCount={Math.ceil(
                    batchData.length / (rowsPerPage ? rowsPerPage : 5)
                  )}
                  containerClassName="vx-pagination separated-pagination float-left pagination-end pagination-sm mb-0 mt-2 pagination-active"
                  activeClassName="active"
                  forcePage={currentPageNo}
                  onPageChange={(pageNo) => handlePageChange(pageNo)}
                />
            }
          />
          {/* <ToastContainer draggable={false} /> */}
        </div>
    )
}

export default DataListConfig;