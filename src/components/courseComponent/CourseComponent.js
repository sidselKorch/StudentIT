import {React, useContext} from 'react'
import Parse from "parse";
import "./coursecomponent.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
    
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