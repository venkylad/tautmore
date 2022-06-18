import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../history";
import { ToastContainer, toast } from "react-toastify";
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
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../../assets/scss/pages/data-list.scss";
import "./DataList.scss";
import {
  addQuestion,
  deleteQuestionbyId,
  totalQuestion,
} from "../../../../../redux/actions/questions";
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

const DataListConfig = ({
  handleQuestions,
  addquestiondata,
  addQuestion,
  questionData,
  totalPage,
  parsedFilter,
  renderFilters,
  resultText,
  selectedQuestion,
  setSelectedQuestion,
}) => {
  const [columsData, setColumnsData] = useState([]);

  useEffect(() => {
    setColumnsData(questionData);
  }, [questionData]);

  const handlePagination = (page) => {
    let urlPrefix = "/questions-listing";
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

  const handleQuestionSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedQuestion([...selectedQuestion, id]);
    } else {
      const filterQuestionIds = selectedQuestion.filter((item) => item !== id);
      setSelectedQuestion(filterQuestionIds);
    }
  };

  return (
    <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <DataTable
        columns={columnsData(handleQuestionSelect)}
        data={columsData}
        noDataComponent={resultText}
        pagination
        paginationServer
        onSelectedRowsChange={(data) => handleQuestions(data.selectedRows)}
        onRowClicked={(data) => history.push(`/question-details/${data._id}`)}
        paginationComponent={() => (
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalPage}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            forcePage={parsedFilter.page ? parseInt(parsedFilter.page - 1) : 0}
            onPageChange={(page) => {
              handlePagination(page);
            }}
          />
        )}
        noHeader
        subHeader
        responsive
        pointerOnHover
        customStyles={selectedStyle}
        subHeaderComponent={renderFilters()}
      />
      {/* <ToastContainer draggable={false} /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  adminAccess: state.auth.login?.userData?.access,
  dataList: state.dataList,
  deleteQuestiondata: state.questions.deleteQuestion,
  addquestiondata: state.questions.questions,
});

export default connect(mapStateToProps, {
  getData,
  deleteData,
  updateData,
  addData,
  getInitialData,
  filterData,
  addQuestion,
  totalQuestion,
  deleteQuestionbyId,
})(DataListConfig);
