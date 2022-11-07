import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import "./signup.css";

import "../../common.css"

const initialValues = {
  email: "",
  password: "",
};

function SignUp() {
  const [component, setComponent] = useState("signup");

  // States for registration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
  };

  // Handling the phone number change
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the username change
  const handleUserName = (e) => {
    setUsername(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handling the repeat password change
  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <div className="content-container">
      <div className="hero-text">
          <h3>Welcome to</h3>
          <h1>StudentIT</h1>
          <h3>Live chat platform for ITU students</h3>
      </div>

      <div className="input-wrapper">
        <h1 className="input-header">Create account</h1>

        <div className="box-input-container sign-up-container">

          <div className="input-container">
            <h3>Full Name</h3>
            <input placeholder="Type here..." onChange={handleName} value={name}></input>
          </div>

          <div className="input-container">
            <h3>Email</h3>
            <input placeholder="Type here..." onChange={handleEmail} value={email}></input>
          </div>

          <div className="input-container">
            <h3>User Name</h3>
            <input placeholder="Type here..." onChange={handleUserName} value={name}></input>
          </div>

          <div className="input-container">
            <h3>Phone Number</h3>
            <input placeholder="Type here..." onChange={handlePhoneNumber} value={email}></input>
          </div>

          <div className="input-container">
            <h3>Password</h3>
            <input placeholder="Type here..." onChange={handlePassword} value={email}></input>
          </div>

          <div className="input-container">
            <h3>Repeat password</h3>
            <input placeholder="Type here..." onChange={handleRepeatPassword} value={email}></input>
          </div>

        </div>

        <div className="input-btn">
          <Link to="/" >Back</Link>
          <Link to="/course1"><button className="btn">Create Account</button></Link>
        </div>

      </div>

      <div className="bottom-text">
          <Link to="/" replace>Welcome page</Link>
          <Link to="#">Privacy policy</Link>
          <Link to="#">© StudentIT 2022</Link>
      </div>
    </div>
  );
}
export default SignUp;