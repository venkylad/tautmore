import React, { Component } from "react";
import "../../../../assets/scss/pages/data-list.scss";
//import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import {ZoomColumnData } from "./mockdata/mockdata";
// import "./DiscountsMain.scss";
import { history } from "../../../../history";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";

class DataListConfig extends Component {

  handlePagination (page) {
    let urlPrefix = `/zoom-users`;
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

  render() {
    return (
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={ZoomColumnData(this.props.getZoomUsersList)}
          data={this.props.zoomList}
          pagination
          paginationServer
          noDataComponent={this.props.resultText}
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={this.props.totalPage}
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
        //   onRowClicked={(data) => {
        //     history.push(`/discount-details/${data.code}`);
        //   }}
          // noHeader
          // subHeader
          responsive
          pointerOnHover
          // subHeaderComponent={<DiscountFilter />}
        />

        {/* <ToastContainer draggable={false} /> */}
      </div>
    );
  }
}

export default DataListConfig;
