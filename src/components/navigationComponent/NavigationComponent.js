
import React, { useState, useEffect, useRef} from 'react';
import Parse from 'parse/dist/parse.min.js';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

// CSS
import "./navigationcomponent.css"
import "../../common.css"

// COSTUM HOOKS
import useCurrentUserHook from '../../hooks/UseCurrentUserHook';
import useInitialsHook from '../../hooks/UseInitialsHook';

function NavigationComponent() {
    
    // // Function that will return current user and also update current username
    const [ CourseInfo, setCourseInfo] = useState([]);    
    const count = useRef(0);
    const { currentUser, getCurrentUser } = useCurrentUserHook()
    const { initials } = useInitialsHook(currentUser)

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
    
    // FETCH CORUSES FROM DATABASE AND CREATE BUTTONS
    const addObjectToArray = obj => {
        setCourseInfo(current => [...current, obj]);
    };

    useEffect(() => {
        async function fetchCourses() {
            const query = new Parse.Query('Courses');
            let courses = await query.find();

            for (let i = 0; i < courses.length; i++) {
                addObjectToArray({courseTitle: courses[i].get("CourseTitle"), courseColor: courses[i].get("CourseColor")})
            }
        }
        
        if (count.current === 1){
            fetchCourses();
        }
        count.current = count.current + 1;
    },[]);

    function checkRadioButton(id) {
        document.getElementById(id).checked = true;
      }

    let location = useLocation();
    const navigate = useNavigate();

    let lastPathItem = ""

    const navigateToLastPathItem = () => {
        navigate(lastPathItem);
    };
  
    function parseItemtoComponent (item, index){
        const pathItem = "/" + item.courseTitle.split(" ").join("-").toLowerCase()
        const color = "tab tab-" + item.courseColor;
        console.log("PathItem", pathItem)
        if(pathItem === location.pathname){
            return <div key={index}>
                        <Link to={pathItem}><h4 className={color} onClick={() => checkRadioButton(item.courseColor)}>{item.courseTitle}</h4></Link>
                        <input type="radio" id={item.courseColor} name="theme" defaultChecked/>
                    </div>

        } else {
            lastPathItem = pathItem;
            return <div key={index}>
                        <Link to={pathItem}><h4 className={color} onClick={() => checkRadioButton(item.courseColor)}>{item.courseTitle}</h4></Link>
                        <input type="radio" id={item.courseColor} name="theme"/>
                    </div>

        }
    }

    const componentList = CourseInfo.map(parseItemtoComponent);

    if(componentList.length === 0 && currentUser != null){
        return(
        <nav className="nav">
            <div className='tab-container'>
                <div>
                    <li><h4 className="tab tab-blue">Loading...</h4></li>
                </div>
                <div>
                    <li><h4 className="tab tab-red">Loading...</h4></li>
                </div>
                <div>
                    <li><h4 className="tab tab-green">Loading...</h4></li>
                </div>
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
    )} else{
        if(location.pathname === "/" && currentUser != null)
            {navigateToLastPathItem()
        } 
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
}

export default NavigationComponent