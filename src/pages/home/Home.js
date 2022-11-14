import React, { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext'

import Sidebar from '../../components/sidebar/Sidebar';
import Navigationbar from '../../components/navigationbar/Navigationbar';

import "./home.css"

function Home() {
    const { currentUser, setCurrentUser }  = useContext(LoginContext);
    
    return (
        <div className="landing-page-wrapper" style={{backgroundColor: "var(--tertiary-" + "green" + ")"}}>
            <Sidebar />
            <Navigationbar />
            <div className="main">{currentUser.getEmail()}</div>
        </div>
    )
}

export default Home