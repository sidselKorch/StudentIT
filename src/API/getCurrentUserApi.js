import React, { useContext } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { LoginContext } from '../../contexts/LoginContext'

export const getCurrentUserApi = () => {

    // const { currentUser, setCurrentUser }  = useContext(LoginContext);

    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
    };

}