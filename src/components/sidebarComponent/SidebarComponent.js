import React from 'react'
import SidebarUserComponent from '../sidebarUserComponent/SidebarUserComponent'

import "./sidebarcomponent.css"

function Sidebar(props) {
  return (
    <div className='sidebar'>
      <h1>StudentIT</h1>
      <div className="sidebar-chat-container">
        <SidebarUserComponent title={"Groups"} queryName={"Courses"} attribute1={"CourseTitle"} attribute2={""}/>
        <SidebarUserComponent title={"Students"} queryName={"User"} attribute1={"firstName"} attribute2={"lastName"}/>
        {/* <SidebarUserComponent title={"Nicknames"} first={"Message"} second={"text"} third={"lastName"}/> */}
        {/* <SidebarUserComponent title={"Message"} first={"Message"} second={"text"} third={"lastName"}/> */}
      </div>
    </div>
  )
}

export default Sidebar