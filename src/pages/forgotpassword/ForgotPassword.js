import React, { useState } from "react";
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';


import '../../common.css';

function ForgotPassword() {
  // State variables
  const [email, setEmail] = useState('');

  // Functions used by the screen components
  const doRequestPasswordReset = async function () {
    // Note that this value come from state variables linked to your text input
    const emailValue = email;
    try {
      await Parse.User.requestPasswordReset(emailValue);
      alert(`Success! Please check ${email} to proceed with password reset.`);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error}`);
      return false;
    }
  };



  return (
    <div className="content-container">
      <div className="hero-text">
          <h3>Welcome to</h3>
          <h1>StudentIT</h1>
          <h3>Live chat platform for ITU students</h3>
      </div>

      <div className='input-wrapper'>
        <h1 className="input-header">Reset my password</h1>
        <div className="input-container">
          <h3>Email address</h3>
          {/* <input type="text" placeholder="Type here..." id="fname" name="fname"></input> */}
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your account email"
          />
        </div>
        <div className="input-btn">
          <Link to="/" >Back</Link>
          <button type="submit" className="btn" onClick={() => doRequestPasswordReset()}>Send</button>
        </div>
      </div>

      <div className="bottom-text">
        <li><Link to="/">Welcome page</Link></li>
        <li><Link to="#">Privacy policy</Link></li>
        <li><Link to="#">© StudentIT 2022</Link></li>
      </div>
      
    </div>
  )
}

export default ForgotPassword