import React, { Component, useState } from "react";
import DataTable from "react-data-table-component";
import { history } from "../../../../history";
import "react-toastify/dist/ReactToastify.css";
import "../exam-and-tests-detail/ExamAndTestDetails.scss";
import "../../../../assets/scss/plugins/extensions/react-paginate.scss";
import "../../../../assets/scss/pages/data-list.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

import { columnsData } from "./mockdata/tableColumnsQueData";


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
  // handleQuestions,
  examQuestions,
  loadLocalData,
  resultText,
  parsedFilter,
  renderFilters,
  examId,
  subNameId,
  totalPage,
  // selectedQue,
  // setSelectedQue
}) =>{
console.log(subNameId)
const data = JSON.parse(localStorage.getItem('selectedOlympiadQuedata'));
  const handleQuestionSelect = (event, id, score) => {
    console.log(event.target.checked)
    if (event.target.checked) {
      console.log(event.target.checked)
      // setSelectedQue([...selectedQue, id]);
      data.push({id:id,
        questionExist:true,
        marks:score
      });
      localStorage.setItem('selectedOlympiadQuedata', JSON.stringify(data));
      loadLocalData();
    } else {
      // const filterQuestionIds = selectedQue.filter((item) => item !== id);
      // setSelectedQue(filterQuestionIds);
      let index = data.findIndex((item) => item.id == id);
      console.log(index)
     
      data.splice(index, 1);
      localStorage.setItem('selectedOlympiadQuedata', JSON.stringify(data));
      loadLocalData();
    }
  };

  // const UpdateList = (data) =>{
  //   console.log(data)
  // }

  const redirectToPrevious = (data) =>{

    // localStorage.setItem("backPageolympiadUrl", window.location.href.split("/").pop());
    // history.push(`/add-questions-to-olympiad-details/${data._id}`)
  }

   const handlePagination = (page) => {
    let urlPrefix = `/add-questions-to-olympiad/${examId}`;
    history.push(`${urlPrefix}?page=${page.selected + 1}`, subNameId);
  };
   
  return(
    <div>
        <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
          <DataTable
            columns={columnsData(handleQuestionSelect)}
            data={examQuestions}
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
            onRowClicked={(data) => redirectToPrevious(data)}
            noHeader
            subHeader
            responsive
            pointerOnHover
            customStyles={selectedStyle}
            subHeaderComponent={renderFilters()}
          />

          
        </div>
      </div>
  )
}
  



export default DataListConfig;

