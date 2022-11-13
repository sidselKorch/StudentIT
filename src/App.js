import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginContext } from "./contexts/LoginContext";

import Home from './pages/home/Home';
import { Login } from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";


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


  return (
<LoginContext.Provider value={{ currentUser, setCurrentUser }}>
  <BrowserRouter>
    <Routes>
      {currentUser != null ? <Home /> : <Login />}
      <Route index path="/" element={<Login />}/>
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App;