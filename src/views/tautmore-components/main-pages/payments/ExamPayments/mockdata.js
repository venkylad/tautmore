import React, {useState} from 'react';
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import DeletePopup from '../../question-list/DeletePopup';
import { Trash } from "react-feather";
import {deleteExamPayment} from '../../../services/apis/payments-api/payments_api'
import { toast } from 'react-toastify';

export const ExamPaymentsColumn = (getExamPaymentsList) => [
    {
      name: "Exam Type",
      selector: "examtype",
      minWidth: "180px",
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.examType}
        </p>
      ),
    },
    {
        name: "Subject",
        selector: "Subject",
  
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.subject}
          </p>
        ),
      },
      {
        name: "Class",
        selector: "Class",
  
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.grade}
          </p>
        ),
      },
      {
        name: "Price",
        selector: "Price",
  
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            <span>{row.currency_code} </span>
            {row.examPrice}
          </p>
        ),
      },
      {
        name: "Country",
        selector: "Country",
  
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.country_code}
          </p>
        ),
      },
      {
        cell: (row) => {
          return (
            <ActionsComponent
              row={row}
              getExamPaymentsList={getExamPaymentsList}
            />
          );
        },
      },
    
  ];
  
  
  const ActionsComponent = ({row, getExamPaymentsList}) => {
    const [modal, setModal] = useState(false);
    const toggle = async (id) =>{
      // let idString = id.toString();
      // console.log(isString(id));
      try{
        const res = await deleteExamPayment(id)
        if(res.status === 200){
          toast.success("Exam Payments Deleted Successfully");
          setModal(!modal);
          getExamPaymentsList();
        }
      }catch(error){
        toast.error("something went wrong");
      }
     
    }


      return (
          <div className="data-list-action">
        {/* <div> */}
          <Link to={`/exam-payment-details/${row._id}`}>View Details</Link>
        {/* </div> */}

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
      )
  }