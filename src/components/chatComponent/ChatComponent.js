import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext'

import "./chatcomponent.css"

function ChatComponent(props) {
  const { currentUser, setCurrentUser }  = useContext(LoginContext);
  
  return (
    <div className="chat-component">
      <h1>{props.id}'s <br></br>ChatComponent</h1>
    </div>
  )
}

export default ChatComponent