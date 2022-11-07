import React, { useState, useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContext'

import '../../common.css';
import './login.css';

import { Link } from "react-router-dom";

function Login() {

    // Imports the states using context from the parent component App.js
    const { userName, setUserName, password, setPassword, setShowProfile }  = useContext(LoginContext);
    const [ errorMessages, setErrorMessages ] = useState({});

    // User Login database
    const database = [
      {
        username: "user1",
        password: "pass1"
      },
      {
        username: "Wim Sørensen",
        password: "pass"
      },
      {
        username: "Sidsel Lysholm",
        password: "pass"
      },
      {
        username: "Yuni Song",
        password: "pass"
      }
    ];

    const errors = {
        uname: "Invalid username",
        pass: "Invalid password"
    };

    // Handles the submit from the login button
    function handleSubmit() {

        // Check the database to find a match with the state userName
        const userData = database.find((user) => user.username === userName);
        console.log(userData)
        if(userData){
            // Check the database to find a match with the state password
            if(userData.password !== password){
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            }
            else {
                // Sets the state of showProfile to true
                setShowProfile(true)
            }
        } else {
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
  
    return (
        <div className="content-container">
            <div className="hero-text">
                <h3>Welcome to</h3>
                <h1>StudentIT</h1>
                <h3>Live chat platform for ITU students</h3>
            </div>

            <div className="input-wrapper">
                <h1 className="input-header">Login to account</h1>
                
                <div className="login-container">
                    <div className="input-container">
                        <h3>Email address</h3>
                        {/* Changes state of userName */}
                        <input type="text" placeholder="Type here..." onChange={(event) => {
                            setUserName(event.target.value)
                        }}/>
                        {renderErrorMessage("uname")}
                    </div>
                    
                    <div className="input-container">
                        <h3>Password</h3>
                        {/* Changes state of password */}
                        <input type="password" placeholder="Type here..." onChange={(event) => {
                            setPassword(event.target.value)
                        }}/>
                        {renderErrorMessage("pass")}
                    </div>
                </div>

                <div className="sign-up-btns">
                    <button type="submit" onClick={() => handleSubmit()
                    } className="btn margin-0-auto">Login</button>
                    <Link to="/signup" className='sign-in-btn'>Sign Up</Link>
                </div>
            </div>
            <div className="bottom-text">
                <Link to="/forgot-password">Forgot password</Link>
                <Link to="#">Privacy policy</Link>
                <Link to="#">© StudentIT 2022</Link>
            </div>
        </div>
    )
}

export default Login