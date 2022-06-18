import React, { useState, useEffect } from "react";
import { getAllAdminsData } from "../../../services/apis/tautmore_staffs_apis/tautmore_staffs";
import DataListConfig from "./DataListConfig";
import queryString from "query-string";
import { Row, Col } from "reactstrap";
import AdminFilter from "./AdminFilter";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const ListView = (props) => {
  const [admindata, setAdmindata] = useState("");
  const [totaluser, setTotaluser] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [resultText, setResultText] = useState("Searching for content..");
  

  const paginateData = queryString.parse(props.location.search);

  useEffect(() => {
    const data = {
      page_no: paginateData?.page ? paginateData.page : 1,
      searchText: searchtext,
      role: role,
      status: status,
    };
    getAllAdminsData(data).then((response) => {
      if (response.data?.statusCode === 200) {
        const data = response?.data?.response;
        setTotaluser(response?.data?.count);
        setAdmindata(response?.data?.response);
        setTotalPage(Math.ceil(response.data?.count / 10));
        if (!data.length) {
          setResultText("No Admins found");
        }
      }
    })
    .catch((err) => {
      setResultText("No Admins found");
      console.error(err, "err1");
    });

    if (props.addadmin?.statusCode === 200) {
      toast.success("New Admin Added Successfully");
      props.clearAddadmin();
    } else if (props.addadmin === "error") {
      toast.error("Error in Add admin!");
      props.clearAddadmin();
    }

    if (props.deleteadmin?.statusCode === 200) {
      toast.success("TM Admin Deleted Successfully");
      props.clearDeletedadmin();
    } else if (props.deleteadmin === "error") {
      toast.error("Error in deleting!");
      props.clearDeletedadmin();
    }
  }, [
    searchtext,
    paginateData.page,
    role,
    status,
    props.addadmin.statusCode,
    props.addadmin,
    props.clearAddadmin,
    props.deleteadmin.statusCode,
    props.deleteadmin,
    props.clearDeletedadmin,
    props,
  ]);

  const renderFilter = () => (
    <AdminFilter
      searchtext={searchtext}
      role={role}
      status={status}
      handleSearchtext={setSearchtext}
      handleRole={setRole}
      handleStatus={setStatus}
    />
  );

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-3">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Users</h4>
        </Col>
        <Col sm="4" className="AdminTotal-users">
          <div className="totalusersAdmin">
            <h4>Total User:</h4>
            <h2 className="rp-manage-school-header-title">{totaluser}</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <DataListConfig
            admindata={admindata}
            renderFilters={renderFilter}
            totalPage={totalPage}
            resultText={resultText}
            parsedFilter={queryString.parse(props.location.search)}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  addadmin: state.admin.addadmin,
  deleteadmin: state.admin.deleteadmin,
});

const mapDispatchToProps = (dispatch) => ({
  clearAddadmin: () => dispatch({ type: "CLEAR_ADD_ADMIN" }),
  clearDeletedadmin: () => dispatch({ type: "CLEAR_DELETE_ADMIN" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListView);
