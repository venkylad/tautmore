import React, { useState, useEffect } from "react";
import ClassDataListConfig from "./ClassDataListConfig";
import queryString from "query-string";
import { Row, Col } from "reactstrap";
import ClassFilter from "./ClassFilter";
import { connect } from "react-redux";
import { getAllClass } from "../../services/apis/manage-class-board-subject/manage-api";

const ListView = ({ classData, location }) => {
  const [classdataList, setClassdataList] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [sidebar, setSidebar] = useState(false, "");
  const [board, setBoard] = useState("");

  //   const paginateData = queryString.parse(props.location.search);

  useEffect(() => {
    getAllClass().then((response) => {
      if (response?.status === 200) {
        setClassdataList(response?.data?.data);
      }
    });
  }, [refresh]);

  const renderFilter = () => (
    <ClassFilter
      sidebar={sidebar}
      searchtext={searchtext}
      classData={classData}
      setRefresh={setRefresh}
      handleSearchtext={setSearchtext}
      handleBoard={setBoard}
      board={board}
      setSidebar={setSidebar}
    />
  );

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Manage Class</h4>
        </Col>
        <Col sm="4" className="AdminTotal-users">
          <div className="totalusersAdmin">
            <h4>Total Classes:</h4>
            <h2 className="rp-manage-school-header-title">
              {classdataList?.length}
            </h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <ClassDataListConfig
            classdata={classdataList}
            setRefresh={setRefresh}
            setSidebar={setSidebar}
            renderFilters={renderFilter}
            parsedFilter={queryString.parse(location.search)}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  classData: state.CBS.class,
});
const mapDispatchToProps = (dispatch) => ({
  clearAddadmin: () => dispatch({ type: "CLEAR_ADD_ADMIN" }),
  clearDeletedadmin: () => dispatch({ type: "CLEAR_DELETE_ADMIN" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
