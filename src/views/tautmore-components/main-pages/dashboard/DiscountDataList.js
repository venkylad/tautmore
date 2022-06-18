import React, {Component} from "react";
import {discountDataColumn, discountData} from './mockdata';
import DataTable from "react-data-table-component";
import "../../../../assets/scss/pages/data-list.scss";

class DiscountDataList extends Component {

  render() {
    return (
    <div>
        <h4 className="rp-manage-school-header-title">Discounts</h4>
    
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
        <DataTable
          columns={discountDataColumn()}
          data={discountData}
          noHeader
          responsive
          pointerOnHover
          
        />
      </div>
      </div>
    );
  }
}

export default DiscountDataList;
