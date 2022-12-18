import {React, useState} from 'react';
import { useParams } from "react-router-dom";

import SidebarComponent from '../../components/sidebarComponent/SidebarComponent';
import NavigationComponent from '../../components/navigationComponent/NavigationComponent';
import ChatComponent from '../../components/chatComponent/ChatComponent';
import CourseComponent from '../../components/courseComponent/CourseComponent';
import { createChatList } from "../../api/Api"

import "./homepage.css"

import { ReceiverIdContext } from '../../contexts/ReceiverIdContext';


function Home() {
    const { courseTitle } = useParams();

    const [ReceiverId, setReceiverId] = useState("")

    const success = createChatList(Parse.User.current.firstname, Parse.User.current.lastname, Parse.User.current.email, "big data management") //figure out how to get these values
    if (success) {
      console.log(values.email + "was added to chatlist")//same here
    } else {
      console.log("Something went wrong")
    }

    return (
        <div className="landing-page-wrapper">
            <ReceiverIdContext.Provider value={[ReceiverId, setReceiverId]}>
                <SidebarComponent courseTitle={courseTitle}/>
                <NavigationComponent />
                {ReceiverId != "" ? <ChatComponent courseTitle={courseTitle} /> : ""}
                <CourseComponent courseTitle={courseTitle}/>
            </ReceiverIdContext.Provider>
        </div>
    )
}

export default Home