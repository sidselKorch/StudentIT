import {React, useState} from 'react';
import { useParams } from "react-router-dom";

import SidebarComponent from '../../components/sidebarComponent/SidebarComponent';
import NavigationComponent from '../../components/navigationComponent/NavigationComponent';
import ChatComponent from '../../components/chatComponent/ChatComponent';
import CourseComponent from '../../components/courseComponent/CourseComponent';

import "./homepage.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';
import GroupChatComponent from '../../components/groupChatComponent/GroupChatComponent';
import { ChatIdContext } from '../../contexts/ChatContext';


function Home() {
    const { courseTitle } = useParams();

    const [ReceiverId, setReceiverId] = useState("")
    const [ChatId, setChatId] = useState("")

    return (
        <div className="landing-page-wrapper">
            <ReceiverIdContext.Provider value={[ReceiverId, setReceiverId]}>
                <SidebarComponent courseTitle={courseTitle}/>
                <NavigationComponent />
                {ReceiverId != "" ? <ChatComponent courseTitle={courseTitle} /> : ""}
                <CourseComponent courseTitle={courseTitle}/>
            </ReceiverIdContext.Provider>
            {/* <ChatIdContext.Provider value={[ChatId, setChatId]}>
                <SidebarComponent courseTitle={courseTitle}/>
                <NavigationComponent />
                {ChatId != "" ? <GroupChatComponent courseTitle={courseTitle} /> : ""}
            </ChatIdContext.Provider> */}
        </div>
    )
}

export default Home