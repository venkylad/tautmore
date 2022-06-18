import React, { Component } from "react";
import { object } from "prop-types";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
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
} from "../../../../../redux/actions/data-list/";
import * as admin_api from "../../../services/apis/tautmore_staffs_apis/tautmore_staffs";
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../../assets/scss/pages/data-list.scss";
import "./DataList.scss";
import { totalAdminUser } from "../../../../../redux/actions/admin";
import { columnsData } from "./mockdata/tableColumnsData";

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
class DataListConfig extends Component {
  
  state = {
    allAdminData: [],
    data: [],
    // totalPages: 0,
    currentPage: 0,
    value: "",
    rowsPerPage: 10,
    sidebar: false,
    currentData: null,
    selected: [],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
  };

  handleSidebarEdit = (boolean, addNew = false, data) => {
    this.setState({ sidebar: boolean });
    if (addNew === true) this.setState({ currentData: null, addNew: true });
    this.setState({ editData: data });
  };

  // componentDidMount(){
  //   const data = {
  //     page_no:  this.props.parsedFilter.page ? this.props.parsedFilter.page : 1,
  //     searchText: "",
  //     role: "",
  //     status: null
  //   }
  //   admin_api.getAllAdminsData(data).then((response) => {
  //     let allAdminData =
  //       response.data && response.data.admins ? response.data.admins : [];

  //       let totalRecords = response.data && response.data.count;
  //       let totalPages = Math.ceil(totalRecords / this.state.rowsPerPage);
        
  //     this.setState({
  //       allAdminData,
  //       totalRecords,
  //       totalPages,
  //     });
  //   });
  // }

  handlePagination = (page) => {
    let urlPrefix = "/admin-roles";
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
    // const data = {
    //   page_no: page.selected + 1,
    //   searchText: "",
    //   role: "",
    //   status: null
    // }
    // admin_api.getAllAdminsData(data).then((response) => {
    //   let allAdminData =
    //     response.data && response.data.admins ? response.data.admins : [];

    //     let totalRecords = response.data && response.data.count;
    //     let totalPages = Math.ceil(totalRecords / this.state.rowsPerPage);
    //     console.log(totalPages)

    //   this.setState({
    //     allAdminData,
    //     totalRecords,
    //     totalPages,
    //   });
    // });

    // this.setState({ currentPage: page.selected });
  };

  render() {
    // let { totalPages } =
    //   this.state;
    return (
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={columnsData()}
          data={this.props.admindata}
          noDataComponent={this.props.resultText}
          pagination
          paginationServer
          onRowClicked={(data) => {
            history.push(`/manage-admin/${data._id}`);
          }}
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
          noHeader
          subHeader
          responsive
          pointerOnHover
          customStyles={selectedStyle}
          subHeaderComponent={ this.props.renderFilters() }
        />
        {/* <ToastContainer draggable={false} /> */}
      </div>
    );
  }
}

DataListConfig.propTypes = {
  adminAccess: object.isRequired,
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
})(DataListConfig);
