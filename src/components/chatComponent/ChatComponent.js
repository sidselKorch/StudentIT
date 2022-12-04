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
    if(UserQueryResult != undefined){
      setReceiverName(UserQueryResult.get('firstName') + " " + UserQueryResult.get('lastName'))
      setReceiverInitials(UserQueryResult.get('firstName').substring(0,1) + UserQueryResult.get('lastName').substring(0,1))
    } else{
      setReceiverName("")
      setReceiverInitials("")
    }

  }

  useEffect(() => {
    getReceiverName()
  });

  return (
    <div className="chat-component">
      <div className="chat-header-container">
        <div className = "user-icon">
          <p className="name-initials" >{receiverInitials} </p>
        </div>
        <h2>{receiverName}</h2>
      </div>
      {/* <h3 style={{color: "var(--primary-" + props.color + ")"}}>{props.color}</h3> */}
      <ChatSetup />
    </div>
  )
}

export default ChatComponent