import React from "react";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import "./styles/button.css";

interface ButtonProp {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const ShowClimbedButton = ({ onClick }: ButtonProp) => {

  return (
    <div>
      <Link to="/userTable">
        <button onClick={onClick} className={"climbedBtn"}>
          Show climbed boulders
        </button>
      </Link>
    </div>
  );
};
