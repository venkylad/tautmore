import React, { useEffect, useState } from "react";
import { object } from "prop-types";
import schoologo from "../../../../assets/img/profile/user-uploads/user-01.jpg";
import { Button, Row, Col } from "reactstrap";
import "./ManageAdminDetails.scss";
import { Media } from "reactstrap";
import { getAdminbyId } from "../../services/apis/tautmore_staffs_apis/tautmore_staffs";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { deleteStaff } from "../../services/apis/tautmore_staffs_apis/tautmore_staffs";
import { history } from "../../../../history";
import Sidebar from "../../forms/admin-form/Admin-Staff-Form";
import classnames from "classnames";
import "../../../../assets/scss/pages/data-list.scss";
import moment from "moment";
import { connect } from "react-redux";
import Spinner from "../../../../components/@vuexy/spinner/Loading-spinner";
import { useParams } from "react-router-dom";
import DeletePopup from "../../main-pages/question-list/DeletePopup";

const AdminDetailsPage = (props) => {
  console.log(props);
  const [adminProfleData, setAdminProfleData] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState(false);
  const params = useParams();
  const [localData, setLocalData] = useState({});

  const loadData = () => {
    // let id = props.match?.params?.id;
    getAdminbyId(params.id).then((res) => {
      if (res.status === 200) {
        // this.setState({ adminProfleData: res.data.response });
        setAdminProfleData(res.data.response);
      }
    });
  };

  // const deleteAdmin=(id)=> {
  //   deleteStaff(id).then((resp) => {
  //     if (resp.status === 200) {
  //       toast.success("Admin deleted Successfully");
  //       setTimeout(() => {
  //         history.push("/admin-roles");
  //       }, 3000);
  //     }
  //   });
  // }

  const toggle = (id) => {
    console.log(id);
    deleteStaff(id).then((resp) => {
      if (resp.status === 200) {
        toast.success("Admin deleted Successfully");
        setTimeout(() => {
          history.push("/admin-roles");
        }, 3000);
        setModal(!modal);
      }
    });
  };

  useEffect(() => {
    loadData();
    let localInfo = JSON.parse(localStorage.getItem("tautmore-user"));
    setLocalData(localInfo);
    // getAdminbyId(params.id).then((res) => {
    //   if (res.status === 200) {
    //     setAdminProfleData(res.data.response);
    //   }
    // });
  }, []);

  const accessTextHelper = (text) => {
    const textField = Object.keys(text);
    const filterData = textField.filter((item) => text[item]);
    const textArray = filterData.map((item) => item.split("-").join(" "));
    const formattedText = textArray.join(", ");

    return formattedText;
  };

  const renderEdit = (access, role) => {
    if (
      access?.["edit-executive"] ||
      (access?.["edit-data-operator"] && role === "data-entry-operator")
    ) {
      return (
        <Button
          className="admin-details-edit 1111"
          onClick={() => {
            handleSidebar(true);
          }}
        >
          Edit
        </Button>
      );
    }

    
  };

  const renderDelete = (access,role) =>{
    if (
      access?.["delete-executive"] ||
      (access?.["delete-data-operator"] && role === "data-entry-operator")
    ) {
      return (
        <Button
          className="admin-details-delete"
          outline
          // onClick={() => deleteAdmin(adminProfleData._id)}
          onClick={() => setModal(!modal)}
        >
          Delete
        </Button>
      );
    }
  }

  const handleSidebar = (value) => {
    // this.setState({ sidebar: value });
    setSidebar(value);
  };

  const adminList = () => {
    history.push("/admin-roles");
  };

  return adminProfleData?.name ? (
    <div className={`data-list ${"list-view"}`}>
      <div>
        <div className="header-container">
          <div>
            <Media>
              <Media
                className="rounded-circle"
                object
                src={schoologo}
                height="34"
                width="34"
                alt="profile image"
              />
              <Media body>
                <Media heading className="admin-name-title">
                  {adminProfleData.name}
                </Media>
                <span className="admin-role-title">{adminProfleData.role}</span>
              </Media>
            </Media>
          </div>
          <div>
            {renderEdit(localData.access, adminProfleData.role)}
            {renderDelete(localData.access, adminProfleData.role)}
            {/* {props.adminAccess?.["edit-data-operator"] &&
            adminProfleData.role === "data-entry-operator" ? (
              <Button
                className="admin-details-edit 1111"
                onClick={() => {
                  handleSidebar(true);
                }}
              >
                Edit
              </Button>
            ) : props.adminAccess?.["edit-executive"] ? (
              <Button
                className="admin-details-edit 1111"
                onClick={() => {
                  handleSidebar(true);
                }}
              >
                Edit
              </Button>
            ) : (
              ""
            )}
            {props.adminAccess?.["delete-data-operator"] &&
            adminProfleData.role === "data-entry-operator" ? (
              <Button
                className="admin-details-delete"
                outline
                // onClick={() => deleteAdmin(adminProfleData._id)}
                onClick={() => setModal(!modal)}
              >
                Delete
              </Button>
            ) : props.adminAccess?.["delete-executive"] ? (
              <Button
                className="admin-details-delete"
                outline
                // onClick={() => deleteAdmin(adminProfleData._id)}
                onClick={() => setModal(!modal)}
              >
                Delete
              </Button>
            ) : (
              ""
            )} */}
            <Button
              className="admin-details-delete back"
              outline
              onClick={adminList}
            >
              Back
            </Button>
          </div>
        </div>
        <div className="adminDetailsCard">
          <Row>
            <Col>
              <h6>Name</h6>
              <h3>{adminProfleData.name}</h3>
            </Col>
            <Col>
              <h6>Role</h6>
              <h3>{adminProfleData.role}</h3>
            </Col>
            <Col>
              <h6>Date of Joining</h6>
              <h3>{moment(adminProfleData.createdAt).format("LL")}</h3>
            </Col>
          </Row>
          <Row className="justify-content-start adminDetailsRow">
            <Col sm="4">
              <h6>Access</h6>
              {adminProfleData?.access?.["all-access"] && <h3>Full Access</h3>}
              <p> ( {accessTextHelper(adminProfleData?.access)} )</p>
            </Col>
            <Col sm="4">
              <h6>Status</h6>
              <h3>
                {adminProfleData.active === "true" ? "On Leave" : "Active"}
              </h3>
            </Col>
          </Row>

          <Row className="justify-content-start ">
            <Col sm="4">
              <h6>Email ID</h6>
              <h3>{adminProfleData.email}</h3>
            </Col>
            <Col sm="4">
              <h6>Contact no.</h6>
              <h3>{adminProfleData.phone}</h3>
            </Col>
          </Row>
        </div>
      </div>
      {sidebar && adminProfleData ? (
        <div
          className={`data-list ${
            props.thumbView ? "thumb-view" : "list-view"
          }`}
        >
          <Sidebar
            isEditAble
            show={sidebar}
            data={adminProfleData}
            loadData={loadData}
            handleSidebar={handleSidebar}
            title={"EDIT"}
          />
          <div
            className={classnames("data-list-overlay", {
              show: sidebar,
            })}
            onClick={() => handleSidebar(false)}
          />
        </div>
      ) : null}
      {/* <ToastContainer draggable={false} /> */}
      <DeletePopup
        modal={modal}
        toggle={toggle}
        setModal={setModal}
        id={adminProfleData._id}
      />
    </div>
  ) : (
    <>
      <Spinner />
    </>
  );
};

AdminDetailsPage.propTypes = {
  adminAccess: object.isRequired,
};

const mapStateToProps = (state) => ({
  adminAccess: state.auth.login?.userData?.access,
});
export default connect(mapStateToProps)(AdminDetailsPage);
