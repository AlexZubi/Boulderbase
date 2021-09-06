import React from "react";
import { Link } from "react-router-dom";
import "./styles/table.css";


export const GoBackButton = ({ }) => {
  //Goes back to the starting page from the database section
  return (
    <div>
      <Link to="/">
        <button className='btn'>Go Back</button>
      </Link>
    </div>
  );
};