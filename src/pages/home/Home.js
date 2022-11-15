import React, { useState, useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import "./home.css";
import { CourseApi } from "../../api/CourseApi"

import Chat from "../../components/chat/Chat";
import Sidebar from "../../components/sidebar/Sidebar";
import PostComponent from "../../components/postcomponent/PostComponent";
import Navigationbar from "../../components/navigationbar/NavigationBar";

function Home() {
    const { currentUser, setCurrentUser }  = useContext(LoginContext);

  return (
    <div
      className="landing-page-wrapper"
      style={{ backgroundColor: "var(--tertiary-" + "green" + ")" }}>
        <CourseApi/>
        <Sidebar />
        <Navigationbar />
        <Chat />
        <PostComponent />
    </div>
  );
}

export default Home;
