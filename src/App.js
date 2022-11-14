import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import "./App.css";

import Login from "./pages/login/Login";
import LoginChecker from "./pages/loginchecker/LoginChecker";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Course1 from "./pages/courses/Course1";
import AccountSettings from "./pages/accountsettings/AccountSettings";

function App() {

  const PARSE_APPLICATION_ID = "yMx7C3P5brk5tkEwXX47ibiGyRdc9KZnOi9q9g74";
  const PARSE_HOST_URL = "https://parseapi.back4app.com/";
  const PARSE_JAVASCRIPT_KEY = "HvRnRMjxFDstboXIWFLD0rWzUA3FV5VIfU6H04h4";
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LoginChecker />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course1" element={<Course1 />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/accountsettings" element={<AccountSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
