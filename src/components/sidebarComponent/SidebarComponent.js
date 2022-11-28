import React from 'react'
import SidebarUserComponent from '../sidebarUserComponent/SidebarUserComponent'

import "./sidebarcomponent.css"

function Sidebar(props) {
  return (
    <div className='sidebar'>
      <h1>StudentIT</h1>
      <div className="sidebar-chat-container">
        <SidebarUserComponent title={"Students"} first={"User"} second={"firstName"} third={"lastName"}/>
        <SidebarUserComponent title={"Nicknames"} first={"Nickname"} second={"name"} third={"lastName"}/>
        {/* <SidebarUserComponent title={"Message"} first={"Message"} second={"text"} third={"lastName"}/> */}
      </div>
    </div>
  )
}

export default Sidebar