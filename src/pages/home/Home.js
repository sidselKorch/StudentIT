import React from 'react';
import { useParams } from "react-router-dom";

import SidebarComponent from '../../components/sidebarComponent/SidebarComponent';
import NavigationComponent from '../../components/navigationComponent/NavigationComponent';
import ChatComponent from '../../components/chatComponent/ChatComponent';
import CourseComponent from '../../components/courseComponent/CourseComponent';

import "./home.css"

function Home() {
    const { courseTitle } = useParams();

    return (
        <div className="landing-page-wrapper">
            <SidebarComponent courseTitle={courseTitle}/>
            <NavigationComponent />
            <ChatComponent courseTitle={courseTitle} />
            <CourseComponent courseTitle={courseTitle}/>
        </div>
    )
}

export default Home