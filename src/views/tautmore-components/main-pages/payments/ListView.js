import React, { useEffect, useState } from "react";
import {
  getPaymentCourseList,
  getSubscribersList,
  getRevenueList,
  getDeactivatedList
} from "../../services/apis/payments-api/payments_api";
import {
  Col,
  Row,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Label,
  FormGroup,
  Input,
} from "reactstrap";
import * as Icon from "react-feather";
import "./PaymentsMain.scss";
import DataListConfig from "./subscribers";
import DeactivatedStudents from "./DeactivatedStudents"
import PaymentMain from "./PaymentsMain";
import classnames from "classnames";
import CourseFilter from "./CourseFilter";
import SubscribersFilter from "./SubscribersFilter";
import queryString from "query-string";
import { history } from "../../../../history";
import AddNewAdminButton from "../../utility/buttons/Button";

const ListView = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [courseList, setCourseList] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [classFilter, setClassFilter] = useState("");
  const [subject, setSubject] = useState("");
  const [subClass, setSubClass] = useState("");
  const [subSubject, setSubSubject] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [subTotalPage, setSubTotalPage] = useState(0);
  const [deTotalPage, setDeSubTotalPage] = useState(0);
  const [resultText, setResultText] = useState("Searching for content..");
  const [revenue, setRevenue] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchtext, setSearchtext] = useState("");
  const [deactivated, setDeactivated] = useState("");

  const paginateData = queryString.parse(props.location.search);
  // const paginateSubData = queryString.parse(props.location.search);

  const coursePaymentList = async () => {
    const params = {
      // page_no: paginateData?.page ? paginateData.page : 1,
      // searchText: searchtext,
      grade: classFilter.id,
      subject: subject.id,
      pageNumber: paginateData?.page ? paginateData.page : 1,
      limit: 10,
    };
    try {
      setCourseList([]);
      setResultText("Searching for content..");
      const res = await getPaymentCourseList(params);
      if (res.status === 200) {
        console.log("success");
        const courseData = res?.data?.data?.courseList;
        setCourseList(res?.data?.data?.courseList);
        setTotalPage(res?.data?.data.totalPaginationCount);
        if (!courseData.length) {
          setResultText("No Courses found");
        } else {
          setResultText("");
        }
      }
    } catch (error) {
      setResultText("No Courses found");
      setCourseList([]);
    }
  };

  const deactivatedList = async () => {
    const params = {
      // page_no: paginateData?.page ? paginateData.page : 1,
      // searchText: searchtext,
      name:searchtext,
      pageNumber: paginateData?.page ? paginateData.page : 1,
      limit: 10,
      grade: subClass.id,
      subject: subSubject.id,
    };
    try {
      setDeactivated([])
      setResultText("Searching for content..");
      const res = await getDeactivatedList(params);
      if (res.status === 200) {
        console.log(res)
        const DeactList = res?.data?.data?.deactivatedList;
        setDeactivated(res?.data?.data?.deactivatedList);
        setDeSubTotalPage(res?.data?.data?.totalPaginationCount);
        if (!DeactList.length) {
          setResultText("No Deactivated students found");
        } else {
          setResultText("");
        }
      }
    } catch (error) {
      setResultText("No Deactivated students found");
      console.log(error);
    }
  }

  const subscribersList = async () => {
    setSubscribers([])
    setResultText("Searching for content..");
    const params = {
      // page_no: paginateData?.page ? paginateData.page : 1,
      // searchText: searchtext,
      name:searchtext,
      pageNumber: paginateData?.page ? paginateData.page : 1,
      limit: 10,
      grade: subClass.id,
      subject: subSubject.id,
    };
    try {
      const res = await getSubscribersList(params);
      if (res.status === 200) {
        const subList = res?.data?.data?.subscribeList;
        setSubscribers(res?.data?.data?.subscribeList);
        setSubTotalPage(res?.data?.data?.totalPaginationCount);
        if (!subList.length) {
          setResultText("No Subscribers found");
        } else {
          setResultText("");
        }
      }
    } catch (error) {
      setResultText("No Subscribers found");
      console.log(error);
    }
  };

  const getStudentsRevenue = async () => {
    const params = {
      startDate: fromDate,
      toDate: toDate,
    };
    try {
      const res = await getRevenueList(params);
      setRevenue(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderCourseFilter = () => (
    <CourseFilter
      classFilter={classFilter}
      handleClassFilter={setClassFilter}
      subject={subject}
      handleSubjectFilter={setSubject}
    />
  );

  const renderSubscriberFilter = () => (
    <SubscribersFilter
      subClass={subClass}
      handleSubClassFilter={setSubClass}
      subSubject={subSubject}
      handleSubSubjectFilter={setSubSubject}
      handleSearchtext={setSearchtext}
      searchtext={searchtext}
    />
  );

  const addCourse = () =>{
    history.push('/add-course')
  }

  useEffect(() => {
    if(activeTab === "1"){
      coursePaymentList();
    }
  }, [classFilter, subject, paginateData.page, activeTab]);

  useEffect(() => {
    if(activeTab === "2" ){
      subscribersList();
    }
   
  }, [subClass, subSubject, paginateData?.page, searchtext, activeTab]);

  useEffect(() => {
    if(activeTab === "3"){
      deactivatedList();
    }
   
  }, [activeTab,subClass, subSubject, paginateData?.page, searchtext]);

  useEffect(() => {
    getStudentsRevenue();
  }, [fromDate, toDate]);

  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mb-1">
        <Col sm="8">
          <h4 className="rp-manage-school-header-title">Course Payments</h4>
          <AddNewAdminButton
            button_title="Add Course"
            onClick={() => addCourse()}
          />
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,
          </p> */}
        </Col>
        <Col sm="4">
          <div className="courseDateFilter">
            <FormGroup>
              <Label for="data-name" className="rp-manage-school-input-title">
                From
              </Label>
              <Input
                type="date"
                name="from"
                id="from"
                // min={values.examdate}
                onChange={(e) => setFromDate(e.target.value)}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Label for="data-name" className="rp-manage-school-input-title">
                To
              </Label>
              <Input
                type="date"
                name="enddate"
                id="enddate"
                onChange={(e) => setToDate(e.target.value)}
                className="form-control"
                // min={values.examdate}
              />
            </FormGroup>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg="4" md="6" sm="12">
          <Card>
            <CardBody>
              <div className="PaymentsTotalStu">
                <h4>Total Students</h4>
                <h2 className="mb-0">{revenue.totalStudents}</h2>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg="4" md="6" sm="12">
          <Card>
            <CardBody className="icontitleCardBody revenueCard">
              <div className="iconSection">
                <Icon.BarChart size={50} />
              </div>

              <div className="titleSection">
                <h4>Revenue Earned</h4>
                <h2 className="mb-0">{revenue.revenueEarned}</h2>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg="4" md="6" sm="12">
          <Card>
            <CardBody className="icontitleCardBody">
              <div className="titleSection">
                <h4>Active Students</h4>
                <h2 className="mb-0">{revenue.activeStudents}</h2>
              </div>

              <div className="titleSection">
                <h4>Deactive Students</h4>
                <h2 className="mb-0">{revenue.deactiveStudents}</h2>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Nav tabs className="nav-justified examsAndTestTabPay">
        {/* <div className="payments-nav-bottom-border"></div> */}
        <NavItem>
          <NavLink
            className={classnames(`${activeTab === "1" ? "active" : ""}`)}
            onClick={() => {
              setActiveTab("1");
              history.push("/course-payments");
            }}
          >
            Tautmore Plans
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames(`${activeTab === "2" ? "active" : ""}`)}
            onClick={() => {
              setActiveTab("2");
              history.push("/course-payments");
            }}
          >
            Subscribers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames(`${activeTab === "3" ? "active" : ""}`)}
            onClick={() => {
              setActiveTab("3");
              history.push("/course-payments");
            }}
          >
            Deactivated Students
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          {renderCourseFilter()}
          <PaymentMain
            courseList={courseList}
            coursePaymentList={coursePaymentList}
            resultText={resultText}
            totalPage={totalPage}
            parsedFilter={queryString.parse(props.location.search)}
          ></PaymentMain>
        </TabPane>
        <TabPane tabId="2">
          {renderSubscriberFilter()}
          <DataListConfig
            subscribers={subscribers}
            resultText={resultText}
            subTotalPage={subTotalPage}
            parsedFilter={queryString.parse(props.location.search)}
          ></DataListConfig>
        </TabPane>
        <TabPane tabId="3">
        {renderSubscriberFilter()}
        <DeactivatedStudents
            deactivated={deactivated}
            resultText={resultText}
            deTotalPage={deTotalPage}
            parsedFilter={queryString.parse(props.location.search)}
          ></DeactivatedStudents>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default ListView;
