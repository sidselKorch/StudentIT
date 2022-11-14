import React, { useState, useContext } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { LoginContext } from '../../contexts/LoginContext'

export const GetCurrentUserApi = () => {

    const { currentUser, setCurrentUser }  = useContext(LoginContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ errorMessage, setErrorMessages ] = useState("");

    async function getCurrentUser () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
    };

    const doUserLogIn = async function () {
        // Note that these values come from state variables that we've declared before
        const usernameValue = username;
        const passwordValue = password;
        try {
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        // To verify that this is in fact the current user, `current` can be used
        const currentUser = await Parse.User.current();
        console.log(loggedInUser === currentUser);
        // Clear input fields
        setUsername('');
        setPassword('');
        // Update state variable holding current user
        getCurrentUser();
        return true;
        } catch (error) {
        // Error can be caused by wrong parameters or lack of Internet connection
            // alert(`Error! ${error.message}`);
            setErrorMessages(error.message)
            return false;
        }
    };

}