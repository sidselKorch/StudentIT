import React from 'react';
import { useParams } from "react-router-dom";

import SidebarComponent from '../../components/sidebarComponent/SidebarComponent';
import NavigationComponent from '../../components/navigationComponent/NavigationComponent';
import ChatComponent from '../../components/chatComponent/ChatComponent';
import CourseComponent from '../../components/courseComponent/CourseComponent';

import "./home.css"

function Home() {
    const { courseTitle } = useParams();

    let color = "blue"

    if (courseTitle === "technical-interaction-design"){
        color = "blue"
    } 
    if (courseTitle === "big-data-management"){
        color = "green"
    } 
    if (courseTitle === "database-programming"){
        color = "red"
    } 

    return (
        <div className="landing-page-wrapper" style={{backgroundColor: "var(--tertiary-" + color + ")"}}>
            <SidebarComponent courseTitle={courseTitle}/>
            <NavigationComponent />
            <ChatComponent courseTitle={courseTitle} color={color} />
            <CourseComponent courseTitle={courseTitle}/>
        </div>
    )
}

export default Home