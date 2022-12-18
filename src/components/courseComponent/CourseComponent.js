import {React, useContext} from 'react'
import Parse from "parse";
import "./coursecomponent.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';

// TO CREATE A NEW CHAT FOR THE COURSE
  // const success = createChatList(Parse.User.current().getEmail(), "big data management") //figure out how to get these values
  // if (success) {
  //   alert(Parse.User.current().getEmail() + "was added to chatlist")//same here
  // } else {
  //   alert("Something went wrong")
  // }
    
  function CourseComponent(props) {
    const [ ReceiverId ] = useContext(ReceiverIdContext)

    return (
      <div className="course-component">
        <h1>{props.courseTitle}'s <br></br>CourseComponent</h1>
        <h2>{ReceiverId}</h2>
      </div>
    )
}

export default CourseComponent