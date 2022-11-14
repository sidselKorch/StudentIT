import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext'

import "./chatcomponent.css"

function ChatComponent() {
  const { currentUser, setCurrentUser }  = useContext(LoginContext);
  
  return (
    <div className="chat-component">
      <h1>ChatComponent</h1>
    </div>
  )
}

export default ChatComponent