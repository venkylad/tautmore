import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "../PaymentsMain.scss";
import * as Icon from "react-feather";
import CourseSubscribers from "./CourseSubscribers";
import queryString from "query-string";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import {
  getCourseDetails,
  getCourseSubscribersList,
} from "../../../services/apis/payments-api/payments_api";
import CourseSubscribeFilter from "./CourseSubscribeFilter";
import { history } from "../../../../../history";
import DeletePopup from "../../question-list/DeletePopup";
import { deleteCoursePayment } from "../../../services/apis/payments-api/payments_api";
import { toast } from "react-toastify";

const PaymentDetails = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [courseDetails, setCourseDetails] = useState({});
  const params = useParams();
  const [courseSubscribers, setCourseSubscribers] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const paginateData = queryString.parse(props.location.search);
  const [resultText, setResultText] = useState("Searching for content..");
  const [searchtext, setSearchtext] = useState("");
  const [subClass, setSubClass] = useState("");
  const [subSubject, setSubSubject] = useState("");
  const [modal, setModal] = useState(false);

  const handleCourseEdit = (data, isEditable) => {
    props.history.push({
      pathname: `/add-course`,
      state: { data: data, editable: isEditable },
    });
  };

  const loadData = async () => {
    try {
      const res = await getCourseDetails(params.id);
      console.log(res);
      setCourseDetails(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = async (id) =>{
    try{
      const res = await deleteCoursePayment(id)
      if(res.status === 200){
        toast.success("Course payment deleted successfullt");
        setModal(!modal);
        history.push('/course-payments');
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  const getCourseSubscribers = async (id) => {
    setCourseSubscribers([]);
    setResultText("Searching for content..");
    const params = {
      name: searchtext,
      grade: subClass.id,
      subject: subSubject.id,
      courseId: id,
      pageNumber: paginateData?.page ? paginateData.page : 1,
      limit: 1,
    };
    try {
      const res = await getCourseSubscribersList(params);
      if (res.status === 200) {
        const subData = res?.data?.data.subscribeList;
        setCourseSubscribers(res?.data?.data.subscribeList);
        setTotalPage(res?.data?.data?.totalPaginationCount);
        if (!subData.length) {
          setResultText("No Subscribers found");
        } else {
          setResultText("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseSubscribers(params.id);
  }, [paginateData?.page, subClass, subSubject, searchtext]);

  useEffect(() => {
    loadData();
  }, []);

  const renderSubscriberFilter = () => (
    <CourseSubscribeFilter
      subClass={subClass}
      handleSubClassFilter={setSubClass}
      subSubject={subSubject}
      handleSubSubjectFilter={setSubSubject}
      handleSearchtext={setSearchtext}
      searchtext={searchtext}
      id={params.id}
    />
  );

  return courseDetails?.discounted_price ? (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="6">
          <h4 className="rp-manage-school-header-title">
            Class {courseDetails.grade.name}
          </h4>
        </Col>
        <Col sm="6" style={{ textAlign: "right" }}>
          <Button
            className="admin-details-edit 1111"
            onClick={() => handleCourseEdit(courseDetails, "true")}
          >
            Edit Details
          </Button>
          <Button
            className="admin-details-delete "
            outline
            onClick={() => setModal(!modal)}
          >
            Delete
          </Button>
         
          <Button
            className="admin-details-delete back"
            outline
            onClick={() => history.push("/course-payments")}
          >
            Back
          </Button>
        </Col>
      </Row>

      <Nav tabs className="nav-justified examsAndTestTabPay">
        {/* <div className="payments-nav-bottom-border"></div> */}
        <NavItem>
          <NavLink
            className={classnames(`${activeTab === "1" ? "active" : ""}`)}
            onClick={() => {
              setActiveTab("1");
            }}
          >
            Combinations
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames(`${activeTab === "2" ? "active" : ""}`)}
            onClick={() => {
              setActiveTab("2");
            }}
          >
            Subscribers
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Card className="PaymentDetailCard">
            <CardBody className="paymentDetCardBody">
              <Row className="payementDetDesc">
                <Col sm="4">
                  <h4>Title</h4>
                  <h2 className="mb-0">class {courseDetails.grade.name}</h2>
                </Col>

                <Col sm="4">
                  <h4>Discount Type</h4>
                  <h2 className="mb-0">{courseDetails.discount_type}</h2>
                </Col>

                <Col sm="4">
                  <h4>Amount</h4>
                  <h2 className="mb-0">
                    {courseDetails.currency_code}.{" "}
                    {courseDetails.discounted_price}
                  </h2>
                </Col>
              </Row>

              <Row className="paymentDetDescSecond">
                <Col sm="4">
                  <h4>Discount</h4>
                  <h2 className="mb-0">{courseDetails.discount_value}</h2>
                </Col>

                <Col sm="4">
                  <h4>No. of Classes</h4>
                  <h2 className="mb-0">{courseDetails.noOfClasses}</h2>
                </Col>

                <Col sm="4">
                  <h4>Country</h4>
                  <h2 className="mb-0">{courseDetails.country}</h2>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h4>Subjects</h4>
                  <ul className="paymentDetListItems">
                    {courseDetails.subject.map((data, i) => (
                      <li key={i}>
                        {" "}
                        <Icon.Check size={30} />
                        <span>{data.name}</span>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </TabPane>
        <TabPane tabId="2">
          {renderSubscriberFilter()}
          <CourseSubscribers
            courseSubscribers={courseSubscribers}
            totalPage={totalPage}
            resultText={resultText}
            parsedFilter={queryString.parse(props.location.search)}
            id={params.id}
          />
        </TabPane>
      </TabContent>
      <DeletePopup
            modal={modal}
            toggle={toggle}
            setModal={setModal}
            id={courseDetails._id}
          />
    </React.Fragment>
  ) : (
    ""
  );
};

export default PaymentDetails;
