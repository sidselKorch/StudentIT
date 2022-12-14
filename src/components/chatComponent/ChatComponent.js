import React, { useState, useEffect, useContext } from 'react';
import "./chatcomponent.css"
import { ChatSetup } from "./ChatSetup";
import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
import Parse from 'parse';

function ChatComponent() {
  const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)
  const [receiverName, setReceiverName] = useState("")
  const [receiverInitials, setReceiverInitials] = useState("")

  async function getReceiverName() {
    const UserQuery = new Parse.Query('User');
    UserQuery.equalTo('objectId', ReceiverId);
    const UserQueryResult = await UserQuery.first();
    if (UserQueryResult !== undefined) {
      setReceiverName(UserQueryResult.get('firstName') + " " + UserQueryResult.get('lastName'))
      setReceiverInitials(UserQueryResult.get('firstName').substring(0, 1) + UserQueryResult.get('lastName').substring(0, 1))
    } else {
      setReceiverName("")
      setReceiverInitials("")
    }
  }

  useEffect(() => {
    getReceiverName()
  });

  function resetReceiverId() {
    setReceiverId("")
  }

  return (
    <div className="chat-component">
      <div className="chat-header-container">
        <div className="chat-header-info">
          <div className="user-icon">
            <h3 className="user-icon-text" >{receiverInitials} </h3>
          </div>
          <h2>{receiverName}</h2>
        </div>
        <button className="btn" onClick={() => resetReceiverId()}>X</button>
      </div>
      <ChatSetup />
    </div>
  )
}

export default ChatComponent