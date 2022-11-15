import React from 'react'
import { Link, useParams } from "react-router-dom";

function Course1() {
  const { id } = useParams();
  return (
    <div>
      <h2>Now showing post {id}</h2>
   </div>
  )
}

export default Course1