import React, { useState } from "react";
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';

import "./signuppage.css";
import "../../common.css"

// COSTUM HOOKS
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

function SignUp() {
  const [ errorMessage, setErrorMessages ] = useState("");

  const { getCurrentUser } = useCurrentUserHook()

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // // Functions used by the screen components
  const handleSignup = async function () {
    
    try {
      // Since the signUp method returns a Promise, we need to call it using await
      if (values.password === values.repeatPassword){
        // Creates user in database
        const createdUser = await Parse.User.signUp(values.email, values.password);
        
        // Fill out data for user
        createdUser.set("firstName", values.firstName)
        createdUser.set("lastName", values.lastName)
        createdUser.set("email", values.email)
        await createdUser.save();

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
    <div className="page-container">
      <div className="hero-text">
          <h3>Sign up to</h3>
          <h1>StudentIT</h1>
          <h3>Live chat platform for ITU students</h3>
      </div>

      <div className="input-wrapper">
        <h2 className="input-header">Create account</h2>
        <form action="/action_page.php">
        <div className="box-input-container sign-up-container">
        
          <div className="input-container">
          <label for="firstname"><h3>First Name</h3></label>
            <input type="text" placeholder="Type here..." onChange={handleInputChange} value={values.firstName} name="firstName" label="firstName" required></input>
            
          </div>

          <div className="input-container">
          <label for="lastname"><h3>Last Name</h3></label>
            <input type="text" placeholder="Type here..." onChange={handleInputChange} value={values.lastName} name="lastName" label="lastName" required></input>
          </div>

          <div className="input-container">
          <label for="email"><h3>Email</h3></label>
            <input type="email" placeholder="Type here..." onChange={handleInputChange} value={values.email} name="email" label="email" required></input>
          </div>

          <div className="input-container">
          <label for="password"><h3>Password</h3></label>
            <input placeholder="Type here..." onChange={handleInputChange} type="password" value={values.password} name="password" label="password" required></input>
          </div>

          <div className="input-container">
          <label for="repeat password"><h3>Repeat password</h3></label>
            <input placeholder="Type here..." onChange={handleInputChange} type="password" value={values.repeatPassword} name="repeatPassword" label="repeatPassword" required></input>
          </div>
          
        </div>

        <div className="input-btn">
          <Link to="/" >Back</Link>
          <button className="btn" type="submit" onClick={() => handleSignup()} >Create Account</button>
        </div>
  
        </form>
      </div>

      <div className="page-footer-links">
          <Link to="/" replace>Welcome page</Link>
          <Link to="#">© StudentIT 2022</Link>
      </div>
    </div>
  );
}
export default SignUp;