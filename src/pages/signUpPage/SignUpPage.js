import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';

import "./signuppage.css";
import "../../common.css"

// COSTUM HOOKS
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

function SignUp() {
  // States for registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [ errorMessage, setErrorMessages ] = useState("");

  const { getCurrentUser } = useCurrentUserHook()

  

  const courseObj = [
    {"Courses":"Advanced Algorithms","Colors":"green"},{"Courses":"Advanced Applied Statistics and Multivariate Calculus","Colors":"red"},
    {"Courses":"Advanced Data Systems","Colors":"blue"},{"Courses":"Advanced Machine Learning","Colors":"green"},{"Courses":"Advanced Natural Language Processing and Deep Learning","Colors":"blue"},
    {"Courses":"Advanced Network Science","Colors":"red"},{"Courses":"Advanced Programming","Colors":"green"},{"Courses":"Advanced Robotics","Colors":"red"},{"Courses":"Advanced Security","Colors":"blue"},
    {"Courses":"Advanced Service Design","Colors":"green"},{"Courses":"Advanced Software Analysis","Colors":"blue"},{"Courses":"Advanced Software Engineering","Colors":"red"},{"Courses":"Advanced Topics in Game Studies","Colors":"green"},
    {"Courses":"Algorithm Design","Colors":"red"},{"Courses":"Algorithms for Game Development","Colors":"blue"},{"Courses":"Applied Algorithms","Colors":"green"},{"Courses":"Applied information Security","Colors":"blue"},
    {"Courses":"Avancerede designprocesser","Colors":"red"},{"Courses":"Big Data Management (Technical)","Colors":"green"},{"Courses":"Blockchain Economics","Colors":"red"},{"Courses":"Computational Literacies","Colors":"blue"},
    {"Courses":"Critical Big Data Management: Second Part of Specialisation","Colors":"green"},{"Courses":"DADIU Curriculum","Colors":"blue"},{"Courses":"DADIU Project","Colors":"red"},{"Courses":"Data Mining","Colors":"green"},
    {"Courses":"Data in Design","Colors":"red"},{"Courses":"Data in the Wild: Wrangling and Visualising Data","Colors":"blue"},{"Courses":"Data Automation and Social Justice","Colors":"green"},{"Courses":"Deep Learning for Games and Simulations","Colors":"blue"},
    {"Courses":"Designing Aesthetic User Experiences","Colors":"red"},{"Courses":"Discrete Mathematics","Colors":"green"},{"Courses":"Distributed Systems","Colors":"red"},{"Courses":"Game Programming","Colors":"blue"},{"Courses":"Games & Culture","Colors":"green"},
    {"Courses":"How to make (almost) anything","Colors":"blue"},{"Courses":"IT and Green Transitions","Colors":"red"},{"Courses":"Introduction to Database Systems","Colors":"green"},{"Courses":"Introduction to Machine Learning","Colors":"red"},
    {"Courses":"Introduction to Programming","Colors":"blue"},{"Courses":"Introductory Programming","Colors":"green"},{"Courses":"Making Games","Colors":"blue"},{"Courses":"Navigating Complexity","Colors":"red"},{"Courses":"Operating Systems and C","Colors":"green"},
    {"Courses":"Organisational Change","Colors":"red"},{"Courses":"Perspectives on Games","Colors":"blue"},{"Courses":"Play Lab","Colors":"green"},{"Courses":"Practical Concurrent and Parallel Programming","Colors":"blue"},{"Courses":"Programming Mobile Applications","Colors":"red"},
    {"Courses":"Programming for Designers","Colors":"green"},{"Courses":"Reassembling Innovation","Colors":"red"},{"Courses":"Security 1","Colors":"blue"},{"Courses":"Seminars in Data Science","Colors":"green"},
    {"Courses":"Service Design - Management and Implementation","Colors":"blue"},{"Courses":"Situating Interactions","Colors":"red"},{"Courses":"Software Ecosystems","Colors":"green"},{"Courses":"Software Engineering","Colors":"red"},
    {"Courses":"Technical Interaction Design","Colors":"blue"},{"Courses":"The Digital State in Practice","Colors":"green"},{"Courses":"UX Design II","Colors":"blue"},{"Courses":"Users in Context","Colors":"red"},{"Courses":"Værdier og etik i design","Colors":"green"}
  ]

  let courseArray = courseObj.map(({ Courses }) => Courses)

  function courseToHTML(item, index){
    return <div key={index}>
      <input type="checkbox" id={item} name={item} value={item} />
      <label for={item}> {item}</label><br></br>
    </div>

  }

  const courseList = courseArray.map(courseToHTML);


    // COURSE TO DATABASE
//   const counter2 = useRef(0)
//   if (counter2.current === 1){

//     for (let x = 0; x < 1; x++) { 
        
//         let courseArray = courseObj.map(({ Courses }) => Courses)
//         let colorAray = courseObj.map(({ Colors }) => Colors)
        
//         for (let i = 0; i < courseArray.length; i++) { 
//             let NicknameA = new Parse.Object('Course');
//             NicknameA.set('CourseTitle', courseArray[i]);
//             NicknameA.set('CourseColor', colorAray[i]);
//             NicknameA = NicknameA.save();
//         }
        
//     }
// }

// counter2.current = counter2.current + 1;

  // Handling the first name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  
  // Handling the last name change
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Handling the repeat password change
  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };


  // Functions used by the screen components
  const handleSignup = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = email;
    const passwordValue = password;
    
    try {
      // Since the signUp method returns a Promise, we need to call it using await
      if (password === repeatPassword){
        // Creates user in database
        const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
        
        // Fill out data for user
        createdUser.set("firstName", firstName)
        createdUser.set("lastName", lastName)
        createdUser.set("email", email)
        await createdUser.save();

        // Reset forms
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setRepeatPassword("")
        getCurrentUser()
        return true;
      } else {
        alert("Need same password")
      }
    } catch (error) {
      // signUp can fail if any parameter is blank or failed an uniqueness check on the server
      alert(`Error! ${error}`);
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
          <h3>Sign up to</h3>
          <h1>StudentIT</h1>
          <h3>Live chat platform for ITU students</h3>
      </div>

      <label htmlFor="cars">Choose a car:</label>

      <div className="input-wrapper">
        <h1 className="input-header">Create account</h1>
        
        <div className="box-input-container sign-up-container">

          <div className="input-container">
            <h3>First Name</h3>
            <input placeholder="Type here..." onChange={handleFirstName} value={firstName}></input>
          </div>

          <div className="input-container">
            <h3>Last Name</h3>
            <input placeholder="Type here..." onChange={handleLastName} value={lastName}></input>
          </div>

          <div className="input-container">
            <h3>Email</h3>
            <input placeholder="Type here..." onChange={handleEmail} value={email}></input>
          </div>

          <div className="input-container">
            <h3>Password</h3>
            <input placeholder="Type here..." onChange={handlePassword} type="password" value={password}></input>
          </div>

          <div className="input-container">
            <h3>Repeat password</h3>
            <input placeholder="Type here..." onChange={handleRepeatPassword} type="password" value={repeatPassword}></input>
          </div>

        </div>
        
        <div className="input-container ">
          <h3>Choose your courses</h3>
          <form className="course-list">
            {courseList}
          </form>
        </div>

        <div className="input-btn">
          <Link to="/" >Back</Link>
          <button className="btn" type="submit" onClick={() => handleSignup()} >Create Account</button>
        </div>
  

      </div>

      <div className="bottom-text">
          <Link to="/" replace>Welcome page</Link>
          <Link to="#">Privacy policy</Link>
          <Link to="#">© StudentIT 2022</Link>
      </div>
    </div>
  );
}
export default SignUp;