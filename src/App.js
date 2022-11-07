import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from './pages/login/Login';
import LoginChecker from "./pages/loginchecker/LoginChecker";
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Course1 from "./pages/courses/Course1";
import AccountSettings from "./pages/accountsettings/AccountSettings";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LoginChecker />}/>
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course1" element={<Course1 />} />
        <Route path="/accountsettings" element={<AccountSettings />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
