import React from "react";
import AdminActions from "../AdminActions";


export const columnsData = () => [
      {
        name: "Name",
        selector: "name",
        minWidth: "160px",
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
        name: "Role",
        selector: "type",

        cell: (row) => (
          <p
            title={row.role}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.role}
          </p>
        ),
      },
      {
        name: "Status",
        selector: "status",
        cell: (row) => (
          <p
            // title={row.name}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.active !== true ? (
              <span className="badge-leave">
                <span className="badge-dot-leave"></span>Inactive
              </span>
            ) : (
              <span className="badge-active">
                <span className="badge-dot-active"></span>Active
              </span>
            )}
          </p>
        ),
      },
      {
        name: "Access Type",
        selector: "Access Type",
        width:"220px",
        cell: (row) => (
          <p
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
            title={Object.keys(row.access).filter(key => row.access[key]).join(", ")}
          >
            {Object.keys(row.access).filter(key => row.access[key]).join(", ")}
            
          </p>
        ),
      },
      {
        name: "Phone No.",
        selector: "phone No",
        minWidth: "200px",
        cell: (row) => (
          <p
            title={row.phone}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.phone}
          </p>
        ),
      },
      {
        name: "Email",
        selector: "email",
        minWidth: "240px",
        cell: (row) => (
          <p
            title={row.email}
            className="text-truncate admindatarow text-bold-500 mb-0"
            data-tag="allowRowEvents"
          >
            {row.email}
          </p>
        ),
      },
      {
        cell: (row) => (
          <AdminActions
            row={row}
          />
        ),
      },
];