import React, { useEffect, useState } from "react";
import "../../../../../../assets/scss/pages/data-list.scss";
//import { ApprovedQuestionsColumnData } from "./mockdata";
import {  columnsData } from "./mockdata";
import { history } from "../../../../../../history";
import "../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
//import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

const DataListConfig = ({
  uploadedQuestionData,
  totalPage,
  parsedFilter,
  resultText,
  selectedQuestion,
  setSelectedQuestion,
  handleQuestions,
  //renderFilter,
}) => {

  const handlePagination = (page) => {
    let urlPrefix = "/uploaded-questions";
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

  return (
    <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <DataTable
        columns={columnsData(handleQuestionSelect)}
        data={uploadedQuestionData}
        // data={uploadedQuestionData}
        noDataComponent={resultText}
        pagination
        paginationServer
        onSelectedRowsChange={(data) => handleQuestions(data.selectedRows)}
        onRowClicked={(data) => {
          history.push(`/questions-landing/${data._id}`);
        }}
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
        //subHeaderComponent={renderFilter()}
      />
     {/* <ToastContainer draggable={false} />  */}
    </div>
  );
  // }
};

export default DataListConfig;
