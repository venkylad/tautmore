import React, { Component } from "react";
import { object, func } from "prop-types";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { ChevronLeft, ChevronRight } from "react-feather";
import { connect } from "react-redux";
import {
  getData,
  getInitialData,
  deleteData,
  updateData,
  addData,
  filterData,
} from "../../../../redux/actions/data-list/";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import "./DataList.scss";
import { totalAdminUser } from "../../../../redux/actions/admin";
import { columnsData } from "./mockdata/SubjectColumnData";

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: "rgba(115,103,240,.05)",
      color: "#7367F0 !important",
      boxShadow: "0 0 1px 0 #7367F0 !important",
      "&:hover": {
        transform: "translateY(0px) !important",
      },
    },
  },
};
class SubjectDataList extends Component {
  handleSidebarEdit = (boolean, addNew = false, data) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
    this.setState({ editData: data });
  };

  render() {
    return (
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={columnsData(this.props.setRefresh, this.props.setSidebar)}
          data={this.props.subjectdata}
          pagination
          paginationServer
          onRowClicked={(data) => {
            // history.push(`/manage-admin/${data._id}`);
          }}
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount="10"
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
          subHeader
          responsive
          pointerOnHover
          customStyles={selectedStyle}
          subHeaderComponent={this.props.renderFilters()}
        />
        {/* <ToastContainer draggable={false} /> */}
      </div>
    );
  }
}

SubjectDataList.propTypes = {
  adminAccess: object.isRequired,
  setRefresh: func.isRequired,
};

const mapStateToProps = (state) => ({
  dataList: state.dataList,
  adminAccess: state.auth.login?.userData?.access,
});

export default connect(mapStateToProps, {
  getData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  filterData,
  totalAdminUser,
})(SubjectDataList);
