import React, { useState, useEffect } from "react";
import "./chatcomponent.css";
import { Button, Input } from "antd";
import Parse from "parse";
import { LiveChat } from "./LiveChat";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

export const ChatSetup = () => {
  // State variables holding input values and results
  const [senderNicknameInput, setSenderNicknameInput] = useState("");
  const [senderNicknameId, setSenderNicknameId] = useState(null);
  const [receiverNicknameInput, setReceiverNicknameInput] = useState("");
  const [receiverNicknameId, setReceiverNicknameId] = useState(null);
  const { currentUser, getCurrentUser } = useCurrentUserHook();

  // Create or retrieve Nickname objects and start LiveChat component
  const startLiveChat = async () => {
    // Check if sender nickname already exists, if not create new parse object
    let senderNicknameObject = null;
    try {
      const senderParseQuery = new Parse.Query("User");
      senderParseQuery.equalTo("objectId", currentUser.id);
      const senderParseQueryResult = await senderParseQuery.first();
      if (
        senderParseQueryResult !== undefined &&
        senderParseQueryResult !== null
      ) {
        senderNicknameObject = senderParseQueryResult;
      } else {
        senderNicknameObject = new Parse.Object("User");
        senderNicknameObject.set("objectId", currentUser.id);
        senderNicknameObject = await senderNicknameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }

    // Check if receiver nickname already exists, if not create new parse object
    let receiverNicknameObject = null;
    try {
      const receiverParseQuery = new Parse.Query("User");
      receiverParseQuery.equalTo("objectId", "rGowizXeIl");
      const receiverParseQueryResult = await receiverParseQuery.first();
      console.log(currentUser.id)
      if (
        receiverParseQueryResult !== undefined &&
        receiverParseQueryResult !== null
      ) {
        receiverNicknameObject = receiverParseQueryResult;
      } else {
        receiverNicknameObject = new Parse.Object("User");
        receiverNicknameObject.set("objectId", "rGowizXeIl");
        receiverNicknameObject = await receiverNicknameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }

    // Set nickname objects ids, so live chat component is instantiated
    setSenderNicknameId(senderNicknameObject.id);
    setReceiverNicknameId(receiverNicknameObject.id);
    console.log(senderNicknameObject.id, receiverNicknameObject.id);
    return true;
  };

  return (
    <div>
            <button
              type="primary"
              className="form_button"
              color={"#208AEC"}
              size={"large"}
              onClick={startLiveChat}
            >
              Start live chat
            </button>
        {senderNicknameId !== null && receiverNicknameId !== null && (
          <LiveChat
            senderNicknameId={senderNicknameId}
            receiverNicknameId={receiverNicknameId}
          />
        )}
    </div>
)};