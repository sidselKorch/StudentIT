import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

export const MessageApi = () => {
    const [message, setMessage] = useState(null);

    async function addMessage(){
        try{
            const Message = new Parse.Object('Message');
            Message.set('studentid', "1")
            Message.set('chatid', '2')
            Message.set('content', 'some random content')

            await Message.save();
            alert('Message saved!')
        }catch(error) {
            console.log('Error saving New Message', error)
        }
    }

    async function fetchMessage() {
        // create your Parse Query using the Person Class you've created
        const query = new Parse.Query('Message');
        // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
        query.equalTo('studentid', '1');
        // run the query
        const Message = await query.first();
        // access the Parse Object attributes
        console.log('message studentid: ', Message.get('studentid'));
        console.log('message courseid: ', Message.get('chatid'));
        console.log('message id: ', Message.id);
        setMessage(Message);
      }

      return (
        <div>
          <button onClick={addMessage}>Add Message</button>
          <button onClick={fetchMessage}>Fetch Message</button>
          {message !== null && (
            <div>
              <p>{`Student: ${message.get('studentid')}`}</p>
              <p>{`Chat: ${message.get('chatid')}`}</p>
              <p>{`Message: ${message.get('content')}`}</p>
            </div>
          )}
        </div>
      );
};