import "./Home.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";


function Home() {
  const [component, setComponent] = useState("home");

  return (
      <div className="Home">
        <div className="Home-header">StudentIT</div>
        <div className="Home-link">
        <nav> <Link to="/course1">Course1</Link></nav>
        </div>
        <div className="Home-link">
        <nav><Link to="/course2">Course2</Link></nav>
        </div>
        <div className="Home-link">
        <nav><Link to="/login">Log out</Link></nav>
        </div>
      </div>
  );
}

export default Home;
