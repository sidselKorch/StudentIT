import React, { useState, useEffect, useContext } from 'react';
import "../chatComponent/ChatComponent"
import { ChatIdContext } from '../../contexts/ChatContext';
import Parse from 'parse';
import { GroupChatSetup } from './GroupChatSetup';

function GroupChatComponent() {
  const [ChatId, setChatId] = useContext(ChatIdContext)
  const [courseName, setCourseName] = useState("")
  const [courseInitials, setCourseInitials] = useState("")

  async function getCourseName() {
    const UserQuery = new Parse.Query('Chat');
    UserQuery.equalTo('objectId', ChatId);
    const UserQueryResult = await UserQuery.first();
    console.log("UserQueryResult:", UserQueryResult)
    if (UserQueryResult !== undefined) {
      setCourseName(UserQueryResult.get("group"))
      setCourseInitials(UserQueryResult.get("group").substring(0, 2))
    } else {
      setCourseName("")
      setCourseInitials("")
    }
  }

  useEffect(() => {
    getCourseName()
  });

  function resetChatId() {
    setChatId("")
  }

  return (
    <div className="chat-component">
      <div className="chat-header-container">
        <div className="chat-header-info">
          <div className="user-icon">
            <h3 className="user-icon-text" >{courseInitials} </h3>
          </div>
          <h2>{courseName}</h2>
        </div>
        <button className="btn" onClick={() => resetChatId()}>X</button>
      </div>
      <GroupChatSetup />
    </div>
  )
}

export default GroupChatComponent