import React, { useEffect, useState } from "react";
import { Minus, Plus, User, X } from "react-feather";
import {
  Col,
  Row,
  Button,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
} from "reactstrap";
import StudentPerformance from "./studentPerformance";

const BasicInfoAddEdit = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  useEffect(() => {
    console.log(props, "props in detail");
  }, [props]);

  return (
    <>
      <div>
        <Row>
          <Col sm="9" md="9" lg="9" xl="9">
            <div className="d-flex basicinfo-profilediv">
              <div className="basicinfo-image">
                <User size={60} />
              </div>
              <div>
                <h4>Johnathan Doe</h4>
                <h4>CT-190001</h4>
                {/* <h4 className="">100 Points</h4> */}
              </div>
            </div>
          </Col>
          <Col sm="2" md="2" lg="2" xl="2">
            <div className="basicinfo-btndiv">
              <Button
                className="basicinfo-unsubscribebtn"
                color="primary"
                outline
              >
                Unsubscribe
              </Button>
              <Button className="basicinfo-deletebtn" color="dark" outline>
                Delete student
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Nav tabs className="teacher-navs mt-2">
        <div className="teacher-nav-bottom-border"></div>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "1" ? "active" : ""}`}
            onClick={() => setActiveTab("1")}
          >
            Basic Info
          </NavLink>
        </NavItem>
        <NavItem className="teacher-nav-item">
          <NavLink
            className={`teacher-nav-link ${activeTab === "2" ? "active" : ""}`}
            onClick={() => setActiveTab("2")}
          >
            Performance
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className="mt-2">
          <div className="basicinfo-bottom">
            <Row>
              <Col sm="12" md="12" lg="12" xl="12">
                <h5 className="basicInfo-heading">Student Details</h5>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Name</p>
                <input type="text" />
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Date of birth</p>
                <input type="text" />
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Unique Id</p>
                <input type="text" className="uniqueid-input" />
                <span>.9876512345</span>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Gender</p>
                <select>
                  <option></option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="12" lg="12" xl="12" className="mt-3">
                <h5 className=" basicInfo-heading">Parent/guardian details</h5>
              </Col>

              <Col sm="6" md="6" lg="6" xl="6">
                <p>Name</p>
                <input type="text" />
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Email ID</p>
                <input type="email" />
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Phone Number</p>
                <input type="text" />
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Country</p>
                <select>
                  <option></option>
                  <option>India</option>
                  <option>Russia</option>
                </select>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>State</p>
                <select>
                  <option></option>
                  <option></option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>School</p>
                <select>
                  <option></option>
                  <option></option>
                </select>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>School District</p>
                <select>
                  <option></option>
                  <option></option>
                </select>
              </Col>
            </Row>
            <Row className="mt-3 mb-2 coursedetail-wrapper">
              <Col sm="12" md="12" lg="12" xl="12">
                <h5 className=" basicInfo-heading">Course details</h5>
              </Col>
              <Col sm="4" md="4" lg="4" xl="4">
                <p>Date of Joining</p>
                <h4>April 22,2021</h4>
              </Col>
              <Col sm="4" md="4" lg="4" xl="4">
                <p>Course ends on</p>
                <h4>April 22, 2022</h4>
              </Col>

              <Col sm="4" md="4" lg="4" xl="4">
                <p>Course fees</p>
                <h4>INR 14000/-</h4>
              </Col>
              <Col sm="4" md="4" lg="4" xl="4">
                <p>Total times enrolles</p>
                <h4>8</h4>
              </Col>
              <Col sm="4" md="4" lg="4" xl="4">
                <p>Recently subscribed on</p>
                <h4>April 12, 2021</h4>
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Course</p>
                <select>
                  <option></option>
                  <option></option>
                  <option></option>
                </select>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Subjects</p>
                <select>
                  <option>Science,Mathematics</option>
                  <option></option>
                  <option></option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>No. of classes</p>
                <button className="basicinfo-minusbtn">
                  <Minus size={20} />
                </button>
                <span className="mr-2 ml-2">21</span>
                <button className="basicinfo-plusbtn">
                  <Plus size={20} />
                </button>
              </Col>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Exams</p>
                <select>
                  <option>Monthly,Olympiad</option>
                  <option></option>
                  <option></option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="6" xl="6">
                <p>Co-curricular</p>
                <select>
                  <option>Painting</option>
                  <otpion>Singing</otpion>
                </select>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <button className="basic-musicbtn">
                  <X size={20} className="mr-1" />
                  Music
                </button>
              </Col>
            </Row>
            <Row>
              <Col
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="d-flex justify-content-center align-item-center"
              >
                <Button className="basicinfo-updatebtn">Update</Button>
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tabId="2" className="mt-2">
          <StudentPerformance />
        </TabPane>
      </TabContent>
      {/*  */}
    </>
  );
};

export default BasicInfoAddEdit;
