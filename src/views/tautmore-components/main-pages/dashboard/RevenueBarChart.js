import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import  "./dashboard.scss";
import { ChevronDown } from "react-feather";
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    Revenue: 90,
  },
  {
    name: "Tue",
    Revenue: 166,
  },
  {
    name: "Wed",
    Revenue: 210,
  },
  {
    name: "Thu",
    Revenue: 15,
  },
  {
    name: "Fri",
    Revenue: 333,
  },
  {
    name: "Sat",
    Revenue: 174,
  },
  {
    name: "Sun",
    Revenue: 67,
  },
];

class SimpleBarChart extends React.Component {
  render() {
    return (
      <Card className="barChartCard">
        <CardHeader>
          <CardTitle>Revenue Earned</CardTitle>
          {/* <div className="data-list-header pull-right d-flex justify-content-between flex-wrap datalistClasses">
            <div className="actions-right rp-manageSchool-head-main-Classes d-flex flex-wrap mt-sm-0 mt-2"> */}
              <UncontrolledDropdown className="data-list-rows-dropdown rp-manageSchool-head-Classes mr-1 d-md-block d-none">
                <DropdownToggle color="" className="sort-dropdown">
                  <span className="align-middle mx-50 adminfilterdisSpan">
                    This Week
                  </span>
                  <ChevronDown size={15} />
                </DropdownToggle>
                <DropdownMenu
                  className="customadmindropdownClasses"
                  tag="div"
                  right
                >
                  <DropdownItem tag="a">This Week</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            {/* </div>
          </div> */}
        </CardHeader>
        <CardBody>
          <div className="recharts-wrapper">
            <ResponsiveContainer>
              <BarChart
                // width={500}
                // height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 20,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="Revenue" fill={this.props.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SimpleBarChart;
