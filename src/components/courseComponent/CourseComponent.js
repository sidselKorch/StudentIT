import {React, useContext} from 'react'
import Parse from "parse";
import "./coursecomponent.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
    
  function CourseComponent(props) {
    const [ ReceiverId ] = useContext(ReceiverIdContext)

    async function hej(){
      const PublisherAQuery = new Parse.Query('User');
        PublisherAQuery.equalTo('objectId', ReceiverId);
        const PublisherA = await PublisherAQuery.first();
        console.log(PublisherA.get("firstName"))
    }
    return (
      <div className="course-component">
        <button onClick={()=> hej()}>hej</button>
        <h1>{props.courseTitle}'s <br></br>CourseComponent</h1>
        <h2>{ReceiverId}</h2>
      </div>
    )
}

export default CourseComponent