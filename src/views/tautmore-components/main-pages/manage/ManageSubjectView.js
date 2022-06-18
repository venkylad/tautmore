import React, { useState, useEffect } from "react";
import {
  getSubjectByClass,
  getAllClass,
} from "../../services/apis/manage-class-board-subject/manage-api";
import SubjectDataListConfig from "./SubjectDataList";
import queryString from "query-string";
import { Row, Col } from "reactstrap";
import SubjectFilter from "./SubjectFilter";
import { connect } from "react-redux";

const ListView = (props) => {
  const [subjectDataList, setSubjectDataList] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [searchtext, setSearchtext] = useState("");
  const [classfilter, setClassfilter] = useState("");
  const [classdataList, setClassdataList] = useState([]);

  // const paginateData = queryString.parse(props.location.search);

  useEffect(() => {
    if (classfilter?._id?.length > 0) {
      const classId = classfilter;
      getSubjectByClass({ classId: classId }).then((response) => {
        console.log(response, "res");
        if (response?.status === 200) {
          setSubjectDataList(response?.data?.data);
        }
      });
    }
  }, [refresh, classfilter, classdataList]);

  useEffect(() => {
    getAllClass().then((response) => {
      if (response?.status === 200) {
        setClassdataList(response?.data?.data);
      }
    });
  }, []);

  const renderFilter = () => (
    <SubjectFilter
      subjectData={props.subjectData}
      classdataList={classdataList}
      classfilter={classfilter}
      setClassfilter={setClassfilter}
      sidebar={sidebar}
      setSidebar={setSidebar}
      searchtext={searchtext}
      setRefresh={setRefresh}
      subjectDataList={subjectDataList}
      handleSearchtext={setSearchtext}
    />
  );

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Subjects</h4>
        </Col>
        <Col sm="4" className="AdminTotal-users">
          <div className="totalusersAdmin">
            <h4>Total Subject:</h4>
            <h2 className="rp-manage-school-header-title">
              {subjectDataList?.length}
            </h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <SubjectDataListConfig
            setSidebar={setSidebar}
            setRefresh={setRefresh}
            subjectdata={subjectDataList}
            renderFilters={renderFilter}
            parsedFilter={queryString.parse(props.location.search)}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  subjectData: state.CBS.subject,
});
const mapDispatchToProps = (dispatch) => ({
  clearAddadmin: () => dispatch({ type: "CLEAR_ADD_ADMIN" }),
  clearDeletedadmin: () => dispatch({ type: "CLEAR_DELETE_ADMIN" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
