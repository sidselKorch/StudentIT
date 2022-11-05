import logo from "./logo.svg";
import React, { useState } from "react";
import Login from './components/Login';
//import SignUp from './components/SignUp';
//import Home from './components/Home';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
//import Course1 from "./components/Course1";
//import Course2 from "./components/Course2";

function App() {

  const [component, setComponent] = useState("login")

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
       {/* <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/course1" element={<Course1 />} />
        <Route path="/course2" element={<Course2 />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
