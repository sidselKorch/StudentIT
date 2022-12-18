import React from 'react'
import SidebarUserComponent from '../sidebarUserComponent/SidebarUserComponent'

import "./sidebarcomponent.css"

function Sidebar(props) {
  return (
    <div className='sidebar'>
      <h1>StudentIT</h1>
      <div className="sidebar-chat-container">
        <SidebarUserComponent title={"Group"} queryName={"Groups"} attribute1={"CourseTitle"} attribute2={""}/>
        <SidebarUserComponent title={"Students"} queryName={"User"} attribute1={"firstName"} attribute2={"lastName"}/>
      </div>
    </div>
  )
}

export default Sidebar