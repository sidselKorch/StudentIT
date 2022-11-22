import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

// CSS
import './loginpage.css';

// COSTUM HOOKS
import useCurrentUserHook from '../../hooks/useCurrentUserHook';


export function Login() {
    // State variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMessage, setErrorMessages ] = useState("");

    // // Function that will return current user and also update current username
    const { getCurrentUser } = useCurrentUserHook()

    const doUserLogIn = async function () {
        // Note that these values come from state variables that we've declared before
        const usernameValue = username;
        const passwordValue = password;
        try {
            await Parse.User.logIn(usernameValue, passwordValue);
            
            // To verify that this is in fact the current user, `current` can be used
            // const currentUser = await Parse.User.current();
            // console.log(loggedInUser === currentUser);

            setUsername('');
            setPassword('');

            getCurrentUser();
            return true;
        } catch (error) {
        // Error can be caused by wrong parameters or lack of Internet connection
            // alert(`Error! ${error.message}`);
            setErrorMessages(error.message)
            return false;
        }
    };

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
                        <h3>Email Adress </h3>
                        <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Type here..."/>
                    </div>
                    
                    <div className="input-container">
                        <h3>Password </h3>
                        <input type ="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Type here..."/>
                        {renderErrorMessage()}
                    </div>
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

