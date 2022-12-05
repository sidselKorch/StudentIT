import React from 'react'
import GroupTest from '../GroupTest.js/GroupTest'
import SidebarUserComponent from '../sidebarUserComponent/SidebarUserComponent'

import "./sidebarcomponent.css"

function Sidebar(props) {
  return (
    <div className='sidebar'>
      <h1>StudentIT</h1>
      <div className="sidebar-chat-container">
        {/* <SidebarUserComponent title={"Groups"} first={"Groups"} second={"GroupName"} fourth={""}/> */}
        <SidebarUserComponent title={"Students"} first={"User"} second={"firstName"} third={"lastName"}/>

        <GroupTest />
      </div>
    </div>
  )
}

export default Sidebar