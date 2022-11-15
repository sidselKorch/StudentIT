import React, { useState } from "react";

import "./chat.css";
import "../../common.css";

import { MessageApi } from "../../api/MessageApi"
import { ChatApi } from "../../api/ChatApi";

function Chat() {
  return (
    <div className="chat-component">
      <h1>Chat</h1>
      <MessageApi />
      <ChatApi />
    </div>
  );
}

export default Chat;
