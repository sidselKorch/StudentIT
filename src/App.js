import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import { LoginContext } from "./contexts/LoginContext";
import { initializeParse } from  '@parse/react';
import "./App.css";
import "./common.css"

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import Course1 from "./pages/courses/Course1";
import AccountSettings from "./pages/accountsettings/AccountSettings";

function App() {

  const PARSE_APPLICATION_ID = "65TirrcSVPaoT4Kt9lrRjhz2MsqcgVLV2AVkuWye";
  const PARSE_HOST_URL = "https://parseapi.back4app.com/";
  const PARSE_JAVASCRIPT_KEY = "WGjW7ApXRydSe8LC70gNWngqqgG3CTuDPPl8JiQs";
  Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
  Parse.serverURL = PARSE_HOST_URL;

  const BACK_4_APP_SUBDOMAIN = "https://studentitsid.b4a.io"
  initializeParse(BACK_4_APP_SUBDOMAIN, PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY)

  const [currentUser, setCurrentUser] = useState(null);
  const [ courseArray, setCourseArray] = useState([]);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await Parse.User.currentAsync();
        if (user === null || user === undefined) {
          //   history.push("/");
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

  // FETCH DATA FROM DATABASE AND CREATE ROUTES
  useEffect(() => {
    async function fetchCourses() {
      // create your Parse Query using the Person Class you've created
      const query = new Parse.Query('Course');
      let courses = await query.find();

      const localCoursesArray = []
      function pushCourseToArray (courseElement){
        localCoursesArray.push(courseElement.get("Course").split(" ").join("-").toLowerCase())
      }

      courses.forEach(pushCourseToArray);
      setCourseArray(localCoursesArray)

    }
    fetchCourses();
  },[]);

  function parseItemtoComponent (item, index){
    // return <li key={index}>{item}</li>
    item = "/" + item
    return <Route key={index} path={item} element={<Home />} />
  }

  const componentList = courseArray.map(parseItemtoComponent);

  // RENDER ROUTERS DEPENDING ON LOGIN
  if(currentUser != null){
    return(
      <LoginContext.Provider value={{ currentUser, setCurrentUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {componentList}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course1" element={<Course1 />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course1" element={<Course1 />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/accountsettings" element={<AccountSettings />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    )
  }
}

export default App;
