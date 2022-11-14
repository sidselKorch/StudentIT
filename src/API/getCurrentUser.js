import React, { useState, useContext } from 'react';
import Parse from 'parse/dist/parse.min.js';
import { LoginContext } from '../../contexts/LoginContext'

const { currentUser, setCurrentUser }  = useContext(LoginContext);

export const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
};