import React, { Component } from "react";
import {TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import classnames  from "classnames";
import ExamsListing from "./ExamsListing";
import './ExamList.scss';
import "../../../../../assets/scss/pages/data-list.scss";
import "./DataList.scss";
import { history } from "../../../../../history";

class DataListConfig extends Component {
  state = {
    active: "1",
    examType: "weekly"
  };
  

  toggle = (tab,param) => {
    console.log(param)
    if (this.state.active !== tab) {
      this.setState({ active: tab });
      this.setState({ examType:param })
      history.push("/regular-exams");
    }
  };
  render() {
    return (
      
      <div className={`data-list ${"list-view"}  rp-manage-schools-main`}>
      {/* { this.props.renderFilters() } */}
      <Nav tabs className="nav-justified examsAndTestTab">
      {/* <div className="exam-nav-bottom-border"></div> */}
        {/* <NavItem >
          <NavLink
            className={classnames({
              active: this.state.active === "1",
            })}
            onClick={() => {
              this.toggle("1","daily");
            }}
          >
            Daily
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink
            className={classnames({
              active: this.state.active === "1",
            })}
            onClick={() => {
              this.toggle("1","weekly");
            }}
          >
            Weekly
          </NavLink>
        </NavItem>
        <NavItem>
        <NavLink
            className={classnames({
              active: this.state.active === "2",
            })}
            onClick={() => {
              this.toggle("2","monthly");
            }}
          >
            Monthly
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: this.state.active === "3",
            })}
            onClick={() => {
              this.toggle("3", "quarterly");
            }}
          >
            Quarterly
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: this.state.active === "4",
            })}
            onClick={() => {
              this.toggle("4", "half-yearly");
            }}
          >
            Half-Yearly
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: this.state.active === "5",
            })}
            onClick={() => {
              this.toggle("5", "annually");
            }}
          >
            Annually
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({
              active: this.state.active === "6",
            })}
            onClick={() => {
              this.toggle("6", "olympiad-half-yearly");
            }}
          >
            Olympiad-Half-Yearly 
          </NavLink>
        </NavItem> */}
        {/* <NavItem>
          <NavLink
            className={classnames({
              active: this.state.active === "7",
            })}
            onClick={() => {
              this.toggle("7", "olympiad-annually");
            }}
          >
            Olympiad-Annually
          </NavLink>
        </NavItem> */}
      </Nav>
      
      <TabContent activeTab={this.state.active}>
      <TabPane tabId={this.state.active}>
        <ExamsListing examType={this.state.examType} parsedFilter={this.props.parsedFilter} sidebar={this.props.sidebar}></ExamsListing>
      </TabPane>
      </TabContent>
      
      </div>
    );
  }
}

export default DataListConfig;
