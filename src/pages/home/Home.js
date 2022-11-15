import React from 'react';
import { useParams } from "react-router-dom";

import SidebarComponent from '../../components/sidebarComponent/SidebarComponent';
import NavigationComponent from '../../components/navigationComponent/NavigationComponent';
import ChatComponent from '../../components/chatComponent/ChatComponent';
import CourseComponent from '../../components/courseComponent/CourseComponent';

import "./home.css"

function Home() {
    const { id } = useParams();

    let color = "blue"

    if (id === "technical-interaction-design"){
        color = "blue"
    } 
    if (id === "big-data-management"){
        color = "green"
    } 
    if (id === "database-programming"){
        color = "red"
    } 

    return (
        <div className="landing-page-wrapper" style={{backgroundColor: "var(--tertiary-" + color + ")"}}>
            <SidebarComponent id={id}/>
            <NavigationComponent />
            <ChatComponent id={id} />
            <CourseComponent id={id}/>
        </div>
    )
}

export default Home