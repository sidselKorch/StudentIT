import React, { useState, useEffect, useContext } from "react";
import "./chatcomponent.css";
import Parse from "parse";
import { LiveChat } from "./LiveChat";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';

export const ChatSetup = () => {
  const [senderNameId, setSenderNameId] = useState(null);
  const [receiverNameId, setReceiverNameId] = useState(null);
  const { currentUser, getCurrentUser } = useCurrentUserHook();
  const [ReceiverId] = useContext(ReceiverIdContext)

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

    let receiverNameObject = null;
    try {
      const receiverParseQuery = new Parse.Query("User");
      receiverParseQuery.equalTo("objectId", ReceiverId);
      const receiverParseQueryResult = await receiverParseQuery.first();
      if (
        receiverParseQueryResult !== undefined &&
        receiverParseQueryResult !== null
      ) {
        receiverNameObject = receiverParseQueryResult;
      }
    } catch (error) {
      alert(error);
      return false;
    }

    setSenderNameId(senderNameObject.id);
    setReceiverNameId(receiverNameObject.id);
    return true;
  };

  useEffect(() => {
    startLiveChat()
  })

  return (
    <>
      {senderNameId !== null && receiverNameId !== null && (
        <LiveChat senderNameId={senderNameId} receiverNameId={receiverNameId}/>
      )}
    </>
  )
};