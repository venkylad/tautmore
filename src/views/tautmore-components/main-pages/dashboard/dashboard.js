import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import './dashboard.scss';
import SimpleBarChart from "./RevenueBarChart";
import "../../../../assets/scss/plugins/extensions/recharts.scss";
import LiveClassesDataList from './LiveClassesDataList';
import ExamsDataList from "./ExamsDataList";
import LiveClassesFilter from './LiveClassesFilter';
import ExamsDiscountFilter from './ExamsFilter';
import DiscountDataList from './DiscountDataList';

let $primary = "#7367F0",
  $success = "#28C76F",
  $info = "#00cfe8",
  $warning = "#FF9F43",
  $danger = "#EA5455",
  colors = [$primary, $success, $info, $warning, $danger]
  
 
const Dashboard = () => {
    
    const renderFilter = () =>(
        <LiveClassesFilter/>
    )

    const renderExamsFilter = () =>(
        <ExamsDiscountFilter/>
    )

  return (
    <div>
      <Row>
        <Col sm="3">
          <Card>
            <CardBody>
              <div className="PaymentsTotalStu">
                <h1 className="teachersCount">Students</h1>
                <div className="dashbaordStudents">
                <h2 className="mb-0">890</h2>
                <h3>Active</h3>
                </div>
               <div className="dashbaordStudents">
               <h2 className="mb-0">123</h2>
                <h3>Inactive</h3>
               </div>
               <div className="">
               <h2 className="mb-0">40</h2>
                <h3>New</h3>
               </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card>
            <CardBody>
            <div className="PaymentsTotalStu">
                <h1 className="teachersCount">Teachers</h1>
                <div className="dashbaordStudents">
                <h2 className="mb-0">890</h2>
                <h3>Active</h3>
                </div>
               <div className="dashbaordStudents">
               <h2 className="mb-0">123</h2>
                <h3>Inactive</h3>
               </div>
               <div className="">
               <h2 className="mb-0">40</h2>
                <h3>New</h3>
               </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col sm="6">
          {/* <Card>
            <CardBody> */}
            <SimpleBarChart primary={$primary} success={$success} />
            {/* </CardBody>
          </Card> */}
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
                {renderFilter()}
              <LiveClassesDataList/>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="7">
          <Card>
            <CardBody>
                {renderExamsFilter()}
              <ExamsDataList/>
            </CardBody>
          </Card>
        </Col>
        <Col sm="5">
          <Card>
            <CardBody>
              <DiscountDataList/>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
