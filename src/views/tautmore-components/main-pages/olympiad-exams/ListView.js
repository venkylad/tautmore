import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import DataListConfig from "./DataListConfig";
import queryString from "query-string";
import AddNewAdminButton from "../../utility/buttons/Button";
import Sidebar from "../../forms/olympiad-form/Olympiad-Add-Exam";
import classnames from "classnames";



// import AddNewAdminButton from "../../../utility/buttons/Button";

const ListView = (props) => {

  const [sidebar, setSidebar] = useState(false);
  const [localData, setLocalData] = useState({});

  const handleSidebar = (value) => {
    console.log(value);
    setSidebar(value);
  };

  useEffect(()=>{
    let localInfo = JSON.parse(localStorage.getItem("tautmore-user"));
    setLocalData(localInfo);
  },[])
 
  return (
    <div>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Olympiad Exams</h4>
        </Col>
        <Col sm="4" className="AdminTotal-users">
          <div className="totalusersAdmin">
            {localData?.access?.["add-exam"] == true ? (
              <AddNewAdminButton
              button_title=" Add Exam"
              onClick={() => handleSidebar(true, true)}
            />
            ) : ('')}
            
          </div>
        </Col>
        <Col sm="12">
          
          <DataListConfig
          parsedFilter={queryString.parse(props.location.search)}
          sidebar={sidebar}
          />
        </Col>
      </Row>
      {sidebar ? (
        <div className="data-list"
        >
          <Sidebar
            show={sidebar}
            isEditAble={false}
            handleSidebar={handleSidebar}
            title={"ADD"}
          />

            <div
              className={classnames("data-list-overlay", {
                show: sidebar,
              })}
              onClick={() => handleSidebar(false)}
            />
          </div>
        ) : null}
   </div>
  );
};

export default ListView;
