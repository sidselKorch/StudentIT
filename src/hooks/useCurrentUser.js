import { useContext} from 'react';
import { LoginContext } from '../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';

export default function useCurrentUser(){
    
    const { currentUser, setCurrentUser }  = useContext(LoginContext);
    
    // Function that will return current user and also update current username
    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
    };

    return {currentUser, setCurrentUser, getCurrentUser}
}