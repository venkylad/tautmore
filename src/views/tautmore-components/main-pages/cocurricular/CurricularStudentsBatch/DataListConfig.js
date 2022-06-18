import React from 'react';
import { SelectedStudentsColumn} from './mockdata';
import DataTable from "react-data-table-component";
import "../../../../../assets/scss/pages/data-list.scss";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import "../../../../../assets/scss/plugins/extensions/react-paginate.scss";
import { history } from "../../../../../history";

const DataListConfig = ({studentsList, totalPage, resultText, parsedFilter, selectedStud, setSelectedStud}) =>{

  const handlePagination = (page) =>{
    let urlPrefix = `/co-curricular-students-batch`;
    history.push(`${urlPrefix}?page=${page.selected + 1}`);
  };

  // const data = JSON.parse(localStorage.getItem('cocurrStudents'));
  const handleStudentSelect = (id) =>{
    if(selectedStud.indexOf(id) > -1){
      const filteredValues = selectedStud.filter((val) => val !== id);
      setSelectedStud([...filteredValues]);
  }
  else {
    setSelectedStud([...selectedStud, id]);
  }
  }

    return(
        <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      <DataTable
        columns={SelectedStudentsColumn(handleStudentSelect, selectedStud)}
        data={studentsList}
        noHeader
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
        responsive
        pointerOnHover
      />
      {/* <ToastContainer draggable={false} /> */}
    </div>
    )
}

export default DataListConfig;