import React from "react";
import SubjectActions from "../SubjectActions";

export const columnsData = (setRefresh, setSidebar) => [
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
    name: "Description",
    selector: "type",
    cell: (row) => (
      <p
        title={row.description}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.description}
      </p>
    ),
  },
  // {
  //   name: "Logo",
  //   selector: "logo",
  //   cell: (row) => (
  //     <p
  //       title={row.logo}
  //       className="text-truncate admindatarow text-bold-500 mb-0"
  //       data-tag="allowRowEvents"
  //     >
  //       {row.logo}
  //     </p>
  //   ),
  // },
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
          <span className="badge-leave">Inactive</span>
        ) : (
          <span className="badge-active">
            <span className="badge-dot-active"></span>Active
          </span>
        )}
      </p>
    ),
  },

  {
    cell: (row) => (
      <SubjectActions
        row={row}
        setRefresh={setRefresh}
        setSidebar={setSidebar}
      />
    ),
  },
];
