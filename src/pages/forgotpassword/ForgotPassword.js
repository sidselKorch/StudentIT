import React from 'react'
import { Link } from "react-router-dom";

import '../../common.css';

function ForgotPassword() {
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
          <input type="text" placeholder="Type here..." id="fname" name="fname"></input>
        </div>
        <div className="input-btn">
          <Link to="/" >Back</Link>
          <button type="submit" className="btn">Send</button>
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