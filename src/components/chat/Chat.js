import React, { useState, useContext } from "react";

import "./chat.css";
import "../../common.css";
import { LoginContext } from '../../contexts/LoginContext'

import { ChatApi } from "../../api/ChatApi";
import { ChatSetup } from "./ChatSetup";

import { useParams } from "react-router-dom";
import { Button } from "antd";
import Parse from "parse";

function Chat() {

  const { currentUser, setCurrentUser }  = useContext(LoginContext);

  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
};

  const deleteUser = async function (currentUser) {
      try {
        await currentUser.destroy();
        alert('Success! User deleted!');
        return true;
      } catch (error) {
        // Error can be caused by lack of Internet connection
        alert(`Error ${error.message}`);
        return false;
      };
    };

  return (
    <div className="chat-component">
      <div className="Chat">
        <h1>Chat</h1>
        <ChatSetup />
        <ChatApi />
      </div>
    </div>
  );
}

export default Chat;
