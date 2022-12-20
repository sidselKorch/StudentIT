import React, { useState, useContext } from "react";
import "../chatComponent/chatcomponent.css";
import Parse from "parse";
import { useParseQuery } from "@parse/react";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';
import { ChatIdContext } from "../../contexts/ChatContext";

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import "../chatComponent/liveChat.css"

export const LiveGroupChat = (props) => {
  // State variable to hold message text input
  const [messageInput, setMessageInput] = useState("");
  const { currentUser } = useCurrentUserHook();


  const [ numberOfMessages, setNumberOfMessages ] = useState(20)
  const [ChatId, setChatId] = useContext(ChatIdContext)


  // Create parse query for live querying using useParseQuery hook
  const parseQuery = new Parse.Query("GroupMessage").limit(numberOfMessages)
  // Get messages that involve both names
  parseQuery.containedIn("chat", [
    props.chat
  ])

  function fetchMoreMessages(){
    setNumberOfMessages(prevCount => prevCount + 10)
  }

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
      
      const chatObjectQuery = new Parse.Query("Chat");
      chatObjectQuery.equalTo("objectId", ChatId);
      let chatObject = await chatObjectQuery.first();

      // Create new Message object and save it
      let Message = new Parse.Object("GroupMessage");
      Message.set("text", messageText);
      Message.set("sender", senderNameObject.toPointer());
      Message.set("chat", chatObject);
      Message.save();      

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

  function handleSubmit(event){
    event.preventDefault()
    sendMessage()
  }
  

  return (
    <div className="messages_container">
      {results && (
        <div className="messages">
          {results
            .sort((a, b) => a.get("createdAt") < b.get("createdAt"))
            .map((result) => (
              <div
                key={result.id}
                className={
                  result.get("sender").id === props.senderNameObject.id
                    ? "message message_sent"
                    : "message message_received"
                }
              >
                <h3 className="message_name message_metadata">
                  {result.get("sender").get("firstName")}
                </h3>
                <p className="message_bubble">{result.get("text")}</p>
                <h3 className="message_time message_metadata">
                  {formatDateToTime(result.get("createdAt"))}
                </h3>
              </div>
            ))}
            <button onClick={() => fetchMoreMessages()}>More messages</button>
        </div>
      )}

      <form onSubmit={handleSubmit}className="new_message">
        <div className="input-field">
            <input autoFocus type="text" placeholder="Type message here..."  value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}></input>
        </div>
        <input type="submit" className="btn" value="Send"/>
        {/* <FontAwesomeIcon icon={faPaperPlane} /> */}
      </form>
    </div>
  );
};