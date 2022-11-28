import React, { useState } from "react";
import "./chatcomponent.css";
import { Button, Input, Tooltip } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Parse from "parse";
import { useParseQuery } from "@parse/react";
import useCurrentUserHook from '../../hooks/useCurrentUserHook';

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
  parseQuery.ascending("createdAt");

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
      console.log(senderNameObject, receiverNameObject, 'What is')
      

      // Clear input
      setMessageInput("");
    } catch (error) {
      alert(error);
    }
  };

  // Helper to format createdAt value on Message
  const formatDateToTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div>
      <div className="flex_between">
        <Tooltip title="Reload">
          <button
            onClick={reload}
            type="primary"
            shape="circle"
            icon={<SyncOutlined />}
          />
        </Tooltip>
      </div>
      {results && (
        <div className="messages">
          {results
            .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
            .map((result) => (
              <div
                key={result.id}
                className={
                  result.get("sender").id === props.senderNicknameId
                    ? "message_sent"
                    : "message_received"
                }
              >
                <p className="message_bubble">{result.get("text")}</p>
                <p className="message_time">
                  {formatDateToTime(result.get("createdAt"))}
                </p>
                <p className="message_name">
                  {result.get("sender").get("name")}
                </p>
              </div>
            ))}
        </div>
      )}
      <div className="new_message">
        <h2 className="new_message_title">New message</h2>
        <Input
          className="form_input"
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          placeholder={"Your message..."}
          size="large"
        />
        <Button
          type="primary"
          className="form_button"
          color={"#208AEC"}
          size={"large"}
          onClick={sendMessage}
        >
          Send message
        </Button>
      </div>
      <div>
        {isLoading && <p>{"Loading…"}</p>}
        {isSyncing && <p>{"Syncing…"}</p>}
        {isLive ? <p>{"Status: Live"}</p> : <p>{"Status: Offline"}</p>}
        {error && <p>{error.message}</p>}
        {count && <p>{`Count: ${count}`}</p>}
      </div>
    </div>
  );
};