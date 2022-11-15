import React, { useState, useContext, useEffect} from 'react';
import { LoginContext } from '../../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

import "./navigationBar.css"

function Navigationbar() {
    const { currentUser, setCurrentUser }  = useContext(LoginContext);
    const [bgColor, setBgColor] = useState("blue");
    const [ courseArray, setCourseArray] = useState([]);
    const [ localCourseColorArray, setlocalCourseColorArray] = useState([]);

    // Function that will return current user and also update current username
    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
    };

    const doUserLogOut = async function () {
        try {
            await Parse.User.logOut();
            // Update state variable holding current user
            getCurrentUser();
            return true;
        } catch (error) {
            alert(`Error! ${error.message}`);
            return false;
        }
    };

    // Initials
    let initials = "";
    const FIRST_NAME = currentUser.get("firstname")[0]
    const LAST_NAME = currentUser.get("lastname")[0]
    if(typeof FIRST_NAME !== 'undefined' && typeof LAST_NAME !== 'undefined'){
        initials = FIRST_NAME + LAST_NAME;
    } else {
        initials = "NaN"
    }


    // FETCH CORUSES FROM DATABASE AND CREATE BUTTONS
    useEffect(() => {
        async function fetchCourse() {
            // create your Parse Query using the Person Class you've created
            const query = new Parse.Query('Course');
            let courses = await query.find();

            const localCoursesArray = []
            const localCourseColorArray = []
            function pushCourseToArray (courseElement){
            localCoursesArray.push(courseElement.get("Course"))
            localCourseColorArray.push(courseElement.get("Color"))
            }

            courses.forEach(pushCourseToArray);
            setCourseArray(localCoursesArray)
            setlocalCourseColorArray(localCourseColorArray)
        }
        fetchCourse();
    },[]);
    
    function parseItemtoComponent (item, index){
        const slashItem = "/" + item.split(" ").join("-").toLowerCase()
        const color = "tab tab-" + localCourseColorArray[index]
        return <Link to={slashItem} key={index}><h4 className={color} onClick={() => {setBgColor("red")}}>{item}</h4></Link>
    }

    const componentList = courseArray.map(parseItemtoComponent);

    // RENDER NAVIGATION BAR
    return (
        <nav className="nav">
            <div className='tab-container'>
                {componentList}
            </div>
            <div className='profile'>
                <Link to="/account-settings">
                    <div className="user-profile">
                        <p>{currentUser.get("firstname") + " " + currentUser.get("lastname")}</p>
                        <div className="user-icon">
                            <p className="name-initials" id="name_initials">{initials}</p>
                        </div>
                    </div>
                </Link>
                <Link to="/">
                    <button type="submit" onClick={() => doUserLogOut()} className="btn margin-0-auto">Logout</button>
                </Link>
            </div>
        </nav>
    )
}

export default Navigationbar