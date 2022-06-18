
import React from 'react';
import * as Icon from "react-feather";
import { Link } from "react-router-dom";


export const CombinationsData = [
    {
      id:"1",
      subjects: "Science + Maths",
      amount:{
          month:"999",
          Year:"9,999"
      },
      title:"Class 6",
    },
    {
      id:"2",
      subjects: "Science + Maths",
      amount:{
          month:"999",
          Year:"9,999"
      },
      title:"Class 6",
    },
    {
      id:"3",
      subjects: "Science + Maths",
      amount:{
          month:"999",
          Year:"9,999"
      },
      title:"Class 6",
    },
    {
      id:"4",
      subjects: "Science + Maths",
      amount:{
          month:"999",
          Year:"9,999"
      },
      title:"Class 6",
    },
    {
      id:"5",
      subjects: "Science + Maths",
      amount:{
          month:"999",
          Year:"9,999"
      },
      title:"Class 6",
    },
    {
      id:"6",
      subjects: "Science + Maths",
      amount:{
          month:"999",
          Year:"9,999"
      },
      title:"Class 6",
    },
    {
        id:"7",
        subjects: "Science + Maths",
        amount:{
            month:"999",
            Year:"9,999"
        },
        title:"Class 6",
      },
      {
        id:"8",
        subjects: "Science + Maths",
        amount:{
            month:"999",
            Year:"9,999"
        },
        title:"Class 6",
      },
      {
        id:"9",
        subjects: "Science + Maths",
        amount:{
            month:"999",
            Year:"9,999"
        },
        title:"Class 6",
      },
      {
        id:"10",
        subjects: "Science + Maths",
        amount:{
            month:"999",
            Year:"9,999"
        },
        title:"Class 6",
      },
      {
        id:"11",
        subjects: "Science + Maths",
        amount:{
            month:"999",
            Year:"9,999"
        },
        title:"Class 6",
      },
      {
        id:"12",
        subjects: "Science + Maths",
        amount:{
            month:"999",
            Year:"9,999"
        },
        title:"Class 6",
      },
  ];


export  const subscribersData = [
      {
          id:"CT-190001",
          name:"Jonatha Doe",
          avg:"98%",
          status:"Active"
      },
      {
        id:"CT-190002",
        name:"Lokesh Doe",
        avg:"98%",
        status:"Active"
    },
    {
        id:"CT-190003",
        name:"Puru Doe",
        avg:"98%",
        status:"Active"
    },
    {
        id:"CT-190004",
        name:"Dhanush Doe",
        avg:"98%",
        status:"Active"
    },
    {
        id:"CT-190005",
        name:"Praveen Doe",
        avg:"98%",
        status:"InActive"
    },
    {
        id:"CT-190006",
        name:"Mithun Doe",
        avg:"98%",
        status:"Active"
    },
    {
        id:"CT-190007",
        name:"Raghu Doe",
        avg:"98%",
        status:"Active"
    },
    {
        id:"CT-190008",
        name:"Pavan Doe",
        avg:"98%",
        status:"InActive"
    },
    {
        id:"CT-190010",
        name:"Keerthi Doe",
        avg:"98%",
        status:"Active"
    },
    {
        id:"CT-190011",
        name:"Jashu Doe",
        avg:"98%",
        status:"Active"
    },
  ]

  const renderName = (data) =>{
    console.log(data)
    return data.map((sub)=>(
      sub.subjectName
    )
     
    )
  }
    
  


  export const SubscriberColumnData = () => [
    {
        minWidth: "50px",
        cell: (row) => (
          <div className="image-size" data-tag="allowRowEvents">
            {row.image? `{<img src="">}` : <Icon.User size={20} />}
          </div>
        ),
      },
    {
      name: "ID",
      selector: "id",
      minWidth: "180px",
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.idNo}
        </p>
      ),
    },
    {
      name: "Name",
      selector: "name",

      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.studentName}
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
            {renderName(row.subject)}
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
            {row.gradeName}
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
            <span>{row.currencyCode} </span>
            {row.price}
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
            {row.active !== true ? (
               
              <span className="badge-leave">
                <span className="badge-dot-leave"></span>DEACTIVE
              </span>
            ) : (
              <span className="badge-active">
                <span className="badge-dot-active"></span>ACTIVE
              </span>
            )}
          </p>
        // <div className="teacher-status">
        //   <div className="status">
        //     <div
        //       className={`status-indicator ${
        //         row.status === "Active" ? "active" : ""
        //       }`}
        //     ></div>
        //     <span>{row.status}</span>
        //   </div>
        //   {/* <span className="status-extra-text">
        //     {row.extra ? row.extra : ""}
        //   </span> */}
        // </div>
        ),
      },
      {
        cell: (row) => {
          return (
            <ActionsComponent
              row={row}
            />
          );
        },
      },
    
];

export const DeactivatedColumn = () => [
  {
      minWidth: "50px",
      cell: (row) => (
        <div className="image-size" data-tag="allowRowEvents">
          {row.image? `{<img src="">}` : <Icon.User size={20} />}
        </div>
      ),
    },
  {
    name: "ID",
    selector: "id",
    minWidth: "180px",
    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.idNo}
      </p>
    ),
  },
  {
    name: "Name",
    selector: "name",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.studentName}
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
          {renderName(row.subject)}
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
          <span>{row.currencyCode} </span>
          {row.price}
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
          {row.active !== true ? (
             
            <span className="badge-leave">
              <span className="badge-dot-leave"></span>DEACTIVE
            </span>
          ) : (
            <span className="badge-active">
              <span className="badge-dot-active"></span>ACTIVE
            </span>
          )}
        </p>
      // <div className="teacher-status">
      //   <div className="status">
      //     <div
      //       className={`status-indicator ${
      //         row.status === "Active" ? "active" : ""
      //       }`}
      //     ></div>
      //     <span>{row.status}</span>
      //   </div>
      //   {/* <span className="status-extra-text">
      //     {row.extra ? row.extra : ""}
      //   </span> */}
      // </div>
      ),
    },
    {
      cell: (row) => {
        return (
          <ActionsComponent
            row={row}
          />
        );
      },
    },
  
];


const ActionsComponent = (props) => {
    return (
        <div className="data-list-action data-list-viewDetails">
      <div>
        <Link to="#">View Details</Link>
      </div>
      </div>
    )
}