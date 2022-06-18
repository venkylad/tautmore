import React, { useState } from "react";

import "../exam-and-tests-detail/ExamAndTestDetails.scss";
import { CustomInput } from "reactstrap";

const ExamAndTestViewDetails = ({ row, handleQuestionSelect }) => {
  const selQue = JSON.parse(localStorage.getItem('selectedOlympiadQuedata'));
  const val=selQue.find(e => e.id === row._id);
  const [status, setStatus] = useState(val?.questionExist);
  
  return (
    <div className="data-list-action data-list-viewDetails">
      <CustomInput
        className="custom-check-dark mr-1 mb-2"
        type="checkbox"
        id={`"check"-${row._id}`}
        name={`${row.name}-${row._id}`}
        onChange={(e) => handleQuestionSelect(e, row._id, row.score, setStatus(!status))}
        inline
        checked={status}
      />
    </div>
  );
};

export default ExamAndTestViewDetails;
