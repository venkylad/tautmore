import React, { useState } from "react";
import { Link } from "react-router-dom";
import { func } from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap";
// import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Lock, User } from "react-feather";
import { history } from "../../../../history";
import { userLogin } from "../../services/apis/auth-api/auth-api";
import { setLogin } from "../../../../redux/actions/auth/loginActions";

const LoginJWT = ({ setLoginDetails }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    let details = { email: email, password };
    userLogin(details)
      .then((resp) => {
        if (resp.data.status === "success") {
          let adminData = resp.data.response;
          console.log(adminData, 'adminData from login JWT');
          let loginDetails = {
            id: adminData._id,
            name: adminData.name,
            email: adminData.email,
            role: adminData.roleId.role,
            access: adminData.access,
            accessToken: adminData.accessToken,
          };

          console.log(loginDetails,"loginDetails")
          setLoginDetails(loginDetails);
          localStorage.setItem("tautmore-user", JSON.stringify(loginDetails));
          history.push("/");
        } else {
          if (resp.data.hasOwnProperty("errors")) {
            resp.data.errors.forEach((error) =>
              toast.error(`${error.param} Needed`)
            );
          }
        }
      })
      .catch((err) => {
        // toast.error(err.response?.message);
        if(err.response.data.statusCode == "400"){
          toast.error("Please enter valid credentials");
        }else{
          toast.error(err.response.data.message)
        }
      });
  };
  return (
    <React.Fragment>
      <CardBody className="pt-1">
        <Form onSubmit={handleLogin}>
          <FormGroup className="form-label-group position-relative has-icon-left">
            <Input
              type="text"
              placeholder="Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <div className="form-control-position">
              {/* <Mail size={15} /> */}
              <User size={15} />
            </div>
            <Label>Name</Label>
          </FormGroup>
          <FormGroup className="form-label-group position-relative has-icon-left">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
            <div className="form-control-position">
              <Lock size={15} />
            </div>
            <Label>Password</Label>
          </FormGroup>
          <FormGroup className="d-flex justify-content-between align-items-center">
            {/* <Checkbox
              color="primary"
              icon={<Check className="vx-icon" size={16} />}
              label="Remember me"
              defaultChecked={false}
              // onChange={this.handleRemember}
            /> */}
            <div className="float-right">
              <Link to="/pages/forgot-password">Forgot Password?</Link>
            </div>
          </FormGroup>
          <div className="d-flex justify-content-between">
            {/* <Button.Ripple
              color="primary"
              outline
              onClick={() => {
                history.push("/pages/register")
              }}
            >
              Register
            </Button.Ripple> */}
            <Button.Ripple color="primary" type="submit">
              Login
            </Button.Ripple>
          </div>
        </Form>
      </CardBody>
      {/* <ToastContainer draggable={false} /> */}
    </React.Fragment>
  );
};

LoginJWT.propTypes = {
  setLoginDetails: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setLoginDetails: (data) => dispatch(setLogin(data)),
});
export default connect(null, mapDispatchToProps)(LoginJWT);
