import React from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../../history";
import { ChevronLeft, ChevronRight } from "react-feather";
import "../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import { columnsData } from "./mockdata";

const DataListConfig = ({
  approvedQuestionData,
  totalPage,
  parsedFilter,
  resultText,
  selectedQuestion,
  setSelectedQuestion,
  handleQuestions,
}) => {
  const handlePagination = (page) => {
    let urlPrefix = "/approved-questions";
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

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

  const handleQuestionSelect = (event, id) => {
    if (event.target.checked) {
      setSelectedQuestion([...selectedQuestion, id]);
    } else {
      const filterQuestionIds = selectedQuestion.filter((item) => item !== id);
      setSelectedQuestion(filterQuestionIds);
    }
  };

  
  const questionDetailsPage = (data) => {
    localStorage.setItem("backPageUrl", window.location.href.split("/").pop());
    history.push(`/question-details/${data._id}`);
  }

  return (
    <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <DataTable
        columns={columnsData(handleQuestionSelect)}
        data={approvedQuestionData}
        noDataComponent={resultText}
        pagination
        paginationServer
        onSelectedRowsChange={(data) => handleQuestions(data.selectedRows)}
        // onRowClicked={(data) => {
        //   history.push(`/question-details/${data._id}`);
        // }}
        onRowClicked= {(data) => questionDetailsPage (data)}
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
      />
      {/* <ToastContainer draggable={false} />  */}
    </div>
  );
};

export default DataListConfig;
