import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import "./styles/button.css";

export const ShowClimbedButton = () => {
  return (
    <div>
      <Link to="/userTable">
        <button className={"climbedBtn"}>Show climbed boulders</button>
      </Link>
    </div>
  );
};
