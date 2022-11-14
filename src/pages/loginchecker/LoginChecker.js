import React, { useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";


import Home from '../home/Home';
import Login from '../login/Login';


function LoginChecker() {
    
    const [showProfile, setShowProfile] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <LoginContext.Provider value={{ userName, setUserName, password, setPassword, setShowProfile }}>
        {/* Uf else statement - if showProfile state is true goes to landing page otherwise login */}
        
        {/* CHANGE BACK! */}
        {/* {showProfile ? <Home /> : <Login />} */}
        <Home />
    </LoginContext.Provider>
            
    )
}

export default LoginChecker;