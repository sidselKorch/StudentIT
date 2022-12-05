import React from 'react'
import Parse from 'parse/dist/parse.min.js';
import useCurrentUserHook from '../../hooks/useCurrentUserHook';


function GroupTest() {
    const { currentUser, getCurrentUser } = useCurrentUserHook()

    const ownerQuery = new Parse.Query("User");
    ownerQuery.equalTo("objectId", currentUser.toPointer());
    
    // const membersQuery = new Parse.Query("Groups");
    // membersQuery.containedIn("members", [currentUser.toPointer()]);
    
    return (
        
    <div>GroupTest
        {console.log(ownerQuery)}
    </div>
  )
}

export default GroupTest