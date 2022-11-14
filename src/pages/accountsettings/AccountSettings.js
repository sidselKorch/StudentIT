import React, { useState, useContext, useEffect } from "react";
import { LoginContext } from '../../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

import "../../common.css"

function AccountSettings() {
  
  // States for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  const { currentUser, setCurrentUser }  = useContext(LoginContext);

  // Function that will return current user and also update current username
  const getCurrentUser = async function () {
      const currentUser = await Parse.User.current();
      // Update state variable holding current user
      setCurrentUser(currentUser);
      return currentUser;
  };

  // Handling the first name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  // Handling the last name change
  const handleLastName = (e) => {
    setLastName(e.target.value);
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

  const handleUpdateUser = () => {
    currentUser.set("firstName", firstName)
    currentUser.set("lastName", lastName)
    currentUser.set("email", email)
    currentUser.save();
  }
  

  return (
    <div className="content-container">
      <div className="hero-text">
          <h1>StudentIT</h1>
          <h3>Edit your account</h3>
      </div>

      <div className="input-wrapper">
        <h1 className="input-header">Account settings</h1>

        <div className="box-input-container sign-up-container">

          <div className="input-container">
            <h3>First Name</h3>
            <input onChange={handleFirstName} editable={true} value={Parse.User.current().get("firstName")}></input>
          </div>

          <div className="input-container">
            <h3>Last Name</h3>
            <input placeholder={Parse.User.current().get("lastName")} onChange={handleLastName} value={lastName}></input>
          </div>

          <div className="input-container">
            <h3>Email</h3>
            <input placeholder={Parse.User.current().getEmail()} onChange={handleEmail} value={email}></input>
          </div>

          <div className="input-container">
            <h3>Password</h3>
            <input placeholder="Hmm, fiqure this out" onChange={handlePassword} type="password" value={password}></input>
          </div>

          <div className="input-container">
            <h3>Repeat password</h3>
            <input placeholder="Hmm, fiqure this out" onChange={handleRepeatPassword} type="password" value={repeatPassword}></input>
          </div>

        </div>

        <div className="input-btn">
          <Link to="/" >Back</Link>
          <button className="btn" type="submit" onClick={() => handleUpdateUser()} >Save changes</button>

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
export default AccountSettings;