import {React, useContext} from 'react';
import { useParams } from "react-router-dom";
import SidebarUserComponent from '../sidebarUserComponent/SidebarUserComponent'
import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';

import "./sidebarcomponent.css"
import { ChatIdContext } from '../../contexts/ChatContext';

function Sidebar() {
  const [ChatId, setChatId] = useContext(ChatIdContext)
  const [ReceiverId, setReceiverId] = useContext(ReceiverIdContext)

  function handleChat(){
    setReceiverId("")
    setChatId("sJZa09qjA2")
  }

  return (
    <div className='sidebar'>
      <h1>StudentIT</h1>
      <div className="sidebar-chat-container">
        <div className={`sidebar-user ${ChatId === "sJZa09qjA2" ? "clicked" : ""}`}  key={"sJZa09qjA2"} onClick={() => handleChat()}>
          <h3 className="user-icon-text">{String("Group ")}{String("Chat")}</h3>
      </div>
        <SidebarUserComponent title={"Students"} first={"User"} second={"firstName"} third={"lastName"}/>
      </div>
    </div>
  )
}

export default Sidebar