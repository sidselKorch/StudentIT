import React, { useState } from "react";
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';

import "./signuppage.css";
import "../../common.css"

// COSTUM HOOKS
import useCurrentUserHook from '../../hooks/useCurrentHook';

function SignUp() {
  // States for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [ errorMessage, setErrorMessages ] = useState("");

  const { getCurrentUser } = useCurrentUserHook()


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


  // Functions used by the screen components
  const handleSignup = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = email;
    const passwordValue = password;
    
    try {
      // Since the signUp method returns a Promise, we need to call it using await
      if (password === repeatPassword){
        // Creates user in database
        const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
        
        // Fill out data for user
        createdUser.set("firstName", firstName)
        createdUser.set("lastName", lastName)
        createdUser.set("email", email)
        await createdUser.save();

        // Reset forms
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")
        getCurrentUser()
        return true;
      } else {
        alert("Need same password")
      }
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      alert(`Error! ${error}`);
      setErrorMessages(error.message)
      return false;
    }
  };


const renderErrorMessage = () =>(
    <div className="error">{errorMessage}</div>
);

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
            <h3>Password</h3>
            <input placeholder="Type here..." onChange={handlePassword} type="password" value={password}></input>
          </div>

          <div className="input-container">
            <h3>Repeat password</h3>
            <input placeholder="Type here..." onChange={handleRepeatPassword} type="password" value={repeatPassword}></input>
          </div>

        </div>

        <div className="input-btn">
          <Link to="/" >Back</Link>
          <button className="btn" type="submit" onClick={() => handleSignup()} >Create Account</button>
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