import React, { useEffect, useContext, useState } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";
import { LoginContext } from '../../contexts/LoginContext';



export const UserLogin = () => {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const { setShowProfile }  = useContext(LoginContext);

  // Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    console.log("hej" + (currentUser != null))
    return currentUser;
  };

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await Parse.User.currentAsync();
        if (user === null || user === undefined) {
        //   history.push("/");
        } else {
          if (currentUser === null) {
            setCurrentUser(user);
            console.log(user)
          }
        }
        return true;
      } catch (_error) {}
      return false;
    };
    checkCurrentUser();
  });


  const doUserLogIn = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      // logIn returns the corresponding ParseUser object
      console.log(`Success! User ${loggedInUser.get('username')} has successfully signed in!`);
      
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      
      // Clear input fields
      setUsername('');
      setPassword('');
      // Update state variable holding current user
      getCurrentUser();
      return true;

    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      console.log(`Error! ${error.message}`);
      return false;
    }
  };

  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        console.log('Success! No user is logged in anymore!');
      }
      // Update state variable holding current user
      getCurrentUser();
      return true;
    } catch (error) {
      console.log(`Error! ${error.message}`);
      return false;
    }
  };

  


  return (
    <div>
      <div className="container">
        <div className="input-wrapper">
            <h1 className="input-header">{currentUser ? "Hello, " + currentUser.get('firstName') : "Login to account"}</h1>
            <h2>{currentUser ? "True" : "False"}</h2>
            
            <div className="login-container">
                <div className="input-container">
                    <h3>Email address</h3>
                    {/* Changes state of userName */}
                    <input value={username} onChange={(event) => setUsername(event.target.value)}/>
                    {/* {renderErrorMessage("uname")} */}
                </div>
                
                <div className="input-container">
                    <h3>Password</h3>
                    {/* Changes state of password */}
                    <input value={password} onChange={(event) => setPassword(event.target.value)}/>
                    {/* {renderErrorMessage("pass")} */}
                </div>
            </div>

            <div className="sign-up-btns">
                <button type="primary" onClick={() => doUserLogIn()} className="btn margin-0-auto">Login</button>
            </div>
            <div className="sign-up-btns">
                <button type="primary" onClick={() => doUserLogOut()} className="btn margin-0-auto">Logout</button>
            </div>
        </div>
      </div>
    </div>
  );
};