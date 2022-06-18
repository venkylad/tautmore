import React from "react";
import { Button, Col, Row } from "reactstrap";
import * as Icon from "react-feather";
import SpiralChart from "./spiralChart";
import Chart from "react-apexcharts";
const StudentPerformance = () => {
  const barChartOptions = {
    series: [
      {
        data: [21, 31, 41],
      },
    ],
    options: {
      chart: {
        toolbar: { show: false },
        height: 350,
        type: "bar",
      },
      colors: ["#69747d"],
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: [
          ["John", "Doe"],
          ["Joe", "Smith"],
          ["Jake", "Williams"],
        ],
        labels: {
          show: false,
          style: {
            colors: ["#69747d"],
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
    },
  };
  return (
    <div className="studentperformance-wrapper">
      <Row>
        <Col sm="6" md="6" lg="6" xl="6" className="mt-2 mb-2">
          <div>
            <div className="class-heading">15 classes completed</div>
            <div className="class-barouter">
              <div className="class-barinner"></div>
            </div>
          </div>
          <div className="class-remanhead">21 remanining</div>
        </Col>
        <Col sm="6" md="6" lg="6" xl="6" className="mt-2 mb-2">
          <div className="d-flex justify-content-between align-item-center">
            <div className="readiness-heading">Readiness</div>
            <div className="readiness-heading">43%</div>
          </div>
          <div className="concept-outerprogressbar">
            <div className="concept-innerprogressbar"></div>
          </div>
        </Col>
        <Col sm="6" md="6" lg="6" xl="6" className="mt-2 mb-2">
          <div className="d-flex justify-content-between align-item-center">
            <div className="syllabus-heading">Syllabus completion</div>
            <div className="readiness-heading">70%</div>
          </div>
          <div className="concept-outerprogressbar">
            <div className="concept-innerprogressbar"></div>
          </div>
        </Col>
        <Col sm="6" md="6" lg="6" xl="6" className="mt-2 mb-2">
          <div>
            <div className="d-flex justify-content-between align-item-center">
              <div className="syllabus-heading">Overall performance</div>
              <div className="readiness-heading">Average</div>
            </div>
            <div className="overall-barouter">
              <div className="overall-barinner"></div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="6" lg="6" xl="6" className="mt-2 mb-2">
          <div>
            <SpiralChart />
          </div>
        </Col>
        <Col sm="6" md="6" lg="6" xl="6" className="mt-2 mb-2">
          <div className="d-flex justify-content-center align-items-center flex-column m-2">
            <div className="current-heading text-center">CURRENT PLAN</div>
            <div className="congz-image1 mb-2">IMAGE</div>
            <div className="current-class">CLASS 1</div>
            <div className="current-content w-50 text-center">
              <p>Lorem ipsum dolor sit amet, consectetu</p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <span>
                <Icon.Clock size={20} />
              </span>
              <span className="current-date">Ends on April 24,2022</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="6" lg="6" xl="6">
          <div className="upcomming-wrapper">
            <div className="upcom-headingwrap">
              <div className="upcoming-heading">UPCOMING EXAM</div>
            </div>
            <div className="upcoming-body">
              <div className="perform-num mt-1 mb-1">Mathematics II</div>
              <div>
                {/* <span>
                  <Icon.Calendar size={20} />
                </span> */}
                <span className="upcoming-date"> 11:30 AM | June 11,2021</span>
              </div>
              <div className="recent-view text-right">
                View details
                <span>
                  <Icon.ChevronRight size={20} />
                </span>
              </div>
            </div>
          </div>
        </Col>
        <Col sm="6" md="6" lg="6" xl="6">
          <div className="congrats-wrapper">
            <div className="congtz-heading">Congratulations!!!</div>
            <div className="perform-imagewrapper">
              <div className="congz-image1">IMAGE 1</div>
              <div className="congz-goldHeading">GOLD BADGE</div>
              <div className="congz-image2">IMAGE 2</div>
            </div>
            <div className="congtz-content">
              Your child has secured 99/100 in the monthly exam
            </div>
          </div>
        </Col>
      </Row>
      <Row className="perform-wrapper">
        <Col sm="12" md="12" lg="12" xl="12" className="perform-bottom-border">
          <div className="d-flex justify-content-between align-items-center perform-head-wrapper">
            <div className="upcoming-heading">PERFORMANCE</div>
            <div>
              <select className="upcoming-select">
                <option>All subjects</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </Col>

        <Col sm="4" md="4" lg="4" xl="4">
          <div className="perform-1col">
            <div className="perform-subheading">Concepts cleared</div>
            <div>
              <span className="perform-num">12</span>
              <span className="perform-cleared">Cleared</span>
            </div>
            <div className="concept-outerprogressbar">
              <div className="concept-innerprogressbar"></div>
            </div>
            <div className="concept-89 text-right">89 remaining</div>
            <div>
              <Button className="perform-viewbtn" color="primary" outline>
                View details
              </Button>
            </div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="perform-2col text-center">
            <div className="perform-subheading">Recent exam score</div>
            <div className="perform-num">76/100</div>
            <div className="recent-view">View details</div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="perform-3col">
            <div className="perform-subheading m-0">Overall progress</div>
            <div>
              <Chart
                options={barChartOptions.options}
                series={barChartOptions.series}
                type="bar"
                height={200}
                width={250}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" md="6" lg="6" xl="6">
          <div className="concept-wrapper">
            <div className="concept-top">
              <h3 className="concept-heading">Concepts</h3>
              <div className="d-flex justify-content-between align-items-baseline">
                <div>
                  <span className="concept-12">12</span>
                  <span className="concept-cleared">Cleared</span>
                </div>
                <div className="concept-89">89 remaining</div>
              </div>
              <div className="concept-outerprogressbar">
                <div className="concept-innerprogressbar"></div>
              </div>
            </div>
            <div className="concept-bottom">
              <div className="concept-chapterhead">CHAPTER 1</div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="concept-chaptersubheading">
                  1.Linear equations & variables
                </div>
                <div>
                  <div className="concept-selectinput">
                    <Icon.Check size={15} />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="concept-chaptersubheading">2.Concept 2</div>
                <div>
                  <div className="concept-selectinput">
                    <Icon.Check size={15} />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="concept-chaptersubheading">3.Concept 3</div>
                <div>
                  <div className="concept-selectinput">
                    <Icon.Check size={15} />
                  </div>
                </div>
              </div>
              <div className="concept-chapterhead">CHAPTER 2</div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="concept-chaptersubheading">
                  1.Linear equations & variables
                </div>
                <div>
                  <div className="concept-selectinput">
                    <Icon.Check size={15} />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="concept-chaptersubheading">2.Concept 2</div>
                <div>
                  <div className="concept-selectinput">
                    <Icon.Check size={15} />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="concept-chaptersubheading">3.Concept 3</div>
                <div>
                  <div className="concept-selectinput">
                    <Icon.Check size={15} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm="6" md="6" lg="6" xl="6">
          <div className="concept-wrapper">
            <div className="concept-top">
              <h3 className="concept-heading">Recent score</h3>
              <div>
                <span className="concept-12">78/100</span>
                <span className="concept-cleared">Scored</span>
              </div>
              <div className="recent-topsubheading">
                Monthly exam conducte on April 21, 2021
              </div>
            </div>
            <div className="concept-bottom">
              <div className="concept-chapterhead d-flex justify-content-between align-items-center">
                <div>DATE</div>
                <div>SCORE</div>
              </div>
              <div className="d-flex justify-content-between align-items-center concept-chaptersubheading">
                <div>
                  <div>English (Sept 22, 2020)</div>
                </div>
                <div>45/100</div>
              </div>
              <p className="recent-subheading">Monthly exam</p>
              <div className="d-flex justify-content-between align-items-center concept-chaptersubheading">
                <div>
                  <div>Social Science (Sept 22, 2020)</div>
                </div>
                <div>67/100</div>
              </div>
              <p className="recent-subheading">Daily exam</p>
              <div className="d-flex justify-content-between align-items-center concept-chaptersubheading">
                <div>
                  <div>Science 1 (Sept 22,2020)</div>
                </div>
                <div>89/100</div>
              </div>
              <p className="recent-subheading">Monthly exam</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="12" xl="12" className="mt-3 mb-1">
          <div className="certi-heading">Awards</div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">91 days streak</div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">Maths genius</div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">Physics pro</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="12" xl="12" className="mt-3 mb-1">
          <div className="certi-heading">My Certificates</div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">90% Physics</div>
            <div className="certi-date">JAN 2021</div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">80% Maths</div>
            <div className="certi-date">JAN 2021</div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">80% Maths</div>
            <div className="certi-date">DEC 2020</div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="12" xl="12" className="mt-3 mb-1">
          <div>
            <div className="certi-heading">Honers Certifications</div>
          </div>
        </Col>
        <Col
          sm="4"
          md="4"
          lg="4"
          xl="4"
          // className="d-flex justify-content-center align-items-center"
        >
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">Dancing</div>
            <div className="certi-date">JAN 2021</div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">Painting</div>
            <div className="certi-date">JAN 2021</div>
          </div>
        </Col>
        <Col sm="4" md="4" lg="4" xl="4">
          <div className="certi-box">
            <div className="certi-image">
              <Icon.Clipboard size={40} />
            </div>
            <div className="certi-heading">Chess champ</div>
            <div className="certi-date">DEC 2020</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentPerformance;
