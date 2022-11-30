import React, { useState } from "react";
import "./chatcomponent.css";
import Parse from "parse";
import { useParseQuery } from "@parse/react";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import "./liveChat.css"
import { useEffect } from "react";

export const LiveChat = (props) => {
  // State variable to hold message text input
  const [messageInput, setMessageInput] = useState("");
  const { currentUser, getCurrentUser } = useCurrentUserHook();

  // Create parse query for live querying using useParseQuery hook
  const parseQuery = new Parse.Query("Message");
  // Get messages that involve both names
  parseQuery.containedIn("sender", [
    props.senderNameId,
    props.receiverNameId,
  ]);
  parseQuery.containedIn("receiver", [
    props.senderNameId,
    props.receiverNameId,
  ]);
  // Set results ordering
  parseQuery.descending("createdAt");

  // Include name fields, to enable name getting on list
  parseQuery.includeAll();

  // Declare hook and variables to hold hook responses
  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: true, // Enables live query for real-time update (default: true)
    });

  // Message sender handler
  const sendMessage = async () => {
    try {
      const messageText = messageInput;

      // Get sender and receiver name Parse objects
      const senderNameObjectQuery = new Parse.Query("User");
      senderNameObjectQuery.equalTo("objectId", currentUser.id);
      let senderNameObject = await senderNameObjectQuery.first();
      
      const receiverNameObjectQuery = new Parse.Query("User");
      receiverNameObjectQuery.equalTo("objectId", props.receiverNameId);
      let receiverNameObject = await receiverNameObjectQuery.first();

      // Create new Message object and save it
      let Message = new Parse.Object("Message");
      Message.set("text", messageText);
      Message.set("sender", senderNameObject);
      Message.set("receiver", receiverNameObject);
      Message.save();
      // console.log(senderNameObject, receiverNameObject, 'What is')
      

      // Clear input
      setMessageInput("");
    } catch (error) {
      alert(error);
    }
  };


  // Helper to format createdAt value on Message
  const formatDateToTime = (date) => {
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getHours()}:${minutes}`;
  };
  

  return (
    <div className="messages_container">
      {results && (
        <div className="messages">
          {results
            .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
            .map((result) => (
              <div
                key={result.id}
                className={
                  result.get("sender").id === props.senderNameId
                    ? "message message_sent"
                    : "message message_received"
                }
              >
                <p className="message_name message_metadata">
                  {result.get("sender").get("firstName")}
                </p>
                <p className="message_bubble">{result.get("text")}</p>
                <p className="message_time message_metadata">
                  {formatDateToTime(result.get("createdAt"))}
                </p>
              </div>
            ))}
        </div>
      )}

      <div className="new_message">
        <div className="input-field">
            <input autoFocus type="text" placeholder="Type message here..."  value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}></input>
        </div>
        <button type="primary" className="btn" onClick={sendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>

      {/* <div>
      
        {isLoading && <p>{"Loading…"}</p>}
        {isSyncing && <p>{"Syncing…"}</p>}
        {isLive ? <p>{"Status: Live"}</p> : <p>{"Status: Offline"}</p>}
        {error && <p>{error.message}</p>}
        {count && <p>{`Count: ${count}`}</p>}
      </div> */}
    </div>
  );
};