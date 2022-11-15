import React from 'react'

import "./coursecomponent.css"

function CourseComponent(props) {
  return (
    <div className="course-component">
      <h1>{props.id}'s <br></br>CourseComponent</h1>
    </div>
  )
}

export default CourseComponent