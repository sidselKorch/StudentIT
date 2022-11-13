import React, {useState, useContext} from 'react';
import { LoginContext } from '../../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';
import { Link } from "react-router-dom";

import "../../common.css"
import "./home.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function Home() {
    const [bgColor, setBgColor] = useState("blue");
    const { currentUser, setCurrentUser }  = useContext(LoginContext);

    // // Initials
    // const currentUser = Parse.User.current();
    // console.log(currentUser.get("firstName") != undefined)
    let initials = "";
    const FIRST_NAME = currentUser.get("firstName").slice(0,1);
    const LAST_NAME = currentUser.get("lastName").slice(0,1);
    initials = FIRST_NAME + LAST_NAME; 


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

    
    return (
        <>
        <div className="landing-page-wrapper" style={{backgroundColor: "var(--tertiary-" + bgColor + ")"}}>
            <div className='sidebar'>
                <h1>StudentIT</h1>
            </div>
            <nav className="nav">
                <div className='tab-container'>
                <Link style={{textDecoration: 'none'}} to="/course1"><h4 className="tab tab-red" onClick={() => {setBgColor("green")}}>Course3</h4></Link>
                <Link style={{textDecoration: 'none'}} to="/course1"><h4 className="tab tab-blue" onClick={() => {setBgColor("green")}}>Course2</h4></Link>
                <Link style={{textDecoration: 'none'}} to="/course1"><h4 className="tab tab-green" onClick={() => {setBgColor("green")}}>Course1</h4></Link>
                </div>
                <div className='profile'>
                <Link style={{textDecoration: 'none'}} to="/accountsettings"><div className="user-profile">
                        <p>{currentUser.get("firstName")} {currentUser.get("lastName")}</p>
                        <div className="user-icon">
                            <p className="name-initials" id="name_initials">{initials}</p>
                        </div>
                    </div></Link>
                    <button className="btn btn-logout" button type="submit" onClick={() => doUserLogOut()}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>

                    
                </div>
            </nav>
        </div>
        </>
    )
}

export default Home;