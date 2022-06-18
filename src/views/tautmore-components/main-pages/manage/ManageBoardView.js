import React, { useState, useEffect } from "react";
import { getAllBoard } from "../../services/apis/manage-class-board-subject/manage-api";
import BoardDataListConfig from "./BoardDataListConfig";
import queryString from "query-string";
import { Row, Col } from "reactstrap";
import BoardFilter from "./BoardFilter";
import { connect } from "react-redux";

const ListView = ({ boardData, location }) => {
  const [boardDataList, setBoardDataList] = useState([]);
  const [count, setCount] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  // const paginateData = queryString.parse(props.location.search);

  useEffect(() => {
    getAllBoard().then((response) => {
      if (response?.status === 200) {
        setCount(response?.data?.count);
        setBoardDataList(response?.data?.boards);
      }
    });
  }, [refresh]);

  console.log(boardDataList, "list");
  const renderFilter = () => (
    <BoardFilter
      boardData={boardData}
      sidebar={sidebar}
      setSidebar={setSidebar}
      searchtext={searchtext}
      setRefresh={setRefresh}
      handleSearchtext={setSearchtext}
    />
  );

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Boards</h4>
        </Col>
        <Col sm="4" className="AdminTotal-users">
          <div className="totalusersAdmin">
            <h4>Total User:</h4>
            <h2 className="rp-manage-school-header-title">{count}</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <BoardDataListConfig
            setRefresh={setRefresh}
            setSidebar={setSidebar}
            boardData={boardDataList}
            renderFilters={renderFilter}
            parsedFilter={queryString.parse(location.search)}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  boardData: state.CBS.board,
});

const mapDispatchToProps = (dispatch) => ({
  clearAddadmin: () => dispatch({ type: "CLEAR_ADD_ADMIN" }),
  clearDeletedadmin: () => dispatch({ type: "CLEAR_DELETE_ADMIN" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
