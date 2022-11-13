import React, { useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import Parse from 'parse/dist/parse.min.js';

import Home from '../home/Home';
import Login from '../login/Login';


function LoginChecker() {
    
    const [showProfile, setShowProfile] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [ currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const checkCurrentUser = async () => {
            try {
                const user = await Parse.User.currentAsync();
                if (user === null || user === undefined) {
                    //   history.push("/");
                } else {
                    if (currentUser === null) {
                        setCurrentUser(user);
                        console.log(user)
                    }
                }
                return true;
            } catch (_error) {}
            return false;
        };
        checkCurrentUser();
      });

    return (
        <LoginContext.Provider value={{ userName, setUserName, password, setPassword, setShowProfile }}>
        {/* Uf else statement - if showProfile state is true goes to landing page otherwise login */}
        
        {/* CHANGE BACK! */}
        {currentUser != null ? <Home /> : <Login />}
        {/* {showProfile ? <Home /> : <Login />} */}
        {/* <Home /> */}
    </LoginContext.Provider>
            
    )
}

export default LoginChecker;