import React, {useContext} from 'react';
import { LoginContext } from '../../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';

function Home() {
    const { currentUser, setCurrentUser }  = useContext(LoginContext);

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
        <div>Home
            <p>{currentUser ? "Email: " + currentUser.getEmail() : ""}</p>
            <p>{currentUser ? "First name: " + currentUser.get("firstName") : ""}</p>
            <button type="submit" onClick={() => doUserLogOut()} className="btn margin-0-auto">Logout</button>
        </div>

    )
}

export default Home