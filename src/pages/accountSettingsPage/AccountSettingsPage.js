import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// CSS
import "../../common.css"
import "../signUpPage/signuppage.css"

// COSTUM HOOKS
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

function AccountSettings() {
  // // Function that will return current user and also update current username
  const { currentUser, getCurrentUser } = useCurrentUserHook()

  const initialValues = {
    firstName: currentUser.get("firstName"),
    lastName: currentUser.get("lastName"),
    email: currentUser.getEmail(),
  };
  
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleUpdateUser = () => {
    currentUser.set("firstName", values.firstName)
    currentUser.set("lastName", values.lastName)
    currentUser.set("email", values.email)
    currentUser.save();
  }

  const handleDeleteUser = async function () {
    try {
      await currentUser.destroy();
      getCurrentUser()
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error ${error.message}`);
      return false;
    };
  };

  return (
    <div className="page-container">
      <div className="hero-text">
          <h1>StudentIT</h1>
          <h3>Edit your account</h3>
      </div>

      <div className="input-wrapper">
        <h2 className="input-header">Account settings</h2>
        <form>
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

        </div>

        <div className="input-btn">
          <Link to="/" >Back</Link>
          <button className="btn btn-delete" type="submit" onClick={() => handleDeleteUser()} >Delete User</button>
          <button className="btn" type="submit" onClick={() => handleUpdateUser()} >Save changes</button>
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
export default AccountSettings;