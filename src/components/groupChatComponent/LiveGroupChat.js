import React, { useState, useContext } from "react";
import "../chatComponent/chatcomponent.css";
import Parse from "parse";
import { useParseQuery } from "@parse/react";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';
import { ChatIdContext } from "../../contexts/ChatContext";

import "../chatComponent/liveChat.css"

export const LiveGroupChat = (props) => {
  const [messageInput, setMessageInput] = useState("");
  const { currentUser } = useCurrentUserHook();

  const [numberOfMessages, setNumberOfMessages] = useState(20)
  const [ChatId, setChatId] = useContext(ChatIdContext)

  const parseQuery = new Parse.Query("GroupMessage").limit(numberOfMessages)
  parseQuery.containedIn("chat", [
    props.chat
  ])

  function fetchMoreMessages() {
    setNumberOfMessages(prevCount => prevCount + 10)
  }

  parseQuery.descending("createdAt");
  parseQuery.includeAll();

  const { results } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true,
      enableLiveQuery: true,
    });

  const sendMessage = async () => {
    try {
      const messageText = messageInput;
      const senderNameObjectQuery = new Parse.Query("User");
      senderNameObjectQuery.equalTo("objectId", currentUser.id);
      let senderNameObject = await senderNameObjectQuery.first();

      const chatObjectQuery = new Parse.Query("Chat");
      chatObjectQuery.equalTo("objectId", ChatId);
      let chatObject = await chatObjectQuery.first();

      let Message = new Parse.Object("GroupMessage");
      Message.set("text", messageText);
      Message.set("sender", senderNameObject.toPointer());
      Message.set("chat", chatObject);
      Message.save();

      setMessageInput("");
    } catch (error) {
      alert(error);
    }
  };

  const formatDateToTime = (date) => {
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getHours()}:${minutes}`;
  };

  function handleSubmit(event) {
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
                  result.get("sender").id === currentUser.id
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

      <form onSubmit={handleSubmit} className="new_message">
        <div className="input-field">
          <input autoFocus type="text" placeholder="Type message here..." value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}></input>
        </div>
        <input type="submit" className="btn" value="Send" />
      </form>
    </div>
  );
};