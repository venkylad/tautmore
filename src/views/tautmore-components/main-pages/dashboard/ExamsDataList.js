import React, {Component} from "react";
import {examsDataColumn, examsData} from './mockdata';
import DataTable from "react-data-table-component";
import "../../../../assets/scss/pages/data-list.scss";

class ExamsDataList extends Component {

  render() {
    return (
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={examsDataColumn()}
          data={examsData}
          noHeader
          responsive
          pointerOnHover
          
        />
      </div>
    );
  }
}

export default ExamsDataList;
