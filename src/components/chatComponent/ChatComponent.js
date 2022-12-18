import React,  { useState, useEffect, useContext} from 'react';
import "./chatcomponent.css"
import { ChatSetup } from "./ChatSetup";
import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
import Parse from 'parse/dist/parse.min.js';
import { createChatList } from "../../api/Api.js"

function ChatComponent(props) {
  
  const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)
  
  const [ receiverName, setReceiverName ] = useState("")
  
  const [ receiverInitials, setReceiverInitials ] = useState("")

  async function getReceiverName(){
    const UserQuery = new Parse.Query("Chat");
    UserQuery.equalTo('objectId', ReceiverId[0]);
    const UserQueryResult = await UserQuery.first();
    if(UserQueryResult != undefined){
      if(ReceiverId[1] == "User"){
        setReceiverName(
          UserQueryResult.get("firstName") + " " + UserQueryResult.get("lastName")
        );
        setReceiverInitials(
          UserQueryResult.get("firstName").substring(0, 1) +
            UserQueryResult.get("lastName").substring(0, 1)
        );
        } else {
          setReceiverName(UserQueryResult.get("courseTitle"))
          setReceiverInitials(UserQueryResult.get("courseTitle").substring(0,2))
        }
    } else{
      setReceiverName("")
      setReceiverInitials("")
    }

    const success = createChatList(UserQueryResult.get("firstName"), UserQueryResult.get("lastName"), UserQueryResult.get("email"), UserQueryResult.get("courseTitle"))
    if (success) {
      console.log(UserQueryResult.get("email") + "was added to chatlist")
    } else {
      console.log("Something went wrong")
    }

  }

  useEffect(() => {
    getReceiverName()
  });

  function resetReceiverId(){
    setReceiverId("")
  }

  return (
    <div className="chat-component">
      <div className="chat-header-container">
        <div className="chat-header-info">
          <div className = "user-icon">
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