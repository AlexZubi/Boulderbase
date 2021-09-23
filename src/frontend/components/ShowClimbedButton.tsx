import React from "react";
import { Link } from "react-router-dom";
import "./styles/button.css";

export const ShowClimbedButton = ({ onClick }) => {
  //Changes page to the user table rendered in /table and gets the values from the "boulders" table
  return (
    <div>
      <Link to="/table">
        <button className={'climbedBtn'} onClick={onClick}>Show climbed boulders</button>
      </Link>
    </div>
  );
};

