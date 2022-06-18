import React, {useState} from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import moment from "moment";
import DeletePopup from "../question-list/DeletePopup";
import { Trash } from "react-feather";
import { deleteDiscount } from "../../services/apis/tautmore_discounts_apis/tautmore_discounts_api";
import { toast } from "react-toastify";
import { history } from "../../../../history";

export const DiscountsData = [
  {
    id: "1",
    name: "Half off",
    code: "TAUT50",
    amount: "50%",
    status: "Active",
    expiry: "Aug 22, 2022",
  },
  {
    id: "2",
    name: "Family",
    code: "FAM15",
    amount: "$5.00",
    status: "Scheduled",
    expiry: "Sep 13, 2022",
  },
  {
    id: "3",
    name: "Freinds",
    code: "FRND20",
    amount: "20%",
    status: "Active",
    expiry: "Oct 25, 2021",
  },
  {
    id: "4",
    name: "Co-curricular",
    code: "CURR30",
    amount: "$10.00",
    status: "Expired",
    expiry: "Dec 1, 2021",
  },
];

export const DiscountsColumnData = (callToDiscountList) => [
  // {
  //   minWidth: "50px",
  //   cell: (row) => (
  //     <div className="image-size" data-tag="allowRowEvents">
  //       {row.image ? `{<img src="">}` : <Icon.User size={20} />}
  //     </div>
  //   ),
  // },

  {
    name: "Name",
    selector: "name",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.name}
      </p>
    ),
  },
  {
    name: "Code",
    selector: "code",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.code}
      </p>
    ),
  },
  {
    name: "Type of Discount",
    selector: "Type of Discount",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.discountType}
      </p>
    ),
  },
  {
    name: "Amount",
    selector: "amount",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.discountAmountType != "percentage"
              ? "flat "
              : ""}{row.currencyCode} {row.discountAmount}{row.discountAmountType === "percentage" ? '%' : ""} off
      </p>
    ),
  },
  {
    name: "Status",
    selector: "status",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.status === "active" ? (
          <span className="badge-active">
            <span className="badge-dot-active"></span>ACTIVE
          </span>
        ) : row.status === "inactive" ? (
          <span className="badge-leave">
            <span className="badge-dot-leave"></span>Inactive
          </span>
        ) : (
          <span className="badge-expired">
            <span className="badge-dot-expired"></span>Expired
          </span>
        )}
      </p>
    ),
  },
  {
    name: "Expiry",
    selector: "expiry",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {moment(row.expiryDate).format("MMM DD YYYY")}
      </p>
    ),
  },
  {
    cell: (row) => {
      return <ActionsComponent row={row} callToDiscountList={callToDiscountList}/>;
    },
  },
];

const ActionsComponent = ({row, callToDiscountList}) => {
  const [modal, setModal] = useState(false);

  const gotoDetails = (id,code) =>{
    localStorage.setItem('discount', code)
    history.push(`/discount-details/${id}`)
  }

  const toggle =  async (id) =>{
  try{
    const res = await deleteDiscount(id)
    if(res.status === 200){
      toast.success("Discount Data Deleted Successfully");
      callToDiscountList();
    }
  }catch(error){
    toast.error(error.message);
  }
  }
  return (
    <div className="data-list-action data-list-viewDetails">
     
        <Link onClick={()=>gotoDetails(row._id, row.code)}>View Details</Link>
        <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => setModal(!modal)
        }
      />

        <DeletePopup
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        id={row._id}
      />
    </div>
  );
};
