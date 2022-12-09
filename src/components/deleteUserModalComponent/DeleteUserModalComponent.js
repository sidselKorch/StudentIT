import React from 'react'
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

function DeleteUserModalComponent(trigger) {
    const { currentUser, getCurrentUser } = useCurrentUserHook()

    const handleDeleteUser = async function () {
        try {
        await currentUser.destroy();
        getCurrentUser()
        return true;
        } catch (error) {
        // Error can be caused by lack of Internet connection
        alert(`Error ${error.message}`);
        return false;
        };
    };
    return (
    <div className="input-wrapper delete-account-modal">
        <h2 className="input-header">Delete Account</h2>
        <div className="box-input-container">
            <button className="btn btn-delete" type="submit" onClick={() => handleDeleteUser()} >Delete Account</button>
            <button className="btn" type="submit">Don't delete Account</button>
        </div>
    </div>
  )
}

export default DeleteUserModalComponent