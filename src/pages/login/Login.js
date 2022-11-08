import React, { useState, useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';

import '../../common.css';
import './login.css';

import { Link } from "react-router-dom";

function Login() {

    // Imports the states using context from the parent component App.js
    const { userName, setUserName, password, setPassword, setShowProfile }  = useContext(LoginContext);
    const [ errorMessages, setErrorMessages ] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
      };

    // Handles the submit from the login button
    const handleSubmit = async function() {

        try{
            const loggedInUser = await Parse.User.logIn(userName, password);
            // logIn returns the corresponding ParseUser object
            console.log(`Success! User ${loggedInUser.get('username')} has successfully signed in!`);
            
            // To verify that this is in fact the current user, `current` can be used
            const currentUser = await Parse.User.current();
            console.log(loggedInUser === currentUser);

            // Clear input fields
            setUserName('');
            setPassword('');

            // Update state variable holding current user
            getCurrentUser();

            // Changes state to login
            setShowProfile(true)
            return true;
            
    
        } catch (error) {
            // Error can be caused by wrong parameters or lack of Internet connection
            setErrorMessages(`Error, ${error.message}`)
            // console.log(`Error! ${error.message}`);
            return false;
        }
    }

    const renderErrorMessage = () =>(
        <div className="error">{errorMessages}</div>
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
                    </div>
                    <div className="input-container">
                        <h3>Password</h3>
                        {/* Changes state of password */}
                        <input type="password" placeholder="Type here..." onChange={(event) => {
                            setPassword(event.target.value)
                        }}/>
                    </div>
                    {renderErrorMessage()}
                </div>

                <div className="sign-up-btns">
                    <button type="submit" onClick={() => handleSubmit()} className="btn margin-0-auto">Login</button>
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