import React from 'react';
import { classDataColumn} from './mockdata';
import DataTable from "react-data-table-component";
import "../../../../assets/scss/pages/data-list.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import { history } from '../../../../history';

const DataListConfig = ({batchData, totalPage, resultText, parsedFilter, loadBatchList}) =>{

  const handlePagination = (page) =>{
    let urlPrefix = `/co-curricular`;
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

    return(
        <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <DataTable
        columns={classDataColumn(loadBatchList)}
        data={batchData}
        pagination
        paginationServer
        noDataComponent={resultText}
        paginationComponent={() => (
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalPage}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            forcePage={
              parsedFilter.page
                ? parseInt(parsedFilter.page - 1)
                : 0
            }
            onPageChange={(page) => {
              handlePagination(page);
            }}
          />
        )}
        onRowClicked={(data) => {
          history.push(`/co-curricular-batch-details/${data._id}`);
        }}
        noHeader
        responsive
        pointerOnHover
      />
      {/* <ToastContainer draggable={false} /> */}
    </div>
    )
}

export default DataListConfig;