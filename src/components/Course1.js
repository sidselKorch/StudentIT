import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Course1() {
  return (
    <div className="Home">
        <div className="Home-header">Course1</div>
      <div>
        <nav>
          <Link to="/home">Home</Link>
        </nav>
      </div>
      <div>
        <nav>
          {" "}
          <Link to="/course2">Course2</Link>
        </nav>
      </div>
      <div>
        <nav><Link to="/login">Log out</Link></nav>
        </div>
    </div>
  );
}
export default Course1;
