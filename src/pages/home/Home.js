import React, { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext'

import Sidebar from '../../components/sidebar/Sidebar';
import Navigationbar from '../../components/navigationbar/Navigationbar';

import "./home.css"
import ChatComponent from '../../components/chatComponent/ChatComponent';
import CourseComponent from '../../components/courseComponent/CourseComponent';

function Home() {
    const { currentUser, setCurrentUser }  = useContext(LoginContext);
    
    return (
        <div className="landing-page-wrapper" style={{backgroundColor: "var(--tertiary-" + "green" + ")"}}>
            <Sidebar />
            <Navigationbar />
            <ChatComponent />
            <CourseComponent />
        </div>
    )
}

export default Home