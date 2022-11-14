import React, { useState, useEffect } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { LoginContext } from "./contexts/LoginContext";

import Home from './pages/home/Home';
import { Login } from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import AccountSettings from "./pages/accountsettings/AccountSettings";

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
      const query = new Parse.Query('Courses');
      let courses = await query.find();

      const localCoursesArray = []
      function pushCourseToArray (courseElement){
        localCoursesArray.push(courseElement.get("CourseTitle").split(" ").join("-").toLowerCase())
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account-settings" element={<AccountSettings />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    )
  }
}

export default App;