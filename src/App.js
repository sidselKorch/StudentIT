import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginContext } from "./contexts/LoginContext";

import Home from './pages/homePage/HomePage';
import { Login } from "./pages/loginPage/LoginPage";
import SignUp from "./pages/signUpPage/SignUpPage";
import ForgotPassword from "./pages/forgotPasswordPage/ForgotPasswordPage";
import AccountSettings from "./pages/accountSettingsPage/AccountSettingsPage";

import "./App.css";
import "./common.css"

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'SdXFoGj5bqBlkIoppkDvKvFXD30UPSnLKuln3c2w';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'EFwT6nfGKmEjFyfeGdwimXED1kc44EAP0oj1razX';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await Parse.User.currentAsync();
        if (user === null && window.location.pathname !== "/") {
          // if(window.location.pathname !== "/"){
            window.location.pathname = "/"
        // }
        } else {
          if (currentUser === null) {
            setCurrentUser(user);
            // console.log(user)
          }
        }
        return true;
      } catch (_error) {}
      return false;
    };
    checkCurrentUser();
  });


// RENDER ROUTERS DEPENDING ON LOGIN
  if(currentUser != null){
    return(
      <LoginContext.Provider value={{ currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:courseTitle" element={<Home />}/>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />
            <Route path="/account-settings" element={<AccountSettings />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    )
  } else{
    return(
      <LoginContext.Provider value={{ currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    )
  }
}

export default App;