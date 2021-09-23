import React from "react";
import { Link } from "react-router-dom";
import "./styles/button.css";

export const GoBackButton = ({}) => {
  //Goes back to the starting page from the database section
  return (
    <div>
      <Link to="/">
        <button className={'backBtn'}>Go Back</button>
      </Link>
    </div>
  );
};
