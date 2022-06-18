import React, { useEffect, useState } from "react";
import { DeclinedQuestionsColumnData } from "./mockdata";
import ReactPaginate from "react-paginate";
import { history } from "../../../../../../history";
//import { ToastContainer } from "react-toastify";
import { ChevronLeft, ChevronRight } from "react-feather";
import "../../../../../../assets/scss/pages/data-list.scss";
import "../../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import DataTable from "react-data-table-component";

const DataListDeclinedConfig = ({
  declinedQuestionData,
  totalPage,
  parsedFilter,
  resultText,
}) => {
  const [columsData, setColumnsData] = useState([]);
  useEffect(() => {
    setColumnsData(declinedQuestionData);
  }, [declinedQuestionData]);

  const handlePagination = (page) => {
    let urlPrefix = "/operator-questions";
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

  const questionDetailsPage = (data) => {
    localStorage.setItem("backPageUrl", window.location.href.split("/").pop());
    history.push(`/question-details/${data._id}`);
  }
  // render() {
  return (
    <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <DataTable
        columns={DeclinedQuestionsColumnData()}
        data={columsData}
        // data={DeclinedQuestionsData}
        noDataComponent={resultText}
        pagination
        paginationServer
        onRowClicked={(data) => questionDetailsPage(data)}
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
        responsive
        pointerOnHover
      />
      {/* <ToastContainer draggable={false} /> */}
    </div>
  );
};
// }

export default DataListDeclinedConfig;
