import React, { useState, useEffect, useContext } from "react";
import "../chatComponent/ChatComponent";
import Parse from "parse";
import { LiveGroupChat } from "./LiveGroupChat";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';
import { ChatIdContext } from "../../contexts/ChatContext";


export const GroupChatSetup = () => {
  const [senderNameObject, setSenderNameObject] = useState(null);
  const [chatObject, setChatObject] = useState(null);
  const [ChatId] = useContext(ChatIdContext);
  const { currentUser } = useCurrentUserHook();

  const startLiveChat = async () => {
    let senderNameObject = null;
    try {
      const senderParseQuery = new Parse.Query("User");
      senderParseQuery.equalTo("objectId", currentUser.id);
      const senderParseQueryResult = await senderParseQuery.first();
      if (
        senderParseQueryResult !== undefined &&
        senderParseQueryResult !== null
      ) {
        senderNameObject = senderParseQueryResult;
      }
    } catch (error) {
      alert(error);
      return false;
    }

    let chatObject = null;
    try {
      const chatParseQuery = new Parse.Query("Chat");
      chatParseQuery.equalTo("objectId", ChatId);
      const chatParseQueryResult = await chatParseQuery.first();
      if (
        chatParseQueryResult !== undefined &&
        chatParseQueryResult !== null
      ) {
        chatObject = chatParseQueryResult;
      } else {
      }
    } catch (error) {
      alert(error);
      return false;
    }

    setSenderNameObject(senderNameObject.id);
    setChatObject(chatObject.id);
    console.log("senderNameObject.id", senderNameObject, "chatObject", chatObject);
    return true;
  };

  useEffect(() => {
    startLiveChat()
  })

  return (
    <>
      {senderNameObject !== null && (
        <LiveGroupChat
          senderNameObject={senderNameObject}
          chat={chatObject}
        />
      )}
    </>
  )
};