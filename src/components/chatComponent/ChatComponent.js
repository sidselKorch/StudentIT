import React,  { useState, useEffect, useContext} from 'react';
import "./chatcomponent.css"
import { ChatSetup } from "./ChatSetup";
import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
import Parse from 'parse/dist/parse.min.js';

function ChatComponent(props) {
  
  const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)
  
  const [ userData, setUserdata ] = useState([])
  
  const [ receiverName, setReceiverName ] = useState("")
  
  const [ receiverInitials, setReceiverInitials ] = useState("")

  async function getReceiverName(){
    const UserQuery = new Parse.Query('User');
    UserQuery.equalTo('objectId', ReceiverId);
    const UserQueryResult = await UserQuery.first();
    console.log(UserQueryResult.get('firstName'))
    setReceiverName(UserQueryResult.get('firstName') + " " + UserQueryResult.get('lastName'))
    setReceiverInitials(UserQueryResult.get('firstName').substring(0,1) + UserQueryResult.get('lastName').substring(0,1))
  }

  useEffect(() => {
    getReceiverName()
  });

  // function resetReceiverId(){
  //   setReceiverId("")
  // }

  return (
    <div className="chat-component">
      <div className="chat-header-container">
        <div className="chat-header-info">
          <div className = "user-icon">
            <h3 className="user-icon-text" >{receiverInitials} </h3>
          </div>
          <h2>{receiverName}</h2>
        </div>
        {/* <button className="btn" onClick={() => resetReceiverId()}>Close Chat</button> */}

        <div className="dot-settings">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      <ChatSetup />
    </div>
  )
}

export default ChatComponent