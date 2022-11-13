import React, {useState, useContext} from 'react';
import { LoginContext } from '../../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

import "./home.css"

function Home() {
    const { currentUser, setCurrentUser }  = useContext(LoginContext);
    const [bgColor, setBgColor] = useState("blue");

    // Function that will return current user and also update current username
    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
    };

    console.log(currentUser)

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

    return (
        <div className="landing-page-wrapper" style={{backgroundColor: "var(--tertiary-" + bgColor + ")"}}>
            <div className='sidebar'>
                <h1>StudentIT</h1>
            </div>
            <nav className="nav">
                <div className='tab-container'>
                <Link to="/course1"><h4 className="tab tab-red" onClick={() => {setBgColor("green")}}>Course3</h4></Link>
                <Link to="/course1"><h4 className="tab tab-blue" onClick={() => {setBgColor("green")}}>Course2</h4></Link>
                <Link to="/course1"><h4 className="tab tab-green" onClick={() => {setBgColor("green")}}>Course1</h4></Link>
                </div>
                <div className='profile'>
                <Link to="/accountsettings"><div className="user-profile">
                        <p>{currentUser.get("firstName") + " " + currentUser.get("lastName")}</p>
                        <div className="user-icon">
                            <p className="name-initials" id="name_initials">{initials}</p>
                        </div>
                    </div></Link>
                    <button type="submit" onClick={() => doUserLogOut()} className="btn margin-0-auto">Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Home