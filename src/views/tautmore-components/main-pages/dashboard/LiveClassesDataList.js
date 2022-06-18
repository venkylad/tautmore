import React, {Component} from "react";
import {classDataColumn, classesData} from './mockdata';
import DataTable from "react-data-table-component";
import "../../../../assets/scss/pages/data-list.scss";

class LiveClassesData extends Component {

  render() {
    return (
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={classDataColumn()}
          data={classesData}
          noHeader
          responsive
          pointerOnHover
          
        />
      </div>
    );
  }
}

export default LiveClassesData;
