import React from 'react';
import "./chatcomponent.css"

function ChatComponent(props) {
  return (
    <div className="chat-component">
      <h1>{props.courseTitle}'s <br></br>ChatComponent</h1>
      <h3 style={{color: "var(--primary-" + props.color + ")"}}>{props.color}</h3>
    </div>
  )
}

export default ChatComponent