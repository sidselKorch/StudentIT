import React, { useState } from "react";
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

// CSS
import "../../common.css"

// COSTUM HOOKS
import useCurrentUser from '../../hooks/useCurrentUser';

function AccountSettings() {
  
  // States for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  // // Function that will return current user and also update current username
  const { currentUser } = useCurrentUser()


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

  // const handleDeletion = async function () {
  //   try {
  //     await Parse.User.delete();
  //     alert("Succesfull deletion")
  //   } catch{
  //   }
  // }

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
            <input onChange={handleFirstName} defaultValue={Parse.User.current().get("firstName")}></input>
          </div>

          <div className="input-container">
            <h3>Last Name</h3>
            <input onChange={handleLastName} defaultValue={Parse.User.current().get("lastName")}></input>
          </div>

          <div className="input-container">
            <h3>Email</h3>
            <input onChange={handleEmail} defaultValue={Parse.User.current().getEmail()}></input>
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
          {/* <button className="btn" type="submit" onClick={() => handleDeletion()} >Delete Account</button> */}
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