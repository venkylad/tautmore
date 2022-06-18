import React from 'react';
import {SubscriberColumnData} from '../mockdata';
import DataTable from "react-data-table-component";
import {history} from '../../../../../history'
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../../assets/scss/pages/data-list.scss";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";

const CourseSubscribers = ({courseSubscribers, totalPage, parsedFilter, id, resultText}) =>{
    
    const handlePagination = (page) => {
        let urlPrefix = `/payments-details/${id}`;
        history.push(`${urlPrefix}?page=${page.selected + 1}`);
      };
     
    return(
        <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={SubscriberColumnData()}
          data={courseSubscribers}
          pagination
          paginationServer
          noDataComponent={resultText}
          // onRowClicked={(data) => {
          //   // history.push(`/manage-admin/${data._id}`);
          // }}
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
          noHeader
          responsive
          pointerOnHover
          
        />
        {/* <ToastContainer draggable={false} /> */}
      </div>
    )
}

export default CourseSubscribers;