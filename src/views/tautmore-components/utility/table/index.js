import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { ChevronLeft, ChevronRight, ChevronsUp } from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";

const Table = ({
  parentClassName,
  tableClassName,
  columns,
  data,
  onRowClicked,
  selectableRows,
  rowsPerPage,
  shouldPaginate,
  title,
}) => {
  const [curentRows, setCurrentRows] = useState(
    shouldPaginate ? data.slice(0, rowsPerPage) : data
  );

  useEffect(() => {
    setCurrentRows(shouldPaginate ? data.slice(0, rowsPerPage) : data);
  }, [data, rowsPerPage, shouldPaginate]);

  const [currentPageNo, setCurrentPageNo] = useState(0);
  const handlePageChange = (page) => {
    let startRowNo = page.selected * rowsPerPage;
    let endRowNo = startRowNo + rowsPerPage;
    setCurrentPageNo(Number(page.selected));
    setCurrentRows(data.slice(startRowNo, endRowNo));
  };

  console.log(data,"from table comp")

  return (
    <div className={`data-list ${parentClassName}`}>
      <DataTable
        // title= {JSON.stringify (title)}
        // noHeader
        columns={columns}
        data={curentRows}
        defaultSortFieldId={1}
        sortIcon={<ChevronsUp />}
        pagination={shouldPaginate}
        className={tableClassName}
        // highlightOnHover
        onRowClicked={onRowClicked ? onRowClicked : null}
        selectableRows={selectableRows ? selectableRows : false}
        paginationComponent={() =>
          shouldPaginate ? (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={Math.ceil(
                data.length / (rowsPerPage ? rowsPerPage : 5)
              )}
              containerClassName="vx-pagination separated-pagination float-left pagination-end pagination-sm mb-0 mt-2 pagination-active"
              activeClassName="active"
              forcePage={currentPageNo}
              onPageChange={(pageNo) => handlePageChange(pageNo)}
            />
          ) : null
        }
        noHeader
      />
    </div>
  );
};

export default Table;
