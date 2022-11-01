import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [component, setComponent] = useState("login");

  return (
    <div className="loginPage">
      <div>
        <div className="loginPageWelcome-header">Welcome to</div>
        <div className="studentIT-header">StudentIT</div>
        <div className="loginPage-header">Live chat platform for ITU students</div>
      </div>
      <div className="loginBox">
        <div className="loginBoxInput">
          <label className="loginLabel">Username</label>
          <input placeholder="Type here..."></input>
        </div>
        <div className="loginBoxInput">
          <label className="loginLabel">Password</label>
          <input placeholder="Type here..."></input>
        </div>
        <div className="loginBoxButton">
          <nav>
            <Link to="/home">
              <button>
                <span>Log in</span>
              </button>
            </Link>
          </nav>
        </div>
        <div className="signUpBoxButton">
          <nav>
            <Link to="/signUp">
              <button>Sign up</button>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Login;
