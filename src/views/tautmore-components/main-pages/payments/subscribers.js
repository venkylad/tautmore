import React, {Component} from "react";
import "../../../../assets/scss/pages/data-list.scss";
import {SubscriberColumnData} from './mockdata';
import { history } from "../../../../history";
import DataTable from "react-data-table-component";
import './PaymentsMain.scss';
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

class DataListConfig extends Component {

   handlePagination (page) {
    let urlPrefix = `/course-payments`;
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

  render() {
    return (
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={SubscriberColumnData()}
          data={this.props.subscribers}
          pagination
          paginationServer
          noDataComponent={this.props.resultText}
          // onRowClicked={(data) => {
          //   // history.push(`/manage-admin/${data._id}`);
          // }}
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={this.props.subTotalPage}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={
                this.props.parsedFilter.page
                  ? parseInt(this.props.parsedFilter.page - 1)
                  : 0
              }
              onPageChange={(page) => {
                this.handlePagination(page);
              }}
            />
          )}
          noHeader
          responsive
          pointerOnHover
          
        />
        {/* <ToastContainer draggable={false} /> */}
      </div>
    );
  }
}

export default DataListConfig;
