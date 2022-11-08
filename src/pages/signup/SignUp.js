import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';


import "./signup.css";
import "../../common.css"

const initialValues = {
  email: "",
  password: "",
};


function SignUp() {
  const [component, setComponent] = useState("signup");

  // States for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  // Handling the name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  // Handling the phone number change
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handling the repeat password change
  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  async function handleSubmit() {
    try {
      // create a new Parse Object instance
      const User = new Parse.Object('NewUser');
      // define the attributes you want for your Object
      if (password == repeatPassword){
        User.set('firstName', firstName);
        User.set('lastName', lastName);
        User.set('email', email);
        User.set('phoneNumber', phoneNumber);
        User.set('password', password);
      } else {
        alert("Need same password")
      }
      
      // save it on Back4App Data Store
      await User.save();
      alert('Person saved!');
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  return (
    <div className="content-container">
      <div className="hero-text">
          <h3>Sign up to</h3>
          <h1>StudentIT</h1>
          <h3>Live chat platform for ITU students</h3>
      </div>

      <div className="input-wrapper">
        <h1 className="input-header">Create account</h1>

        <div className="box-input-container sign-up-container">

          <div className="input-container">
            <h3>First Name</h3>
            <input placeholder="Type here..." onChange={handleFirstName} value={firstName}></input>
          </div>

          <div className="input-container">
            <h3>Last Name</h3>
            <input placeholder="Type here..." onChange={handleLastName} value={lastName}></input>
          </div>

          <div className="input-container">
            <h3>Email</h3>
            <input placeholder="Type here..." onChange={handleEmail} value={email}></input>
          </div>

          <div className="input-container">
            <h3>Phone Number</h3>
            <input placeholder="Type here..." onChange={handlePhoneNumber} value={phoneNumber}></input>
          </div>

          <div className="input-container">
            <h3>Password</h3>
            <input placeholder="Type here..." onChange={handlePassword} value={password}></input>
          </div>

          <div className="input-container">
            <h3>Repeat password</h3>
            <input placeholder="Type here..." onChange={handleRepeatPassword} value={repeatPassword}></input>
          </div>

        </div>

        <div className="input-btn">
          <Link to="/" >Back</Link>
          {/* <Link to="/"><button className="btn">Create Account</button></Link> */}
          <button className="btn" type="submit" onClick={() => handleSubmit()} >Create Account</button>
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