import React, { useState } from "react";
import "./chatcomponent.css";
import Parse from "parse";
import { useParseQuery } from "@parse/react";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';
import "./liveChat.css"

export const LiveChat = (props) => {
  const [messageInput, setMessageInput] = useState("");
  const { currentUser, getCurrentUser } = useCurrentUserHook();
  const [numberOfMessages, setNumberOfMessages] = useState(20)

  const parseQuery = new Parse.Query("Message").limit(numberOfMessages)
  parseQuery.containedIn("sender", [
    props.senderNameId,
    props.receiverNameId,
  ]);
  parseQuery.containedIn("receiver", [
    props.senderNameId,
    props.receiverNameId,
  ]);

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

      const receiverNameObjectQuery = new Parse.Query("User");
      receiverNameObjectQuery.equalTo("objectId", props.receiverNameId);
      let receiverNameObject = await receiverNameObjectQuery.first();
      let Message = new Parse.Object("Message");
      
      Message.set("text", messageText);
      Message.set("sender", senderNameObject);
      Message.set("receiver", receiverNameObject);
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
                  result.get("sender").id === props.senderNameId
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