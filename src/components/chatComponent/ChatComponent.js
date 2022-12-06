import React, { useState, useEffect, useContext } from "react";
import "./chatcomponent.css";
import { ChatSetup } from "./ChatSetup";
import Parse from "parse/dist/parse.min.js";
import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';

function ChatComponent(props) {

  const [receiverName, setReceiverName] = useState("");

  const [receiverInitials, setReceiverInitials] = useState("");

  const [ReceiverId] = useContext(ReceiverIdContext)


  async function getReceiverName() {
    const UserQuery = new Parse.Query(ReceiverId[1]);
    UserQuery.equalTo("objectId", ReceiverId[0]);
    const UserQueryResult = await UserQuery.first();
    if (UserQueryResult != undefined) {
      if(ReceiverId[1] == "User"){
      setReceiverName(
        UserQueryResult.get("firstName") + " " + UserQueryResult.get("lastName")
      );
      setReceiverInitials(
        UserQueryResult.get("firstName").substring(0, 1) +
          UserQueryResult.get("lastName").substring(0, 1)
      );
      } else {
        setReceiverName(UserQueryResult.get("CourseTitle"))
        setReceiverInitials(UserQueryResult.get("CourseTitle").substring(0,2))
      }
    } else {
      setReceiverName("");
      setReceiverInitials("");
    }
  }

  useEffect(() => {
    getReceiverName();
  });

  return (
    <div className="chat-component">
      <div className="chat-header-container">
        <div className = "user-icon">
          <h3 className="user-icon-text" >{receiverInitials} </h3>
        </div>
        <h2>{receiverName}</h2>
      </div>
      <ChatSetup />
    </div>
  );
}

export default ChatComponent;