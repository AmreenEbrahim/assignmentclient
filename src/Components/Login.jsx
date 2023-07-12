import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";

// import "./login.css";
// import { Eye_img } from "../../assets/images";
import Alert from "react-bootstrap/Alert";
import axios from "../axios/axios";
import { useDispatch } from "react-redux";
import { setToken } from "../actions/setToken";

const Login = () => {
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [credsError, setCredsError] = useState({
    emailerr: "",
    passworderr: "",
  });
  const [show, setShow] = useState({ alert: false });
  const [mask, setMask] = useState(false);
  //const [error, setError] = useState("")

  const emailValidatior = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (creds.email.trim() === "") {
      setCredsError({ emailerr: "Email is required" });
      return false;
    } else if (reg.test(creds.email) === false) {
      setCredsError({ emailerr: "Email is invalid" });
      return false;
    } else {
      setCredsError({ emailerr: "" });
      return true;
    }
  };

  const passwordValidator = () => {
    if (creds.password.trim() === "") {
      setCredsError({ passworderr: "Password is required" });
      return false;
    } else if (creds.password.length < 6) {
      setCredsError({ passworderr: "Minimum password length is 6" });
      return false;
    } else {
      setCredsError({ passworderr: "" });
      return true;
    }
  };

  const toggleMasking = () => {
    setMask(!mask);
  };

  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };
  let dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailValidatior() && passwordValidator())
      await axios
        .post("/login", creds)
        .then((res) => {
          console.log("res", res.data);
          if (res.data.success === true) {
            setShow({ ...show, alert: false });
            const data = {
              userDetails: res.data.data,
              token: res.data.token,
            };
            dispatch(setToken(res.data.token));
            localStorage.setItem("AuthData", JSON.stringify(data));
            localStorage.setItem("AuthToken", res.data.token);
          } else {
            setShow({ ...show, alert: true });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
  };

  return (
    <>
      hii
      <div className="login_box">
        <div className="login_right">
          <div className="login_into_dashboard">
            <h2>Login Into Dashboard</h2>
            <Alert key={"danger"} variant={"danger"} show={show.alert}>
              Wrong Credentials
            </Alert>
            <div className="login__right_form">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email or User Name</Form.Label>
                  <div className="field_img">
                    <Form.Control
                      name="email"
                      type="email"
                      value={creds.email}
                      //onChange={(e)=>setCreds({...creds, email:e.target.value})}
                      onChange={handleChange}
                      onBlur={emailValidatior}
                      className="field_part"
                    />
                  </div>
                  <p style={{ color: "red" }}>{credsError.emailerr}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="field_img">
                    <Form.Control
                      name="password"
                      type={mask ? "password" : "text"}
                      value={creds.password}
                      onChange={handleChange}
                      onBlur={passwordValidator}
                      className="field_part"
                    />

                    {/* <span className="eye_img">
                      <img src={Eye_img} onClick={toggleMasking} />
                    </span> */}
                    <p style={{ color: "red" }}>{credsError.passworderr}</p>
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="dash_login_but"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <div className="remeber_forgot mt-3">
                  <Form.Group className="" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                  </Form.Group>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
