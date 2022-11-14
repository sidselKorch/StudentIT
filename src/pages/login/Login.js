import React, { useState, useContext } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { LoginContext } from '../../contexts/LoginContext'

import { GetCurrentUserApi } from '../../API/GetCurrentUserApi';

// import '../../common.css';
import './login.css';

import { Link } from "react-router-dom";

export function Login() {
    // State variables
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [ errorMessage, setErrorMessages ] = useState("");

    // const { currentUser, setCurrentUser }  = useContext(LoginContext);

    // Function that will return current user and also update current username
    // const getCurrentUser = async function () {
    //     const currentUser = await Parse.User.current();
    //     // Update state variable holding current user
    //     setCurrentUser(currentUser);
    //     return currentUser;
    // };

    <GetCurrentUserApi />

    const renderErrorMessage = () =>(
        <div className="error">{errorMessage}</div>
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
                        <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Type here..."/>
                    </div>
                    <div className="input-container">
                        <h3>Password</h3>
                        {/* Changes state of password */}
                        <input type ="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Type here..."/>
                    </div>
                    {renderErrorMessage()}
                </div>

                <div className="sign-up-btns">
                    <button type="submit" onClick={() => doUserLogIn()} className="btn margin-0-auto">Login</button>
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

// export default Login;
