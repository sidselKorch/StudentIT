import {React, useState} from 'react';
import { useParams } from "react-router-dom";

import SidebarComponent from '../../components/sidebarComponent/SidebarComponent';
import NavigationComponent from '../../components/navigationComponent/NavigationComponent';
import ChatComponent from '../../components/chatComponent/ChatComponent';
import CourseComponent from '../../components/courseComponent/CourseComponent';

import "./homepage.css"


import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';


function Home() {
    const { courseTitle } = useParams();

    const [ReceiverId, setReceiverId] = useState("")

    return (
        <div className="landing-page-wrapper">
            <ReceiverIdContext.Provider value={[ReceiverId, setReceiverId]}>
                <SidebarComponent courseTitle={courseTitle}/>
                <NavigationComponent />
                <ChatComponent courseTitle={courseTitle} />
                {/* <CourseComponent courseTitle={courseTitle}/> */}
            </ReceiverIdContext.Provider>
        </div>
    )
}

export default Home