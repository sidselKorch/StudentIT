
import React, { useState, useEffect, useRef} from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

// CSS
import "./navigationcomponent.css"

// COSTUM HOOKS
import useCurrentUser from '../../hooks/useCurrentUser';

function NavigationComponent() {
    
    // // Function that will return current user and also update current username
    const {currentUser, getCurrentUser} = useCurrentUser()

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
    const FIRST_NAME = currentUser.get("firstName")[0]
    const LAST_NAME = currentUser.get("lastName")[0]
    if(typeof FIRST_NAME !== 'undefined' && typeof LAST_NAME !== 'undefined'){
        initials = FIRST_NAME + LAST_NAME;
    } else {
        initials = "NaN"
    }

    // STILL MISSES SOME ADJUSTMENTS
    const [CourseInfo, setCourseInfo] = useState([]);    

    const count = useRef(0);

    const addObjectToArray = obj => {
        setCourseInfo(current => [...current, obj]);
    };

    // FETCH CORUSES FROM DATABASE AND CREATE BUTTONS
    useEffect(() => {
        async function fetchCourses() {
            // create your Parse Query using the Person Class you've created
            const query = new Parse.Query('Courses');
            let courses = await query.find();

            for (let i = 0; i < courses.length; i++) {
                addObjectToArray({courseTitle: courses[i].get("CourseTitle"), courseColor: courses[i].get("CourseColor")})
            }
        }
        // console.log("CourseInfo", CourseInfo.length)
        
        if (count.current === 1){
            fetchCourses();
        }
        count.current = count.current + 1;
    },[]);

    function parseItemtoComponent (item, index){
        const pathItem = "/" + item.courseTitle.split(" ").join("-").toLowerCase()
        const color = "tab tab-" + item.courseColor;
        return <Link to={pathItem} key={index}><h4 className={color}>{item.courseTitle}</h4></Link>
    }

    const componentList = CourseInfo.map(parseItemtoComponent);
    
    // RENDER NAVIGATION BAR
    return (
        <nav className="nav">
            <div className='tab-container'>
                {componentList}
            </div>
            <div className='profile'>
                <Link to="/account-settings">
                    <div className="user-profile">
                        <p>{currentUser.get("firstName") + " " + currentUser.get("lastName")}</p>
                        <div className="user-icon">
                            <p className="name-initials" id="name_initials">{initials}</p>
                        </div>
                    </div>
                </Link>
                <Link to="/">
                    <button type="submit" onClick={() => doUserLogOut()} className="btn logout-btn"><FontAwesomeIcon icon={faSignOutAlt} /></button>
                </Link>
            </div>
        </nav>
    )
}

export default NavigationComponent