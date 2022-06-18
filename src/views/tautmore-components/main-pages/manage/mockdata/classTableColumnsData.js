import React from "react";
import ClassActions from "../ClassActions";

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
    name: "Board",
    selector: "board",

    cell: (row) => (
      <p
        title={row.name}
        className="text-truncate admindatarow text-bold-500 mb-0"
        data-tag="allowRowEvents"
      >
        {row.board?.name}
      </p>
    ),
  },

  {
    cell: (row) => (
      <ClassActions row={row} setRefresh={setRefresh} setSidebar={setSidebar} />
    ),
  },
];
