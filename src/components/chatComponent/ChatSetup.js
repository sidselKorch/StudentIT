import React, { useState, useEffect, useContext } from "react";
import "./chatcomponent.css";
import Parse from "parse";
import { LiveChat } from "./LiveChat";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
import { ChatIdContext } from "../../contexts/ChatIdContext";

export const ChatSetup = () => {
  // State variables holding input values and results
  const [senderNameId, setSenderNameId] = useState(null);
  const [receiverNameId, setReceiverNameId] = useState(null);
  const { currentUser, getCurrentUser } = useCurrentUserHook();
  const [ ReceiverId ] = useContext(ReceiverIdContext);

  // Create or retrieve User name objects and start LiveChat component
  const startLiveChat = async () => {
    // Check if sender name already exists, if not create new parse object
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
      } else {
        // senderNameObject = new Parse.Object("User");
        // senderNameObject.set("objectId", currentUser.id);
        // senderNameObject = await senderNameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }

    let receiverNameObject = null;
    try {
      const receiverParseQuery = new Parse.Query("User");
      receiverParseQuery.equalTo("objectId", ReceiverId);
      const receiverParseQueryResult = await receiverParseQuery.first();
      console.log(currentUser.id)
      if (
        receiverParseQueryResult !== undefined &&
        receiverParseQueryResult !== null
      ) {
        receiverNameObject = receiverParseQueryResult;
      } else {
        // receiverNameObject = new Parse.Object("User");
        // receiverNameObject.set("objectId", ReceiverId);
        // receiverNameObject = await receiverNameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }

    // Set name objects ids, so live chat component is instantiated
    setSenderNameId(senderNameObject.id);
    setReceiverNameId(receiverNameObject.id);
    console.log(senderNameObject.id, receiverNameObject.id);
    return true;
  };

  useEffect(() => {
    startLiveChat()
  })

  return (
    <>
        {senderNameId !== null && receiverNameId !== null && (
          <LiveChat
            senderNameId={senderNameId}
            receiverNameId={receiverNameId}
          />
        )}
    </>
)};