import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Course2() {
  return (
    <div className="Home">
      <div className="Home-header">Course2</div>
      <div>
        <nav>
          <Link to="/home">Home</Link>
        </nav>
      </div>
      <div>
        <nav>
          {" "}
          <Link to="/course1">Course1</Link>
        </nav>
      </div>
      <div>
        <nav><Link to="/login">Log out</Link></nav>
        </div>
    </div>
  );
}
export default Course2;
