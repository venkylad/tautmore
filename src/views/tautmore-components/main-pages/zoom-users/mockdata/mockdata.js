import React from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { unAssignTeacher } from '../../../services/apis/zoom-api/zoom_api';

export const ZoomColumnData = (getZoomUsersList) => [
  
    {
      name: "First Name",
      selector: "First Name",
      width:"250px",
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.firstName}
        </p>
      ),
    },
    {
        name: "Last Name",
        selector: "Last Name",
    
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.lastName}
          </p>
        ),
      },
      {
        name: "Email",
        selector: "Email",
    
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.email}
          </p>
        ),
      },
      {
        name: "Teacher",
        selector: "Teacher",
    
        cell: (row) => (
          <p
            title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.teacherFullName}
          </p>
        ),
      },
    {
      name: "Status",
      selector: "Status",
  
      cell: (row) => (
        <p
          title={row.name}
          className="text-truncate admindatarow text-bold-500 mb-0"
          data-tag="allowRowEvents"
        >
          {row.teacherAssigned === true ? (
            <span className="badge-active">
              <span className="badge-dot-active"></span>Assigned
            </span>
          ) : (
            <span className="badge-leave">
            <span className="badge-dot-leave"></span>Not Assigned
          </span>
          )}
        </p>
      ),
    },
    {
      cell: (row) => {
        return <ActionsComponent row={row} getZoomUsersList={getZoomUsersList}/>;
      },
    },
  ];

  const ActionsComponent = ({row, getZoomUsersList}) => {
console.log(getZoomUsersList)
    const unassignTeacher = async (id,tid) =>{
      const params = {
        teacher:tid,
        zoomUser:id
      }
      try{
        const res = await unAssignTeacher(params)
        if(res.status === 200){
          toast.success('Successfully Unassigned Teacher');
          getZoomUsersList();
        }
      }catch(error){
        toast.error(error.message);
      }
    }
      return(
        <div className="data-list-action data-list-viewDetails">
        {row.teacherAssigned === false ? <Link to={`/map-zoom-users/${row._id}`}>Assign</Link> : <Link onClick={()=>unassignTeacher(row._id,row.teacherId)}>Unassign</Link>}
        </div>
      )
  }