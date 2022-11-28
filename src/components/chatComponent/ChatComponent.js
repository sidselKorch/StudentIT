import React from 'react';
import "./chatcomponent.css"
import { ChatSetup } from "./ChatSetup";
import { LiveChat } from './LiveChat';

function ChatComponent(props) {
  return (
    <div className="chat-component">
      <h1>{props.courseTitle}'s <br></br>ChatComponent</h1>
      <h3 style={{color: "var(--primary-" + props.color + ")"}}>{props.color}</h3>
      {/* <LiveChat /> */}
      <ChatSetup />
    </div>
  )
}

export default ChatComponent