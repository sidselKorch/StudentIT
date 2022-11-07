import React from 'react'
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="sign-up-wrapper">
      <div className="sign-up-container">
        <h1>Reset my password</h1>
          <form class="">
            <div className="input-container">
            <h3 for="fname">Email address</h3>
            <input type="text" placeholder="Type here..." id="fname" name="fname"></input>
          </div>
        </form>
        <button type="submit" className="btn sign-in-btn">Send</button>
        <Link to="/" >Back</Link>
      </div>
    </div>
  )
}

export default ForgotPassword