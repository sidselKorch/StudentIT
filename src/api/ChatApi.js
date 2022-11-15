import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

export const ChatApi = () => {
    const [chat, setChat] = useState(null);

    async function fetchChat() {
        // create your Parse Query using the Person Class you've created
        const query = new Parse.Query('Chat');
        // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
        query.equalTo('studentid', '2');
        // run the query
        const Chat = await query.first();
        // access the Parse Object attributes
        console.log('chat studentid: ', Chat.get('studentid'));
        console.log('chat courseid: ', Chat.get('courseid'));
        console.log('chat id: ', Chat.id);
        setChat(Chat);
      }

      return (
        <div>
          <button onClick={fetchChat}>Fetch Chat</button>
          {chat !== null && (
            <div>
              <p>{`Student: ${chat.get('studentid')}`}</p>
              <p>{`Course: ${chat.get('courseid')}`}</p>
            </div>
          )}
        </div>
      );
};

