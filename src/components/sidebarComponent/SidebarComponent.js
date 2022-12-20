import { React, useContext } from 'react';

import SidebarUserComponent from '../sidebarUserComponent/SidebarUserComponent'
import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';

import "./sidebarcomponent.css"
import { ChatIdContext } from '../../contexts/ChatContext';

function Sidebar() {
  const [ChatId, setChatId] = useContext(ChatIdContext)
  const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)

  function handleChat() {
    setReceiverId("")
    setChatId("sJZa09qjA2")
  }

  return (
    <div className='sidebar'>
      <h1>StudentIT</h1>
      <div className="sidebar-chat-container">
        <div className="sidebar-user-component">
          <h2>Groups</h2>
          <div className={`sidebar-user ${ChatId === "sJZa09qjA2" ? "clicked" : ""}`} key={"sJZa09qjA2"} onClick={() => handleChat()}>
            <h3 className="sidebar-user-info">Group chat</h3>
          </div>
        </div>
        <SidebarUserComponent title={"Students"} first={"User"} second={"firstName"} third={"lastName"} />
      </div>
    </div>
  )
}
  
export default Sidebar