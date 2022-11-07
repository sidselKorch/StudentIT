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
    <div className="signUpPage sign-up-page">
      <div>
        <div className="signUpPageWelcome-header">Sign up to</div>
        <div className="studentIT-header">StudentIT</div>
        <div className="signUpPage-header">
          Live chat platform for ITU students
        </div>
      </div>
      <div className="box">
        <div className="createAccount-header">Create account</div>
        <div className="box-input-container">
          <div className="boxInput">
            <label className="label">Full name</label>
            <input
              placeholder="Type here..."
              onChange={handleName}
              value={name}
            ></input>
          </div>
          <div className="boxInput">
            <label className="label">E-mail</label>
            <input
              placeholder="Type here..."
              onChange={handleEmail}
              value={email}
            ></input>
          </div>
          </div>
          <div className="box-input-container">
          <div className="boxInput">
            <label className="label">Username</label>
            <input
              placeholder="Type here..."
              onChange={handleUserName}
              value={username}
            ></input>
          </div>
          <div className="boxInput">
            <label className="label">Phonenumber</label>
            <input
              placeholder="Type here..."
              onChange={handlePhoneNumber}
              value={phonenumber}
            ></input>
          </div>
          </div>
          <div className="box-input-container">
          <div className="boxInput">
            <label className="label">Password</label>
            <input
              placeholder="Type here..."
              type={"password"}
              onChange={handlePassword}
              value={password}
            ></input>
          </div>
          <div className="boxInput">
            <label className="label">Repeat password</label>
            <input
              placeholder="Type here..."
              type={"password"}
              onChange={handleRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
        </div>
        <div className="boxButton">
            <Link to="/" >Back</Link>
            <Link to="/course1">
              <button className="btn">Create Account</button>
            </Link>
        </div>
      </div>
      <div className="bottom-text">
          <Link className="link" style={{textDecoration: 'none'}} to="/home" replace>
            Welcome page
          </Link>
          <Link className="link" style={{textDecoration: 'none'}} to="/home">Privacy policy</Link>
          <Link className="link" style={{textDecoration: 'none'}} to="/home">© StudentIT 2022</Link>
      </div>
    </div>
  );
}
export default SignUp;