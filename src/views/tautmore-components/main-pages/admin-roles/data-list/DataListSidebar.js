import React, { Component } from "react";
import { Label, Input, FormGroup, Button, Row, Col } from "reactstrap";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import classnames from "classnames";
// import { formSchema_tautmore_adminroles } from "../../utility/schema/Fields_Schema";

class DataListSidebar extends Component {
  state = {
    id: "",
    name: "",
    role: "Executive",
    emailid: "",
    contactnum: "",
    password: "",
    reenterpassword: "",
    // category: "Audio",
    // order_status: "pending",
    // price: "",
    // img: "",
    // popularity: {
    //   popValue: ""
    // }
  };

  addNew = false;

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {
        this.setState({ id: this.props.data.id });
      }
      if (this.props.data.name !== prevState.name) {
        this.setState({ name: this.props.data.name });
      }
      if (this.props.data.role !== prevState.role) {
        this.setState({ role: this.props.data.role });
      }
      if (this.props.data.emailid !== prevState.emailid) {
        this.setState({ emailid: this.props.data.emailid });
      }
      if (this.props.data.contactnum !== prevState.contactnum) {
        this.setState({ contactnum: this.props.data.contactnum });
      }
      if (this.props.data.password !== prevState.password) {
        this.setState({ password: this.props.data.password });
      }
      if (this.props.data.reenterpassword !== prevState.reenterpassword) {
        this.setState({ reenterpassword: this.props.data.reenterpassword });
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        name: "",
        role: "Executive",
        emailid: "",
        contactnum: "",
        password: "",
        reenterpassword: "",
      });
    }
    if (this.addNew) {
      this.setState({
        id: "",
        name: "",
        role: "Executive",
        emailid: "",
        contactnum: "",
        password: "",
        reenterpassword: "",
      });
    }
    this.addNew = false;
  }

  handleSubmit = (obj) => {
    if (this.props.data !== null) {
      this.props.updateData(obj);
    } else {
      this.addNew = true;
      this.props.addData(obj);
    }
    let params = Object.keys(this.props.dataParams).length
      ? this.props.dataParams
      : { page: 1, perPage: 4 };
    this.props.handleSidebar(false, true);
    this.props.getData(params);
  };

  render() {
    let { show, handleSidebar, data } = this.props;
    let { name, role, emailid, contactnum, password, reenterpassword } =
      this.state;
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show,
        })}
      >
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE ADMIN DATA" : "ADD NEW ADMIN"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}
        >
          {/* {this.props.thumbView && img.length ? (
            <FormGroup className="text-center">
              <img className="img-fluid" src={img} alt={name} />
              <div className="d-flex flex-wrap justify-content-between mt-2">
                <label
                  className="btn btn-flat-primary"
                  htmlFor="update-image"
                  color="primary">
                  Upload Image
                  <input
                    type="file"
                    id="update-image"
                    hidden
                    onChange={e =>
                      this.setState({
                        img: URL.createObjectURL(e.target.files[0])
                      })
                    }
                  />
                </label>
                <Button
                  color="flat-danger"
                  onClick={() => this.setState({ img: "" })}>
                  Remove Image
                </Button>
              </div>
            </FormGroup>
          ) : null} */}
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => this.setState({ name: e.target.value })}
              id="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-category">Role</Label>
            <Input
              type="select"
              id="role"
              value={role}
              onChange={(e) => this.setState({ role: e.target.value })}
            >
              <option>super Admin</option>
              <option>Data Entry</option>
              <option>Executive</option>
              {/* <option>Appliances</option> */}
            </Input>
          </FormGroup>
          <Row>
            <Col lg="6" md="12">
              <FormGroup>
                <Label for="data-price">Email ID</Label>
                <Input
                  type="email"
                  value={emailid}
                  onChange={(e) => this.setState({ emailid: e.target.value })}
                  id="emailid"
                  placeholder="Email ID"
                />
              </FormGroup>
            </Col>

            <Col lg="6" md="12">
              <FormGroup>
                <Label for="data-price">Contact no.</Label>
                <Input
                  type="phone"
                  value={contactnum}
                  onChange={(e) =>
                    this.setState({ contactnum: e.target.value })
                  }
                  id="contactnum"
                  placeholder="Contact no."
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col lg="6" md="12">
              <FormGroup>
                <Label for="data-price">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  id="password"
                  placeholder="Password"
                />
              </FormGroup>
            </Col>

            <Col lg="6" md="12">
              <FormGroup>
                <Label for="data-price">Re-enter Password</Label>
                <Input
                  type="password"
                  value={reenterpassword}
                  onChange={(e) =>
                    this.setState({ reenterpassword: e.target.value })
                  }
                  id="reenterpassword"
                  placeholder="Re-enter Password"
                />
              </FormGroup>
            </Col>
          </Row>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
export default DataListSidebar;
