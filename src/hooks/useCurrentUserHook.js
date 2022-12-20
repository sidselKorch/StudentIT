import { useContext } from 'react';
import { LoginContext } from '../contexts/LoginContext'
import Parse from 'parse/dist/parse.min.js';

function useCurrentUserHook() {
    const { currentUser, setCurrentUser } = useContext(LoginContext);

    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        setCurrentUser(currentUser);
        return currentUser;
    };

    return { currentUser, setCurrentUser, getCurrentUser }
}

export default useCurrentUserHook;