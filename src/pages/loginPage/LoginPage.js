import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

import './loginpage.css';
import "../signUpPage/signuppage.css"

import useCurrentUserHook from '../../hooks/useCurrentUserHook';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessages] = useState("");
    const { getCurrentUser } = useCurrentUserHook()

    const doUserLogIn = async function () {
        const usernameValue = username;
        const passwordValue = password;
        try {
            await Parse.User.logIn(usernameValue, passwordValue);
            setUsername('');
            setPassword('');
            getCurrentUser();
            return true;
        } catch (error) {
            setErrorMessages(error.message)
            return false;
        }
    };

    const renderErrorMessage = () => (
        <div className="error">{errorMessage}</div>
    );

    return (
        <div className="page-container">
            <div className="hero-text">
                <h3>Welcome to</h3>
                <h1>StudentIT</h1>
                <h3>Live chat platform for ITU students</h3>
            </div>

            <div className="input-wrapper">
                <h2 className="input-header">Login to account</h2>

                <div className="login-container">
                    <div className="input-container">
                        <h3>Email Adress </h3>
                        <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Type here..." />
                    </div>

                    <div className="input-container">
                        <h3>Password </h3>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Type here..." />
                        {renderErrorMessage()}
                    </div>
                </div>

                <div className="sign-up-btns">
                    <button type="submit" onClick={() => doUserLogIn()} className="btn btn-login">Login</button>
                    <Link to="/signup" className='sign-in-btn'>Sign Up</Link>
                </div>

            </div>
            <div className="page-footer-links">
                <Link to="/forgot-password">Forgot password</Link>
                <Link to="#">© StudentIT 2022</Link>
            </div>
        </div>
    )
}

